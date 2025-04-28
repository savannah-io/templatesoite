import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Initialize Twilio
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

interface AppointmentDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: string;
  carMake: string;
  carModel: string;
  serviceType: string;
}

export async function sendEmailConfirmation(appointment: AppointmentDetails) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return;
  }

  const appointmentDate = new Date(appointment.startTime).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const msg = {
    to: appointment.customerEmail,
    from: process.env.SENDGRID_FROM_EMAIL || 'appointments@taylorscollision.com',
    subject: 'Your Auto Service Appointment Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0088CC;">Appointment Confirmation</h2>
        <p>Dear ${appointment.customerName},</p>
        <p>Your appointment has been confirmed for:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date & Time:</strong> ${appointmentDate}</p>
          <p><strong>Service:</strong> ${appointment.serviceType}</p>
          <p><strong>Vehicle:</strong> ${appointment.carMake} ${appointment.carModel}</p>
        </div>
        <p>Location: 2785 Buford Hwy Ste 101-C, Duluth, GA 30096</p>
        <p>If you need to make any changes to your appointment, please call us at (770) 495-0050.</p>
        <p>Thank you for choosing Taylor's Collision!</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}

export async function sendSMSConfirmation(appointment: AppointmentDetails) {
  if (!twilioClient) {
    console.error('Twilio client not configured');
    return;
  }

  const appointmentDate = new Date(appointment.startTime).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const message = `Hi ${appointment.customerName}, your appointment at Taylor's Collision is confirmed for ${appointmentDate}. Service: ${appointment.serviceType}. Need to make changes? Call (770) 495-0050.`;

  try {
    await twilioClient.messages.create({
      body: message,
      to: appointment.customerPhone.replace(/\D/g, ''), // Remove non-digits
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    console.log('Confirmation SMS sent successfully');
  } catch (error) {
    console.error('Error sending confirmation SMS:', error);
    throw error;
  }
} 