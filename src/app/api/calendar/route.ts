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

    // Don't allow bookings on Sundays
    if (startDate.getDay() === 0) {
      return NextResponse.json({ timeSlots: [] });
    }

    const calendarService = new CalendarService();
    const existingEvents = await calendarService.getAvailableSlots(startDate, endDate);

    console.log('Existing events:', existingEvents);

    // Business hours: 9 AM to 5 PM
    const businessHours = {
      start: 9,
      end: 17
    };

    // Generate time slots
    const timeSlots = [];
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));

    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      const slotTime = new Date(startDate);
      slotTime.setHours(hour, 0, 0, 0);
      const slotEndTime = new Date(slotTime.getTime() + (2 * 60 * 60 * 1000));

      // For today's date, only show slots that are at least 2 hours in the future
      if (startDate.toDateString() === now.toDateString() && slotTime < twoHoursFromNow) {
        continue;
      }

      // Check if slot overlaps with any existing events
      const hasOverlap = existingEvents.some(event => {
        if (!event.start || !event.end) return false;
        
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        
        // Check if the proposed slot overlaps with an existing event
        return (
          (slotTime <= eventEnd && slotEndTime >= eventStart) ||
          (eventStart <= slotEndTime && eventEnd >= slotTime)
        );
      });

      if (!hasOverlap) {
        timeSlots.push({
          time: slotTime.toLocaleTimeString('en-US', { 
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          available: true,
          startTime: slotTime.toISOString(),
          endTime: slotEndTime.toISOString()
        });
      }
    }

    // Get booked appointments from Supabase as well
    const { data: bookedAppointments, error: dbError } = await supabase
      .from('appointments')
      .select('*')
      .gte('appointment_date', startDate.toISOString())
      .lte('appointment_date', endDate.toISOString());

    if (!dbError && bookedAppointments) {
      // Filter out slots that overlap with Supabase appointments
      const finalTimeSlots = timeSlots.filter(slot => {
        const slotStart = new Date(slot.startTime);
        const slotEnd = new Date(slot.endTime);
        
        return !bookedAppointments.some(appointment => {
          const appointmentTime = new Date(appointment.appointment_date);
          const appointmentEnd = new Date(appointmentTime.getTime() + (2 * 60 * 60 * 1000));
          return (slotStart <= appointmentEnd && slotEnd >= appointmentTime);
        });
      });

      return NextResponse.json({ timeSlots: finalTimeSlots });
    }

    return NextResponse.json({ timeSlots });
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
    console.log('Received request body:', body);

    const { 
      date,
      service, 
      name, 
      email, 
      phone, 
      carMake, 
      carModel,
      timezone = DEFAULT_TIMEZONE 
    } = body;

    // Validate required fields
    if (!date || !service || !name || !email || !phone) {
      console.error('Missing required fields:', { date, service, name, email, phone });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse and validate the ISO timestamp
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      console.error('Invalid date format:', date);
      return NextResponse.json(
        { error: 'Invalid date format. Please provide an ISO 8601 timestamp.' },
        { status: 400 }
      );
    }

    console.log('Parsed appointment date:', appointmentDate);

    // Format date and time for the calendar event
    const dateStr = appointmentDate.toISOString().split('T')[0];
    const timeStr = appointmentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    console.log('Formatted date and time:', { dateStr, timeStr });

    const calendarService = new CalendarService();
    
    try {
      const event = await calendarService.createCalendarEvent({
        date: dateStr,
        time: timeStr,
        service,
        name,
        email,
        phone,
        timezone
      });

      console.log('Calendar event created:', event);

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