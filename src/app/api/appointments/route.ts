import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const {
      startTime,
      endTime,
      customerName,
      customerPhone,
      customerEmail,
      carMake,
      carModel,
      serviceType,
      calendarEventId
    } = await request.json();

    // Validate required fields
    if (!carMake || !carModel) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'Car make and model are required'
      }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          car_make: carMake,
          car_model: carModel,
          service_type: serviceType,
          appointment_start: startTime,
          appointment_end: endTime,
          calendar_event_id: calendarEventId,
          status: 'scheduled'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({
        error: 'Failed to create appointment',
        details: error.message
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, appointment: data });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 