import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials immediately if we have a refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

// Helper function to get a new access token
async function refreshAccessToken() {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
    return true;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return false;
  }
}

// Initialize Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Helper function to check availability for all time slots at once
async function getBookedSlots(date: string) {
  try {
    console.log('Checking availability for date:', date);
    console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
    console.log('OAuth2 Client:', {
      clientId: process.env.GOOGLE_CLIENT_ID,
      hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN
    });
    
    // Set up time range for the entire day in Eastern Time (ET)
    const startOfDay = new Date(date + 'T00:00:00-04:00');  // -04:00 for ET
    startOfDay.setHours(9, 0, 0, 0);
    
    const endOfDay = new Date(date + 'T00:00:00-04:00');  // -04:00 for ET
    endOfDay.setHours(17, 0, 0, 0);

    console.log('Fetching events between:', {
      start: startOfDay.toISOString(),
      end: endOfDay.toISOString()
    });

    try {
      const response = await calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: 'America/New_York'  // Explicitly set timezone to ET
      });

      console.log('Calendar API Response:', {
        itemsCount: response.data.items?.length,
        items: response.data.items?.map(item => ({
          summary: item.summary,
          start: item.start,
          end: item.end
        }))
      });

      // Create a Set of booked time slots
      const bookedSlots = new Set();
      response.data.items?.forEach(event => {
        if (event.start?.dateTime) {
          const eventStart = new Date(event.start.dateTime);
          bookedSlots.add(eventStart.getHours());
        }
      });

      return bookedSlots;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'invalid_grant') {
        // Try to refresh the token
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // Retry the request with the new token
          const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
            timeZone: 'America/New_York'  // Explicitly set timezone to ET
          });

          const bookedSlots = new Set();
          response.data.items?.forEach(event => {
            if (event.start?.dateTime) {
              const eventStart = new Date(event.start.dateTime);
              bookedSlots.add(eventStart.getHours());
            }
          });

          return bookedSlots;
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in getBookedSlots:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    throw error;
  }
}

interface ErrorWithResponse extends Error {
  response?: {
    data?: unknown;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    console.log('Received date parameter:', date);

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    // Ensure date is in correct format and convert to Eastern Time
    const selectedDate = new Date(date + 'T00:00:00-04:00');  // -04:00 for ET
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ 
        error: 'Invalid date format',
        details: { receivedDate: date }
      }, { status: 400 });
    }

    console.log('Parsed date:', {
      original: date,
      parsed: selectedDate.toISOString()
    });

    const now = new Date();
    const bookedSlots = await getBookedSlots(date);
    const timeSlots = [];

    // Generate time slots from 9 AM to 5 PM in Eastern Time
    for (let hour = 9; hour <= 17; hour++) {
      const startTime = new Date(selectedDate);
      startTime.setHours(hour, 0, 0, 0);
      
      // Convert current time to ET for comparison
      const nowET = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      
      // Skip if the time slot is in the past
      if (startTime < nowET) continue;

      // Check if the slot is available (not in bookedSlots)
      const available = !bookedSlots.has(hour);
      
      timeSlots.push({
        time: `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
        available,
        startTime: startTime.toISOString(),
        endTime: new Date(startTime.setHours(hour + 1)).toISOString(),
      });
    }

    console.log('Generated time slots:', timeSlots);

    return NextResponse.json({ timeSlots });
  } catch (error: unknown) {
    console.error('Calendar API error:', error);
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
      response: (error as ErrorWithResponse).response?.data
    } : 'Unknown error';
    
    if (error instanceof Error && error.message === 'invalid_grant') {
      return NextResponse.json({ 
        error: 'Calendar authentication expired',
        details: 'Please try again in a few minutes while we refresh the connection.'
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch availability',
      details: errorDetails
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body = null;
  try {
    body = await request.json();
    console.log('POST /api/calendar request body:', body);
    const { 
      startTime, 
      endTime, 
      customerName, 
      customerPhone, 
      customerEmail,
      carMake,
      carModel,
      serviceType 
    } = body;

    // Validate required fields
    if (!startTime || !endTime || !customerName || !customerPhone || !customerEmail || !carMake || !carModel || !serviceType) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'All fields including car make and model are required'
      }, { status: 400 });
    }

    // Format phone number to (XXX) XXX-XXXX
    const formattedPhone = customerPhone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

    // Create a more detailed event description
    const event = {
      summary: `Vehicle Service - ${customerName}`,
      description: `Service Type: ${serviceType}\n\nCustomer Information:\nName: ${customerName}\nPhone: ${formattedPhone}\nEmail: ${customerEmail}\n\nVehicle Information:\nMake: ${carMake}\nModel: ${carModel}\n\nService Details:\n${serviceType}`,
      start: {
        dateTime: startTime,
      },
      end: {
        dateTime: endTime,
      },
      reminders: {
        useDefault: true
      }
    };

    console.log('Creating calendar event with:', {
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventSummary: event.summary,
      startTime: event.start.dateTime,
      endTime: event.end.dateTime
    });

    // --- Double booking prevention ---
    const existingEvents = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startTime,
      timeMax: endTime,
      singleEvents: true,
      orderBy: 'startTime',
    });
    if (existingEvents.data.items && existingEvents.data.items.length > 0) {
      return NextResponse.json({
        error: 'Time slot already booked',
        details: 'Please select a different time.'
      }, { status: 409 });
    }
    // --- End double booking prevention ---

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    console.log('Calendar event created successfully:', {
      eventId: response.data.id,
      htmlLink: response.data.htmlLink
    });

    // Store in Supabase
    const supabaseResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startTime,
        endTime,
        customerName,
        customerPhone: formattedPhone,
        customerEmail,
        carMake,
        carModel,
        serviceType,
        calendarEventId: response.data.id
      }),
    });

    if (!supabaseResponse.ok) {
      throw new Error('Failed to store appointment in database: ' + await supabaseResponse.text());
    }

    return NextResponse.json({ 
      success: true, 
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
      details: {
        name: customerName,
        phone: formattedPhone,
        email: customerEmail,
        carMake,
        carModel,
        startTime,
        endTime,
        serviceType
      }
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
      if ((error as any).response) {
        console.error('Google/Supabase API error response:', (error as any).response.data);
      }
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error && (error as any).response?.data 
      ? (error as any).response.data 
      : undefined;

    return NextResponse.json({ 
      error: 'Failed to create appointment',
      details: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      googleError: errorDetails,
      requestBody: body
    }, { status: 500 });
  }
}

interface GoogleCalendarResponse {
  items: CalendarEvent[];
}

interface CalendarEvent {
  summary: string;
  description: string;
  start: { dateTime: string };
  end: { dateTime: string };
  reminders?: {
    useDefault: boolean;
  };
}

interface GoogleApiError extends Error {
  response?: {
    data?: {
      error?: string;
      error_description?: string;
    };
  };
} 