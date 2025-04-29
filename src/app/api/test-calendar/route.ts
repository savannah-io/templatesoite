import { NextResponse } from 'next/server';
import { CalendarService } from '@/services/calendarService';

export async function GET() {
  try {
    const calendarService = new CalendarService();
    
    // Test date range (today and tomorrow)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    
    const availableSlots = await calendarService.getAvailableSlots(
      startDate,
      endDate
    );

    return NextResponse.json({
      success: true,
      message: 'Calendar service is working',
      availableSlots,
      serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timezone: process.env.CALENDAR_TIMEZONE
    });
  } catch (error) {
    console.error('Calendar test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
} 