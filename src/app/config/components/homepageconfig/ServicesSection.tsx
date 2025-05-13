'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';
import EditableGuaranteeCards from '@/app/config/components/homepageconfig/EditableGuaranteeCards';

export default function ServicesSection({ 
  page, 
  setPage, 
  showServicesSection, 
  setShowServicesSection 
}: { 
  page: any, 
  setPage: (v: any) => void,
  showServicesSection: boolean,
  setShowServicesSection: (v: boolean) => void
}) {
  const [showServicesTitle, setShowServicesTitle] = useState(false);
  const [showServicesColors, setShowServicesColors] = useState(false);
  const [showServicesCards, setShowServicesCards] = useState(false);

  return (
    <div className="rounded-2xl shadow-2xl border border-[#8b5cf6] bg-white/80 p-4 mb-8">
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setShowServicesSection(!showServicesSection)}
        type="button"
      >
        <h3 className="text-2xl font-bold text-purple-700">Services Section</h3>
        <span className={`ml-2 text-xl transform transition-transform duration-200 ${showServicesSection ? 'rotate-180' : ''} text-gray-900`}>▼</span>
      </button>
      {showServicesSection && (
        <div className="space-y-6">
          {/* Title & Subtitle Section */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowServicesTitle(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Title & Subtitle</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showServicesTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showServicesTitle && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-800 mb-1">Section Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={page.servicesSection?.title || 'Our Services'}
                    onChange={e => setPage({
                      ...page,
                      servicesSection: {
                        ...page.servicesSection,
                        title: e.target.value
                      }
                    })}
                    placeholder="Section Title"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Title Color"
                      value={page.servicesSection?.titleColor || '#333333'}
                      onChange={value => setPage({
                        ...page,
                        servicesSection: {
                          ...page.servicesSection,
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
                    value={page.servicesSection?.subtitle || 'What we offer'}
                    onChange={e => setPage({
                      ...page,
                      servicesSection: {
                        ...page.servicesSection,
                        subtitle: e.target.value
                      }
                    })}
                    placeholder="Section Subtitle"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Subtitle Color"
                      value={page.servicesSection?.subtitleColor || '#666666'}
                      onChange={value => setPage({
                        ...page,
                        servicesSection: {
                          ...page.servicesSection,
                          subtitleColor: value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Section Colors */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowServicesColors(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Section Colors</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showServicesColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showServicesColors && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Color configuration controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Services Cards */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowServicesCards(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Services Cards</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showServicesCards ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showServicesCards && (
              <div className="pl-2 pt-2">
                <EditableGuaranteeCards
                  cards={page.servicesSection?.cards || []}
                  onChange={cards => setPage({
                    ...page,
                    servicesSection: {
                      ...page.servicesSection,
                      cards
                    }
                  })}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 