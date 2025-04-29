'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { StarIcon, ClockIcon, ArrowRightIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import ServiceReel from '../components/ServiceReel'
import Image from 'next/image'
import MouseFollowGradient from '../components/MouseFollowGradient'
import BookingForm from '../components/BookingForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section min-h-[90vh] flex items-center relative pt-24 pb-28 bg-[url('/images/back3.png')] bg-cover bg-center">
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

        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="hero-content max-w-3xl"
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
                Premier Auto Body Shop
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] text-white drop-shadow-xl">
              Expert Auto Body Repair in{' '}
              <span className="text-primary-400 drop-shadow-xl">
                Duluth, Georgia
              </span>
            </h1>
            <p className="text-xl mb-12 text-gray-100 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
              Quality collision repair with exceptional customer service. Get your car back to pre-accident condition with our skilled technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="/schedule-now"
                className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-primary-700 shadow-xl hover:shadow-2xl relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 opacity-0 group-hover:opacity-100 animate-shimmer"></span>
                <span className="absolute inset-0 ring-2 ring-white/20 rounded-lg group-hover:ring-white/40 transition-all duration-300"></span>
                Schedule Service
              </motion.a>
              <motion.a 
                href="/contact" 
                className="inline-flex items-center justify-center btn btn-outline group border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
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
      <section className="min-h-screen py-24 relative overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{ 
              backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.1) 0%, transparent 25%),
                radial-gradient(circle at 100% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 20%),
                radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.1) 0%, transparent 25%),
                radial-gradient(circle at 0% 100%, rgba(56, 189, 248, 0.08) 0%, transparent 20%),
                repeating-linear-gradient(45deg, rgba(56, 189, 248, 0.02) 0%, rgba(56, 189, 248, 0.02) 1%, transparent 1%, transparent 4%)
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%, 20px 20px',
              backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat, repeat'
            }}>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/10 rounded-full blur-3xl"></div>
        </div>

        <MouseFollowGradient variant="light" opacity={0.6} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wider text-primary-700 uppercase bg-primary-50/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100/50"
            >
              Book Your Service
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-5"
            >
              Schedule Your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Auto Service
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

          <div className="relative">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-2xl"></div>
            <div className="relative z-10">
              <BookingForm />
            </div>
          </div>
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

      {/* Remove Features Section and ServiceReel */}
      <Footer />
    </main>
  )
}
