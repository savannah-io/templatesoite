'use client'

import React from 'react'
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput'
import { LocalConfig } from '@/config/localConfig'

// Define the FooterStyle interface
interface FooterStyle {
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
}

// Extend LocalConfig
interface ExtendedLocalConfig extends Omit<LocalConfig, 'footerStyle'> {
  footerStyle?: FooterStyle;
}

interface FooterStyleConfigProps {
  config: ExtendedLocalConfig;
  setConfig: (config: ExtendedLocalConfig) => void;
}

export default function FooterStyleConfig({
  config,
  setConfig
}: FooterStyleConfigProps) {
  // Helper function to update a footer style property
  const updateFooterStyle = (key: keyof FooterStyle, value: string) => {
    // Create a new config with the updated footerStyle
    const updatedConfig = {
      ...config,
      footerStyle: {
        ...(config.footerStyle || {}),
        [key]: value
      }
    };
    
    // Add minimal debounce protection for rapid changes
    setTimeout(() => {
      setConfig(updatedConfig);
    }, 50);
  };

  // Prevent event propagation to stop clicks from bubbling
  const handleColorInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const style = config.footerStyle || {};

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-6">
      <h3 className="text-lg font-semibold">Footer Style</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Background Gradient */}
        <div className="space-y-3">
          <h4 className="font-medium">Background Gradient</h4>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="From Color"
              value={style.gradientFromColor || '#ffffff'}
              onChange={(value: string) => updateFooterStyle('gradientFromColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="To Color"
              value={style.gradientToColor || '#f9fafb'}
              onChange={(value: string) => updateFooterStyle('gradientToColor', value)}
            />
          </div>
        </div>
        
        {/* Text Colors */}
        <div className="space-y-3">
          <h4 className="font-medium">Text Colors</h4>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Title Color"
              value={style.titleColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('titleColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Text Color"
              value={style.textColor || '#4b5563'}
              onChange={(value: string) => updateFooterStyle('textColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Link Color"
              value={style.linkColor || '#4b5563'}
              onChange={(value: string) => updateFooterStyle('linkColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Link Hover Color"
              value={style.linkHoverColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('linkHoverColor', value)}
            />
          </div>
        </div>
        
        {/* Section Title Colors */}
        <div className="space-y-3">
          <h4 className="font-medium">Section Titles</h4>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Quick Links Title"
              value={style.quickLinksTitleColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('quickLinksTitleColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Contact Info Title"
              value={style.contactInfoTitleColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('contactInfoTitleColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Info Title"
              value={style.infoTitleColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('infoTitleColor', value)}
            />
          </div>
        </div>
        
        {/* Accent Elements */}
        <div className="space-y-3">
          <h4 className="font-medium">Accent Elements</h4>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Social Icon Color"
              value={style.socialIconColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('socialIconColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Divider Color"
              value={style.dividerColor || 'rgba(79, 70, 229, 0.2)'}
              onChange={(value: string) => updateFooterStyle('dividerColor', value)}
            />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="space-y-3">
          <h4 className="font-medium">Bottom Bar</h4>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Copyright Text"
              value={style.copyrightTextColor || '#6b7280'}
              onChange={(value: string) => updateFooterStyle('copyrightTextColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Policy Link Color"
              value={style.policyLinkColor || '#6b7280'}
              onChange={(value: string) => updateFooterStyle('policyLinkColor', value)}
            />
          </div>
          <div onClick={handleColorInputClick}>
            <ColorSelectorInput
              label="Policy Link Hover"
              value={style.policyLinkHoverColor || '#4f46e5'}
              onChange={(value: string) => updateFooterStyle('policyLinkHoverColor', value)}
            />
          </div>
        </div>
      </div>
      
      {/* Save Changes Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          onClick={() => {
            // Dispatch an event to manually save the config
            const saveEvent = new CustomEvent('config-save-requested', {
              detail: { source: 'footer-style-config' }
            });
            document.dispatchEvent(saveEvent);
            
            // Visual confirmation for the user
            const saveConfirm = document.getElementById('save-confirm');
            if (saveConfirm) {
              saveConfirm.classList.remove('opacity-0');
              saveConfirm.classList.add('opacity-100');
              setTimeout(() => {
                saveConfirm.classList.remove('opacity-100');
                saveConfirm.classList.add('opacity-0');
              }, 2000);
            }
          }}
        >
          Save Changes
        </button>
        <div 
          id="save-confirm" 
          className="ml-3 opacity-0 transition-opacity duration-300 inline-flex items-center text-sm text-green-600"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Changes saved!
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Using the color editor</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Changes will be saved after you finish editing a color. Click the Save Changes button above to apply all your changes when you're done.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 