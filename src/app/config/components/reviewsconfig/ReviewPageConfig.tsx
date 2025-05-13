'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';
import Image from 'next/image';

export default function ReviewPageConfig({ 
  page, 
  setPage 
}: { 
  page: any, 
  setPage: (v: any) => void
}) {
  // Main section toggles
  const [showHeroSection, setShowHeroSection] = useState(false);
  const [showReviewsSection, setShowReviewsSection] = useState(false);
  const [showCtaSection, setShowCtaSection] = useState(false);
  
  // Hero section toggles
  const [showHeroBadge, setShowHeroBadge] = useState(false);
  const [showHeroTitle, setShowHeroTitle] = useState(false);
  const [showHeroHighlight, setShowHeroHighlight] = useState(false);
  const [showHeroSubtitle, setShowHeroSubtitle] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showHeroBackground, setShowHeroBackground] = useState(false);
  
  // Reviews section toggles
  const [showReviewsContent, setShowReviewsContent] = useState(false);
  const [showReviewsStyles, setShowReviewsStyles] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);
  
  // CTA section toggles
  const [showCtaTitle, setShowCtaTitle] = useState(false);
  const [showCtaButtons, setShowCtaButtons] = useState(false);
  const [showCtaBackground, setShowCtaBackground] = useState(false);
  
  // Helper function to update a review
  const updateReview = (index: number, field: string, value: any) => {
    const updatedReviews = [...(page.reviews || [])];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value
    };
    
    setPage({
      ...page,
      reviews: updatedReviews
    });
  };

  // Add new review
  const addReview = () => {
    const newReview = {
      author: "Customer Name",
      text: "This is a testimonial from a satisfied customer.",
      rating: 5
    };
    
    setPage({
      ...page,
      reviews: [...(page.reviews || []), newReview]
    });
  };

  // Remove review
  const removeReview = (index: number) => {
    if (window.confirm("Are you sure you want to remove this review?")) {
      const updatedReviews = [...(page.reviews || [])];
      updatedReviews.splice(index, 1);
      
      setPage({
        ...page,
        reviews: updatedReviews
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section Configuration */}
      <div className="rounded-2xl shadow-2xl border border-[#c4b5fd] bg-white/80 p-8 mb-8">
        <button
          className="flex items-center w-full text-left gap-2 mb-6 focus:outline-none"
          onClick={() => setShowHeroSection(!showHeroSection)}
          type="button"
        >
          <h3 className="text-2xl font-bold text-black">Hero Section</h3>
          <span className={`ml-2 text-purple-600 text-xl transform transition-transform duration-200 ${showHeroSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showHeroSection && (
          <div className="space-y-4">
            {/* Hero Badge */}
            <div className="mb-4 border-2 border-pink-200 rounded-xl bg-pink-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroBadge(!showHeroBadge)}
                type="button"
              >
                <h4 className="text-lg font-bold text-pink-700">Hero Badge</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroBadge ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroBadge && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={page.badge || ''}
                      onChange={e => setPage({ ...page, badge: e.target.value })}
                      placeholder="Badge Text"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <label className="block text-sm font-medium text-gray-700">Badge Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.badgeColor || '#f3e8ff'}
                      onChange={value => setPage({ ...page, badgeColor: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Badge Text Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.badgeTextColor || '#9333ea'}
                      onChange={value => setPage({ ...page, badgeTextColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Hero Title */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroTitle(!showHeroTitle)}
                type="button"
              >
                <h4 className="text-lg font-bold text-purple-700">Hero Title</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroTitle ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroTitle && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={page.title || ''}
                      onChange={e => setPage({ ...page, title: e.target.value })}
                      placeholder="Page Title"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Title Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.titleColor || '#111827'}
                      onChange={value => setPage({ ...page, titleColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Hero Highlight */}
            <div className="mb-4 border-2 border-blue-200 rounded-xl bg-blue-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroHighlight(!showHeroHighlight)}
                type="button"
              >
                <h4 className="text-lg font-bold text-blue-700">Highlight Text</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroHighlight ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroHighlight && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.highlight || ''}
                      onChange={e => setPage({ ...page, highlight: e.target.value })}
                      placeholder="Highlight Text"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Highlight Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.highlightColor || '#4f46e5'}
                      onChange={value => setPage({ ...page, highlightColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Hero Subtitle */}
            <div className="mb-4 border-2 border-indigo-200 rounded-xl bg-indigo-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroSubtitle(!showHeroSubtitle)}
                type="button"
              >
                <h4 className="text-lg font-bold text-indigo-700">Subtitle</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroSubtitle ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroSubtitle && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={page.subtitle || ''}
                      onChange={e => setPage({ ...page, subtitle: e.target.value })}
                      placeholder="Subtitle"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Subtitle Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.subtitleColor || '#6b7280'}
                      onChange={value => setPage({ ...page, subtitleColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Hero Content */}
            <div className="mb-4 border-2 border-yellow-200 rounded-xl bg-yellow-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroContent(!showHeroContent)}
                type="button"
              >
                <h4 className="text-lg font-bold text-yellow-700">Content</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroContent ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroContent && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      value={page.content || ''}
                      onChange={e => setPage({ ...page, content: e.target.value })}
                      placeholder="Content (HTML supported)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Content Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.contentColor || '#374151'}
                      onChange={value => setPage({ ...page, contentColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Hero Background */}
            <div className="mb-4 border-2 border-cyan-200 rounded-xl bg-cyan-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroBackground(!showHeroBackground)}
                type="button"
              >
                <h4 className="text-lg font-bold text-cyan-700">Background & Gradients</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showHeroBackground ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showHeroBackground && (
                <div className="pl-2 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Background Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.heroBgColor || '#4f46e5'}
                      onChange={value => setPage({ ...page, heroBgColor: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Gradient Start:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.heroGradientStart || '#4338ca'}
                      onChange={value => setPage({ ...page, heroGradientStart: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Gradient End:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.heroGradientEnd || '#6366f1'}
                      onChange={value => setPage({ ...page, heroGradientEnd: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Overlay Opacity:</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="w-full"
                      value={(page.heroOverlayOpacity || 50) * 100}
                      onChange={e => setPage({ ...page, heroOverlayOpacity: parseInt(e.target.value, 10) / 100 })}
                    />
                    <span className="text-xs">{page.heroOverlayOpacity || 0.5}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Reviews Section Configuration */}
      <div className="rounded-2xl shadow-2xl border border-[#c4b5fd] bg-white/80 p-8 mb-8">
        <button
          className="flex items-center w-full text-left gap-2 mb-6 focus:outline-none"
          onClick={() => setShowReviewsSection(!showReviewsSection)}
          type="button"
        >
          <h3 className="text-2xl font-bold text-black">Reviews Section</h3>
          <span className={`ml-2 text-purple-600 text-xl transform transition-transform duration-200 ${showReviewsSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showReviewsSection && (
          <div className="space-y-4">
            {/* Reviews Section Content */}
            <div className="mb-4 border-2 border-emerald-200 rounded-xl bg-emerald-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowReviewsContent(!showReviewsContent)}
                type="button"
              >
                <h4 className="text-lg font-bold text-emerald-700">Section Content</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showReviewsContent ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showReviewsContent && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={page.reviewsSectionTitle || ''}
                      onChange={e => setPage({ ...page, reviewsSectionTitle: e.target.value })}
                      placeholder="Section Title"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Subtitle</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={page.reviewsSectionSubtitle || ''}
                      onChange={e => setPage({ ...page, reviewsSectionSubtitle: e.target.value })}
                      placeholder="Section Subtitle"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Title Color:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.reviewsTitleColor || '#065f46'}
                        onChange={value => setPage({ ...page, reviewsTitleColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Subtitle Color:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.reviewsSubtitleColor || '#047857'}
                        onChange={value => setPage({ ...page, reviewsSubtitleColor: value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reviews Display Style */}
            <div className="mb-4 border-2 border-green-200 rounded-xl bg-green-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowReviewsStyles(!showReviewsStyles)}
                type="button"
              >
                <h4 className="text-lg font-bold text-green-700">Display Style</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showReviewsStyles ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showReviewsStyles && (
                <div className="pl-2 pt-2">
                  <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Layout Style</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={page.testimonialLayout || 'grid'}
                        onChange={e => setPage({ ...page, testimonialLayout: e.target.value })}
                      >
                        <option value="grid">Grid Layout</option>
                        <option value="carousel">Carousel Slider</option>
                        <option value="masonry">Masonry Layout</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cards Per Row</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={page.cardsPerRow || '3'}
                        onChange={e => setPage({ ...page, cardsPerRow: e.target.value })}
                      >
                        <option value="1">1 Card</option>
                        <option value="2">2 Cards</option>
                        <option value="3">3 Cards</option>
                        <option value="4">4 Cards</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Card Background:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.cardBgColor || '#ffffff'}
                        onChange={value => setPage({ ...page, cardBgColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Card Border:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.cardBorderColor || '#e5e7eb'}
                        onChange={value => setPage({ ...page, cardBorderColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Card Text:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.cardTextColor || '#374151'}
                        onChange={value => setPage({ ...page, cardTextColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Author Name:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.authorNameColor || '#111827'}
                        onChange={value => setPage({ ...page, authorNameColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Rating Stars:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.ratingColor || '#FBBF24'}
                        onChange={value => setPage({ ...page, ratingColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Card Shadow:</label>
                      <select
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={page.cardShadow || 'md'}
                        onChange={e => setPage({ ...page, cardShadow: e.target.value })}
                      >
                        <option value="none">No Shadow</option>
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reviews List */}
            <div className="mb-4 border-2 border-amber-200 rounded-xl bg-amber-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowReviewsList(!showReviewsList)}
                type="button"
              >
                <h4 className="text-lg font-bold text-amber-700">Customer Reviews</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showReviewsList ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showReviewsList && (
                <div className="pl-2 pt-2">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={addReview}
                      className="px-4 py-2 bg-amber-200 text-amber-800 rounded-md hover:bg-amber-300 text-sm font-medium transition duration-150"
                    >
                      Add Review
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {(page.reviews || []).map((review: any, index: number) => (
                      <div key={index} className="border border-amber-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition duration-150">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-amber-800 mb-1">Author Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={review.author}
                            onChange={e => updateReview(index, 'author', e.target.value)}
                            placeholder="Customer Name"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-amber-800 mb-1">Rating (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={review.rating}
                            onChange={e => updateReview(index, 'rating', parseInt(e.target.value, 10) || 5)}
                          />
                          <div className="mt-1 flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star} 
                                className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-amber-800 mb-1">Review Text</label>
                          <textarea
                            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={review.text}
                            onChange={e => updateReview(index, 'text', e.target.value)}
                            placeholder="Customer review text"
                            rows={3}
                          />
                        </div>
                        
                        <div className="text-right">
                          <button
                            onClick={() => removeReview(index)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm transition duration-150"
                          >
                            Remove Review
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {(page.reviews || []).length === 0 && (
                      <div className="bg-white rounded-lg p-6 text-center border border-amber-200">
                        <p className="text-gray-500 py-4">No reviews yet. Click "Add Review" to create one.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div className="rounded-2xl shadow-2xl border border-[#c4b5fd] bg-white/80 p-8 mb-8">
        <button
          className="flex items-center w-full text-left gap-2 mb-6 focus:outline-none"
          onClick={() => setShowCtaSection(!showCtaSection)}
          type="button"
        >
          <h3 className="text-2xl font-bold text-black">Call to Action Section</h3>
          <span className={`ml-2 text-purple-600 text-xl transform transition-transform duration-200 ${showCtaSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showCtaSection && (
          <div className="space-y-4">
            {/* CTA Title and Description */}
            <div className="mb-4 border-2 border-cyan-200 rounded-xl bg-cyan-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaTitle(!showCtaTitle)}
                type="button"
              >
                <h4 className="text-lg font-bold text-cyan-700">CTA Content</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showCtaTitle ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaTitle && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      value={page.ctaTitle || ''}
                      onChange={e => setPage({ ...page, ctaTitle: e.target.value })}
                      placeholder="CTA Title"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Description</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      value={page.ctaDescription || ''}
                      onChange={e => setPage({ ...page, ctaDescription: e.target.value })}
                      placeholder="CTA Description"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Title Color:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.ctaTitleColor || '#FFFFFF'}
                        onChange={value => setPage({ ...page, ctaTitleColor: value })}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">Description Color:</label>
                      <ColorSelectorInput
                        label=""
                        value={page.ctaDescriptionColor || '#F3F4F6'}
                        onChange={value => setPage({ ...page, ctaDescriptionColor: value })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="mb-4 border-2 border-teal-200 rounded-xl bg-teal-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaButtons(!showCtaButtons)}
                type="button"
              >
                <h4 className="text-lg font-bold text-teal-700">CTA Buttons</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showCtaButtons ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaButtons && (
                <div className="pl-2 pt-2">
                  <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-white">
                    <h5 className="font-medium text-gray-800 mb-2">Primary Button</h5>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={page.ctaButtonText || ''}
                        onChange={e => setPage({ ...page, ctaButtonText: e.target.value })}
                        placeholder="Button Text"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={page.ctaButtonUrl || ''}
                        onChange={e => setPage({ ...page, ctaButtonUrl: e.target.value })}
                        placeholder="Button URL"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">Button Background:</label>
                        <ColorSelectorInput
                          label=""
                          value={page.ctaButtonBgColor || '#FFFFFF'}
                          onChange={value => setPage({ ...page, ctaButtonBgColor: value })}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">Button Text:</label>
                        <ColorSelectorInput
                          label=""
                          value={page.ctaButtonTextColor || '#4F46E5'}
                          onChange={value => setPage({ ...page, ctaButtonTextColor: value })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg bg-white">
                    <h5 className="font-medium text-gray-800 mb-2">Secondary Button</h5>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={page.ctaSecondaryButtonText || ''}
                        onChange={e => setPage({ ...page, ctaSecondaryButtonText: e.target.value })}
                        placeholder="Button Text"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={page.ctaSecondaryButtonUrl || ''}
                        onChange={e => setPage({ ...page, ctaSecondaryButtonUrl: e.target.value })}
                        placeholder="Button URL"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">Button Background:</label>
                        <ColorSelectorInput
                          label=""
                          value={page.ctaSecondaryButtonBgColor || '#4F46E5'}
                          onChange={value => setPage({ ...page, ctaSecondaryButtonBgColor: value })}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">Button Text:</label>
                        <ColorSelectorInput
                          label=""
                          value={page.ctaSecondaryButtonTextColor || '#FFFFFF'}
                          onChange={value => setPage({ ...page, ctaSecondaryButtonTextColor: value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Background */}
            <div className="mb-4 border-2 border-blue-200 rounded-xl bg-blue-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaBackground(!showCtaBackground)}
                type="button"
              >
                <h4 className="text-lg font-bold text-blue-700">Background</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showCtaBackground ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaBackground && (
                <div className="pl-2 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Background Color:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.ctaBgColor || '#4F46E5'}
                      onChange={value => setPage({ ...page, ctaBgColor: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Gradient Start:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.ctaGradientStart || '#4338ca'}
                      onChange={value => setPage({ ...page, ctaGradientStart: value })}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">Gradient End:</label>
                    <ColorSelectorInput
                      label=""
                      value={page.ctaGradientEnd || '#6366f1'}
                      onChange={value => setPage({ ...page, ctaGradientEnd: value })}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Style</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.ctaPatternStyle || 'diagonal-lines'}
                      onChange={e => setPage({ ...page, ctaPatternStyle: e.target.value })}
                    >
                      <option value="none">No Pattern</option>
                      <option value="diagonal-lines">Diagonal Lines</option>
                      <option value="dots">Dots</option>
                      <option value="grid">Grid</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 