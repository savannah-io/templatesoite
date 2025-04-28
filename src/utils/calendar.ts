import { google } from 'googleapis';

export async function getGoogleCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });

  return google.calendar({ version: 'v3', auth });
}

export async function createCalendarEvent(
  summary: string,
  description: string,
  startTime: Date,
  endTime: Date
) {
  const calendar = await getGoogleCalendarClient();

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'America/New_York',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'America/New_York',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

export async function checkAvailability(startTime: Date, endTime: Date) {
  const calendar = await getGoogleCalendarClient();

  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
    });

    return response.data.items?.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
} 