'use client';

import React, { useRef } from 'react';

type NavBarConfigType = {
  backgroundColor: string;
  textColor: string;
  logo: string;
  siteTitle: string;
  siteTitleGradientFrom: string;
  siteTitleGradientTo: string;
  navLinks: { path: string; label: string }[];
  scheduleButtonText: string;
  scheduleButtonColor: string;
  activeTabColor: string;
};

export default function NavBarConfig({ config, setConfig }: { config: any, setConfig: (v: any) => void }) {
  // Get navBar from the config prop
  const navBar = config.navBar || {};
  
  // Reference to the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to update a navBar property
  const updateNavBar = (key: string, value: any) => {
    setConfig({
      ...config,
      navBar: {
        ...navBar,
        [key]: value
      }
    });
  };

  // Helper function to update navLinks
  const updateNavLinks = (newLinks: any[]) => {
    setConfig({
      ...config,
      navBar: {
        ...navBar,
        navLinks: newLinks
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Site Title:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={navBar.siteTitle || ''}
          onChange={(e) => updateNavBar('siteTitle', e.target.value)}
          placeholder="Site Title"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo:</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300"
            value={navBar.logo || ''}
            onChange={(e) => updateNavBar('logo', e.target.value)}
            placeholder="Logo image path (e.g., logo.png)"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
          >
            Browse
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                // This is just for preview, in a real app you'd upload the file
                updateNavBar('logo', URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </div>
        {navBar.logo && (
          <div className="mt-2 flex items-center space-x-2">
            <img 
              src={navBar.logo.startsWith('/') ? navBar.logo : `/images/${navBar.logo}`}
              alt="Logo Preview" 
              className="h-8 w-auto border border-gray-200"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/120x40?text=Logo+Not+Found')}
            />
            <button
              onClick={() => updateNavBar('logo', '')}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title Gradient Colors:</label>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">From:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-8 h-8 border border-gray-300"
                value={navBar.siteTitleGradientFrom || '#3b82f6'}
                onChange={(e) => updateNavBar('siteTitleGradientFrom', e.target.value)}
              />
              <input
                type="text"
                className="w-20 p-1 border border-gray-300 text-xs"
                value={navBar.siteTitleGradientFrom || '#3b82f6'}
                onChange={(e) => updateNavBar('siteTitleGradientFrom', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">To:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-8 h-8 border border-gray-300"
                value={navBar.siteTitleGradientTo || '#06b6d4'}
                onChange={(e) => updateNavBar('siteTitleGradientTo', e.target.value)}
              />
              <input
                type="text"
                className="w-20 p-1 border border-gray-300 text-xs"
                value={navBar.siteTitleGradientTo || '#06b6d4'}
                onChange={(e) => updateNavBar('siteTitleGradientTo', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div 
          className="h-6 rounded my-2 flex items-center justify-center text-white font-bold" 
          style={{
            background: `linear-gradient(90deg, ${navBar.siteTitleGradientFrom || '#3b82f6'}, ${navBar.siteTitleGradientTo || '#06b6d4'})`
          }}
        >
          {navBar.siteTitle || 'Title Preview'}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300"
            value={navBar.backgroundColor || '#ffffff'}
            onChange={(e) => updateNavBar('backgroundColor', e.target.value)}
          />
          <input
            type="text"
            className="w-20 p-1 border border-gray-300 text-xs"
            value={navBar.backgroundColor || '#ffffff'}
            onChange={(e) => updateNavBar('backgroundColor', e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300"
            value={navBar.textColor || '#000000'}
            onChange={(e) => updateNavBar('textColor', e.target.value)}
          />
          <input
            type="text"
            className="w-20 p-1 border border-gray-300 text-xs"
            value={navBar.textColor || '#000000'}
            onChange={(e) => updateNavBar('textColor', e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Active Tab Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300"
            value={navBar.activeTabColor || '#000000'}
            onChange={(e) => updateNavBar('activeTabColor', e.target.value)}
          />
          <input
            type="text"
            className="w-20 p-1 border border-gray-300 text-xs"
            value={navBar.activeTabColor || '#000000'}
            onChange={(e) => updateNavBar('activeTabColor', e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Button Text:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={navBar.scheduleButtonText || 'Schedule Now'}
          onChange={(e) => updateNavBar('scheduleButtonText', e.target.value)}
          placeholder="Schedule Button Text"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Button Color:</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300"
            value={navBar.scheduleButtonColor || '#4f46e5'}
            onChange={(e) => updateNavBar('scheduleButtonColor', e.target.value)}
          />
          <input
            type="text"
            className="w-20 p-1 border border-gray-300 text-xs"
            value={navBar.scheduleButtonColor || '#4f46e5'}
            onChange={(e) => updateNavBar('scheduleButtonColor', e.target.value)}
          />
        </div>
        <div className="mt-2 p-2 border border-gray-200 rounded flex items-center justify-center">
          <button
            className="px-4 py-2 text-white rounded"
            style={{ backgroundColor: navBar.scheduleButtonColor || '#4f46e5' }}
          >
            {navBar.scheduleButtonText || 'Schedule Now'}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Links:</label>
        <div className="space-y-3">
          {(navBar.navLinks || []).map((link: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300"
                value={link.label || ''}
                onChange={(e) => {
                  const newLinks = [...(navBar.navLinks || [])];
                  newLinks[index] = { ...newLinks[index], label: e.target.value };
                  updateNavLinks(newLinks);
                }}
                placeholder="Link Label"
              />
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300"
                value={link.path || ''}
                onChange={(e) => {
                  const newLinks = [...(navBar.navLinks || [])];
                  newLinks[index] = { ...newLinks[index], path: e.target.value };
                  updateNavLinks(newLinks);
                }}
                placeholder="Link Path (e.g., /about)"
              />
              <button
                onClick={() => {
                  const newLinks = [...(navBar.navLinks || [])].filter((_, i) => i !== index);
                  updateNavLinks(newLinks);
                }}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newLinks = [...(navBar.navLinks || []), { label: '', path: '' }];
              updateNavLinks(newLinks);
            }}
            className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200"
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
} 