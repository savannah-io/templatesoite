'use client';

import { ThemeProvider } from './ThemeProvider';
import { useEffect } from 'react';

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set a data attribute on the body to disable custom cursors
  useEffect(() => {
    document.body.setAttribute('data-config-page', 'true');
    
    return () => {
      document.body.removeAttribute('data-config-page');
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div suppressHydrationWarning>
        {children}
      </div>
    </ThemeProvider>
  );
} 