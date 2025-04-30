'use client'

import React, { useEffect, useState } from 'react'
import ReviewCard from '../../components/ReviewCard'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Database } from '../../lib/database.types'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

type Review = Database['public']['Tables']['reviews']['Row']

interface ReviewsResponse {
  reviews: Review[]
  rating: number
  total_reviews: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalReviews, setTotalReviews] = useState(0)
  const pageSize = 6

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        const response = await fetch(`/api/reviews?page=${page}&pageSize=${pageSize}`)
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const data: ReviewsResponse = await response.json()
        setReviews(data.reviews)
        setTotalReviews(data.total_reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [page])

  const totalPages = Math.ceil(totalReviews / pageSize)

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blurred circles */}
          <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-primary-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute w-[400px] h-[400px] -bottom-48 -right-48 bg-primary-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          </div>
          
          {/* Subtle light beams */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-gradient-to-b from-primary-400/30 to-transparent rotate-12 transform-gpu"></div>
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-gradient-to-t from-primary-400/30 to-transparent -rotate-12 transform-gpu"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-white">
             Community  Reviews
            </h1>
            <p className="text-lg md:text-xl text-blue-50 leading-relaxed mx-auto">
              We&apos;re proud of the work we do and the trust our customers place in us. Here&apos;s what they have to say about their experience with our services.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative px-8 py-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-7 h-7 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 1 0-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 font-display">{totalReviews}</div>
                  <div className="text-sm text-blue-100 font-medium">Verified Reviews</div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative px-8 py-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 font-display">5.0</div>
                  <div className="text-sm text-blue-100 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mb-16 gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-primary-600 text-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded bg-primary-600 text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Share Your Experience Section */}
              <div className="max-w-xl mx-auto">
                <div className="relative p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                  {/* Decorative elements */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary-500/50 to-transparent"></div>
                  <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary-500/50 to-transparent"></div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
                  <p className="text-gray-600 mb-4 text-base max-w-sm mx-auto">
                    Help others by sharing your experience with Taylor&apos;s Collision
                  </p>
                  <a
                    href="https://g.co/kgs/iPWL4BL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md group"
                  >
                    <Image 
                      src="/google.svg" 
                      alt="Google" 
                      width={20} 
                      height={20}
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="font-medium">Write a Review on Google</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20">
        {/* Diagonal stripes background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 40px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-[2px] rounded-xl py-8 px-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                  Ready to Get Your Car Back to Perfect?
                </h2>
                <p className="text-xl text-blue-50 mb-6">
                  Schedule your appointment today and experience the difference expert auto body repair makes.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/#schedule';
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Schedule Now
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </a>
                  <a
                    href="tel:+17704950050"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Call Us Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite ease-in-out;
        }
      `}</style>
    </main>
  )
} 