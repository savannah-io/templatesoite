'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { usePrivacyPolicy, useTermsOfService } from './PolicyModals'
import Image from 'next/image'

// Add social icons imports
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterXIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

interface ShimmerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ShimmerLink = ({ href, children, className = "" }: ShimmerLinkProps) => (
  <Link 
    href={href}
    className={`group relative inline-block ${className}`}
  >
    <span className="relative z-10 text-gray-600 transition-all duration-300 group-hover:text-primary-500 group-hover:translate-x-1 text-base">
      {children}
    </span>
    <div className="absolute inset-0 -z-10 translate-y-[80%] group-hover:translate-y-[20%] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent bg-[length:200%_100%] group-hover:animate-[shimmer_2s_infinite]" />
  </Link>
)

export default function Footer() {
  const { openPrivacyPolicy, PrivacyPolicyModal } = usePrivacyPolicy()
  const { openTermsOfService, TermsOfServiceModal } = useTermsOfService()

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center"
            >
              <Image
                src="/images/TC-TITLE.png"
                alt="Taylor's Collision Logo"
                width={250}
                height={60}
                priority
                className="h-auto w-[210px] md:w-[250px] object-contain"
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-6 leading-relaxed text-[15px]"
            >
              A trusted Duluth auto body shop dedicated to excellence in collision repair and customer service.
            </motion.p>

            {/* Social Media Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex space-x-6"
            >
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 transform transition-transform duration-200 hover:scale-110"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 transform transition-transform duration-200 hover:scale-110"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 transform transition-transform duration-200 hover:scale-110"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 transform transition-transform duration-200 hover:scale-110"
              >
                <TwitterXIcon />
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:ml-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-primary-600 mb-5 relative inline-block"
            >
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50 rounded-full"></span>
            </motion.h3>
            <ul className="space-y-3">
              {[
                ['Schedule Now', '/#schedule'],
                ['Services', '/services'],
                ['About Us', '/about'],
                ['Contact', '/contact']
              ].map(([item, path], index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="transform hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <ShimmerLink href={path}>
                    {item}
                  </ShimmerLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-primary-600 mb-5 relative inline-block"
            >
              Contact Info
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50 rounded-full"></span>
            </motion.h3>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300">
                  <MapPinIcon className="w-5 h-5 text-primary-600 transform transition-transform duration-200 group-hover:scale-110" />
                  <div>
                    <p className="text-gray-600 group-hover:text-primary-500 transition-colors duration-200 text-[15px]">2785 Buford Hwy Ste 101-C</p>
                    <p className="text-gray-600 group-hover:text-primary-500 transition-colors duration-200 text-[15px]">Duluth, GA 30096</p>
                  </div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <a 
                  href="tel:(770) 495-0050"
                  className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
                >
                  <PhoneIcon className="w-5 h-5 text-primary-600 transform transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-gray-600 group-hover:text-primary-500 transition-colors duration-200 text-[15px]">
                    (770) 495-0050
                  </span>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <a 
                  href="mailto:support@taylorscollision.com"
                  className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5 text-primary-600 transform transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-gray-600 group-hover:text-primary-500 transition-colors duration-200 text-[15px]">
                    support@taylorscollision.com
                  </span>
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="col-span-1">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-primary-600 mb-5 relative inline-block"
            >
              Info
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary-500/50 rounded-full"></span>
            </motion.h3>
            <div className="space-y-3">
              {/* Hours Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-primary-600 transform transition-transform duration-200 group-hover:scale-110 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-[15px]">Monday - Friday</span>
                      <span className="text-primary-600 font-medium text-[15px]">8:30 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                      <span className="text-gray-600 text-[15px]">Saturday - Sunday</span>
                      <span className="text-primary-600 font-medium text-[15px]">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Join Our Team Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Link 
                  href="/careers"
                  className="flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  <span className="font-medium text-[15px]">Join Our Team</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-500/20 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              © {new Date().getFullYear()} Taylor&apos;s Collision. All rights reserved.
            </motion.p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="transform hover:-translate-y-0.5 transition-transform duration-200"
              >
                <button
                  onClick={openPrivacyPolicy}
                  className="text-gray-500 hover:text-primary-500 transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="transform hover:-translate-y-0.5 transition-transform duration-200"
              >
                <button
                  onClick={openTermsOfService}
                  className="text-gray-500 hover:text-primary-500 transition-colors duration-200"
                >
                  Terms of Service
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the modals */}
      <PrivacyPolicyModal />
      <TermsOfServiceModal />
    </footer>
  )
} 