'use client';

import { useEffect } from 'react';
import { config } from '@/config';

export default function GoogleAuthPage() {
  useEffect(() => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.googleClientId}&redirect_uri=${encodeURIComponent(config.googleRedirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;
    
    window.location.href = authUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connecting to Google Calendar</h1>
        <p>Please wait while we redirect you to Google...</p>
      </div>
    </div>
  );
} 