import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { calendar_v3 } from 'googleapis';

interface AppointmentDetails {
  customerName: string;
  phoneNumber: string;
  email: string;
  vehicleDetails: string;
  damageDescription: string;
  appointmentDate: Date;
  notes?: string;
}

interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: {
    email: string;
    name?: string;
  }[];
}

interface BookingDetails {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  timezone?: string;
}

export class CalendarService {
  private calendar;
  private readonly calendarTimezone = process.env.CALENDAR_TIMEZONE || 'America/New_York';

  constructor() {
    console.log('Initializing CalendarService with:', {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      hasPrivateKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    });

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createAppointment(details: AppointmentDetails) {
    try {
      const event = {
        summary: `Auto Repair - ${details.customerName}`,
        description: `
Vehicle: ${details.vehicleDetails}
Damage: ${details.damageDescription}
Customer Phone: ${details.phoneNumber}
Customer Email: ${details.email}
Notes: ${details.notes || 'None'}
        `.trim(),
        start: {
          dateTime: details.appointmentDate.toISOString(),
          timeZone: this.calendarTimezone,
        },
        end: {
          dateTime: new Date(details.appointmentDate.getTime() + 60 * 60 * 1000).toISOString(),
          timeZone: this.calendarTimezone,
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours email reminder
            { method: 'popup', minutes: 60 } // 1 hour popup reminder
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
        sendUpdates: 'all', // Send email notifications to attendees
      });

      return {
        success: true,
        eventId: response.data.id,
        htmlLink: response.data.htmlLink
      };
    } catch (error: unknown) {
      console.error('Calendar creation error:', error);
      if ((error as any).response?.data?.error) {
        console.error('Google Calendar API error:', (error as any).response.data.error);
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAvailableSlots(startDate: Date, endDate: Date) {
    try {
      console.log('Fetching slots from', startDate.toISOString(), 'to', endDate.toISOString());
      
      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: this.calendarTimezone,
      });

      console.log('Found existing events:', response.data.items?.length || 0);

      // Business hours: 9 AM to 4 PM
      const businessHours = {
        morning: [
          { hour: 1, period: 'PM' },
          { hour: 2, period: 'PM' },
          { hour: 3, period: 'PM' },
          { hour: 4, period: 'PM' },
        ]
      };

      // Generate available slots
      const availableSlots = this.generateAvailableSlots(
        startDate,
        endDate,
        businessHours,
        response.data.items || []
      );

      console.log('Generated available slots:', availableSlots.length);
      return availableSlots;
    } catch (error: unknown) {
      console.error('Error fetching calendar slots:', error);
      if ((error as any).response?.data?.error) {
        console.error('Google Calendar API error:', (error as any).response.data.error);
      }
      throw error;
    }
  }

  private generateAvailableSlots(
    startDate: Date,
    endDate: Date,
    businessHours: { 
      morning?: Array<{ hour: number, period: string }>,
      afternoon?: Array<{ hour: number, period: string }>
    },
    existingEvents: calendar_v3.Schema$Event[]
  ) {
    const slots = [];
    const currentDate = new Date(startDate);

    // Convert existing events to local timezone for comparison
    const bookedSlots = existingEvents.map(event => {
      if (!event.start?.dateTime || !event.end?.dateTime) return null;
      return {
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime)
      };
    }).filter(Boolean);

    console.log('Booked slots:', JSON.stringify(bookedSlots, null, 2));

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
        // Define business hours: 9 AM to 5 PM
        const hours = [
          { hour: 9, period: 'AM' },
          { hour: 10, period: 'AM' },
          { hour: 11, period: 'AM' },
          { hour: 12, period: 'PM' },
          { hour: 1, period: 'PM' },
          { hour: 2, period: 'PM' },
          { hour: 3, period: 'PM' },
          { hour: 4, period: 'PM' },
          { hour: 5, period: 'PM' }
        ];

        for (const time of hours) {
          const slotStart = new Date(currentDate);
          let hour24 = time.period === 'PM' && time.hour !== 12 ? time.hour + 12 : time.hour;
          if (time.period === 'AM' && time.hour === 12) hour24 = 0;
          
          slotStart.setHours(hour24, 0, 0, 0);
          const slotEnd = new Date(slotStart.getTime() + (60 * 60 * 1000)); // 1 hour slots

          console.log(`Checking availability for slot: ${slotStart.toISOString()} - ${slotEnd.toISOString()}`);

          // Check if slot overlaps with any booked slots
          const isBooked = bookedSlots.some(bookedSlot => {
            if (!bookedSlot) return false;
            
            const overlap = (
              (slotStart >= bookedSlot.start && slotStart < bookedSlot.end) ||
              (slotEnd > bookedSlot.start && slotEnd <= bookedSlot.end) ||
              (slotStart <= bookedSlot.start && slotEnd >= bookedSlot.end)
            );

            if (overlap) {
              console.log(`Slot overlaps with booked appointment: ${bookedSlot.start} - ${bookedSlot.end}`);
            }

            return overlap;
          });

          if (!isBooked) {
            console.log(`Adding available slot: ${time.hour}:00 ${time.period}`);
            slots.push({
              start: slotStart,
              end: slotEnd,
              displayTime: `${time.hour}:00 ${time.period}`
            });
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    return slots;
  }

  async createCalendarEvent(bookingDetails: BookingDetails): Promise<CalendarEvent> {
    try {
      console.log('Raw booking details:', bookingDetails);

      // Parse the time properly
      const [time, period] = bookingDetails.time.split(' ');
      console.log('Split time and period:', { time, period });

      const [hour, minute] = time.split(':');
      console.log('Split hour and minute:', { hour, minute });

      let hour24 = parseInt(hour);
      console.log('Initial hour24:', hour24);
      
      // Convert to 24-hour format
      if (period?.toUpperCase() === 'PM' && hour24 < 12) {
        hour24 += 12;
      } else if (period?.toUpperCase() === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      console.log('Converted hour24:', hour24);

      // Format time in 24-hour format
      const time24 = `${hour24.toString().padStart(2, '0')}:00`;
      console.log('Final time24:', time24);

      const startDateTime = `${bookingDetails.date}T${time24}:00`;
      console.log('Start DateTime:', startDateTime);

      // Check if the slot is still available
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: this.calendarTimezone,
      });

      // If there are any events in this time slot, it's not available
      if (response.data.items && response.data.items.length > 0) {
        throw new Error('This time slot is no longer available. Please select a different time.');
      }

      const event: CalendarEvent = {
        summary: `Auto Service Appointment - ${bookingDetails.service}`,
        description: `
Service: ${bookingDetails.service}
Name: ${bookingDetails.name}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}
        `.trim(),
        start: {
          dateTime: startDateTime,
          timeZone: bookingDetails.timezone || this.calendarTimezone,
        },
        end: {
          dateTime: `${bookingDetails.date}T${this.addHours(time24, 1)}:00`,
          timeZone: bookingDetails.timezone || this.calendarTimezone,
        }
      };

      console.log('Final event object:', JSON.stringify(event, null, 2));

      const createResponse = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
        sendUpdates: 'none'
      });

      console.log('Google Calendar response:', createResponse.data);
      
      return event;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  async checkAvailability(): Promise<boolean> {
    return true;
  }

  async sendConfirmationEmail(bookingDetails: BookingDetails): Promise<void> {
    console.log('Sending confirmation email:', bookingDetails);
  }

  private addHours(time: string, hours: number): string {
    const [h] = time.split(':').map(Number);
    const newHour = (h + hours) % 24;
    return `${newHour.toString().padStart(2, '0')}:00`;
  }
} 