'use client';

import { useState } from 'react';

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

export default function NavBarConfig({ 
  config, 
  setConfig, 
  navBarExpanded, 
  setNavBarExpanded,
  handleRemovePage
}: { 
  config: any, 
  setConfig: (v: any) => void,
  navBarExpanded: boolean,
  setNavBarExpanded: (v: boolean | ((prev: boolean) => boolean)) => void,
  handleRemovePage: (pageKey: string) => void
}) {
  // State for collapsible sections
  const [showBackground, setShowBackground] = useState(false);
  const [showTextColor, setShowTextColor] = useState(false);
  const [showSiteTitle, setShowSiteTitle] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showScheduleButton, setShowScheduleButton] = useState(false);
  const [showActiveTab, setShowActiveTab] = useState(false);
  const [showNavLinks, setShowNavLinks] = useState(false);

  return (
    <>
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setNavBarExpanded((prev) => !prev)}
        type="button"
        style={{ color: '#111827' }}
      >
        <h2 className="text-xl font-bold">Nav Bar</h2>
        <span className="ml-2 text-xl transform transition-transform duration-200 text-gray-900">▼</span>
      </button>
      
      {navBarExpanded && (
        <div id="nav-bar-section" className="pl-2 space-y-6">
          {/* Background Color Section */}
          <div className="border-l-4 border-blue-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowBackground(prev => !prev)}>
              <span className="text-lg font-bold text-blue-800">Background Color</span>
              <span className={`transform transition-transform duration-200 ${showBackground ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showBackground && (
              <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.navBar?.backgroundColor || '#ffffff'}
                    onChange={e => setConfig({ ...config, navBar: { ...config.navBar, backgroundColor: e.target.value } })}
                    className="w-12 h-12 border-2 rounded-md cursor-pointer"
                    style={{ borderColor: config.navBar?.backgroundColor || '#ffffff' }}
                  />
                  <input
                    type="text"
                    value={config.navBar?.backgroundColor || '#ffffff'}
                    onChange={e => setConfig({ ...config, navBar: { ...config.navBar, backgroundColor: e.target.value } })}
                    className="w-28 border rounded px-3 py-2 text-sm font-mono"
                    style={{ 
                      borderColor: `${config.navBar?.backgroundColor || '#ffffff'}40`,
                      backgroundColor: `${config.navBar?.backgroundColor || '#ffffff'}10`
                    }}
                  />
                </div>
                <div className="ml-4 flex-1 bg-white rounded-md p-2 border border-gray-200 flex items-center">
                  <div 
                    className="w-6 h-6 rounded-full mr-2 shadow-sm"
                    style={{ backgroundColor: config.navBar?.backgroundColor || '#ffffff' }}
                  ></div>
                  <span className="text-sm text-gray-700">Background preview</span>
                </div>
              </div>
            )}
          </div>

          {/* Text Color Section */}
          <div className="border-l-4 border-purple-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowTextColor(prev => !prev)}>
              <span className="text-lg font-bold text-purple-800">Text Color</span>
              <span className={`transform transition-transform duration-200 ${showTextColor ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showTextColor && (
              <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.navBar?.textColor || '#0369a1'}
                    onChange={e => setConfig({ ...config, navBar: { ...config.navBar, textColor: e.target.value } })}
                    className="w-12 h-12 border-2 rounded-md cursor-pointer"
                    style={{ borderColor: config.navBar?.textColor || '#0369a1' }}
                  />
                  <input
                    type="text"
                    value={config.navBar?.textColor || '#0369a1'}
                    onChange={e => setConfig({ ...config, navBar: { ...config.navBar, textColor: e.target.value } })}
                    className="w-28 border rounded px-3 py-2 text-sm font-mono"
                    style={{ 
                      borderColor: `${config.navBar?.textColor || '#0369a1'}40`,
                      backgroundColor: `${config.navBar?.textColor || '#0369a1'}10`
                    }}
                  />
                </div>
                <div className="ml-4 flex-1 bg-white rounded-md p-2 border border-gray-200 flex items-center">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: config.navBar?.textColor || '#0369a1' }}
                  >Sample menu text</span>
                </div>
              </div>
            )}
          </div>

          {/* Site Title Section */}
          <div className="border-l-4 border-green-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowSiteTitle(prev => !prev)}>
              <span className="text-lg font-bold text-green-800">Site Title</span>
              <span className={`transform transition-transform duration-200 ${showSiteTitle ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showSiteTitle && (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 bg-green-50 p-4 rounded-lg">
                  <input
                    type="text"
                    value={config.navBar?.siteTitle || ''}
                    onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitle: e.target.value } })}
                    className="w-full border-2 border-green-200 rounded-lg px-3 py-2 text-lg font-semibold"
                    placeholder="Enter site title here"
                    style={{ backgroundColor: 'rgba(240, 253, 244, 0.5)' }}
                  />
                  <div className="px-4 py-3 bg-white rounded-lg border border-green-100 shadow-sm">
                    <div 
                      className="font-bold text-xl"
                      style={{
                        background: `linear-gradient(90deg, ${config.navBar?.siteTitleGradientFrom || '#3b82f6'}, ${config.navBar?.siteTitleGradientTo || '#06b6d4'})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block',
                      }}
                    >
                      {config.navBar?.siteTitle || 'Preview Site Title'}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mt-4 space-y-4">
                  <div className="font-medium text-green-800 mb-2">Gradient Colors</div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium text-gray-600 block">From:</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.navBar?.siteTitleGradientFrom || '#3b82f6'}
                          onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientFrom: e.target.value } })}
                          className="w-12 h-12 border-2 rounded-md cursor-pointer"
                          style={{ borderColor: config.navBar?.siteTitleGradientFrom || '#3b82f6' }}
                        />
                        <input
                          type="text"
                          value={config.navBar?.siteTitleGradientFrom || '#3b82f6'}
                          onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientFrom: e.target.value } })}
                          className="w-28 border rounded px-3 py-2 text-sm font-mono"
                          style={{ 
                            borderColor: `${config.navBar?.siteTitleGradientFrom || '#3b82f6'}40`,
                            backgroundColor: `${config.navBar?.siteTitleGradientFrom || '#3b82f6'}10`
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <label className="text-sm font-medium text-gray-600 block">To:</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.navBar?.siteTitleGradientTo || '#06b6d4'}
                          onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientTo: e.target.value } })}
                          className="w-12 h-12 border-2 rounded-md cursor-pointer"
                          style={{ borderColor: config.navBar?.siteTitleGradientTo || '#06b6d4' }}
                        />
                        <input
                          type="text"
                          value={config.navBar?.siteTitleGradientTo || '#06b6d4'}
                          onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientTo: e.target.value } })}
                          className="w-28 border rounded px-3 py-2 text-sm font-mono"
                          style={{ 
                            borderColor: `${config.navBar?.siteTitleGradientTo || '#06b6d4'}40`,
                            backgroundColor: `${config.navBar?.siteTitleGradientTo || '#06b6d4'}10`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-4 rounded-full mt-2" style={{
                    background: `linear-gradient(90deg, ${config.navBar?.siteTitleGradientFrom || '#3b82f6'}, ${config.navBar?.siteTitleGradientTo || '#06b6d4'})`
                  }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Logo Section */}
          <div className="border-l-4 border-yellow-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowLogo(prev => !prev)}>
              <span className="text-lg font-bold text-yellow-800">Logo</span>
              <span className={`transform transition-transform duration-200 ${showLogo ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showLogo && (
              <div className="space-y-4 bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!config.showLogo}
                    onChange={e => setConfig({ ...config, showLogo: e.target.checked })}
                    id="showLogo"
                    className="w-5 h-5 accent-yellow-600"
                  />
                  <label htmlFor="showLogo" className="font-medium text-gray-700">Show Logo in Nav Bar</label>
                </div>
                
                {config.showLogo && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-medium text-gray-600">Logo file name (from /images folder):</div>
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        className="flex-1 border-2 border-yellow-200 rounded-lg px-3 py-2 text-sm"
                        value={config.navBar?.logo?.startsWith('/images/') ? config.navBar.logo.slice(8) : (config.navBar?.logo || '')}
                        onChange={e => {
                          let val = e.target.value.trim();
                          if (val.startsWith('/images/')) val = val.slice(8);
                          setConfig({ ...config, navBar: { ...config.navBar, logo: val } });
                        }}
                        placeholder="e.g. logo.png"
                        style={{ backgroundColor: 'rgba(254, 252, 232, 0.5)' }}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg transition-colors font-medium"
                        onClick={() => setConfig({ ...config, navBar: { ...config.navBar, logo: '' } })}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-100 flex items-center gap-4">
                      <div className="text-sm font-medium text-gray-600">Preview:</div>
                      {config.navBar?.logo ? (
                        <div className="h-10 w-auto relative flex-shrink-0">
                          <img
                            src={config.navBar.logo.startsWith('/') ? config.navBar.logo : `/images/${config.navBar.logo}`}
                            alt="Logo Preview"
                            className="h-full w-auto object-contain"
                            onError={e => (e.currentTarget.src = 'https://via.placeholder.com/120x40?text=Logo+Not+Found')}
                          />
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 italic">No logo selected</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Schedule Button Section */}
          <div className="border-l-4 border-red-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowScheduleButton(prev => !prev)}>
              <span className="text-lg font-bold text-red-800">Schedule Button</span>
              <span className={`transform transition-transform duration-200 ${showScheduleButton ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScheduleButton && (
              <div className="space-y-4 bg-red-50 p-4 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Button Text:</div>
                  <input
                    type="text"
                    value={(config.navBar as NavBarConfigType)?.scheduleButtonText || 'Schedule Now'}
                    onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfigType), scheduleButtonText: e.target.value } })}
                    className="w-full border-2 border-red-200 rounded-lg px-3 py-2 text-base font-medium"
                    placeholder="Enter button text"
                    style={{ backgroundColor: 'rgba(254, 242, 242, 0.5)' }}
                  />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Button Color:</div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={(config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb'}
                      onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfigType), scheduleButtonColor: e.target.value } })}
                      className="w-12 h-12 border-2 rounded-md cursor-pointer"
                      style={{ borderColor: (config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb' }}
                    />
                    <input
                      type="text"
                      value={(config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb'}
                      onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfigType), scheduleButtonColor: e.target.value } })}
                      className="w-28 border rounded px-3 py-2 text-sm font-mono"
                      style={{ 
                        borderColor: `${(config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb'}40`,
                        backgroundColor: `${(config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb'}10`
                      }}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <div className="text-sm font-medium text-gray-600 mb-2">Preview:</div>
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: (config.navBar as NavBarConfigType)?.scheduleButtonColor || '#2563eb' }}
                  >
                    {(config.navBar as NavBarConfigType)?.scheduleButtonText || 'Schedule Now'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Tab Color Section */}
          <div className="border-l-4 border-indigo-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowActiveTab(prev => !prev)}>
              <span className="text-lg font-bold text-indigo-800">Active Tab Color</span>
              <span className={`transform transition-transform duration-200 ${showActiveTab ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showActiveTab && (
              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={(config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6'}
                    onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfigType), activeTabColor: e.target.value } })}
                    className="w-12 h-12 border-2 rounded-md cursor-pointer"
                    style={{ borderColor: (config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6' }}
                  />
                  <input
                    type="text"
                    value={(config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6'}
                    onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfigType), activeTabColor: e.target.value } })}
                    className="w-28 border rounded px-3 py-2 text-sm font-mono"
                    style={{ 
                      borderColor: `${(config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6'}40`,
                      backgroundColor: `${(config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6'}10`
                    }}
                  />
                </div>
                <div className="ml-4 flex-1 bg-white rounded-lg p-3 border border-indigo-100 flex flex-col">
                  <div className="text-sm font-medium text-gray-600 mb-2">Active tab indicator:</div>
                  <div className="flex gap-4 text-sm font-medium">
                    <span className="px-2">Home</span>
                    <span className="px-2 relative">
                      Services
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: (config.navBar as NavBarConfigType)?.activeTabColor || '#3b82f6' }}></div>
                    </span>
                    <span className="px-2">Contact</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nav Links Section */}
          <div className="border-l-4 border-pink-200 pl-4 pb-2">
            <button className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none" 
                onClick={() => setShowNavLinks(prev => !prev)}>
              <span className="text-lg font-bold text-pink-800">Navigation Links</span>
              <span className={`transform transition-transform duration-200 ${showNavLinks ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showNavLinks && (
              <div className="space-y-4 bg-pink-50 p-4 rounded-lg">
                <div className="font-medium text-gray-700 mb-3">Pages in Navigation:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {['Home', 'Services', 'Reviews', 'Contact', ...Object.keys(config.pages || {}).filter(key => !['Home', 'Services', 'Reviews', 'Contact'].includes(key))].map(pageKey => {
                    const inNav = config.navBar && Array.isArray(config.navBar.navLinks)
                      ? config.navBar.navLinks.some((link: any) => link.label === pageKey || link.label === `${pageKey} Page`)
                      : false;
                    return (
                      <div key={pageKey} className={`flex flex-col gap-2 p-3 rounded-lg transition-colors ${inNav ? 'bg-white border-2 border-pink-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="font-medium text-gray-800">{pageKey}</div>
                        <div className="flex justify-between items-center mt-1">
                          {inNav ? (
                            <button
                              className="px-3 py-1.5 text-sm bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-lg transition-colors font-medium w-full text-center"
                              onClick={() => {
                                const newLinks = config.navBar.navLinks.filter((link: any) => link.label !== pageKey && link.label !== `${pageKey} Page`);
                                setConfig({ ...config, navBar: { ...config.navBar, navLinks: newLinks } });
                              }}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors font-medium w-full text-center"
                              onClick={() => {
                                const newLinks = [...(config.navBar.navLinks || []), { label: pageKey, path: `/${pageKey.toLowerCase()}` }];
                                setConfig({ ...config, navBar: { ...config.navBar, navLinks: newLinks } });
                              }}
                            >
                              Add to Nav
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 