'use client';

import React from 'react';
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

  // Get servicesSection from page
  const servicesSection = page.servicesSection || {};

  // Update servicesSection property
  const updateServicesSection = (key: string, value: any) => {
    const updatedServicesSection = {
      ...servicesSection,
      [key]: value
    };
    
    setPage({
      ...page,
      servicesSection: updatedServicesSection
    });
  };

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
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowServicesTitle(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Title & Subtitle</span>
              <span className={`transform transition-transform duration-200 ${showServicesTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showServicesTitle && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Section Title:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={servicesSection.title || 'Our Services'}
                    onChange={(e) => updateServicesSection('title', e.target.value)}
                    placeholder="Section Title"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Title Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.titleColor || '#333333'}
                      onChange={(e) => updateServicesSection('titleColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.titleColor || '#333333'}
                      onChange={(e) => updateServicesSection('titleColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Section Subtitle:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={servicesSection.subtitle || 'What we offer'}
                    onChange={(e) => updateServicesSection('subtitle', e.target.value)}
                    placeholder="Section Subtitle"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Subtitle Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.subtitleColor || '#666666'}
                      onChange={(e) => updateServicesSection('subtitleColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.subtitleColor || '#666666'}
                      onChange={(e) => updateServicesSection('subtitleColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Section Colors */}
          <div className="mb-4 border border-gray-300 p-3">
            <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                  onClick={() => setShowServicesColors(prev => !prev)}>
              <span className="text-base font-bold text-gray-700">Section Colors</span>
              <span className={`transform transition-transform duration-200 ${showServicesColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showServicesColors && (
              <div className="pl-2 pt-2 flex flex-col gap-3">
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Background Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.backgroundColor || '#ffffff'}
                      onChange={(e) => updateServicesSection('backgroundColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.backgroundColor || '#ffffff'}
                      onChange={(e) => updateServicesSection('backgroundColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Card Background Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.cardBgColor || '#f9fafb'}
                      onChange={(e) => updateServicesSection('cardBgColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.cardBgColor || '#f9fafb'}
                      onChange={(e) => updateServicesSection('cardBgColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Text:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300"
                    value={servicesSection.buttonText || 'View All Services'}
                    onChange={(e) => updateServicesSection('buttonText', e.target.value)}
                    placeholder="Button Text"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.buttonColor || '#4f46e5'}
                      onChange={(e) => updateServicesSection('buttonColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.buttonColor || '#4f46e5'}
                      onChange={(e) => updateServicesSection('buttonColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Button Text Color:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-8 h-8 border border-gray-300"
                      value={servicesSection.buttonTextColor || '#ffffff'}
                      onChange={(e) => updateServicesSection('buttonTextColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-20 p-1 border border-gray-300 text-xs"
                      value={servicesSection.buttonTextColor || '#ffffff'}
                      onChange={(e) => updateServicesSection('buttonTextColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-2 p-2 border border-gray-200 rounded flex items-center justify-center">
                  <button
                    className="px-4 py-2 rounded"
                    style={{ 
                      backgroundColor: servicesSection.buttonColor || '#4f46e5',
                      color: servicesSection.buttonTextColor || '#ffffff'
                    }}
                  >
                    {servicesSection.buttonText || 'View All Services'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Services Cards */}
          <div className="mb-4 border border-gray-300 p-3">
            <div 
              className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none cursor-pointer" 
              onClick={() => setShowServicesCards(prev => !prev)}
            >
              <span className="text-base font-bold text-gray-700">Services Cards</span>
              <span className={`transform transition-transform duration-200 ${showServicesCards ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {showServicesCards && (
              <div className="pl-2 pt-2">
                <div className="mb-4">
                  {(servicesSection.services || []).map((service: any, index: number) => (
                    <div key={index} className="mb-4 p-3 border border-gray-300 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-700">Service {index + 1}</h3>
                        <button 
                          onClick={() => {
                            const services = [...(servicesSection.services || [])];
                            services.splice(index, 1);
                            updateServicesSection('services', services);
                          }}
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
                          value={service.title || ''}
                          onChange={(e) => {
                            const services = [...(servicesSection.services || [])];
                            services[index] = { ...services[index], title: e.target.value };
                            updateServicesSection('services', services);
                          }}
                          placeholder="Service Title"
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label className="block text-sm text-gray-600 mb-1">Description:</label>
                        <textarea
                          className="w-full p-2 border border-gray-300"
                          value={service.description || ''}
                          onChange={(e) => {
                            const services = [...(servicesSection.services || [])];
                            services[index] = { ...services[index], description: e.target.value };
                            updateServicesSection('services', services);
                          }}
                          placeholder="Service Description"
                          rows={2}
                        ></textarea>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const services = [...(servicesSection.services || [])];
                      services.push({ title: '', description: '' });
                      updateServicesSection('services', services);
                    }}
                    className="w-full p-2 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    Add New Service
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