'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';
import Image from 'next/image';
import IconConfigField from '@/components/IconConfigField';

// Helper function to convert shadow values to CSS
const getShadowClass = (shadow: string): string => {
  switch(shadow) {
    case 'none': return 'none';
    case 'sm': return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    case 'md': return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    case 'lg': return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    case 'xl': return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    default: return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  }
};

export default function ServicePageConfig({ 
  page, 
  setPage 
}: { 
  page: any, 
  setPage: (v: any) => void
}) {
  // Debug log
  console.log("Service page config:", page);
  console.log("Service categories:", page.serviceCategories);
  
  // Main section toggles
  const [showHeroSection, setShowHeroSection] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showExpertiseSection, setShowExpertiseSection] = useState(false);
  const [showCtaSection, setShowCtaSection] = useState(false);
  
  // Hero section toggles
  const [showHeroBadge, setShowHeroBadge] = useState(false);
  const [showHeroTitle, setShowHeroTitle] = useState(false);
  const [showHeroHighlight, setShowHeroHighlight] = useState(false);
  const [showHeroSubtitle, setShowHeroSubtitle] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showHeroBackground, setShowHeroBackground] = useState(false);
  
  // Category toggles
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Service Category internal toggles
  const [categoryBasicInfo, setCategoryBasicInfo] = useState<number[]>([]);
  const [categoryBackground, setCategoryBackground] = useState<number[]>([]);
  const [categoryPreview, setCategoryPreview] = useState<number[]>([]);
  const [categoryAdvancedStyling, setCategoryAdvancedStyling] = useState<number[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<{[key: number]: number | null}>({});
  
  // Service toggles within category
  const [serviceBasicInfo, setServiceBasicInfo] = useState<{[key: string]: boolean}>({});
  const [servicePreview, setServicePreview] = useState<{[key: string]: boolean}>({});
  const [serviceAdvancedStyling, setServiceAdvancedStyling] = useState<{[key: string]: boolean}>({});
  
  // Expertise section toggles
  const [showExpertiseTitle, setShowExpertiseTitle] = useState(false);
  const [showExpertiseCards, setShowExpertiseCards] = useState(false);
  
  // CTA section toggles
  const [showCtaContent, setShowCtaContent] = useState(false);
  const [showCtaButtons, setShowCtaButtons] = useState(false);

  // Helper function to toggle category basic info
  const toggleCategoryBasicInfo = (index: number) => {
    if (categoryBasicInfo.includes(index)) {
      setCategoryBasicInfo(categoryBasicInfo.filter(i => i !== index));
    } else {
      setCategoryBasicInfo([...categoryBasicInfo, index]);
    }
  };

  // Helper function to toggle category background
  const toggleCategoryBackground = (index: number) => {
    if (categoryBackground.includes(index)) {
      setCategoryBackground(categoryBackground.filter(i => i !== index));
    } else {
      setCategoryBackground([...categoryBackground, index]);
    }
  };

  // Helper function to toggle category preview
  const toggleCategoryPreview = (index: number) => {
    if (categoryPreview.includes(index)) {
      setCategoryPreview(categoryPreview.filter(i => i !== index));
    } else {
      setCategoryPreview([...categoryPreview, index]);
    }
  };

  // Helper function to toggle service basic info
  const toggleServiceBasicInfo = (categoryIndex: number, serviceIndex: number) => {
    const key = `${categoryIndex}-${serviceIndex}`;
    setServiceBasicInfo({
      ...serviceBasicInfo,
      [key]: !serviceBasicInfo[key]
    });
  };

  // Helper function to toggle service preview
  const toggleServicePreview = (categoryIndex: number, serviceIndex: number) => {
    const key = `${categoryIndex}-${serviceIndex}`;
    setServicePreview({
      ...servicePreview,
      [key]: !servicePreview[key]
    });
  };

  // Helper function to toggle service advanced styling
  const toggleServiceAdvancedStyling = (categoryIndex: number, serviceIndex: number) => {
    const key = `${categoryIndex}-${serviceIndex}`;
    setServiceAdvancedStyling({
      ...serviceAdvancedStyling,
      [key]: !serviceAdvancedStyling[key]
    });
  };

  // Helper function to update the service categories
  const updateServiceCategory = (index: number, field: string, value: any) => {
    const updatedCategories = [...(page.serviceCategories || [])];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: value
    };
    
    setPage({
      ...page,
      serviceCategories: updatedCategories
    });
  };

  // Helper function to update a service within a category
  const updateService = (categoryIndex: number, serviceIndex: number, field: string, value: any) => {
    const updatedCategories = [...(page.serviceCategories || [])];
    const services = [...(updatedCategories[categoryIndex].services || [])];
    
    services[serviceIndex] = {
      ...services[serviceIndex],
      [field]: value
    };
    
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      services
    };
    
    setPage({
      ...page,
      serviceCategories: updatedCategories
    });
  };

  // Add new service category
  const addServiceCategory = () => {
    // Get the current service categories
    const currentCategories = page.serviceCategories || [];
    
    // Generate a sequential ID
    const categoryNumber = currentCategories.length + 1;
    
    const newCategory = {
      id: `service-category-${categoryNumber}`,
      title: `Service Category ${categoryNumber}`,
      icon: "<CogIcon className=\"w-full h-full\" />",
      description: "Description for new service category",
      bgImage: "/images/back1.png",
      color: "from-primary-500 to-primary-600",
      bgColor: "#3b82f6",
      iconColor: "#ffffff",
      textColor: "#ffffff",
      titleColor: "#ffffff",
      descriptionColor: "#f3f4f6",
      cardTextColor: "#374151",
      cardDescriptionColor: "#6b7280",
      borderColor: "#e5e7eb",
      cardBorderRadius: "0.75rem",
      cardShadow: "md",
      cardBackgroundOpacity: 1,
      iconSize: "1.5rem",
      titleFontSize: "1.25rem",
      descriptionFontSize: "0.875rem",
      services: [
        {
          title: `Service ${categoryNumber}.1`,
          description: "Description for this service",
          icon: "<WrenchIcon className=\"w-6 h-6\" />",
          iconColor: "#3b82f6",
          bgColor: "#f0f9ff",
          titleColor: "#374151",
          descriptionColor: "#6b7280",
          borderColor: "#e5e7eb",
          borderRadius: "0.5rem",
          shadow: "sm",
          backgroundOpacity: 1,
          iconSize: "1.25rem",
          titleFontSize: "1rem",
          descriptionFontSize: "0.875rem"
        }
      ]
    };
    
    setPage({
      ...page,
      serviceCategories: [...currentCategories, newCategory]
    });
  };

  // Add new service to a category
  const addService = (categoryIndex: number) => {
    const updatedCategories = [...(page.serviceCategories || [])];
    const services = [...(updatedCategories[categoryIndex].services || [])];
    
    // Get category number from id
    const categoryIdMatch = updatedCategories[categoryIndex].id.match(/\d+/);
    const categoryNumber = categoryIdMatch ? categoryIdMatch[0] : categoryIndex + 1;
    
    // Generate sequential service number
    const serviceNumber = services.length + 1;
    
    services.push({
      title: `Service ${categoryNumber}.${serviceNumber}`,
      description: "Description for new service",
      icon: "<WrenchIcon className=\"w-6 h-6\" />",
      iconColor: "#3b82f6",
      bgColor: "#f0f9ff",
      titleColor: "#374151",
      descriptionColor: "#6b7280",
      borderColor: "#e5e7eb",
      borderRadius: "0.5rem",
      shadow: "sm",
      backgroundOpacity: 1,
      iconSize: "1.25rem",
      titleFontSize: "1rem",
      descriptionFontSize: "0.875rem"
    });
    
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      services
    };
    
    setPage({
      ...page,
      serviceCategories: updatedCategories
    });
  };

  // Remove service category
  const removeServiceCategory = (index: number) => {
    if (window.confirm("Are you sure you want to remove this service category?")) {
      const updatedCategories = [...(page.serviceCategories || [])];
      updatedCategories.splice(index, 1);
      
      setPage({
        ...page,
        serviceCategories: updatedCategories
      });
    }
  };

  // Remove service from a category
  const removeService = (categoryIndex: number, serviceIndex: number) => {
    const updatedCategories = [...(page.serviceCategories || [])];
    const services = [...(updatedCategories[categoryIndex].services || [])];
    
    services.splice(serviceIndex, 1);
    
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      services
    };
    
    setPage({
      ...page,
      serviceCategories: updatedCategories
    });
  };

  // Array of colors for the service category cards
  const categoryColors = [
    { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700' },
    { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700' },
    { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section Configuration */}
      <div className="rounded-2xl shadow-xl bg-violet-50 border-2 border-violet-200 p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowHeroSection(!showHeroSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-violet-800">Hero Section</h3>
          <span className={`ml-auto text-violet-600 text-xl transform transition-transform duration-200 ${showHeroSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showHeroSection && (
          <div className="space-y-4 mt-6">
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
            
            {/* Highlight Text */}
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
            
            {/* Subtitle */}
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
            
            {/* Stats Counters - renamed to Content */}
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
            
            {/* Background & Gradients */}
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
                  <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Hero Icon</label>
                    <IconConfigField
                      label=""
                      value={page.heroIcon || '<MailboxIcon className="w-full h-full" />'}
                      onChange={(value) => setPage({ ...page, heroIcon: value })}
                    />
                  </div>

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
      
      {/* Service Categories Configuration */}
      <div className="rounded-2xl shadow-xl bg-blue-50 border-2 border-blue-200 p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowCategories(!showCategories)}
          type="button"
        >
          <h3 className="text-xl font-bold text-blue-800">Service Categories</h3>
          <span className={`ml-auto text-blue-600 text-xl transform transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showCategories && (
          <div className="space-y-6 mt-6">
            <div className="flex justify-end">
              <button
                onClick={addServiceCategory}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                Add Service Category
              </button>
            </div>
            
            {/* Display existing service categories */}
            <div className="grid grid-cols-1 gap-6">
              {(page.serviceCategories || []).length === 0 ? (
                <div className="text-center p-8 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-gray-500">No service categories yet. Click "Add Service Category" to create one.</p>
                </div>
              ) : (
                (page.serviceCategories || []).map((category: any, categoryIndex: number) => {
                  // Get color based on index, cycling through the colors array
                  const colorScheme = categoryColors[categoryIndex % categoryColors.length];
                  
                  return (
                    <div key={categoryIndex} className={`rounded-2xl shadow-md p-6 border-2 ${colorScheme.border} ${colorScheme.bg}`}>
                      <button
                        className="flex items-center w-full text-left gap-2 focus:outline-none"
                        onClick={() => {
                          if (selectedCategory === categoryIndex) {
                            setSelectedCategory(null);
                          } else {
                            setSelectedCategory(categoryIndex);
                          }
                        }}
                        type="button"
                      >
                        <h4 className={`text-lg font-bold ${colorScheme.text}`}>{category.title || "Service Category"}</h4>
                        <span className={`ml-auto transform transition-transform duration-200 ${selectedCategory === categoryIndex ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      
                      {selectedCategory === categoryIndex && (
                        <div className="pt-4 space-y-5">
                          {/* Basic Information */}
                          <div className={`mb-4 border-2 ${colorScheme.border} rounded-xl ${colorScheme.bg} p-4`}>
                            <button
                              className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                              onClick={() => toggleCategoryBasicInfo(categoryIndex)}
                              type="button"
                            >
                              <h4 className={`text-lg font-bold ${colorScheme.text}`}>Basic Information</h4>
                              <span className={`ml-2 transform transition-transform duration-200 ${categoryBasicInfo.includes(categoryIndex) ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            
                            {categoryBasicInfo.includes(categoryIndex) && (
                              <div className="pl-2 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.id}
                                      onChange={e => updateServiceCategory(categoryIndex, 'id', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.title}
                                      onChange={e => updateServiceCategory(categoryIndex, 'title', e.target.value)}
                                    />
                                  </div>
                                </div>
                                
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                  <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={category.description}
                                    onChange={e => updateServiceCategory(categoryIndex, 'description', e.target.value)}
                                    rows={3}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.titleColor || '#ffffff' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.titleColor || '#ffffff'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'titleColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.descriptionColor || '#f3f4f6' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.descriptionColor || '#f3f4f6'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'descriptionColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Text Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.cardTextColor || '#374151' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.cardTextColor || '#374151'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'cardTextColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Description Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.cardDescriptionColor || '#6b7280' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.cardDescriptionColor || '#6b7280'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'cardDescriptionColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Background & Colors */}
                          <div className={`mb-4 border-2 ${colorScheme.border} rounded-xl ${colorScheme.bg} p-4`}>
                            <button
                              className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                              onClick={() => toggleCategoryBackground(categoryIndex)}
                              type="button"
                            >
                              <h4 className={`text-lg font-bold ${colorScheme.text}`}>Background & Colors</h4>
                              <span className={`ml-2 transform transition-transform duration-200 ${categoryBackground.includes(categoryIndex) ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            
                            {categoryBackground.includes(categoryIndex) && (
                              <div className="pl-2 pt-2">
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={category.bgImage}
                                    onChange={e => updateServiceCategory(categoryIndex, 'bgImage', e.target.value)}
                                    placeholder="/images/your-image.jpg"
                                  />
                                </div>
                                
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                  <IconConfigField
                                    label=""
                                    value={category.icon}
                                    onChange={(value) => updateServiceCategory(categoryIndex, 'icon', value)}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.iconColor || '#ffffff' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.iconColor || '#ffffff'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'iconColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.bgColor || '#3b82f6' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.bgColor || '#3b82f6'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'bgColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.textColor || '#ffffff' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.textColor || '#ffffff'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'textColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Border Color</label>
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: category.borderColor || '#e5e7eb' }}></div>
                                      <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={category.borderColor || '#e5e7eb'}
                                        onChange={e => updateServiceCategory(categoryIndex, 'borderColor', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Advanced Styling */}
                          <div className={`mb-4 border-2 ${colorScheme.border} rounded-xl ${colorScheme.bg} p-4`}>
                            <button
                              className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                              onClick={() => {
                                // Toggle advanced styling section
                                const updatedAdvancedStyling = [...categoryAdvancedStyling];
                                const index = updatedAdvancedStyling.indexOf(categoryIndex);
                                if (index >= 0) {
                                  updatedAdvancedStyling.splice(index, 1);
                                } else {
                                  updatedAdvancedStyling.push(categoryIndex);
                                }
                                setCategoryAdvancedStyling(updatedAdvancedStyling);
                              }}
                              type="button"
                            >
                              <h4 className={`text-lg font-bold ${colorScheme.text}`}>Advanced Styling</h4>
                              <span className={`ml-2 transform transition-transform duration-200 ${categoryAdvancedStyling.includes(categoryIndex) ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            
                            {categoryAdvancedStyling.includes(categoryIndex) && (
                              <div className="pl-2 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.cardBorderRadius || '0.75rem'}
                                      onChange={e => updateServiceCategory(categoryIndex, 'cardBorderRadius', e.target.value)}
                                    >
                                      <option value="0">None</option>
                                      <option value="0.25rem">Small (0.25rem)</option>
                                      <option value="0.5rem">Medium (0.5rem)</option>
                                      <option value="0.75rem">Large (0.75rem)</option>
                                      <option value="1rem">Extra Large (1rem)</option>
                                      <option value="9999px">Full</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Shadow</label>
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.cardShadow || 'md'}
                                      onChange={e => updateServiceCategory(categoryIndex, 'cardShadow', e.target.value)}
                                    >
                                      <option value="none">None</option>
                                      <option value="sm">Small</option>
                                      <option value="md">Medium</option>
                                      <option value="lg">Large</option>
                                      <option value="xl">Extra Large</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Opacity</label>
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      step="5"
                                      className="w-full"
                                      value={(category.cardBackgroundOpacity || 100)}
                                      onChange={e => updateServiceCategory(categoryIndex, 'cardBackgroundOpacity', parseInt(e.target.value, 10))}
                                    />
                                    <span className="text-xs">{(category.cardBackgroundOpacity || 100) / 100}</span>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon Size</label>
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.iconSize || '1.5rem'}
                                      onChange={e => updateServiceCategory(categoryIndex, 'iconSize', e.target.value)}
                                    >
                                      <option value="1rem">Small (1rem)</option>
                                      <option value="1.25rem">Medium (1.25rem)</option>
                                      <option value="1.5rem">Large (1.5rem)</option>
                                      <option value="2rem">Extra Large (2rem)</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title Font Size</label>
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.titleFontSize || '1.25rem'}
                                      onChange={e => updateServiceCategory(categoryIndex, 'titleFontSize', e.target.value)}
                                    >
                                      <option value="0.875rem">Small (0.875rem)</option>
                                      <option value="1rem">Medium (1rem)</option>
                                      <option value="1.25rem">Large (1.25rem)</option>
                                      <option value="1.5rem">Extra Large (1.5rem)</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description Font Size</label>
                                    <select
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                      value={category.descriptionFontSize || '0.875rem'}
                                      onChange={e => updateServiceCategory(categoryIndex, 'descriptionFontSize', e.target.value)}
                                    >
                                      <option value="0.75rem">Small (0.75rem)</option>
                                      <option value="0.875rem">Medium (0.875rem)</option>
                                      <option value="1rem">Large (1rem)</option>
                                      <option value="1.125rem">Extra Large (1.125rem)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Category Preview */}
                          <div className={`mb-4 border-2 ${colorScheme.border} rounded-xl ${colorScheme.bg} p-4`}>
                            <button
                              className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                              onClick={() => toggleCategoryPreview(categoryIndex)}
                              type="button"
                            >
                              <h4 className={`text-lg font-bold ${colorScheme.text}`}>Category Preview</h4>
                              <span className={`ml-2 transform transition-transform duration-200 ${categoryPreview.includes(categoryIndex) ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            
                            {categoryPreview.includes(categoryIndex) && (
                              <div className="pl-2 pt-2">
                                <div className="relative overflow-hidden shadow-md" 
                                     style={{ 
                                       height: "150px", 
                                       borderColor: category.borderColor || '#e5e7eb', 
                                       borderWidth: '1px',
                                       borderRadius: category.cardBorderRadius || '0.75rem',
                                       boxShadow: getShadowClass(category.cardShadow || 'md')
                                     }}>
                                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${category.bgImage || '/images/back1.png'})`, opacity: 0.7 }}>
                                  </div>
                                  <div className="absolute inset-0" style={{ 
                                    backgroundColor: category.bgColor || '#3b82f6', 
                                    opacity: ((category.cardBackgroundOpacity || 100) / 100) * 0.8 
                                  }}>
                                  </div>
                                  <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                                    <div className="rounded-full bg-white/20 flex items-center justify-center" 
                                         style={{ 
                                           color: category.iconColor || '#ffffff',
                                           width: category.iconSize || '1.5rem',
                                           height: category.iconSize || '1.5rem',
                                           padding: '0.25rem'
                                         }}>
                                      <span className="text-xl">🔧</span>
                                    </div>
                                    <div>
                                      <h3 className="font-semibold" 
                                          style={{ 
                                            color: category.titleColor || '#ffffff',
                                            fontSize: category.titleFontSize || '1.25rem'
                                          }}>
                                        {category.title || 'Service Category'}
                                      </h3>
                                      <p className="line-clamp-2" 
                                         style={{ 
                                           color: category.descriptionColor || '#f3f4f6',
                                           fontSize: category.descriptionFontSize || '0.875rem'
                                         }}>
                                        {category.description || 'Description for this service category'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Services within this category */}
                          <div className={`mb-4 border-2 ${colorScheme.border} rounded-xl ${colorScheme.bg} p-4`}>
                            <h4 className={`text-lg font-bold ${colorScheme.text} mb-3`}>Services</h4>
                            
                            <div className="space-y-4 mt-3">
                              {(category.services || []).map((service: any, serviceIndex: number) => (
                                <div key={serviceIndex} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                  <button
                                    className="flex items-center w-full text-left gap-2 focus:outline-none"
                                    onClick={() => {
                                      const updatedSelectedServiceIndex = { ...selectedServiceIndex };
                                      if (updatedSelectedServiceIndex[categoryIndex] === serviceIndex) {
                                        updatedSelectedServiceIndex[categoryIndex] = null;
                                      } else {
                                        updatedSelectedServiceIndex[categoryIndex] = serviceIndex;
                                      }
                                      setSelectedServiceIndex(updatedSelectedServiceIndex);
                                    }}
                                    type="button"
                                  >
                                    <h4 className={`font-bold ${colorScheme.text}`}>{service.title || "Service"}</h4>
                                    <span className={`ml-auto transform transition-transform duration-200 ${selectedServiceIndex[categoryIndex] === serviceIndex ? 'rotate-180' : ''}`}>▼</span>
                                  </button>
                                  
                                  {selectedServiceIndex[categoryIndex] === serviceIndex && (
                                    <div className="pt-4 space-y-3">
                                      {/* Service Basic Information */}
                                      <div className="mb-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
                                        <button
                                          className="flex items-center w-full text-left gap-2 focus:outline-none"
                                          onClick={() => toggleServiceBasicInfo(categoryIndex, serviceIndex)}
                                          type="button"
                                        >
                                          <h5 className="font-medium text-gray-800">Basic Information</h5>
                                          <span className={`ml-auto text-sm transform transition-transform duration-200 ${serviceBasicInfo[`${categoryIndex}-${serviceIndex}`] ? 'rotate-180' : ''}`}>▼</span>
                                        </button>
                                        
                                        {serviceBasicInfo[`${categoryIndex}-${serviceIndex}`] && (
                                          <div className="pt-3 space-y-3">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                value={service.title}
                                                onChange={e => updateService(categoryIndex, serviceIndex, 'title', e.target.value)}
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                              <IconConfigField
                                                label=""
                                                value={service.icon}
                                                onChange={(value) => updateService(categoryIndex, serviceIndex, 'icon', value)}
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                              <textarea
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                value={service.description}
                                                onChange={e => updateService(categoryIndex, serviceIndex, 'description', e.target.value)}
                                                rows={2}
                                              />
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Color</label>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: service.iconColor || '#3b82f6' }}></div>
                                                  <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={service.iconColor || '#3b82f6'}
                                                    onChange={e => updateService(categoryIndex, serviceIndex, 'iconColor', e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: service.bgColor || '#f0f9ff' }}></div>
                                                  <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={service.bgColor || '#f0f9ff'}
                                                    onChange={e => updateService(categoryIndex, serviceIndex, 'bgColor', e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title Color</label>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: service.titleColor || '#374151' }}></div>
                                                  <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={service.titleColor || '#374151'}
                                                    onChange={e => updateService(categoryIndex, serviceIndex, 'titleColor', e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description Color</label>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: service.descriptionColor || '#6b7280' }}></div>
                                                  <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={service.descriptionColor || '#6b7280'}
                                                    onChange={e => updateService(categoryIndex, serviceIndex, 'descriptionColor', e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Border Color</label>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: service.borderColor || '#e5e7eb' }}></div>
                                                  <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    value={service.borderColor || '#e5e7eb'}
                                                    onChange={e => updateService(categoryIndex, serviceIndex, 'borderColor', e.target.value)}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Service Advanced Styling */}
                                      <div className="mb-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
                                        <button
                                          className="flex items-center w-full text-left gap-2 focus:outline-none"
                                          onClick={() => toggleServiceAdvancedStyling(categoryIndex, serviceIndex)}
                                          type="button"
                                        >
                                          <h5 className="font-medium text-gray-800">Advanced Styling</h5>
                                          <span className={`ml-auto text-sm transform transition-transform duration-200 ${serviceAdvancedStyling[`${categoryIndex}-${serviceIndex}`] ? 'rotate-180' : ''}`}>▼</span>
                                        </button>
                                        
                                        {serviceAdvancedStyling[`${categoryIndex}-${serviceIndex}`] && (
                                          <div className="pt-3 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                                                <select
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                  value={service.borderRadius || '0.5rem'}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'borderRadius', e.target.value)}
                                                >
                                                  <option value="0">None</option>
                                                  <option value="0.25rem">Small (0.25rem)</option>
                                                  <option value="0.5rem">Medium (0.5rem)</option>
                                                  <option value="0.75rem">Large (0.75rem)</option>
                                                  <option value="1rem">Extra Large (1rem)</option>
                                                  <option value="9999px">Full</option>
                                                </select>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Shadow</label>
                                                <select
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                  value={service.shadow || 'sm'}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'shadow', e.target.value)}
                                                >
                                                  <option value="none">None</option>
                                                  <option value="sm">Small</option>
                                                  <option value="md">Medium</option>
                                                  <option value="lg">Large</option>
                                                  <option value="xl">Extra Large</option>
                                                </select>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Background Opacity</label>
                                                <input
                                                  type="range"
                                                  min="0"
                                                  max="100"
                                                  step="5"
                                                  className="w-full"
                                                  value={(service.backgroundOpacity || 100)}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'backgroundOpacity', parseInt(e.target.value, 10))}
                                                />
                                                <span className="text-xs">{(service.backgroundOpacity || 100) / 100}</span>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Size</label>
                                                <select
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                  value={service.iconSize || '1.25rem'}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'iconSize', e.target.value)}
                                                >
                                                  <option value="1rem">Small (1rem)</option>
                                                  <option value="1.25rem">Medium (1.25rem)</option>
                                                  <option value="1.5rem">Large (1.5rem)</option>
                                                  <option value="2rem">Extra Large (2rem)</option>
                                                </select>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title Font Size</label>
                                                <select
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                  value={service.titleFontSize || '1rem'}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'titleFontSize', e.target.value)}
                                                >
                                                  <option value="0.875rem">Small (0.875rem)</option>
                                                  <option value="1rem">Medium (1rem)</option>
                                                  <option value="1.125rem">Large (1.125rem)</option>
                                                  <option value="1.25rem">Extra Large (1.25rem)</option>
                                                </select>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description Font Size</label>
                                                <select
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                  value={service.descriptionFontSize || '0.875rem'}
                                                  onChange={e => updateService(categoryIndex, serviceIndex, 'descriptionFontSize', e.target.value)}
                                                >
                                                  <option value="0.75rem">Small (0.75rem)</option>
                                                  <option value="0.875rem">Medium (0.875rem)</option>
                                                  <option value="1rem">Large (1rem)</option>
                                                  <option value="1.125rem">Extra Large (1.125rem)</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="text-right">
                                        <button
                                          onClick={() => removeService(categoryIndex, serviceIndex)}
                                          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
                                        >
                                          Remove Service
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                              
                              <div className="mt-3">
                                <button
                                  onClick={() => addService(categoryIndex)}
                                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                                >
                                  Add Service
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-right">
                            <button
                              onClick={() => removeServiceCategory(categoryIndex)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Remove Category
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Why Expertise Matters Section */}
      <div className="rounded-2xl shadow-xl bg-green-50 border-2 border-green-200 p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowExpertiseSection(!showExpertiseSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-green-800">Expertise Section</h3>
          <span className={`ml-auto text-green-600 text-xl transform transition-transform duration-200 ${showExpertiseSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showExpertiseSection && (
          <div className="space-y-6 mt-6">
            {/* Expertise Title & Description */}
            <div className="mb-4 border-2 border-green-200 rounded-xl bg-green-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowExpertiseTitle(!showExpertiseTitle)}
                type="button"
              >
                <h4 className="text-lg font-bold text-green-700">Title & Description</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showExpertiseTitle ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showExpertiseTitle && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-green-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={page.expertiseTitle || ''}
                      onChange={e => setPage({ ...page, expertiseTitle: e.target.value })}
                      placeholder="Section Title"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-green-700 mb-1">Section Description</label>
                    <textarea
                      className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={page.expertiseDescription || ''}
                      onChange={e => setPage({ ...page, expertiseDescription: e.target.value })}
                      placeholder="Section Description"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Expertise Cards */}
            <div className="mb-4 border-2 border-emerald-200 rounded-xl bg-emerald-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowExpertiseCards(!showExpertiseCards)}
                type="button"
              >
                <h4 className="text-lg font-bold text-emerald-700">Expertise Cards</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showExpertiseCards ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showExpertiseCards && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <p className="text-sm text-emerald-600 italic">Configure the expertise cards here.</p>
                    
                    {/* Here you would add the actual expertise cards configuration */}
                    {/* This is just a placeholder for now */}
                    <div className="px-4 py-3 bg-emerald-100/50 rounded-md mt-3 border border-emerald-200">
                      <p className="text-emerald-700">Coming soon: Configure expertise cards</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div className="rounded-2xl shadow-xl bg-amber-50 border-2 border-amber-200 p-6">
        <button
          className="flex items-center w-full text-left gap-2 focus:outline-none"
          onClick={() => setShowCtaSection(!showCtaSection)}
          type="button"
        >
          <h3 className="text-xl font-bold text-amber-800">Call to Action Section</h3>
          <span className={`ml-auto text-amber-600 text-xl transform transition-transform duration-200 ${showCtaSection ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {showCtaSection && (
          <div className="space-y-6 mt-6">
            {/* CTA Content */}
            <div className="mb-4 border-2 border-amber-200 rounded-xl bg-amber-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaContent(!showCtaContent)}
                type="button"
              >
                <h4 className="text-lg font-bold text-amber-700">CTA Content</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showCtaContent ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaContent && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-amber-700 mb-1">CTA Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={page.ctaTitle || ''}
                      onChange={e => setPage({ ...page, ctaTitle: e.target.value })}
                      placeholder="CTA Title"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-amber-700 mb-1">CTA Description</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={page.ctaDescription || ''}
                      onChange={e => setPage({ ...page, ctaDescription: e.target.value })}
                      placeholder="CTA Description"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="mb-4 border-2 border-orange-200 rounded-xl bg-orange-50 p-4">
              <button
                className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
                onClick={() => setShowCtaButtons(!showCtaButtons)}
                type="button"
              >
                <h4 className="text-lg font-bold text-orange-700">CTA Buttons</h4>
                <span className={`ml-2 transform transition-transform duration-200 ${showCtaButtons ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {showCtaButtons && (
                <div className="pl-2 pt-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-orange-700 mb-1">Schedule Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={page.scheduleButtonText || ''}
                      onChange={e => setPage({ ...page, scheduleButtonText: e.target.value })}
                      placeholder="Schedule Button Text"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-orange-700 mb-1">Call Button Text</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={page.callButtonText || ''}
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