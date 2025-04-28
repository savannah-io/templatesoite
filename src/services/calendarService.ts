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
}

export class CalendarService {
  private calendar;
  private auth: JWT;

  constructor() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      throw new Error('Missing required Google Calendar credentials in environment variables');
    }

    this.auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
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
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: new Date(details.appointmentDate.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
          timeZone: 'America/New_York',
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
      });

      return {
        success: true,
        eventId: response.data.id,
        htmlLink: response.data.htmlLink
      };
    } catch (error: unknown) {
      console.error('Calendar creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAvailableSlots(startDate: Date, endDate: Date) {
    try {
      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      // Business hours: 9 AM to 5 PM
      const businessHours = {
        start: 9,
        end: 17,
      };

      // Generate available 1-hour slots
      const availableSlots = this.generateAvailableSlots(
        startDate,
        endDate,
        businessHours,
        response.data.items || []
      );

      return availableSlots;
    } catch (error: unknown) {
      console.error('Error fetching calendar slots:', error);
      throw error;
    }
  }

  private generateAvailableSlots(
    startDate: Date,
    endDate: Date,
    businessHours: { start: number; end: number },
    existingEvents: calendar_v3.Schema$Event[]
  ) {
    const slots = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Skip weekends
        for (let hour = businessHours.start; hour < businessHours.end; hour++) { // 1-hour blocks
          const slotStart = new Date(currentDate.setHours(hour, 0, 0, 0));
          const slotEnd = new Date(currentDate.setHours(hour + 1, 0, 0, 0));

          const isAvailable = !existingEvents.some(event => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false;
            const eventStart = new Date(event.start.dateTime);
            const eventEnd = new Date(event.end.dateTime);
            return (
              (slotStart >= eventStart && slotStart < eventEnd) ||
              (slotEnd > eventStart && slotEnd <= eventEnd)
            );
          });

          if (isAvailable) {
            slots.push({
              start: new Date(slotStart),
              end: new Date(slotEnd),
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
    const event: CalendarEvent = {
      summary: `Auto Service Appointment - ${bookingDetails.service}`,
      description: `Service: ${bookingDetails.service}\nName: ${bookingDetails.name}\nPhone: ${bookingDetails.phone}`,
      start: {
        dateTime: `${bookingDetails.date}T${bookingDetails.time}:00`,
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: `${bookingDetails.date}T${this.addHours(bookingDetails.time, 2)}:00`,
        timeZone: 'America/New_York'
      },
      attendees: [
        {
          email: bookingDetails.email,
          name: bookingDetails.name
        }
      ]
    };
    
    // Here you would typically make the API call to create the event
    // For now, we'll just return the event object
    return event;
  }

  async checkAvailability(): Promise<boolean> {
    // Here you would typically check against your calendar API
    // For now, we'll just return true
    return true;
  }

  async sendConfirmationEmail(bookingDetails: BookingDetails): Promise<void> {
    // Here you would typically send the email
    // For now, we'll just log
    console.log('Sending confirmation email:', bookingDetails);
  }

  private addHours(time: string, hours: number): string {
    const [h, m] = time.split(':').map(Number);
    const newHour = (h + hours) % 24;
    return `${newHour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
} 