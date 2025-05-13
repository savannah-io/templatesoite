'use client';

import React from 'react';
import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';

export default function ScheduleSection({ 
  page, 
  setPage, 
  showScheduleSection, 
  setShowScheduleSection 
}: { 
  page: any, 
  setPage: (v: any) => void,
  showScheduleSection: boolean,
  setShowScheduleSection: (v: boolean) => void
}) {
  const [showScheduleBadge, setShowScheduleBadge] = useState(false);
  const [showScheduleTitle, setShowScheduleTitle] = useState(false);
  const [showScheduleAddress, setShowScheduleAddress] = useState(false);
  const [showScheduleBooking, setShowScheduleBooking] = useState(false);
  const [showScheduleCalendar, setShowScheduleCalendar] = useState(false);
  const [showScheduleGradients, setShowScheduleGradients] = useState(false);

  // Get scheduleSection from page
  const scheduleSection = page.scheduleSection || {};

  // Update scheduleSection property
  const updateScheduleSection = (key: string, value: any) => {
    const updatedScheduleSection = {
      ...scheduleSection,
      [key]: value
    };
    
    setPage({
      ...page,
      scheduleSection: updatedScheduleSection
    });
  };

  return (
    <div className="rounded-2xl shadow-2xl border border-[#8b5cf6] bg-white/80 p-4 mb-8">
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setShowScheduleSection(!showScheduleSection)}
        type="button"
      >
        <h3 className="text-2xl font-bold text-purple-700">Schedule Section</h3>
        <span className={`ml-2 text-xl transform transition-transform duration-200 ${showScheduleSection ? 'rotate-180' : ''} text-gray-900`}>▼</span>
      </button>
      {showScheduleSection && (
        <div className="space-y-6">
          {/* Title & Subtitle Section */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleTitle(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Title & Subtitle</span>
              <span className={`transform transition-transform duration-200 ${showScheduleTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleTitle && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-800 mb-1">Section Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={scheduleSection.title || 'Schedule an Appointment'}
                    onChange={(e) => updateScheduleSection('title', e.target.value)}
                    placeholder="Section Title"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Title Color"
                      value={scheduleSection.titleColor || '#333333'}
                      onChange={(value) => updateScheduleSection('titleColor', value)}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-800 mb-1">Section Subtitle</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={scheduleSection.subtitle || 'Book your service online'}
                    onChange={(e) => updateScheduleSection('subtitle', e.target.value)}
                    placeholder="Section Subtitle"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Subtitle Color"
                      value={scheduleSection.subtitleColor || '#666666'}
                      onChange={(value) => updateScheduleSection('subtitleColor', value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Badge & Highlight Section */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleBadge(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Badge & Highlight</span>
              <span className={`transform transition-transform duration-200 ${showScheduleBadge ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleBadge && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Badge Text:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={scheduleSection.badgeText || 'Schedule Today'}
                    onChange={(e) => updateScheduleSection('badgeText', e.target.value)}
                    placeholder="Badge Text"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Badge Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.badgeColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('badgeColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.badgeColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('badgeColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Badge Text Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.badgeTextColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('badgeTextColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.badgeTextColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('badgeTextColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Address & Icon Settings */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleAddress(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Address & Icon Settings</span>
              <span className={`transform transition-transform duration-200 ${showScheduleAddress ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleAddress && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Address:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={scheduleSection.address || '123 Main St, City, State'}
                    onChange={(e) => updateScheduleSection('address', e.target.value)}
                    placeholder="Business Address"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Icon Background Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.iconBgColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('iconBgColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.iconBgColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('iconBgColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Icon Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.iconColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('iconColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.iconColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('iconColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Booking Options */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleBooking(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Booking Options</span>
              <span className={`transform transition-transform duration-200 ${showScheduleBooking ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleBooking && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Text:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={scheduleSection.buttonText || 'Book Now'}
                    onChange={(e) => updateScheduleSection('buttonText', e.target.value)}
                    placeholder="Button Text"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.buttonColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('buttonColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.buttonColor || '#4f46e5'}
                      onChange={(e) => updateScheduleSection('buttonColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Text Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.buttonTextColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('buttonTextColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.buttonTextColor || '#ffffff'}
                      onChange={(e) => updateScheduleSection('buttonTextColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-2 p-2 border border-gray-200 rounded flex items-center justify-center">
                  <button
                    className="px-4 py-2 rounded"
                    style={{ 
                      backgroundColor: scheduleSection.buttonColor || '#4f46e5',
                      color: scheduleSection.buttonTextColor || '#ffffff'
                    }}
                  >
                    {scheduleSection.buttonText || 'Book Now'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Calendar Settings */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleCalendar(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Calendar Settings</span>
              <span className={`transform transition-transform duration-200 ${showScheduleCalendar ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleCalendar && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Calendly URL:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={scheduleSection.calendlyUrl || ''}
                    onChange={(e) => updateScheduleSection('calendlyUrl', e.target.value)}
                    placeholder="https://calendly.com/yourusername/appointmenttype"
                  />
                </div>
                
                <div className="mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={scheduleSection.showCalendly || false}
                    onChange={(e) => updateScheduleSection('showCalendly', e.target.checked)}
                  />
                  <label className="text-sm text-gray-600">Show Calendly Embed</label>
                </div>
              </div>
            )}
          </div>
          
          {/* Background & Gradients */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleGradients(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Background & Gradients</span>
              <span className={`transform transition-transform duration-200 ${showScheduleGradients ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleGradients && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Top Gradient Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.gradientTop || '#f9fafb'}
                      onChange={(e) => updateScheduleSection('gradientTop', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.gradientTop || '#f9fafb'}
                      onChange={(e) => updateScheduleSection('gradientTop', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Bottom Gradient Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={scheduleSection.gradientBottom || '#e5e7eb'}
                      onChange={(e) => updateScheduleSection('gradientBottom', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={scheduleSection.gradientBottom || '#e5e7eb'}
                      onChange={(e) => updateScheduleSection('gradientBottom', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="h-16 rounded my-2" style={{
                  background: `linear-gradient(to bottom, ${scheduleSection.gradientTop || '#f9fafb'}, ${scheduleSection.gradientBottom || '#e5e7eb'})`
                }}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 