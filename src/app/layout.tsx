import './main.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Outfit } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Taylor's Collision - Premier Auto Body Shop in Duluth, GA",
  description: 'Expert collision repair and auto body services in Duluth, Georgia. Quality work, fair prices, and exceptional customer service.',
  keywords: 'auto body shop, collision repair, car repair, Duluth, Georgia, Taylor\'s Collision',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
    ],
    shortcut: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${montserrat.variable} ${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased bg-white font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
