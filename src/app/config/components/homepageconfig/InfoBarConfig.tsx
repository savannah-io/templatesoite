'use client';

import React, { useState } from 'react';

export default function InfoBarConfig({ config, setConfig }: { config: any, setConfig: (v: any) => void }) {
  // Use infoBar from config prop
  const infoBar = config.infoBar || {};
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper function to update preview iframes when colors change
  const updatePreviewIframes = (updatedConfig: any) => {
    if (typeof window !== 'undefined') {
      // First, make sure the config is saved to both localStorage and sessionStorage
      try {
        // Save to localStorage
        const currentConfig = localStorage.getItem('siteConfig');
        if (currentConfig) {
          const parsedConfig = JSON.parse(currentConfig);
          const mergedConfig = {
            ...parsedConfig,
            infoBar: {
              ...parsedConfig.infoBar,
              ...updatedConfig.infoBar
            }
          };
          localStorage.setItem('siteConfig', JSON.stringify(mergedConfig));
        } else {
          localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
        }
        
        // Save to sessionStorage for new iframe loads
        sessionStorage.setItem('previewConfig', JSON.stringify(updatedConfig));
      } catch (error) {
        console.error('Error saving config to storage:', error);
      }
      
      // Update any existing iframe previews
      const previewIframes = document.querySelectorAll('iframe');
      previewIframes.forEach(iframe => {
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage({
              type: 'configUpdate',
              config: updatedConfig,
              themeColor: updatedConfig.themeColor
            }, '*');
          } catch (error) {
            console.error('Error updating preview:', error);
          }
        }
      });
    }
  };

  // Helper function to update a color in the config and immediately update preview
  const updateColor = (colorType: string, value: string) => {
    const updatedConfig = { 
      ...config, 
      infoBar: { 
        ...config.infoBar, 
        [colorType]: value 
      } 
    };
    
    // Update React state
    setConfig(updatedConfig);
    
    // Update storage and iframe previews
    updatePreviewIframes(updatedConfig);
    
    // Force update on the Header component by dispatching a custom event
    if (typeof window !== 'undefined') {
      document.dispatchEvent(new CustomEvent('infobar-color-changed', { 
        detail: { 
          colorType, 
          value 
        } 
      }));
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-lg font-medium text-gray-900">Info Bar Configuration</h3>
        <span>{isCollapsed ? '▼' : '▲'}</span>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={infoBar.message || ''}
              onChange={(e) => {
                setConfig({
                  ...config,
                  infoBar: {
                    ...infoBar,
                    message: e.target.value
                  }
                });
              }}
              placeholder="Info bar message"
            />
            <p className="text-xs text-gray-500 mt-1">This message will be displayed as an announcement at the top of your site.</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={infoBar.phone || ''}
              onChange={(e) => {
                setConfig({
                  ...config,
                  infoBar: {
                    ...infoBar,
                    phone: e.target.value
                  }
                });
              }}
              placeholder="Phone number"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={infoBar.address || ''}
              onChange={(e) => {
                setConfig({
                  ...config,
                  infoBar: {
                    ...infoBar,
                    address: e.target.value
                  }
                });
              }}
              placeholder="Business address"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={infoBar.hours || ''}
              onChange={(e) => {
                setConfig({
                  ...config,
                  infoBar: {
                    ...infoBar,
                    hours: e.target.value
                  }
                });
              }}
              placeholder="Business hours"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Color:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-8 h-8 border border-gray-300"
                value={infoBar.backgroundColor || '#fde68a'}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    infoBar: {
                      ...infoBar,
                      backgroundColor: e.target.value
                    }
                  });
                }}
              />
              <input
                type="text"
                className="w-20 p-1 border border-gray-300 text-xs"
                value={infoBar.backgroundColor || '#fde68a'}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    infoBar: {
                      ...infoBar,
                      backgroundColor: e.target.value
                    }
                  });
                }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-8 h-8 border border-gray-300"
                value={infoBar.textColor || '#78350f'}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    infoBar: {
                      ...infoBar,
                      textColor: e.target.value
                    }
                  });
                }}
              />
              <input
                type="text"
                className="w-20 p-1 border border-gray-300 text-xs"
                value={infoBar.textColor || '#78350f'}
                onChange={(e) => {
                  setConfig({
                    ...config,
                    infoBar: {
                      ...infoBar,
                      textColor: e.target.value
                    }
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 