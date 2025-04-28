import './main.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'

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

export const metadata: Metadata = {
  title: "Taylor's Collision - Premier Auto Body Shop in Duluth, GA",
  description: 'Expert collision repair and auto body services in Duluth, Georgia. Quality work, fair prices, and exceptional customer service.',
  keywords: 'auto body shop, collision repair, car repair, Duluth, Georgia, Taylor\'s Collision',
  icons: {
    icon: [
      {
        url: '/favi.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${montserrat.variable}`}>
      <body className="antialiased bg-white font-sans" suppressHydrationWarning>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
