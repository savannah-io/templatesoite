'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { StarIcon, ClockIcon, ArrowRightIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import ServiceReel from '../components/ServiceReel'
import Image from 'next/image'
import Script from 'next/script'
import { useConfig } from '../context/ConfigContext'
import React, { useState, useEffect } from 'react'
import { disableReloadWarning } from '../utils/preventReloadWarning'
import Modal from '../components/Modal'

// Add Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
        branding?: boolean;
      }) => void;
    };
  }
}

// Add a helper to convert hex to rgba with alpha
function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export default function Home() {
  // Get the config object from context
  const config = useConfig();
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);
  // State for instructions modal
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Instructions content
  const instructionsContent = [
    { title: "Tree Removal Services", content: "We provide professional tree removal services for residential and commercial properties." },
    { title: "Expert Arborists", content: "Our team of certified arborists ensures safe and efficient tree removal." },
    { title: "Free Estimates", content: "Contact us today to schedule a free estimate for your tree removal needs." },
    { title: "Emergency Services", content: "We offer 24/7 emergency tree removal services for storm damage and hazardous trees." },
    { title: "Fully Insured", content: "All our services are fully insured for your peace of mind." }
  ];
  
  // Debug log to see what config is loaded
  console.log('Config in Home:', config);
  // Home page content from config
  const home = config?.pages?.Home || {};
  // Reviews page content from config
  const reviewsConfig = config?.pages?.Reviews || {};
  // Scheduling button text from config
  const schedulingButtonText = config?.schedulingButtonText;
  // Reviews array from config
  const reviews = reviewsConfig.reviews || [];
  // Hero gradient color from Home page config
  const heroGradientColor = config?.pages?.Home?.heroGradientColor || '#0a2540';
  const infoBar = config?.infoBar || {};

  return (
    <main className="min-h-screen" suppressHydrationWarning>
      {/* Header (no config prop) */}
      <Header />
      
      {/* Instructions Modal */}
      <Modal 
        isOpen={showInstructions} 
        onClose={() => setShowInstructions(false)}
        title="Services Information"
      >
        <div className="space-y-6">
          {instructionsContent.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </Modal>
      
      {/* Hero Section - all content from config */}
      <section
        className="hero-section relative overflow-hidden"
        style={
          home.heroImage
            ? { backgroundImage: `url(/images/${home.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        {/* Top dark blue gradient overlay for navbar transition */}
        <div className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none" style={{background: `linear-gradient(to bottom, ${heroGradientColor}d9 0%, ${heroGradientColor}00 100%)`}}></div>
        {/* Main overlay gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${home.heroGradientTop || '#2563eb'}80 0%, ${home.heroGradientMiddle || '#1d4ed8'}40 50%, ${home.heroGradientBottom || '#1e293b'}66 100%)`
          }}
        ></div>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${(home.heroGradientLeft || '#1e293b')}4d 0%, transparent 100%)`
          }}
        ></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, ${hexToRgba(home.heroRadialColor || '#38bdf8', 0.15)} 0%, transparent 8%),
                radial-gradient(circle at 80% 20%, ${hexToRgba(home.heroRadialColor || '#38bdf8', 0.15)} 0%, transparent 6%),
                radial-gradient(circle at 40% 70%, ${hexToRgba(home.heroRadialColor || '#38bdf8', 0.15)} 0%, transparent 12%),
                radial-gradient(circle at 70% 50%, ${hexToRgba(home.heroRadialColor || '#38bdf8', 0.15)} 0%, transparent 10%),
                linear-gradient(to bottom right, transparent 0%, transparent 100%)
              `,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <motion.div 
            className="hero-content max-w-3xl md:py-12 w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge from config */}
            {home.badge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 sm:mb-8 inline-block"
              >
                <span
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg backdrop-blur-sm"
                  style={{ background: home.heroBadgeColor || '#1787c9', color: home.heroBadgeTitleColor || '#fff' }}
                >
                  {home.badge}
                </span>
              </motion.div>
            )}
            {/* Title and location from config */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold mb-4 sm:mb-8 leading-[1.1] drop-shadow-xl text-left">
              <div className="flex items-center">
              <span style={{ color: home.heroTitleColor || '#fff' }}>{home.title}</span>
                <div 
                  onClick={() => setShowInstructions(true)}
                  className="relative ml-3 cursor-pointer group"
                >
                  <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75 duration-1000" style={{ animationIterationCount: 'infinite', animationDuration: '2s' }}></div>
                </div>
              </div>
              {home.location && (
                <span
                  className="drop-shadow-xl font-extrabold block sm:inline"
                  style={{ color: home.heroLocationColor || '#38bdf8' }}
                >
                  {home.location}
                </span>
              )}
            </h1>
            {/* Main content and subtitle from config */}
            <div className="text-base sm:text-xl mb-6 sm:mb-12 max-w-2xl leading-relaxed drop-shadow-lg font-medium text-left"
                 style={{ color: home.heroContentColor || '#fff' }}>
              {home.content && (
                <div>
                  {home.content.replace(/<[^>]+>/g, '')}
                </div>
              )}
              {home.subtitle2 && (
                <span className="block sm:inline" style={{ color: home.heroSubtitleColor || '#fff' }}> {home.subtitle2}</span>
              )}
            </div>
            {/* Scheduling and Contact buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full items-start justify-start mb-8">
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-20 py-3 sm:py-4 min-w-[140px] sm:min-w-[320px] rounded-lg font-semibold text-base sm:text-2xl transition-all duration-300 shadow-xl hover:shadow-2xl relative group overflow-hidden text-left"
                style={{
                  background: home.heroScheduleButtonColor || '#2563eb',
                  color: home.heroScheduleButtonTextColor || '#fff',
                  border: 'none',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {schedulingButtonText}
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-20 py-3 sm:py-4 min-w-[140px] sm:min-w-[320px] rounded-lg font-semibold text-base sm:text-2xl transition-all duration-300 shadow-xl hover:shadow-2xl relative group overflow-hidden text-left"
                style={{
                  background: home.heroContactButtonColor || '#fff',
                  color: home.heroContactButtonTextColor || '#1787c9',
                  border: `2px solid ${home.heroContactButtonBorderColor || '#fff'}`,
                  transition: 'all 0.3s',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = home.heroContactButtonHoverBgColor || '#f3f3f3';
                  e.currentTarget.style.color = home.heroContactButtonHoverTextColor || '#1787c9';
                  e.currentTarget.style.border = `2px solid ${home.heroContactButtonHoverBorderColor || '#1787c9'}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = home.heroContactButtonColor || '#fff';
                  e.currentTarget.style.color = home.heroContactButtonTextColor || '#1787c9';
                  e.currentTarget.style.border = `2px solid ${home.heroContactButtonBorderColor || '#fff'}`;
                }}
              >
                <span className="mr-2">Contact Us</span>
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
            {/* Hero boxes - single column on mobile, fixed width and aligned on desktop */}
            <div className="flex flex-col sm:flex-row sm:justify-start gap-4 sm:gap-6 w-full items-center">
                {[
                  { icon: <ShieldCheckIcon className="w-7 h-7" />, text: "Free Estimates" },
                  { icon: <SparklesIcon className="w-7 h-7" />, text: "Expert Technicians" },
                  { icon: <ClockIcon className="w-7 h-7" />, text: "Quick Turnaround" }
              ].map((item, index) => {
                const boxNum = index + 1;
                const boxBg = home[`heroBox${boxNum}BgColor`] || '#25647a';
                const textColor = home[`heroBox${boxNum}TextColor`] || '#fff';
                const borderColor = home[`heroBox${boxNum}BorderColor`] || '#25647a';
                const iconBg = home[`heroBox${boxNum}IconBgColor`] || 'rgba(255,255,255,0.1)';
                const iconColor = home[`heroBox${boxNum}IconColor`] || '#fff';
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 w-full sm:w-auto flex-1 mb-4 sm:mb-0"
                    style={{
                      background: boxBg,
                      borderColor: borderColor,
                    }}
                  >
                    <div
                      className="p-2 rounded-xl flex items-center justify-center"
                      style={{ background: iconBg }}
                    >
                      {React.cloneElement(item.icon, { style: { color: iconColor } })}
                    </div>
                    <span
                      className="font-bold text-base sm:text-lg tracking-wide whitespace-nowrap"
                      style={{ color: textColor }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-gradient-to-b from-[var(--schedule-gradient-top)] to-[var(--schedule-gradient-bottom)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-0 md:p-0">
            {/* Left: Info */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-start">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mr-6 shadow-lg">
                  {/* Blue icon, can be replaced with your logo if desired */}
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 7v6m0 0l-2-2m2 2l2-2" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-1">BOOK YOUR SERVICE</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1 text-left">
                    Schedule Your <span className="text-blue-600">Auto Estimate</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2 text-base">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.5 11 9 11s9-5.75 9-11c0-4.97-4.03-9-9-9zm0 13.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" fill="#2563eb"/></svg>
                <span className="font-bold">2785 Buford Hwy STE 101, Duluth, GA 30096</span>
              </div>
              <div className="text-gray-500 text-base leading-relaxed mt-2 text-left">
                Book your appointment with our expert technicians. We'll get your vehicle back to its best condition.
              </div>
          </div>
            {/* Right: Custom Calendar CTA */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
              <div className="relative w-full flex items-center justify-center" style={{ minHeight: '520px', minWidth: '420px', height: '520px', maxWidth: '520px' }}>
                {/* Animated Ripple Gradient Background */}
                <div
                  className="absolute inset-0 rounded-2xl calendar-ripple-bg"
              style={{
                    background: `linear-gradient(120deg, ${
                      isClient && config?.pages?.Home?.scheduleSection?.calendarRippleStartColor || '#4f46e5'
                    } 0%, ${
                      isClient && config?.pages?.Home?.scheduleSection?.calendarRippleEndColor || '#818cf8'
                    } 100%)`,
                    opacity: isClient && config?.pages?.Home?.scheduleSection?.calendarRippleOpacity || 0.15,
                    zIndex: 0,
              }}
            ></div>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="calendar-shimmer-bg w-full h-full rounded-2xl"></div>
                </div>
                {/* Calendar SVG Illustration */}
                <div className="w-full h-full flex items-center justify-center relative z-20">
                  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="60" width="260" height="220" rx="32" fill={
                      isClient && config?.pages?.Home?.scheduleSection?.calendarBgColor || "#f9fafb"
                    } stroke={
                      isClient && config?.pages?.Home?.scheduleSection?.calendarBorderColor || "#4f46e5"
                    } strokeWidth="6"/>
                    <rect x="30" y="60" width="260" height="44" rx="16" fill={
                      isClient && config?.pages?.Home?.scheduleSection?.calendarAccentColor || "#4f46e5"
                    }/>
                  </svg>
                </div>
                {/* Tap to Book Button Overlay */}
                <button
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-2xl group focus:outline-none overflow-hidden"
                  style={{ 
                    cursor: 'pointer', 
                    zIndex: 20 
                  }}
                  onClick={() => {
                    if (isClient && config?.pages?.Home?.scheduleSection?.calendlyUrl) {
                      window.open(config.pages.Home.scheduleSection.calendlyUrl, '_blank');
                    }
                  }}
                  aria-label="Book Now"
                >
                  <span 
                    className="relative z-10 text-white text-2xl font-bold mb-4 drop-shadow-lg pulse-cta" 
                    style={{ 
                      color: isClient && config?.pages?.Home?.scheduleSection?.tapToBookTextColor || "#ffffff"
                    }}
                  >
                    {isClient && config?.pages?.Home?.scheduleSection?.tapToBookText || "Tap to Book"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="pt-8 pb-20 bg-gradient-to-b from-white to-sky-50/30 relative overflow-hidden">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-primary-200/30 rounded-full blur-[128px] mix-blend-multiply"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-sky-200/30 rounded-full blur-[128px] mix-blend-multiply"></div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)`,
            opacity: 0.8
          }}></div>
        </div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wider text-primary-700 uppercase bg-primary-50/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100/50"
            >
              Our Guarantee
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-5 items-center justify-items-center gap-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Lifetime Warranty Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-primary-400/20 to-sky-400/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src="/icons/access.png"
                    alt="Lifetime Warranty"
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600">On All Services</p>
              </motion.div>
            </motion.div>

            {/* Free Estimates */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-sky-400/20 to-primary-400/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src="/icons/free.png"
                    alt="Free Estimates"
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Estimates</h3>
                <p className="text-gray-600">Quick & Accurate</p>
              </motion.div>
            </motion.div>

            {/* PPG Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-primary-400/20 to-sky-400/20 rounded-2xl blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-56 h-auto relative bg-gradient-to-br from-white via-sky-50/50 to-white rounded-2xl p-8 backdrop-blur-sm border border-sky-100/50 shadow-lg transform group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/images/PPG.png"
                  alt="PPG Paint Company"
                  width={200}
                  height={200}
                  className="object-contain relative transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Insurance Companies Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-primary-400/20 to-sky-400/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src="/icons/calculator.png"
                    alt="Insurance Approved"
                    width={48}
                    height={48}
                    className="w-12 h-12 transform group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Insurance Approved</h3>
                <p className="text-gray-600">All Major & Minor Companies</p>
              </motion.div>
            </motion.div>

            {/* Towing Service */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-sky-400/20 to-primary-400/20 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image
                    src="/icons/shipping.png"
                    alt="Towing Service"
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Towing Service</h3>
                <p className="text-gray-600">24/7 Available</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-2 relative overflow-hidden bg-white">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative pt-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 mb-2 text-sm font-semibold tracking-wider text-primary-700 uppercase bg-primary-50 rounded-full shadow-sm">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Expert Auto Body{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Repair Services
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2.5 bg-primary-100/50 -rotate-1"></span>
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="py-8">
          <div className="container mx-auto px-4 mb-6">
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We specialize in comprehensive auto body repair services, from collision repair and dent removal to expert paint matching and structural repairs.
            </motion.p>
          </div>

          <ServiceReel />
          
          <div className="text-center mt-6">
            <motion.a 
              href="/services" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative">Explore Our Services</span>
              <ArrowRightIcon className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Reviews Preview Section - all content from config */}
      <section className="py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Image 
                  src="/google.svg" 
                  alt="Google" 
                  width={20} 
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-white">Verified Google Reviews</span>
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/* Section title, highlight, and subtitle from config */}
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-white">{reviewsConfig?.title || "What Our Customers "}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100">{reviewsConfig?.highlight || "Are Saying"}</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-blue-50 leading-relaxed mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {reviewsConfig?.subtitle || "See what our satisfied customers have to say about our service."}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {(isClient ? reviews : []).slice(0, 3).map((review: { text: string; author: string; rating: number }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review?.rating || 5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">"{review?.text || "Great service!"}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium">
                    {(review?.author || "Customer")[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white">{review?.author || "Customer"}</p>
                    <p className="text-sm text-blue-200">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Show placeholder reviews if not loaded yet */}
            {!isClient && (
              <>
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-6 leading-relaxed">"Great service and professional work!"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium">
                        C
                      </div>
                      <div>
                        <p className="font-medium text-white">Customer</p>
                        <p className="text-sm text-blue-200">Verified Customer</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>

          <div className="text-center">
            <motion.a
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              View All Reviews
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer (no config prop) */}
      <Footer />
    </main>
  )
}

/* Add shimmer animation to globals.css if not present */
// .shimmer-bg {
//   background: linear-gradient(120deg, rgba(156,163,175,0.7) 0%, rgba(209,213,219,0.3) 40%, rgba(156,163,175,0.7) 100%);
//   background-size: 200% 100%;
//   animation: shimmer 2s infinite linear;
// }
// @keyframes shimmer {
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// }
