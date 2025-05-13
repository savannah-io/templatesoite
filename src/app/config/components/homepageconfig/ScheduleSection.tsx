'use client';

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
                    value={page.scheduleSection?.title || 'Schedule an Appointment'}
                    onChange={e => setPage({
                      ...page,
                      scheduleSection: {
                        ...page.scheduleSection,
                        title: e.target.value
                      }
                    })}
                    placeholder="Section Title"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Title Color"
                      value={page.scheduleSection?.titleColor || '#333333'}
                      onChange={value => setPage({
                        ...page,
                        scheduleSection: {
                          ...page.scheduleSection,
                          titleColor: value
                        }
                      })}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-800 mb-1">Section Subtitle</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={page.scheduleSection?.subtitle || 'Book your service online'}
                    onChange={e => setPage({
                      ...page,
                      scheduleSection: {
                        ...page.scheduleSection,
                        subtitle: e.target.value
                      }
                    })}
                    placeholder="Section Subtitle"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Subtitle Color"
                      value={page.scheduleSection?.subtitleColor || '#666666'}
                      onChange={value => setPage({
                        ...page,
                        scheduleSection: {
                          ...page.scheduleSection,
                          subtitleColor: value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Badge & Highlight Section */}
          <div className="mb-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleBadge(prev => !prev)}>
              <span className="text-xl font-extrabold text-pink-800">Badge & Highlight</span>
              <span className={`transform transition-transform duration-200 ${showScheduleBadge ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleBadge && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Badge and highlight controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Address & Icon Settings */}
          <div className="mb-6 bg-cyan-50 border-2 border-cyan-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleAddress(prev => !prev)}>
              <span className="text-xl font-extrabold text-cyan-800">Address & Icon Settings</span>
              <span className={`transform transition-transform duration-200 ${showScheduleAddress ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleAddress && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Address and icon settings controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Booking Options */}
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleBooking(prev => !prev)}>
              <span className="text-xl font-extrabold text-green-800">Booking Options</span>
              <span className={`transform transition-transform duration-200 ${showScheduleBooking ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleBooking && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Booking options controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Calendar Settings */}
          <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleCalendar(prev => !prev)}>
              <span className="text-xl font-extrabold text-blue-800">Calendar Settings</span>
              <span className={`transform transition-transform duration-200 ${showScheduleCalendar ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleCalendar && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Calendar settings controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Background & Gradients */}
          <div className="mb-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                   onClick={() => setShowScheduleGradients(prev => !prev)}>
              <span className="text-xl font-extrabold text-indigo-800">Background & Gradients</span>
              <span className={`transform transition-transform duration-200 ${showScheduleGradients ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleGradients && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Background and gradients controls */}
                {/* ... */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 