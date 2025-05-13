'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';
import EditableGuaranteeCards from '@/app/config/components/homepageconfig/EditableGuaranteeCards';

export default function GuaranteeSection({ 
  page, 
  setPage, 
  showGuaranteeSection, 
  setShowGuaranteeSection 
}: { 
  page: any, 
  setPage: (v: any) => void,
  showGuaranteeSection: boolean,
  setShowGuaranteeSection: (v: boolean) => void
}) {
  const [showGuaranteeTitle, setShowGuaranteeTitle] = useState(false);
  const [showGuaranteeColors, setShowGuaranteeColors] = useState(false);
  const [showGuaranteeCards, setShowGuaranteeCards] = useState(false);

  return (
    <div className="rounded-2xl shadow-2xl border border-[#8b5cf6] bg-white/80 p-4 mb-8">
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setShowGuaranteeSection(!showGuaranteeSection)}
        type="button"
      >
        <h3 className="text-2xl font-bold text-purple-700">Guarantee Section</h3>
        <span className={`ml-2 text-xl transform transition-transform duration-200 ${showGuaranteeSection ? 'rotate-180' : ''} text-gray-900`}>▼</span>
      </button>
      {showGuaranteeSection && (
        <div className="space-y-6">
          {/* Title & Subtitle Section */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowGuaranteeTitle(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Title & Subtitle</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showGuaranteeTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeTitle && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-800 mb-1">Section Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={page.guaranteeSection?.title || 'Our Guarantees'}
                    onChange={e => setPage({
                      ...page,
                      guaranteeSection: {
                        ...page.guaranteeSection,
                        title: e.target.value
                      }
                    })}
                    placeholder="Section Title"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Title Color"
                      value={page.guaranteeSection?.titleColor || '#333333'}
                      onChange={value => setPage({
                        ...page,
                        guaranteeSection: {
                          ...page.guaranteeSection,
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
                    value={page.guaranteeSection?.subtitle || 'We stand by our quality and service'}
                    onChange={e => setPage({
                      ...page,
                      guaranteeSection: {
                        ...page.guaranteeSection,
                        subtitle: e.target.value
                      }
                    })}
                    placeholder="Section Subtitle"
                  />
                  <div className="mt-2">
                    <ColorSelectorInput
                      label="Subtitle Color"
                      value={page.guaranteeSection?.subtitleColor || '#666666'}
                      onChange={value => setPage({
                        ...page,
                        guaranteeSection: {
                          ...page.guaranteeSection,
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
                  onClick={() => setShowGuaranteeColors(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Section Colors</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showGuaranteeColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeColors && (
              <div className="pl-2 pt-2 flex flex-col gap-4">
                {/* Color configuration controls */}
                {/* ... */}
              </div>
            )}
          </div>
          
          {/* Guarantee Cards */}
          <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowGuaranteeCards(prev => !prev)}>
              <span className="text-xl font-extrabold text-purple-800">Guarantee Cards</span>
              <span className={`text-purple-600 transform transition-transform duration-200 ${showGuaranteeCards ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeCards && (
              <div className="pl-2 pt-2">
                <EditableGuaranteeCards
                  cards={page.guaranteeSection?.cards || []}
                  onChange={cards => setPage({
                    ...page,
                    guaranteeSection: {
                      ...page.guaranteeSection,
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