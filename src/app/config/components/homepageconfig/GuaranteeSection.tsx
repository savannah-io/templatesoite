'use client';

import React from 'react';
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

  // Get guaranteeSection from page
  const guaranteeSection = page.guaranteeSection || {};

  // Update guaranteeSection property
  const updateGuaranteeSection = (key: string, value: any) => {
    const updatedGuaranteeSection = {
      ...guaranteeSection,
      [key]: value
    };
    
    setPage({
      ...page,
      guaranteeSection: updatedGuaranteeSection
    });
  };

  // Update a specific card
  const updateCard = (index: number, key: string, value: any) => {
    const cards = [...(guaranteeSection.cards || [])];
    cards[index] = {
      ...cards[index],
      [key]: value
    };
    
    updateGuaranteeSection('cards', cards);
  };

  // Add a new card
  const addCard = () => {
    const cards = [...(guaranteeSection.cards || [])];
    cards.push({
      title: '',
      description: '',
      icon: 'CheckCircleIcon'
    });
    
    updateGuaranteeSection('cards', cards);
  };

  // Remove a card
  const removeCard = (index: number) => {
    const cards = [...(guaranteeSection.cards || [])];
    cards.splice(index, 1);
    
    updateGuaranteeSection('cards', cards);
  };

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
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowGuaranteeTitle(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Title & Subtitle</span>
              <span className={`transform transition-transform duration-200 ${showGuaranteeTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeTitle && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Section Title:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={guaranteeSection.title || 'Our Guarantees'}
                    onChange={(e) => updateGuaranteeSection('title', e.target.value)}
                    placeholder="Section Title"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Title Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={guaranteeSection.titleColor || '#333333'}
                      onChange={(e) => updateGuaranteeSection('titleColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={guaranteeSection.titleColor || '#333333'}
                      onChange={(e) => updateGuaranteeSection('titleColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Section Subtitle:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={guaranteeSection.subtitle || 'We stand by our quality and service'}
                    onChange={(e) => updateGuaranteeSection('subtitle', e.target.value)}
                    placeholder="Section Subtitle"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Subtitle Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={guaranteeSection.subtitleColor || '#666666'}
                      onChange={(e) => updateGuaranteeSection('subtitleColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={guaranteeSection.subtitleColor || '#666666'}
                      onChange={(e) => updateGuaranteeSection('subtitleColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Section Colors */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowGuaranteeColors(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Section Colors</span>
              <span className={`transform transition-transform duration-200 ${showGuaranteeColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeColors && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Background Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={guaranteeSection.backgroundColor || '#ffffff'}
                      onChange={(e) => updateGuaranteeSection('backgroundColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={guaranteeSection.backgroundColor || '#ffffff'}
                      onChange={(e) => updateGuaranteeSection('backgroundColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Card Background Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={guaranteeSection.cardBgColor || '#f9fafb'}
                      onChange={(e) => updateGuaranteeSection('cardBgColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={guaranteeSection.cardBgColor || '#f9fafb'}
                      onChange={(e) => updateGuaranteeSection('cardBgColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Card Border Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={guaranteeSection.cardBorderColor || '#e5e7eb'}
                      onChange={(e) => updateGuaranteeSection('cardBorderColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={guaranteeSection.cardBorderColor || '#e5e7eb'}
                      onChange={(e) => updateGuaranteeSection('cardBorderColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Guarantee Cards */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowGuaranteeCards(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Guarantee Cards</span>
              <span className={`transform transition-transform duration-200 ${showGuaranteeCards ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showGuaranteeCards && (
              <div className="pl-2 pt-2">
                <div className="mb-4">
                  {(guaranteeSection.cards || []).map((card: any, index: number) => (
                    <div key={index} className="mb-4 p-3 border border-gray-300 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-700">Card {index + 1}</h3>
                        <button 
                          onClick={() => removeCard(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-2">
                        <label className="block text-sm text-gray-600 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300"
                          value={card.title || ''}
                          onChange={(e) => updateCard(index, 'title', e.target.value)}
                          placeholder="Card Title"
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label className="block text-sm text-gray-600 mb-1">Description:</label>
                        <textarea
                          className="w-full p-2 border border-gray-300"
                          value={card.description || ''}
                          onChange={(e) => updateCard(index, 'description', e.target.value)}
                          placeholder="Card Description"
                          rows={2}
                        ></textarea>
                      </div>
                      
                      <div className="mb-2">
                        <label className="block text-sm text-gray-600 mb-1">Icon:</label>
                        <select
                          className="w-full p-2 border border-gray-300"
                          value={card.icon || 'CheckCircleIcon'}
                          onChange={(e) => updateCard(index, 'icon', e.target.value)}
                        >
                          <option value="CheckCircleIcon">Check Circle</option>
                          <option value="ShieldCheckIcon">Shield Check</option>
                          <option value="ClockIcon">Clock</option>
                          <option value="CurrencyDollarIcon">Currency Dollar</option>
                          <option value="SparklesIcon">Sparkles</option>
                          <option value="StarIcon">Star</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={addCard}
                    className="w-full p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    Add New Card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 