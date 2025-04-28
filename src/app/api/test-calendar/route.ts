import { NextResponse } from 'next/server';
import { createCalendarEvent } from '@/utils/calendar';

export async function GET() {
  try {
    // Create a test event 1 hour from now
    const startTime = new Date();
    startTime.setHours(startTime.getHours() + 1);
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    const event = await createCalendarEvent(
      'Test Booking',
      'This is a test booking to verify calendar integration',
      startTime,
      endTime
    );

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Calendar test failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 