'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { StarIcon, ClockIcon, ArrowRightIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import ServiceReel from '../components/ServiceReel'
import Image from 'next/image'
import MouseFollowGradient from '../components/MouseFollowGradient'
import Script from 'next/script'

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <MouseFollowGradient variant="dark" opacity={0.8} />
        {/* Main overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/50 via-primary-700/25 to-primary-800/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/30 to-transparent pointer-events-none"></div>
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" 
            style={{ 
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 8%),
                radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 6%),
                radial-gradient(circle at 40% 70%, rgba(56, 189, 248, 0.15) 0%, transparent 12%),
                radial-gradient(circle at 70% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 10%),
                linear-gradient(to bottom right, transparent 0%, transparent 100%)
              `,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <motion.div 
            className="hero-content max-w-3xl md:py-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 inline-block"
            >
              <span className="bg-primary-600/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase shadow-lg backdrop-blur-sm">
                Collision Auto Body Shop
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] text-white drop-shadow-xl">
              Expert Auto Body Repair in{' '}
              <span className="text-primary-400 drop-shadow-xl">
                Duluth, Georgia
              </span>
            </h1>
            <p className="text-xl mb-12 text-gray-100 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
              Quality collision repair with exceptional customer service.
              <span className="hidden sm:inline"> Get your car back to pre-accident condition with our skilled technicians.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-primary-700 shadow-xl hover:shadow-2xl relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                <span className="absolute inset-0 ring-2 ring-white/20 rounded-lg group-hover:ring-white/40 transition-all duration-300"></span>
                Schedule Estimate
              </motion.a>
              <motion.a 
                href="/contact" 
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                <span className="absolute inset-0 ring-2 ring-white/20 group-hover:ring-white/40 rounded-lg transition-all duration-300"></span>
                <span className="relative">Contact Us</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
            <motion.div 
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: <ShieldCheckIcon className="w-6 h-6" />, text: "Free Estimates" },
                { icon: <SparklesIcon className="w-6 h-6" />, text: "Expert Technicians" },
                { icon: <ClockIcon className="w-6 h-6" />, text: "Quick Turnaround" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 text-white bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
                  <div className="bg-primary-500/30 p-3 rounded-xl shadow-lg">
                    {item.icon}
                  </div>
                  <span className="font-medium tracking-wide drop-shadow-lg">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="schedule" className="py-16 relative overflow-hidden bg-gray-50">
        <MouseFollowGradient variant="light" opacity={0.6} />
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wider text-primary-700 uppercase bg-primary-50/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100/50"
            >
              BOOK YOUR SERVICE
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Schedule Your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Auto Estimate
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary-100/80 -rotate-1"></span>
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            >
              Book your appointment with our expert technicians. We&apos;ll get your vehicle back to its best condition.
            </motion.p>
          </div>

          {/* Calendly Widget */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div 
              id="calendly-inline-widget" 
              className="w-full rounded-2xl overflow-hidden"
              style={{
                width: '100%',
                height: '700px',
                border: 'none'
              }}
            ></div>
          </div>
        </div>

        {/* Calendly Widget Script */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (typeof window !== 'undefined' && window.Calendly) {
              window.Calendly.initInlineWidget({
                url: 'https://calendly.com/taylorscollision/collision_estimate',
                parentElement: document.getElementById('calendly-inline-widget'),
                prefill: {},
                utm: {},
                branding: false
              });
            }
          }}
        />
      </section>

      {/* Trusted Brands Section */}
      <section className="pt-8 pb-20 bg-gradient-to-b from-white to-sky-50/30 relative overflow-hidden">
        <MouseFollowGradient variant="light" opacity={0.5} />
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
        <MouseFollowGradient variant="light" opacity={0.7} />
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

      {/* Reviews Preview Section */}
      <section className="py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 relative overflow-hidden">
        <MouseFollowGradient variant="dark" opacity={0.7} size={800} />
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
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Reviews from </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100">our community</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-blue-50 leading-relaxed mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              We&apos;re committed to excellence
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                text: "Max and the team did an incredible job on my 2020 Mazda CX-30. I'm extremely happy with the results and would recommend them to everyone!",
                author: "Jarrett B.",
                rating: 5
              },
              {
                text: "The owner Max was AMAZING!! His work is top notch! I think my vehicle actually looks better than it did before I had the accident!",
                author: "Jordan P.",
                rating: 5
              },
              {
                text: "Had a door out of alignment and Max fixed it in just a few minutes. No appointment. Just rolled in off the street. Great place.",
                author: "Rob G.",
                rating: 5
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white">{review.author}</p>
                    <p className="text-sm text-blue-200">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
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

      <Footer />
    </main>
  )
}
