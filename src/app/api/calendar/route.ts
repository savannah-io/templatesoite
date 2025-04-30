import { NextResponse } from 'next/server';
import { CalendarService } from '@/services/calendarService';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Default timezone - should match your business location
const DEFAULT_TIMEZONE = 'America/New_York';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const timezone = searchParams.get('timezone') || DEFAULT_TIMEZONE;

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Create start and end date for the requested date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Validate the date
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD format.' },
        { status: 400 }
      );
    }

    const calendarService = new CalendarService();
    const availableSlots = await calendarService.getAvailableSlots(
      startDate,
      endDate
    );

    // Convert slots to the format expected by the frontend
    const timeSlots = availableSlots.map(slot => {
      const startTime = new Date(slot.start);
      const hour = startTime.getHours();
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      
      return {
        time: `${displayHour}:00 ${period}`,
        available: true,
        startTime: slot.start.toISOString(),
        endTime: slot.end.toISOString()
      };
    });

    try {
      // Get booked appointments from Supabase
      const { data: bookedAppointments, error: dbError } = await supabase
        .from('appointments')
        .select('*')
        .gte('appointment_date', startDate.toISOString())
        .lte('appointment_date', endDate.toISOString());

      if (dbError) {
        // If there's a database error, log it but continue with available slots
        console.error('Database error:', dbError);
        // Return all slots as available if we can't check appointments
        return NextResponse.json({ timeSlots });
      }

      // Filter out slots that are already booked in Supabase
      const finalTimeSlots = timeSlots.filter(slot => {
        return !bookedAppointments?.some(appointment => {
          const appointmentTime = new Date(appointment.appointment_date);
          const slotTime = new Date(slot.startTime);
          return appointmentTime.getTime() === slotTime.getTime();
        });
      });

      return NextResponse.json({ timeSlots: finalTimeSlots });
    } catch (dbError) {
      // If there's any error with Supabase, return all slots as available
      console.error('Database operation failed:', dbError);
      return NextResponse.json({ timeSlots });
    }
  } catch (error: unknown) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));

    const { 
      date,
      time,
      service, 
      name, 
      email, 
      phone, 
      carMake, 
      carModel,
      timezone = DEFAULT_TIMEZONE 
    } = body;

    // Validate required fields
    if (!date || !time || !service || !name || !email || !phone) {
      console.error('Missing required fields:', { date, time, service, name, email, phone });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating calendar event with:', {
      date,
      time,
      timezone,
      service,
      name
    });

    const calendarService = new CalendarService();
    
    try {
      const event = await calendarService.createCalendarEvent({
        date,
        time,
        service,
        name,
        email,
        phone,
        timezone
      });

      console.log('Calendar event created:', JSON.stringify(event, null, 2));

      // Save appointment to Supabase with simplified fields first
      const { data, error: dbError } = await supabase
        .from('appointments')
        .insert({
          appointment_date: date,
          service_type: service,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          status: 'scheduled'
        })
        .select();

      if (dbError) {
        console.error('Database error:', dbError);
        // Log the exact error details
        console.log('Error details:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint
        });
        
        return NextResponse.json(
          { 
            error: 'Error saving appointment to database', 
            details: {
              code: dbError.code,
              message: dbError.message,
              details: dbError.details,
              hint: dbError.hint
            }
          },
          { status: 500 }
        );
      }

      if (!data || data.length === 0) {
        console.error('No data returned from insert');
        return NextResponse.json(
          { error: 'No data returned from database insert' },
          { status: 500 }
        );
      }

      console.log('Appointment saved to database:', data[0]);

      return NextResponse.json({ 
        success: true, 
        event,
        appointment: {
          id: data[0].id,
          date: new Date(date).toISOString(),
          localTime: new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone
          })
        }
      });
    } catch (calendarError) {
      console.error('Calendar service error:', calendarError);
      return NextResponse.json(
        { error: 'Error creating calendar event', details: calendarError },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 