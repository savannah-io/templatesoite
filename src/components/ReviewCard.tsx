'use client'

import React, { useState, useRef } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Database } from '../lib/database.types'
import { motion } from 'framer-motion'

type Review = Database['public']['Tables']['reviews']['Row']

interface ReviewCardProps {
  review: Review
}

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase()
}

const getBackgroundColor = (initial: string) => {
  // Generate a consistent color based on the initial
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ]
  const index = initial.charCodeAt(0) % colors.length
  return colors[index]
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const initial = getInitial(review.author_name)
  const bgColor = getBackgroundColor(initial)

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white rounded-lg p-6 transition-all duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), rgba(56, 189, 248, 0.05) 40%, transparent 80%)`
            : 'none',
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {review.relative_time_description}
          </span>
        </div>

        {/* Review Text */}
        <div className="mb-4">
          <p className="text-gray-700">
            {isExpanded ? review.text : truncateText(review.text)}
          </p>
          {review.text.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 text-sm mt-2"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${bgColor}`}>
            {initial}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.author_name}</p>
            <p className="text-sm text-gray-500">Google Review</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 