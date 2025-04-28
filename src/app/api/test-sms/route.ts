import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    
    // Format phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const e164PhoneNumber = `+1${formattedNumber}`; // Adding US country code

    console.log('Attempting to send SMS to:', e164PhoneNumber);
    
    // Initialize Twilio client
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    // Log Twilio configuration
    console.log('Twilio Configuration:', {
      fromNumber: process.env.TWILIO_PHONE_NUMBER,
      hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN
    });

    // Send test message
    const message = await twilioClient.messages.create({
      body: 'This is a test message from Taylor\'s Collision. If you received this, our SMS system is working!',
      to: e164PhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    console.log('Twilio response:', {
      sid: message.sid,
      status: message.status,
      errorCode: message.errorCode,
      errorMessage: message.errorMessage
    });

    return NextResponse.json({ 
      success: true, 
      messageId: message.sid,
      status: message.status,
      to: e164PhoneNumber
    });
  } catch (error) {
    console.error('SMS Test Error:', error);
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        // @ts-ignore
        code: error.code,
        // @ts-ignore
        status: error.status,
        // @ts-ignore
        moreInfo: error.moreInfo
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send test message'
    }, { status: 500 });
  }
} 