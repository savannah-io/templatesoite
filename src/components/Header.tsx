'use client'

import Link from 'next/link'
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActivePath = (path: string) => {
    if (path === 'Home') return pathname === '/'
    return pathname === `/${path.toLowerCase()}`
  }

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div 
        className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white transition-all duration-300 ease-out backdrop-blur-sm"
        style={{ 
          height: isScrolled ? '0' : '44px',
          opacity: isScrolled ? '0' : '1',
          overflow: 'hidden'
        }}
      >
        <div className="container mx-auto px-4 h-11">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-8 text-sm">
              <motion.a 
                href="tel:+17704950050" 
                className="flex items-center gap-2 hover:text-white/90 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium tracking-wide">(770) 495-0050</span>
              </motion.a>
              <motion.a 
                href="https://goo.gl/maps/your-maps-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white/90 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                  <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0" />
                </span>
                <span className="font-medium tracking-wide">2785 Buford Hwy Ste 101-C, Duluth, GA 30096</span>
              </motion.a>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <div className="bg-white/10 px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium tracking-wide">
                  Mon-Fri: 8:30 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div 
        className="w-full transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
        }}
      >
        <div className="container mx-auto px-4">
          <nav className="h-14 flex items-center justify-between py-3">
            <Link href="/" className="relative group">
              <span className="text-3xl font-montserrat font-bold bg-gradient-to-r from-sky-500 to-primary-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-sky-400 group-hover:to-primary-600">
                Taylor&apos;s Collision
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              {['Home', 'Services', 'Reviews', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative group text-gray-700 transition-colors duration-300"
                >
                  <span className={`relative font-medium tracking-wide inline-block py-2.5 text-base ${isActivePath(item) ? 'text-blue-500' : 'group-hover:text-primary-600'}`}>
                    {item}
                    <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform origin-left ${isActivePath(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-300 ease-out`}></span>
                    <span className={`absolute left-0 -bottom-px w-full h-[2px] bg-blue-500/20 transform origin-left ${isActivePath(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-300 ease-out delay-75`}></span>
                  </span>
                </Link>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center justify-center bg-primary-600 text-white h-11 px-6 rounded-md font-medium shadow-lg hover:bg-primary-700 transition-all duration-300 hover:shadow-xl whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  // If we're already on the home page, just scroll to the section
                  if (window.location.pathname === '/') {
                    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // If we're on a different page, navigate to home page with schedule section
                    window.location.href = '/#schedule';
                  }
                }}
              >
                Schedule Now
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 