# Setting Up Calendly Integration

## 1. Create a Calendly Account
1. Go to [Calendly](https://calendly.com) and create an account if you don't have one
2. Set up your availability and create an event type for auto service appointments

## 2. Get Your Calendly API Credentials
1. Go to your [Calendly Integration Settings](https://calendly.com/integrations)
2. Generate a Personal Access Token
3. Note down your Organization URI and Event Type URI from the Calendly API documentation

## 3. Update Environment Variables
Add the following variables to your `.env` file:

```
CALENDLY_API_KEY=your_calendly_api_key
CALENDLY_ORGANIZATION_URI=your_organization_uri
CALENDLY_EVENT_TYPE_URI=your_event_type_uri
```

You can remove these old Google Calendar variables as they are no longer needed:
- GOOGLE_SERVICE_ACCOUNT_EMAIL
- GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
- GOOGLE_CALENDAR_ID
- CALENDAR_TIMEZONE
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REFRESH_TOKEN

## 4. Test the Integration
1. Start your development server
2. Try to book an appointment through your website
3. Verify that the appointment appears in your Calendly dashboard
4. Check that you receive email notifications for new bookings

## Troubleshooting
If you encounter any issues:
1. Check that all environment variables are set correctly
2. Verify that your Calendly API key has the necessary permissions
3. Ensure your event type URI is correct and the event type is active
4. Check the server logs for any API errors 