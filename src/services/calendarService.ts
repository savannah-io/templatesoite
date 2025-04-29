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
      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: this.calendarTimezone,
      });

      // Return the existing events with their start and end times
      return (response.data.items || []).map(event => ({
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date
      }));
    } catch (error: unknown) {
      console.error('Error fetching calendar slots:', error);
      if ((error as any).response?.data?.error) {
        console.error('Google Calendar API error:', (error as any).response.data.error);
      }
      throw error;
    }
  }

  async createCalendarEvent(bookingDetails: BookingDetails): Promise<CalendarEvent> {
    try {
      console.log('Creating calendar event with details:', bookingDetails);

      const event: CalendarEvent = {
        summary: `Auto Service Appointment - ${bookingDetails.service}`,
        description: `
Service: ${bookingDetails.service}
Name: ${bookingDetails.name}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}
        `.trim(),
        start: {
          dateTime: `${bookingDetails.date}T${bookingDetails.time}:00`,
          timeZone: bookingDetails.timezone || this.calendarTimezone,
        },
        end: {
          dateTime: `${bookingDetails.date}T${this.addHours(bookingDetails.time, 2)}:00`,
          timeZone: bookingDetails.timezone || this.calendarTimezone,
        }
      };

      console.log('Sending event to Google Calendar:', event);

      const response = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
        sendUpdates: 'none'
      });

      console.log('Google Calendar response:', response.data);
      
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
    const [h, m] = time.split(':').map(Number);
    const newHour = (h + hours) % 24;
    return `${newHour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
} 