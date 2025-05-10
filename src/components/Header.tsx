'use client'

import Link from 'next/link'
import { PhoneIcon, MapPinIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll() // Check initial scroll position
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActivePath = (path: string) => {
    if (path === 'Home') return pathname === '/'
    return pathname === `/${path.toLowerCase()}`
  }

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div 
        className="hidden md:block bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white transition-all duration-300 ease-out backdrop-blur-sm"
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
        className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur' : 'bg-transparent md:bg-white'} ${isScrolled ? 'shadow-md' : ''}`}
        style={{
          background: !isScrolled && isMobileMenuOpen ? 'linear-gradient(to right, rgba(14, 165, 233, 0.95), rgba(2, 132, 199, 0.95))' : undefined
        }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-14">
            <Link href="/" className="relative group">
              <span className="text-gradient font-bold text-2xl md:text-3xl font-rubik block leading-tight select-none">
                Taylor's Collision
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full hidden md:block"></span>
            </Link>
            <div className="flex-1 flex justify-center">
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
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 rounded-lg transition-all duration-300 group bg-gradient-to-r from-sky-500/10 to-primary-600/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 text-primary-600 relative z-10 transition-transform duration-300 transform group-hover:scale-110" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-primary-600 relative z-10 transition-transform duration-300 transform group-hover:scale-110" />
              )}
            </button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block ml-4"
            >
              <Link 
                href="/" 
                className="inline-flex items-center justify-center bg-primary-600 text-white h-11 px-6 rounded-md font-medium shadow-lg hover:bg-primary-700 transition-all duration-300 hover:shadow-xl whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === '/') {
                    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-2 border-b border-gray-200">
                  <Link href="/">
                    <span className="text-gradient font-bold text-2xl md:text-3xl font-rubik block leading-tight select-none">
                      Taylor's Collision
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 p-4">
                  <div className="flex flex-col space-y-4">
                    {['Home', 'Services', 'Reviews', 'Contact'].map((item) => (
                      <Link
                        key={item}
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                          isActivePath(item)
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="text-center space-y-3">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <a href="tel:+17704950050" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4" />
                        <span>(770) 495-0050</span>
                      </a>
                      <div className="text-sm text-gray-500">
                        Mon-Fri: 8:30 AM - 6:00 PM
                      </div>
                    </div>
                    <Link 
                      href="/" 
                      className="w-full inline-flex items-center justify-center bg-primary-600 text-white h-11 px-6 rounded-md font-medium shadow-lg hover:bg-primary-700 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        if (window.location.pathname === '/') {
                          document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = '/#schedule';
                        }
                      }}
                    >
                      Schedule Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header 