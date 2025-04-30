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
    const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_CALENDAR_ID } = process.env;

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
      console.error('Missing required Google Calendar credentials in environment variables');
      // Instead of throwing, we'll initialize with null and handle errors in methods
      this.calendar = null;
      return;
    }

    console.log('Initializing CalendarService with:', {
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      calendarId: GOOGLE_CALENDAR_ID,
      hasPrivateKey: !!GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    });

    const auth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  private checkCalendarInitialized() {
    if (!this.calendar) {
      throw new Error('Calendar service is not properly initialized. Please check your environment variables.');
    }
    return this.calendar;
  }

  async createAppointment(details: AppointmentDetails) {
    try {
      const calendar = this.checkCalendarInitialized();
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

      const response = await calendar.events.insert({
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

  async getAvailableSlots(startDate: Date, endDate: Date, timezone?: string) {
    try {
      const calendar = this.checkCalendarInitialized();
      
      // Ensure we're using the correct calendar ID
      const calendarId = process.env.GOOGLE_CALENDAR_ID;
      console.log('Using Calendar ID:', calendarId);
      
      // Use provided timezone or default
      const timeZone = timezone || this.calendarTimezone;
      
      // Create dates in the correct timezone
      const timeMin = new Date(startDate.toLocaleString('en-US', { timeZone }));
      const timeMax = new Date(endDate.toLocaleString('en-US', { timeZone }));
      
      // Ensure we're requesting the full day
      timeMin.setHours(0, 0, 0, 0);
      timeMax.setHours(23, 59, 59, 999);
      
      console.log('Calendar API Request:', {
        date: startDate.toLocaleDateString('en-CA'),
        timeZone,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        dayOfWeek: timeMin.getDay()
      });
      
      const response = await calendar.events.list({
        calendarId,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone
      });

      // Define business hours: 9 AM to 5 PM
      const businessHours = [
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

      // Generate available slots
      const availableSlots = this.generateAvailableSlots(
        timeMin,
        timeMax,
        businessHours,
        response.data.items || [],
        timeZone
      );

      console.log('Generated Slots:', {
        date: startDate.toLocaleDateString('en-CA'),
        timeZone,
        slotsCount: availableSlots.length,
        dayOfWeek: timeMin.getDay(),
        hasSlots: availableSlots.length > 0
      });

      return availableSlots;
    } catch (error: unknown) {
      console.error('Error fetching calendar slots:', error);
      throw error;
    }
  }

  private generateAvailableSlots(
    startDate: Date,
    endDate: Date,
    businessHours: Array<{ hour: number, period: string }>,
    existingEvents: calendar_v3.Schema$Event[],
    timeZone: string
  ) {
    const slots = [];
    // Create a new date object in the local timezone
    const currentDate = new Date(startDate.toLocaleString('en-US', { timeZone }));
    currentDate.setHours(0, 0, 0, 0);  // Ensure we start at beginning of day
    
    // Log the date we're processing
    console.log('Processing slots for date:', {
      inputStartDate: startDate.toISOString(),
      localCurrentDate: currentDate.toISOString(),
      timezone: timeZone,
      startDay: currentDate.getDay(),
      endDay: endDate.getDay()
    });

    // Convert existing events to the calendar timezone for comparison
    const bookedSlots = existingEvents
      .filter(event => event.start?.dateTime && event.end?.dateTime)
      .map(event => {
        // Convert the event times to the calendar timezone
        const start = new Date(new Date(event.start!.dateTime!).toLocaleString('en-US', { timeZone }));
        const end = new Date(new Date(event.end!.dateTime!).toLocaleString('en-US', { timeZone }));
        
        console.log('Booked slot:', {
          originalStart: event.start!.dateTime,
          originalEnd: event.end!.dateTime,
          convertedStart: start.toISOString(),
          convertedEnd: end.toISOString(),
          timezone: timeZone,
          dayOfWeek: start.getDay()
        });
        
        return { start, end };
      });

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      
      // Only skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        console.log('Processing weekday:', {
          date: currentDate.toLocaleDateString('en-CA'),
          dayOfWeek,
          dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
        });
        
        for (const time of businessHours) {
          // Create date in the correct timezone
          const slotDate = new Date(currentDate.toLocaleString('en-US', { timeZone }));
          let hour24 = time.period === 'PM' && time.hour !== 12 ? time.hour + 12 : time.hour;
          if (time.period === 'AM' && time.hour === 12) hour24 = 0;
          
          slotDate.setHours(hour24, 0, 0, 0);
          
          // Create slot times in the calendar timezone
          const slotStart = new Date(slotDate.toLocaleString('en-US', { timeZone }));
          const slotEnd = new Date(slotStart.getTime() + (60 * 60 * 1000)); // 1 hour slots

          // Skip slots from past days only
          const now = new Date();
          const isToday = slotStart.toDateString() === now.toDateString();
          const isPastDay = slotStart < new Date(now.setHours(0, 0, 0, 0));
          
          if (isPastDay || (isToday && slotStart < now)) {
            console.log('Skipping past slot:', {
              date: slotStart.toLocaleDateString('en-CA'),
              time: `${time.hour}:00 ${time.period}`,
              isPastDay,
              isToday
            });
            continue;
          }

          // Check if slot overlaps with any booked slots
          const isBooked = bookedSlots.some(bookedSlot => {
            const overlap = (
              (slotStart >= bookedSlot.start && slotStart < bookedSlot.end) ||
              (slotEnd > bookedSlot.start && slotEnd <= bookedSlot.end) ||
              (slotStart <= bookedSlot.start && slotEnd >= bookedSlot.end)
            );

            if (overlap) {
              console.log('Found booking overlap:', {
                slot: `${time.hour}:00 ${time.period}`,
                date: currentDate.toLocaleDateString('en-CA'),
                dayOfWeek,
                slotRange: `${slotStart.toISOString()} - ${slotEnd.toISOString()}`,
                bookingRange: `${bookedSlot.start.toISOString()} - ${bookedSlot.end.toISOString()}`,
                timezone: timeZone
              });
            }

            return overlap;
          });

          slots.push({
            start: slotStart,
            end: slotEnd,
            time: `${time.hour}:00 ${time.period}`,
            available: !isBooked
          });
        }
      } else {
        console.log('Skipping weekend:', {
          date: currentDate.toLocaleDateString('en-CA'),
          dayOfWeek,
          dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    // Log the generated slots for debugging
    console.log('Generated slots:', {
      startDate: startDate.toLocaleDateString('en-CA'),
      endDate: endDate.toLocaleDateString('en-CA'),
      timezone: timeZone,
      slotsCount: slots.length,
      slotsPerDay: slots.reduce((acc, slot) => {
        const date = new Date(slot.start).toLocaleDateString('en-CA');
        const day = new Date(slot.start).getDay();
        acc[date] = acc[date] || { count: 0, day };
        acc[date].count++;
        return acc;
      }, {} as Record<string, { count: number, day: number }>),
      firstSlot: slots[0],
      lastSlot: slots[slots.length - 1],
      bookedSlotsCount: bookedSlots.length
    });

    return slots;
  }

  async createCalendarEvent(bookingDetails: BookingDetails): Promise<CalendarEvent> {
    try {
      const calendar = this.checkCalendarInitialized();
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

      // Double-check availability right before creating the event
      const response = await calendar.events.list({
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

      const createResponse = await calendar.events.insert({
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
    const calendar = this.checkCalendarInitialized();
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