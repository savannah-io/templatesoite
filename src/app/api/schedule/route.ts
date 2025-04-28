import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_CALENDAR_ID } = process.env

if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
  throw new Error('Missing required Google Calendar credentials in environment variables')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time } = body

    // Create Google Calendar client
    const auth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Format the appointment date and time
    const startDate = new Date(`${date}T${time}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour appointment

    // Create calendar event
    const event = {
      summary: `${service} - ${name}`,
      description: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`,
      start: {
        dateTime: startDate.toISOString(),
      },
      end: {
        dateTime: endDate.toISOString(),
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hour email reminder
          { method: 'popup', minutes: 60 }, // 1 hour popup reminder
        ],
      },
    }

    await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment scheduled successfully' 
    })
  } catch (error) {
    console.error('Scheduling error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to schedule appointment' },
      { status: 500 }
    )
  }
} 