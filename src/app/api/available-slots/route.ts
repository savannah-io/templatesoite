import { NextResponse } from 'next/server';
import { CalendarService } from '@/services/calendarService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const calendarService = new CalendarService();
    const dateObj = new Date(date);
    const slots = await calendarService.getAvailableSlots(dateObj, 'America/New_York');

    // Filter out any slots that are in the past
    const currentTime = new Date();
    const filteredSlots = slots.filter(slot => new Date(slot.start) > currentTime);

    return NextResponse.json({
      date,
      slots: filteredSlots,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch available slots',
        message: error instanceof Error ? error.message : 'Unknown error',
        lastUpdated: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 