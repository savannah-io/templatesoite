'use client';

import { useState, useEffect } from 'react';

// Define types for footer config
type FooterConfigType = {
  companyName?: string;
  description?: string;
  footerLinks: { path: string; label: string }[];
  socialLinks: {
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  hours?: {
    weekday?: string;
    weekend?: string;
  };
  copyright?: string;
  showJoinTeamButton?: boolean;
  joinTeamText?: string;
  joinTeamLink?: string;
  footerStyle?: {
    backgroundColor?: string;
    gradientFromColor?: string;
    gradientToColor?: string;
    titleColor?: string;
    textColor?: string;
    linkColor?: string;
    linkHoverColor?: string;
    socialIconColor?: string;
    dividerColor?: string;
    quickLinksTitleColor?: string;
    contactInfoTitleColor?: string;
    infoTitleColor?: string;
    joinButtonBgColor?: string;
    joinButtonTextColor?: string;
    joinButtonHoverBgColor?: string;
    hoursCardBgColor?: string;
    hoursCardTextColor?: string;
    hoursCardValueColor?: string;
    copyrightTextColor?: string;
    policyLinkColor?: string;
    policyLinkHoverColor?: string;
  };
};

export default function FooterConfig({ 
  config, 
  setConfig, 
  footerExpanded, 
  setFooterExpanded 
}: { 
  config: any, 
  setConfig: (v: any) => void,
  footerExpanded: boolean,
  setFooterExpanded: (v: boolean) => void
}) {
  // State for collapsible sections
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showInfoSection, setShowInfoSection] = useState(false);
  const [showBackgroundColors, setShowBackgroundColors] = useState(false);
  const [showTitleColors, setShowTitleColors] = useState(false);
  const [showTextColors, setShowTextColors] = useState(false);
  const [showLinkColors, setShowLinkColors] = useState(false);
  const [showHoursCardColors, setShowHoursCardColors] = useState(false);
  const [showJoinButtonColors, setShowJoinButtonColors] = useState(false);

  // Initialize missing properties in config
  useEffect(() => {
    const initialConfig = { ...config };
    
    // Initialize footerStyle if it doesn't exist
    if (!initialConfig.footerStyle) {
      initialConfig.footerStyle = {
        backgroundColor: "#ffffff",
        gradientFromColor: "#ffffff",
        gradientToColor: "#f9fafb",
        titleColor: "#4f46e5",
        textColor: "#4b5563",
        linkColor: "#4b5563",
        linkHoverColor: "#4f46e5",
        socialIconColor: "#4f46e5",
        dividerColor: "rgba(79, 70, 229, 0.2)",
        quickLinksTitleColor: "#4f46e5",
        contactInfoTitleColor: "#4f46e5",
        infoTitleColor: "#4f46e5",
        joinButtonBgColor: "#4f46e5",
        joinButtonTextColor: "#ffffff",
        joinButtonHoverBgColor: "#4338ca",
        hoursCardBgColor: "rgba(255, 255, 255, 0.6)",
        hoursCardTextColor: "#4b5563",
        hoursCardValueColor: "#4f46e5",
        copyrightTextColor: "#6b7280",
        policyLinkColor: "#6b7280",
        policyLinkHoverColor: "#4f46e5"
      };
    }
    
    // Initialize socialLinks if it doesn't exist
    if (!initialConfig.socialLinks) {
      initialConfig.socialLinks = {
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: ''
      };
    }
    
    // Initialize footerLinks if it doesn't exist or is not an array
    if (!initialConfig.footerLinks || !Array.isArray(initialConfig.footerLinks)) {
      initialConfig.footerLinks = [];
    }
    
    // Initialize contactInfo if it doesn't exist
    if (!initialConfig.contactInfo) {
      initialConfig.contactInfo = {};
    }
    
    // Initialize hours if it doesn't exist
    if (!initialConfig.hours) {
      initialConfig.hours = {};
    }
    
    // Set these initial values to ensure the config has all necessary fields
    if (JSON.stringify(initialConfig) !== JSON.stringify(config)) {
      setConfig(initialConfig);
    }
  }, []);

  // Ensure footerStyle exists in config
  if (!config.footerStyle) {
    config.footerStyle = {
      backgroundColor: "#ffffff",
      gradientFromColor: "#ffffff",
      gradientToColor: "#f9fafb",
      titleColor: "#4f46e5",
      textColor: "#4b5563",
      linkColor: "#4b5563",
      linkHoverColor: "#4f46e5",
      socialIconColor: "#4f46e5",
      dividerColor: "rgba(79, 70, 229, 0.2)",
      quickLinksTitleColor: "#4f46e5",
      contactInfoTitleColor: "#4f46e5",
      infoTitleColor: "#4f46e5",
      joinButtonBgColor: "#4f46e5",
      joinButtonTextColor: "#ffffff",
      joinButtonHoverBgColor: "#4338ca",
      hoursCardBgColor: "rgba(255, 255, 255, 0.6)",
      hoursCardTextColor: "#4b5563",
      hoursCardValueColor: "#4f46e5",
      copyrightTextColor: "#6b7280",
      policyLinkColor: "#6b7280",
      policyLinkHoverColor: "#4f46e5"
    };
  }

  // Extract company name from siteTitle if not set
  const companyName = config.companyName || config.navBar?.siteTitle || 'Company Name';
  
  // Helper function to update config
  const updateFooterConfig = (key: string, value: any) => {
    // Create a new config with the updated value
    const updatedConfig = {
      ...config,
      [key]: value
    };
    
    // Update the parent component's state
    setConfig(updatedConfig);
    
    // Dispatch events to notify components that config has changed
    if (typeof window !== 'undefined') {
      // Dispatch standard event
      document.dispatchEvent(new Event('config-loaded'));
      
      // Also dispatch custom event with the updated config
      const customEvent = new CustomEvent('footer-config-updated', { 
        detail: { key, value, config: updatedConfig } 
      });
      document.dispatchEvent(customEvent);
      
      console.log(`Footer config updated: ${key}`);
    }
  };

  // Helper function to update nested config
  const updateNestedConfig = (path: string[], value: any) => {
    // Create a deep copy of the config
    const tempConfig = JSON.parse(JSON.stringify(config));
    let current = tempConfig;
    
    // Navigate the path and create any missing objects
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    // Update the final value
    current[path[path.length - 1]] = value;
    
    // Update the parent component's state
    setConfig(tempConfig);
    
    // Dispatch events to notify components that config has changed
    if (typeof window !== 'undefined') {
      // Dispatch standard event
      document.dispatchEvent(new Event('config-loaded'));
      
      // Also dispatch custom event with path information
      const customEvent = new CustomEvent('footer-config-updated', { 
        detail: { path, value, config: tempConfig } 
      });
      document.dispatchEvent(customEvent);
      
      console.log(`Footer nested config updated: ${path.join('.')}`);
    }
  };

  // Helper function for color input fields
  const ColorInput = ({ 
    label, 
    colorKey, 
    tooltip
  }: { 
    label: string, 
    colorKey: string,
    tooltip?: string 
  }) => {
    // Function to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number = 1) => {
      if (!hex) return `rgba(79, 70, 229, ${alpha.toFixed(2)})`; // Default purple if no hex
      
      if (hex.startsWith('rgba')) {
        // Already rgba format, just change alpha
        return hex.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, `rgba($1, $2, $3, ${alpha.toFixed(2)})`);
      }
      
      // Remove # if present
      const cleanHex = hex.replace('#', '');
      
      // Convert hex to rgb
      const r = parseInt(cleanHex.length === 3 ? cleanHex.slice(0, 1).repeat(2) : cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.length === 3 ? cleanHex.slice(1, 2).repeat(2) : cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.length === 3 ? cleanHex.slice(2, 3).repeat(2) : cleanHex.slice(4, 6), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
    };
    
    // Function to extract alpha from rgba
    const extractAlpha = (color: string): number => {
      if (!color) return 1;
      
      if (color.startsWith('rgba')) {
        const matches = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (matches && matches[4]) {
          return parseFloat(matches[4]);
        }
      }
      return 1; // Default alpha if not rgba
    };
    
    // Function to extract hex from rgba
    const rgbaToHex = (rgba: string): string => {
      if (!rgba) return '#4f46e5'; // Default purple if no rgba
      
      if (!rgba.startsWith('rgba')) return rgba;
      
      const matches = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
      if (!matches) return rgba;
      
      const r = parseInt(matches[1]);
      const g = parseInt(matches[2]);
      const b = parseInt(matches[3]);
      
      // Ensure proper hex format with leading zeros
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    // Safely get color from config, with fallback to default
    const getFooterStyleColor = (key: string): string => {
      if (!config || !config.footerStyle) return '#4f46e5';
      return config.footerStyle[key] || '#4f46e5';
    };
    
    // Get the current color value from config using the colorKey prop 
    const currentColor = getFooterStyleColor(colorKey);
    const currentAlpha = extractAlpha(currentColor);
    const baseColorHex = rgbaToHex(currentColor);
    
    return (
      <div className="flex flex-col items-start space-y-2 w-full">
        <div className="flex items-center space-x-3 w-full">
          <input
            type="color"
            value={baseColorHex}
            onChange={(e) => {
              const newColor = hexToRgba(e.target.value, currentAlpha);
              updateNestedConfig(['footerStyle', colorKey], newColor);
            }}
            className="w-12 h-12 border-2 rounded-md cursor-pointer"
            style={{ borderColor: currentColor }}
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => {
              const val = e.target.value;
              // Simple validation to allow both hex and rgba formats
              if (/^(#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})|rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\))$/.test(val) || val === '') {
                updateNestedConfig(['footerStyle', colorKey], val);
              }
            }}
            className="w-44 border rounded px-3 py-2 text-sm font-mono"
            style={{ 
              borderColor: `${currentColor}40`,
              backgroundColor: `${currentColor}10`
            }}
            placeholder="rgba() or #hex"
          />
        </div>
        
        <div className="flex items-center space-x-3 w-full">
          <span className="text-xs text-gray-500 w-20">Transparency:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round((1 - currentAlpha) * 100)}
            onChange={(e) => {
              const transparency = parseInt(e.target.value);
              const alpha = 1 - (transparency / 100);
              const newColor = hexToRgba(baseColorHex, alpha);
              updateNestedConfig(['footerStyle', colorKey], newColor);
            }}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono w-12 text-center">
            {Math.round((1 - currentAlpha) * 100)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setFooterExpanded(!footerExpanded)}
        type="button"
        style={{ color: '#111827' }}
      >
        <h2 className="text-xl font-bold">Footer</h2>
        <span className="ml-2 text-xl transform transition-transform duration-200 text-gray-900">▼</span>
      </button>
      
      {footerExpanded && (
        <div id="footer-section" className="pl-2 space-y-6">
          {/* Company Info Section */}
          <div className="border-l-4 border-purple-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowCompanyInfo(!showCompanyInfo)}>
              <span className="text-lg font-bold text-purple-800">Company Information</span>
              <span className={`transform transition-transform duration-200 ${showCompanyInfo ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showCompanyInfo && (
              <div className="space-y-4 bg-purple-50 p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Company Name:</label>
                  <input
                    type="text"
                    value={config.companyName || companyName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      console.log('Setting company name to:', newValue);
                      updateFooterConfig('companyName', newValue);
                      
                      // Dispatch an additional specific event for Footer
                      if (typeof window !== 'undefined') {
                        const specificEvent = new CustomEvent('footer-company-name-updated', {
                          detail: { companyName: newValue }
                        });
                        document.dispatchEvent(specificEvent);
                        console.log('Dispatched footer-company-name-updated event');
                      }
                    }}
                    className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 text-base"
                    placeholder="Enter company name"
                    style={{ backgroundColor: 'rgba(243, 232, 255, 0.5)' }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Description:</label>
                  <textarea
                    value={config.description || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      console.log('Setting description to:', newValue);
                      updateFooterConfig('description', newValue);
                      
                      // Dispatch an additional specific event for Footer
                      if (typeof window !== 'undefined') {
                        const specificEvent = new CustomEvent('footer-description-updated', {
                          detail: { description: newValue }
                        });
                        document.dispatchEvent(specificEvent);
                        console.log('Dispatched footer-description-updated event');
                      }
                    }}
                    className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 min-h-[80px]"
                    placeholder="Brief company description"
                    style={{ backgroundColor: 'rgba(243, 232, 255, 0.5)' }}
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-100 mt-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                  <div className="flex flex-col">
                    <div className="font-bold text-lg" style={{ color: config.footerStyle?.titleColor || '#4f46e5' }}>
                      {companyName}
                    </div>
                    <div className="text-sm mt-1" style={{ color: config.footerStyle?.textColor || '#4b5563' }}>
                      {config.description || 'Your company description will appear here'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Links Section */}
          <div className="border-l-4 border-blue-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowSocialLinks(!showSocialLinks)}>
              <span className="text-lg font-bold text-blue-800">Social Links</span>
              <span className={`transform transition-transform duration-200 ${showSocialLinks ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showSocialLinks && (
              <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
                {Object.entries(config.socialLinks || {}).map(([platform, url]) => (
                  <div key={platform} className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                      <div className="w-24 flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                        >
                          <span className="text-white text-xs font-bold">
                            {platform.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium capitalize">{platform}:</span>
                      </div>
                      <input
                        type="text"
                        value={url as string}
                        onChange={(e) => updateNestedConfig(['socialLinks', platform], e.target.value)}
                        className="flex-1 border-2 border-blue-100 rounded-lg px-3 py-2 text-sm"
                        placeholder={`https://${platform}.com/yourusername`}
                        style={{ backgroundColor: 'rgba(239, 246, 255, 0.5)' }}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="bg-white p-4 rounded-lg border border-blue-100 mt-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                  <div className="flex gap-4">
                    {Object.entries(config.socialLinks || {}).filter(([_, url]) => url).map(([platform]) => (
                      <div 
                        key={platform} 
                        className="w-8 h-8 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                      >
                        <span className="text-white text-xs font-bold">
                          {platform.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ))}
                    {!Object.values(config.socialLinks || {}).some(url => url) && (
                      <span className="text-sm text-gray-400 italic">No social links configured</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          <div className="border-l-4 border-green-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowQuickLinks(!showQuickLinks)}>
              <span className="text-lg font-bold text-green-800">Quick Links</span>
              <span className={`transform transition-transform duration-200 ${showQuickLinks ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showQuickLinks && (
              <div className="space-y-4 bg-green-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {(config.footerLinks || []).map((link: any, index: number) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-green-100 flex flex-col md:flex-row gap-3">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Link Label</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => {
                            const newLinks = [...config.footerLinks];
                            newLinks[index].label = e.target.value;
                            updateFooterConfig('footerLinks', newLinks);
                          }}
                          className="w-full border-2 border-green-100 rounded-lg px-3 py-2 text-sm"
                          placeholder="e.g., About Us"
                          style={{ backgroundColor: 'rgba(240, 253, 244, 0.5)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Link Path</label>
                        <input
                          type="text"
                          value={link.path}
                          onChange={(e) => {
                            const newLinks = [...config.footerLinks];
                            newLinks[index].path = e.target.value;
                            updateFooterConfig('footerLinks', newLinks);
                          }}
                          className="w-full border-2 border-green-100 rounded-lg px-3 py-2 text-sm"
                          placeholder="/about"
                          style={{ backgroundColor: 'rgba(240, 253, 244, 0.5)' }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newLinks = config.footerLinks.filter((_: any, i: number) => i !== index);
                          updateFooterConfig('footerLinks', newLinks);
                        }}
                        className="md:self-end px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [...(config.footerLinks || []), { label: '', path: '' }];
                    updateFooterConfig('footerLinks', newLinks);
                  }}
                  className="w-full px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Link
                </button>
                
                {(config.footerLinks || []).length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-green-100 mt-2">
                    <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {(config.footerLinks || []).map((link: any, index: number) => (
                        <div key={index} className="group">
                          <span 
                            className="text-sm transition-colors duration-200" 
                            style={{ 
                              color: config.footerStyle?.linkColor || '#4b5563',
                              cursor: 'pointer'
                            }}
                          >
                            {link.label || 'Link Label'}
                          </span>
                        </div>
                      ))}
                      {(config.footerLinks || []).length === 0 && (
                        <span className="text-sm text-gray-400 italic">No links configured</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Info Section */}
          <div className="border-l-4 border-amber-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowContactInfo(!showContactInfo)}>
              <span className="text-lg font-bold text-amber-800">Contact Information</span>
              <span className={`transform transition-transform duration-200 ${showContactInfo ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showContactInfo && (
              <div className="space-y-4 bg-amber-50 p-4 rounded-lg">
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-amber-100">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Address</label>
                    <textarea
                      value={config.contactInfo?.address || ''}
                      onChange={(e) => updateNestedConfig(['contactInfo', 'address'], e.target.value)}
                      className="w-full border-2 border-amber-100 rounded-lg px-3 py-2 text-sm"
                      placeholder="Enter company address"
                      style={{ backgroundColor: 'rgba(254, 252, 232, 0.5)' }}
                      rows={2}
                    />
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-amber-100">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
                    <input
                      type="text"
                      value={config.contactInfo?.phone || ''}
                      onChange={(e) => updateNestedConfig(['contactInfo', 'phone'], e.target.value)}
                      className="w-full border-2 border-amber-100 rounded-lg px-3 py-2 text-sm"
                      placeholder="(123) 456-7890"
                      style={{ backgroundColor: 'rgba(254, 252, 232, 0.5)' }}
                    />
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-amber-100">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
                    <input
                      type="email"
                      value={config.contactInfo?.email || ''}
                      onChange={(e) => updateNestedConfig(['contactInfo', 'email'], e.target.value)}
                      className="w-full border-2 border-amber-100 rounded-lg px-3 py-2 text-sm"
                      placeholder="contact@example.com"
                      style={{ backgroundColor: 'rgba(254, 252, 232, 0.5)' }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-amber-100 mt-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                  <div className="space-y-2">
                    {config.contactInfo?.address && (
                      <div className="flex gap-2 items-start">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                          style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: config.footerStyle?.textColor || '#4b5563' }}>
                          {config.contactInfo.address}
                        </span>
                      </div>
                    )}
                    
                    {config.contactInfo?.phone && (
                      <div className="flex gap-2 items-center">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" 
                          style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: config.footerStyle?.textColor || '#4b5563' }}>
                          {config.contactInfo.phone}
                        </span>
                      </div>
                    )}
                    
                    {config.contactInfo?.email && (
                      <div className="flex gap-2 items-center">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" 
                          style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: config.footerStyle?.textColor || '#4b5563' }}>
                          {config.contactInfo.email}
                        </span>
                      </div>
                    )}
                    
                    {!config.contactInfo?.address && !config.contactInfo?.phone && !config.contactInfo?.email && (
                      <span className="text-sm text-gray-400 italic">No contact information configured</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hours & Additional Info Section */}
          <div className="border-l-4 border-red-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowInfoSection(!showInfoSection)}>
              <span className="text-lg font-bold text-red-800">Hours & Additional Info</span>
              <span className={`transform transition-transform duration-200 ${showInfoSection ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showInfoSection && (
              <div className="space-y-4 bg-red-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-red-100">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Weekday Hours</label>
                    <input
                      type="text"
                      value={config.hours?.weekday || ''}
                      onChange={(e) => updateNestedConfig(['hours', 'weekday'], e.target.value)}
                      className="w-full border-2 border-red-100 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g., 8:30 AM - 6:00 PM"
                      style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                    />
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-red-100">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Weekend Hours</label>
                    <input
                      type="text"
                      value={config.hours?.weekend || ''}
                      onChange={(e) => updateNestedConfig(['hours', 'weekend'], e.target.value)}
                      className="w-full border-2 border-red-100 rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g., Closed"
                      style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-red-100 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showJoinTeamButton"
                    checked={config.showJoinTeamButton || false}
                    onChange={(e) => updateFooterConfig('showJoinTeamButton', e.target.checked)}
                    className="w-5 h-5 accent-red-600"
                  />
                  <label htmlFor="showJoinTeamButton" className="font-medium text-gray-700">
                    Show "Join Our Team" Button
                  </label>
                </div>
                
                {config.showJoinTeamButton && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-red-100">
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Button Text</label>
                      <input
                        type="text"
                        value={config.joinTeamText || 'Join Our Team'}
                        onChange={(e) => updateFooterConfig('joinTeamText', e.target.value)}
                        className="w-full border-2 border-red-100 rounded-lg px-3 py-2 text-sm"
                        placeholder="e.g., Join Our Team"
                        style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                      />
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-red-100">
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Button Link</label>
                      <input
                        type="text"
                        value={config.joinTeamLink || '/careers'}
                        onChange={(e) => updateFooterConfig('joinTeamLink', e.target.value)}
                        className="w-full border-2 border-red-100 rounded-lg px-3 py-2 text-sm"
                        placeholder="e.g., /careers"
                        style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="bg-white p-3 rounded-lg border border-red-100">
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Copyright Text</label>
                  <input
                    type="text"
                    value={config.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
                    onChange={(e) => updateFooterConfig('copyright', e.target.value)}
                    className="w-full border-2 border-red-100 rounded-lg px-3 py-2 text-sm"
                    style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <div className="text-sm font-medium text-gray-600 mb-3">Preview:</div>
                  <div className="space-y-4">
                    {(config.hours?.weekday || config.hours?.weekend) && (
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: config.footerStyle?.hoursCardBgColor || 'rgba(255, 255, 255, 0.6)' }}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" 
                            style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 space-y-2">
                            {config.hours?.weekday && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm" style={{ color: config.footerStyle?.hoursCardTextColor || '#4b5563' }}>
                                  Monday - Friday
                                </span>
                                <span className="font-medium text-sm" style={{ color: config.footerStyle?.hoursCardValueColor || '#4f46e5' }}>
                                  {config.hours.weekday}
                                </span>
                              </div>
                            )}
                            {config.hours?.weekend && (
                              <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                                <span className="text-sm" style={{ color: config.footerStyle?.hoursCardTextColor || '#4b5563' }}>
                                  Saturday - Sunday
                                </span>
                                <span className="font-medium text-sm" style={{ color: config.footerStyle?.hoursCardValueColor || '#4f46e5' }}>
                                  {config.hours.weekend}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {config.showJoinTeamButton && (
                      <button
                        className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
                        style={{ 
                          backgroundColor: config.footerStyle?.joinButtonBgColor || '#4f46e5',
                          color: config.footerStyle?.joinButtonTextColor || '#ffffff'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {config.joinTeamText || 'Join Our Team'}
                      </button>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <span className="text-xs" style={{ color: config.footerStyle?.copyrightTextColor || '#6b7280' }}>
                        {config.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Background Colors Section */}
          <div className="border-l-4 border-indigo-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowBackgroundColors(!showBackgroundColors)}>
              <span className="text-lg font-bold text-indigo-800">Background Colors</span>
              <span className={`transform transition-transform duration-200 ${showBackgroundColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showBackgroundColors && (
              <div className="space-y-4 bg-indigo-50 p-4 rounded-lg">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>New Feature:</strong> All color pickers now support transparency! Use the slider below each color to adjust opacity.
                  </p>
                  
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-xs text-gray-600">Transparency demonstration:</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="p-2 rounded bg-white" style={{ position: 'relative' }}>
                        <div style={{ background: 'rgba(79, 70, 229, 0.9)', padding: '6px', borderRadius: '4px', color: 'white' }}>
                          90% Opacity
                        </div>
                      </div>
                      <div className="p-2 rounded bg-white" style={{ position: 'relative' }}>
                        <div style={{ background: 'rgba(79, 70, 229, 0.5)', padding: '6px', borderRadius: '4px', color: 'white' }}>
                          50% Opacity
                        </div>
                      </div>
                      <div className="p-2 rounded bg-white" style={{ position: 'relative' }}>
                        <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '6px', borderRadius: '4px', color: 'black' }}>
                          20% Opacity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-indigo-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Background Start Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Background Start"
                      colorKey="gradientFromColor"
                      tooltip="Top gradient color of the footer background"
                    />
                    <div 
                      className="ml-2 w-6 h-6 rounded-full"
                      style={{ backgroundColor: config.footerStyle?.gradientFromColor || '#ffffff' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-indigo-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Background End Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Background End"
                      colorKey="gradientToColor"
                      tooltip="Bottom gradient color of the footer background"
                    />
                    <div 
                      className="ml-2 w-6 h-6 rounded-full"
                      style={{ backgroundColor: config.footerStyle?.gradientToColor || '#f9fafb' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-indigo-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Divider Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Divider"
                      colorKey="dividerColor"
                      tooltip="Color of dividers and underlines"
                    />
                    <div 
                      className="ml-2 w-10 h-1 rounded-full"
                      style={{ backgroundColor: config.footerStyle?.dividerColor || 'rgba(79, 70, 229, 0.2)' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <div className="text-sm font-medium text-gray-600 mb-3">Preview:</div>
                  <div 
                    className="h-20 rounded-lg relative overflow-hidden"
                    style={{
                      background: `linear-gradient(to bottom, ${config.footerStyle?.gradientFromColor || '#ffffff'}, ${config.footerStyle?.gradientToColor || '#f9fafb'})`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm text-gray-500">Footer Background</span>
                    </div>
                    <div 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-0.5 rounded-full"
                      style={{ backgroundColor: config.footerStyle?.dividerColor || 'rgba(79, 70, 229, 0.2)' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Title Colors Section */}
          <div className="border-l-4 border-pink-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowTitleColors(!showTitleColors)}>
              <span className="text-lg font-bold text-pink-800">Section Title Colors</span>
              <span className={`transform transition-transform duration-200 ${showTitleColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showTitleColors && (
              <div className="space-y-4 bg-pink-50 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-lg border border-pink-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Company Name Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Company Name"
                      colorKey="titleColor"
                      tooltip="Color of the company name text"
                    />
                    <div className="ml-2 flex-1 font-bold truncate" style={{ color: config.footerStyle?.titleColor || '#4f46e5' }}>
                      {companyName}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-pink-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Quick Links Title</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Quick Links"
                      colorKey="quickLinksTitleColor"
                      tooltip="Color of the 'Quick Links' heading"
                    />
                    <div className="ml-2 flex-1 font-semibold" style={{ color: config.footerStyle?.quickLinksTitleColor || '#4f46e5' }}>
                      Quick Links
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-pink-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Contact Info Title</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Contact Info"
                      colorKey="contactInfoTitleColor"
                      tooltip="Color of the 'Contact Info' heading"
                    />
                    <div className="ml-2 flex-1 font-semibold" style={{ color: config.footerStyle?.contactInfoTitleColor || '#4f46e5' }}>
                      Contact Info
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-pink-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Info Title</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Info"
                      colorKey="infoTitleColor"
                      tooltip="Color of the 'Info' heading"
                    />
                    <div className="ml-2 flex-1 font-semibold" style={{ color: config.footerStyle?.infoTitleColor || '#4f46e5' }}>
                      Info
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Text Colors Section */}
          <div className="border-l-4 border-cyan-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowTextColors(!showTextColors)}>
              <span className="text-lg font-bold text-cyan-800">Text Colors</span>
              <span className={`transform transition-transform duration-200 ${showTextColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showTextColors && (
              <div className="space-y-4 bg-cyan-50 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-lg border border-cyan-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Description Text Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Description"
                      colorKey="textColor"
                      tooltip="Color of the description text"
                    />
                    <div className="ml-2 flex-1 text-sm" style={{ color: config.footerStyle?.textColor || '#4b5563' }}>
                      Company description text
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-cyan-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Copyright Text Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Copyright"
                      colorKey="copyrightTextColor"
                      tooltip="Color of the copyright text at the bottom"
                    />
                    <div className="ml-2 flex-1 text-xs" style={{ color: config.footerStyle?.copyrightTextColor || '#6b7280' }}>
                      © 2023 Company Name. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Link Colors Section */}
          <div className="border-l-4 border-violet-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowLinkColors(!showLinkColors)}>
              <span className="text-lg font-bold text-violet-800">Link Colors</span>
              <span className={`transform transition-transform duration-200 ${showLinkColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showLinkColors && (
              <div className="space-y-4 bg-violet-50 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-lg border border-violet-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Link Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Link"
                      colorKey="linkColor"
                      tooltip="Default color of links"
                    />
                    <div className="ml-2 flex-1">
                      <span style={{ color: config.footerStyle?.linkColor || '#4b5563' }}>
                        Normal link
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-violet-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Link Hover Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Link Hover"
                      colorKey="linkHoverColor"
                      tooltip="Color of links when hovered"
                    />
                    <div className="ml-2 flex-1">
                      <span style={{ color: config.footerStyle?.linkHoverColor || '#4f46e5' }}>
                        Hover link
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-violet-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Social Icon Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Social Icon"
                      colorKey="socialIconColor"
                      tooltip="Color of social media icons"
                    />
                    <div className="ml-2 flex-1 flex gap-2">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: config.footerStyle?.socialIconColor || '#4f46e5' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-violet-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Policy Link Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Policy Link"
                      colorKey="policyLinkColor"
                      tooltip="Color of privacy policy and terms links"
                    />
                    <div className="ml-2 flex-1">
                      <span style={{ color: config.footerStyle?.policyLinkColor || '#6b7280' }}>
                        Privacy Policy
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-violet-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Policy Link Hover Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Policy Link Hover"
                      colorKey="policyLinkHoverColor"
                      tooltip="Color of privacy policy and terms links when hovered"
                    />
                    <div className="ml-2 flex-1">
                      <span style={{ color: config.footerStyle?.policyLinkHoverColor || '#4f46e5' }}>
                        Terms of Service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Hours Card Colors Section */}
          <div className="border-l-4 border-emerald-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowHoursCardColors(!showHoursCardColors)}>
              <span className="text-lg font-bold text-emerald-800">Hours Card Colors</span>
              <span className={`transform transition-transform duration-200 ${showHoursCardColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showHoursCardColors && (
              <div className="space-y-4 bg-emerald-50 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Card Background</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Card Background"
                      colorKey="hoursCardBgColor"
                      tooltip="Background color of the hours card"
                    />
                    <div 
                      className="ml-2 w-16 h-6 rounded"
                      style={{ backgroundColor: config.footerStyle?.hoursCardBgColor || 'rgba(255, 255, 255, 0.6)' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Hours Label Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Label"
                      colorKey="hoursCardTextColor"
                      tooltip="Color of the 'Monday-Friday' text"
                    />
                    <div className="ml-2 flex-1 text-sm" style={{ color: config.footerStyle?.hoursCardTextColor || '#4b5563' }}>
                      Monday - Friday
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Hours Value Color</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Value"
                      colorKey="hoursCardValueColor"
                      tooltip="Color of the hours values (e.g., '8:30 AM - 6:00 PM')"
                    />
                    <div className="ml-2 flex-1 text-sm font-medium" style={{ color: config.footerStyle?.hoursCardValueColor || '#4f46e5' }}>
                      8:30 AM - 6:00 PM
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-emerald-100">
                  <div className="text-sm font-medium text-gray-600 mb-3">Preview:</div>
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: config.footerStyle?.hoursCardBgColor || 'rgba(255, 255, 255, 0.6)' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: config.footerStyle?.hoursCardTextColor || '#4b5563' }}>
                        Monday - Friday
                      </span>
                      <span className="font-medium text-sm" style={{ color: config.footerStyle?.hoursCardValueColor || '#4f46e5' }}>
                        8:30 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                      <span className="text-sm" style={{ color: config.footerStyle?.hoursCardTextColor || '#4b5563' }}>
                        Saturday - Sunday
                      </span>
                      <span className="font-medium text-sm" style={{ color: config.footerStyle?.hoursCardValueColor || '#4f46e5' }}>
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Join Button Colors Section */}
          <div className="border-l-4 border-orange-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowJoinButtonColors(!showJoinButtonColors)}>
              <span className="text-lg font-bold text-orange-800">Join Team Button Colors</span>
              <span className={`transform transition-transform duration-200 ${showJoinButtonColors ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showJoinButtonColors && (
              <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Button Background</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Background"
                      colorKey="joinButtonBgColor"
                      tooltip="Background color of the 'Join Our Team' button"
                    />
                    <div 
                      className="ml-2 w-16 h-6 rounded"
                      style={{ backgroundColor: config.footerStyle?.joinButtonBgColor || '#4f46e5' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Button Text</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Text"
                      colorKey="joinButtonTextColor"
                      tooltip="Text color of the 'Join Our Team' button"
                    />
                    <div className="ml-2 flex-1" style={{ color: config.footerStyle?.joinButtonTextColor || '#ffffff' }}>
                      Join Our Team
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">Button Hover Background</label>
                  <div className="flex items-center gap-4">
                    <ColorInput
                      label="Hover"
                      colorKey="joinButtonHoverBgColor"
                      tooltip="Background color when the 'Join Our Team' button is hovered"
                    />
                    <div 
                      className="ml-2 w-16 h-6 rounded"
                      style={{ backgroundColor: config.footerStyle?.joinButtonHoverBgColor || '#4338ca' }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-orange-100">
                  <div className="text-sm font-medium text-gray-600 mb-3">Preview:</div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ 
                        backgroundColor: config.footerStyle?.joinButtonBgColor || '#4f46e5',
                        color: config.footerStyle?.joinButtonTextColor || '#ffffff'
                      }}
                    >
                      Normal
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ 
                        backgroundColor: config.footerStyle?.joinButtonHoverBgColor || '#4338ca',
                        color: config.footerStyle?.joinButtonTextColor || '#ffffff'
                      }}
                    >
                      Hover
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 