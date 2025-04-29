import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export async function GET() {
  try {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID } = process.env;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GOOGLE_CALENDAR_ID) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required Google Calendar credentials in environment variables'
        },
        { status: 500 }
      );
    }

    console.log('Testing Google Calendar integration...');
    
    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'postmessage'
    );

    oauth2Client.setCredentials({
      refresh_token: GOOGLE_REFRESH_TOKEN
    });

    console.log('Auth client created, initializing calendar...');
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // 1. List all available calendars
    console.log('Fetching list of calendars...');
    const calendarList = await calendar.calendarList.list();
    
    console.log('Available calendars:', calendarList.data.items?.map(cal => ({
      id: cal.id,
      summary: cal.summary
    })));

    // 2. Try to access the specified calendar
    console.log('Attempting to access specified calendar:', GOOGLE_CALENDAR_ID);
    const calendarInfo = await calendar.calendars.get({
      calendarId: GOOGLE_CALENDAR_ID,
    });

    // 3. Create a test event
    console.log('Creating test event...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const event = {
      summary: 'TEST EVENT - Please Delete',
      description: 'This is a test event to verify calendar integration.',
      start: {
        dateTime: tomorrow.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
        timeZone: 'America/New_York',
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    // 4. Delete the test event
    console.log('Deleting test event...');
    await calendar.events.delete({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: createdEvent.data.id!,
    });

    return NextResponse.json({
      success: true,
      message: 'Google Calendar integration test successful',
      details: {
        availableCalendars: calendarList.data.items?.map(cal => ({
          id: cal.id,
          summary: cal.summary
        })),
        specifiedCalendarId: GOOGLE_CALENDAR_ID,
        calendarName: calendarInfo.data.summary,
        calendarTimeZone: calendarInfo.data.timeZone,
        testEventCreated: true,
        testEventDeleted: true,
      },
    });
  } catch (error) {
    console.error('Google Calendar test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error,
      },
      { status: 500 }
    );
  }
} 