// app/layout.tsx
import './main.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Montserrat } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Outfit } from 'next/font/google';
import './globals.css';
import { ConfigProvider } from '@/context/ConfigContext';
import localConfig from '@/config/localConfig';
import fs from 'fs';
import path from 'path';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Taylor's Collision - Premier Auto Body Shop in Duluth, GA",
  description: 'Expert collision repair and auto body services in Duluth, Georgia. Quality work, fair prices, and exceptional customer service.',
  keywords: 'auto body shop, collision repair, car repair, Duluth, Georgia, Taylor\'s Collision',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
};

// Use direct file access to get the latest configuration
async function getLatestConfig() {
  try {
    // First try to read from the public JSON file (most up-to-date source)
    const publicJsonPath = path.join(process.cwd(), 'public', 'current-config.json');
    
    if (fs.existsSync(publicJsonPath)) {
      const jsonContent = await fs.promises.readFile(publicJsonPath, 'utf-8');
      return JSON.parse(jsonContent);
    }
  } catch (error) {
    console.error('Error reading JSON config:', error);
  }
  
  // Fallback to the imported version
  return localConfig;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode; // Corrected type for children
}) {
  // Get the latest configuration
  const config = await getLatestConfig();
  
  // Extract theme color if available
  const themeColor = config.themeColor || '#a259e6'; // Default to purple
  const themeColorLight = `${themeColor}22`; // 13% opacity for backgrounds

  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${montserrat.variable} ${inter.variable} ${outfit.variable} scroll-smooth`}
      style={{
        // Set theme color variables at the root level
        ['--theme-color' as any]: themeColor,
        ['--theme-color-light' as any]: themeColorLight,
      }}
    >
      <body className="antialiased bg-white font-sans" suppressHydrationWarning>
        <ConfigProvider config={config}>
          {children}
        </ConfigProvider>
        
        {/* Script to check for preview config in sessionStorage */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              const previewConfig = sessionStorage.getItem('previewConfig');
              if (previewConfig && window.self !== window.top) { // Only apply in iframe
                // Replace the config in ConfigContext with the preview config
                window.__PREVIEW_CONFIG__ = JSON.parse(previewConfig);
                
                // Force components to re-render with new config
                document.addEventListener('DOMContentLoaded', () => {
                  const event = new CustomEvent('preview-config-loaded');
                  document.dispatchEvent(event);
                });
              }
            }
          } catch (e) {
            console.error('Error applying preview config:', e);
          }
        `}} />
        
        {/* Add script to handle CSS variables and theme colors */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (typeof window !== 'undefined') {
              // Apply the theme color from config to CSS variables
              const themeColor = ${JSON.stringify(themeColor)};
              const themeColorLight = ${JSON.stringify(themeColorLight)};
              
              document.documentElement.style.setProperty('--theme-color', themeColor);
              document.documentElement.style.setProperty('--theme-color-light', themeColorLight);
              
              // Try to load config from JSON first
              fetch('/current-config.json?t=' + new Date().getTime())
                .then(response => {
                  if (response.ok) return response.json();
                  throw new Error('Could not load config');
                })
                .then(config => {
                  // Store it in a global to be accessed
                  window.__CURRENT_CONFIG__ = config;
                  
                  // Apply theme color from loaded config
                  if (config.themeColor) {
                    document.documentElement.style.setProperty('--theme-color', config.themeColor);
                    document.documentElement.style.setProperty('--theme-color-light', config.themeColor + '22');
                  }
                  
                  // Force an update on load
                  document.dispatchEvent(new CustomEvent('config-loaded'));
                })
                .catch(err => {
                  console.error('Error fetching config:', err);
                });
                
              // Listen for config-published event and reload the page
              document.addEventListener('config-published', () => {
                console.log('Configuration was published, refreshing page...');
                // Add a delay to ensure file is written
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              });
            }
          } catch (e) {
            console.error('Error setting up config refresh:', e);
          }
        `}} />
      </body>
    </html>
  );
}