'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';

export default function ContactPageConfig({ 
  page, 
  setPage 
}: { 
  page: any, 
  setPage: (v: any) => void
}) {
  // Main section toggles
  const [showHeroSection, setShowHeroSection] = useState(false);
  const [showContactSection, setShowContactSection] = useState(false);
  const [showCtaSection, setShowCtaSection] = useState(false);
  
  // Hero section toggles
  const [showHeroBadge, setShowHeroBadge] = useState(false);
  const [showHeroTitle, setShowHeroTitle] = useState(false);
  const [showHeroSubtitle, setShowHeroSubtitle] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showHeroBackground, setShowHeroBackground] = useState(false);
  
  // Contact section toggles
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMapSettings, setShowMapSettings] = useState(false);
  
  // CTA section toggles
  const [showCtaContent, setShowCtaContent] = useState(false);
  const [showCtaButtons, setShowCtaButtons] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hero Section Configuration */}
      <div className="rounded-2xl shadow-xl bg-white p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowHeroSection(!showHeroSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-black">Hero Section</h3>
          <span className={`ml-auto text-purple-600 text-xl transform transition-transform duration-200 ${showHeroSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showHeroSection && (
          <div className="space-y-4 mt-6">
            {/* Hero Badge */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroBadge(!showHeroBadge)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Hero Badge</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showHeroBadge ? 'rotate-180' : ''}`}>▼</span>
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
                <h4 className="text-lg font-bold text-black">Hero Title</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showHeroTitle ? 'rotate-180' : ''}`}>▼</span>
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
                      value={page.titleColor || '#ffffff'}
                      onChange={value => setPage({ ...page, titleColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Subtitle */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroSubtitle(!showHeroSubtitle)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Subtitle</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showHeroSubtitle ? 'rotate-180' : ''}`}>▼</span>
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
                      value={page.subtitleColor || '#f3f4f6'}
                      onChange={value => setPage({ ...page, subtitleColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroContent(!showHeroContent)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Content</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showHeroContent ? 'rotate-180' : ''}`}>▼</span>
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
                      value={page.contentColor || '#f3f4f6'}
                      onChange={value => setPage({ ...page, contentColor: value })}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Background & Gradients */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowHeroBackground(!showHeroBackground)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Background & Gradients</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showHeroBackground ? 'rotate-180' : ''}`}>▼</span>
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
      
      {/* Contact Section Configuration */}
      <div className="rounded-2xl shadow-xl bg-white p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowContactSection(!showContactSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-black">Contact Section</h3>
          <span className={`ml-auto text-purple-600 text-xl transform transition-transform duration-200 ${showContactSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showContactSection && (
          <div className="space-y-4 mt-6">
            {/* Contact Information */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowContactInfo(!showContactInfo)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Contact Information</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showContactInfo ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showContactInfo && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.phone || '(770) 495-0050'}
                      onChange={e => setPage({ ...page, phone: e.target.value })}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.email || 'support@taylorscollision.com'}
                      onChange={e => setPage({ ...page, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.address1 || '2785 Buford Hwy Ste 101-C,'}
                      onChange={e => setPage({ ...page, address1: e.target.value })}
                      placeholder="Street Address Line 1"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.address2 || 'Duluth, GA 30096'}
                      onChange={e => setPage({ ...page, address2: e.target.value })}
                      placeholder="Street Address Line 2"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      value={page.hours1 || 'Monday - Friday: 8:30 AM - 6:00 PM'}
                      onChange={e => setPage({ ...page, hours1: e.target.value })}
                      placeholder="Weekday Hours"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={page.hours2 || 'Saturday - Sunday: Closed'}
                      onChange={e => setPage({ ...page, hours2: e.target.value })}
                      placeholder="Weekend Hours"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Form */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowContactForm(!showContactForm)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Contact Form</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showContactForm ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showContactForm && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={page.formTitle || 'Send Us a Message'}
                      onChange={e => setPage({ ...page, formTitle: e.target.value })}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={page.submitButtonText || 'Send Message'}
                      onChange={e => setPage({ ...page, submitButtonText: e.target.value })}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Services Dropdown Options</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={page.serviceOptions || 'General Inquiry\nCollision Repair\nPaint Services\nDent Removal\nPaint Protection\nFrame & Structural\nAuto Detailing'}
                      onChange={e => setPage({ ...page, serviceOptions: e.target.value })}
                      placeholder="One service per line"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter one service per line</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Map Settings */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowMapSettings(!showMapSettings)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">Map Settings</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showMapSettings ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showMapSettings && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={page.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.4724546070396!2d-84.17161548478716!3d34.00516048061856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a1e7c9f77e49%3A0x1b1b1b1b1b1b1b1b!2s2785%20Buford%20Hwy%2C%20Duluth%2C%20GA%2030096!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus'}
                      onChange={e => setPage({ ...page, mapUrl: e.target.value })}
                      placeholder="Google Maps Embed URL"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Map Height</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={page.mapHeight || '300px'}
                      onChange={e => setPage({ ...page, mapHeight: e.target.value })}
                      placeholder="300px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div className="rounded-2xl shadow-xl bg-white p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowCtaSection(!showCtaSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-black">Call to Action Section</h3>
          <span className={`ml-auto text-purple-600 text-xl transform transition-transform duration-200 ${showCtaSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showCtaSection && (
          <div className="space-y-6 mt-6">
            {/* CTA Content */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaContent(!showCtaContent)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">CTA Content</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showCtaContent ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaContent && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={page.ctaTitle || 'Ready to Get Your Car Back to Perfect?'}
                      onChange={e => setPage({ ...page, ctaTitle: e.target.value })}
                      placeholder="CTA Title"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Description</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={page.ctaDescription || 'Schedule your appointment today and experience the difference expert auto body repair makes.'}
                      onChange={e => setPage({ ...page, ctaDescription: e.target.value })}
                      placeholder="CTA Description"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="mb-4 border-2 border-purple-200 rounded-xl bg-purple-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaButtons(!showCtaButtons)}
                type="button"
              >
                <h4 className="text-lg font-bold text-black">CTA Buttons</h4>
                <span className={`ml-2 text-purple-600 transform transition-transform duration-200 ${showCtaButtons ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaButtons && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={page.scheduleButtonText || 'Schedule Now'}
                      onChange={e => setPage({ ...page, scheduleButtonText: e.target.value })}
                      placeholder="Schedule Button Text"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Call Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={page.callButtonText || 'Call Us Now'}
                      onChange={e => setPage({ ...page, callButtonText: e.target.value })}
                      placeholder="Call Button Text"
                    />
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