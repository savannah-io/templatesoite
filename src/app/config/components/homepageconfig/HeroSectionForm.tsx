'use client';

import { useState } from 'react';
import ColorSelectorInput from '@/app/config/components/ColorSelectorInput';

export default function HeroSectionForm({ page, setPage }: { page: any, setPage: (v: any) => void }) {
  const [showBadge, setShowBadge] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showGradients, setShowGradients] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showEstimates, setShowEstimates] = useState(false);
  const [showExpertTechs, setShowExpertTechs] = useState(false);
  const [showExpertTechs2, setShowExpertTechs2] = useState(false);

  return (
    <div className="rounded-2xl shadow-2xl border border-[#8b5cf6] bg-white/80 p-8 mb-8">
      <h3 className="text-2xl font-bold text-purple-700 mb-6">Hero Settings</h3>
      
      <div className="space-y-6">
        <div className="mb-2 flex items-center gap-4">
          <label className="font-semibold text-primary-700 mr-2">Hero Image:</label>
          {page.heroImage ? (
            <img
              src={`/images/${page.heroImage}`}
              alt="Hero Image Preview"
              className="h-10 w-auto rounded shadow border border-gray-200"
              onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80x40?text=No+Image')}
            />
          ) : (
            <img
              src={'https://via.placeholder.com/80x40?text=No+Image'}
              alt="No Hero Image"
              className="h-10 w-auto rounded shadow border border-gray-200"
            />
          )}
          <input
            type="text"
            className="ml-2 px-2 py-1 border rounded"
            value={page.heroImage || ''}
            onChange={e => {
              let val = e.target.value.trim();
              if (val.startsWith('/images/')) val = val.slice(8);
              setPage({ ...page, heroImage: val });
            }}
            placeholder="e.g. blue.png"
          />
          <button
            type="button"
            className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs"
            onClick={() => setPage({ ...page, heroImage: '' })}
          >Remove</button>
        </div>
        
        {/* Hero Badge Section */}
        <div className="mb-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowBadge(prev => !prev)}>
            <span className="text-xl font-extrabold text-pink-800">Hero Badge</span>
            <span className={`transform transition-transform duration-200 ${showBadge ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showBadge && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.badge || ''} onChange={e => setPage({ ...page, badge: e.target.value })} placeholder="Badge" />
              <div className="flex items-center gap-4">
                <input type="color" value={page.heroBadgeColor || '#1787c9'} onChange={e => setPage({ ...page, heroBadgeColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroBadgeColor || '#1787c9'} onChange={e => setPage({ ...page, heroBadgeColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={9} placeholder="#1787c9" />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label className="text-sm font-medium text-primary-700">Badge Text Color:</label>
                <input type="color" value={page.heroBadgeTitleColor || '#fff'} onChange={e => setPage({ ...page, heroBadgeTitleColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroBadgeTitleColor || '#fff'} onChange={e => setPage({ ...page, heroBadgeTitleColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Hero Title Section */}
        <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowTitle(prev => !prev)}>
            <span className="text-xl font-extrabold text-purple-800">Hero Title</span>
            <span className={`transform transition-transform duration-200 ${showTitle ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showTitle && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.title || ''} onChange={e => setPage({ ...page, title: e.target.value })} placeholder="Title" />
              <div className="flex items-center gap-4">
                <input type="color" value={page.heroTitleColor || '#fff'} onChange={e => setPage({ ...page, heroTitleColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroTitleColor || '#fff'} onChange={e => setPage({ ...page, heroTitleColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Location Section */}
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowLocation(prev => !prev)}>
            <span className="text-xl font-extrabold text-green-800">Location</span>
            <span className={`transform transition-transform duration-200 ${showLocation ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showLocation && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.location || ''} onChange={e => setPage({ ...page, location: e.target.value })} placeholder="Location" />
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Location Text Color:</label>
                <input type="color" value={page.heroLocationColor || '#fff'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroLocationColor || '#fff'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Subtitle Section */}
        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowSubtitle(prev => !prev)}>
            <span className="text-xl font-extrabold text-blue-800">Subtitle</span>
            <span className={`transform transition-transform duration-200 ${showSubtitle ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showSubtitle && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.subtitle || ''} onChange={e => setPage({ ...page, subtitle: e.target.value })} placeholder="Subtitle" />
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Subtitle Text Color:</label>
                <input type="color" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowContent(prev => !prev)}>
            <span className="text-xl font-extrabold text-yellow-800">Content</span>
            <span className={`transform transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showContent && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <textarea 
                className="w-full font-medium text-primary-600 bg-transparent border border-primary-200 focus:outline-none rounded p-2 mb-2" 
                value={page.content || ''} 
                onChange={e => setPage({ ...page, content: e.target.value })} 
                placeholder="Content"
                rows={4}
              />
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Content Text Color:</label>
                <input type="color" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Gradients Section */}
        <div className="mb-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowGradients(prev => !prev)}>
            <span className="text-xl font-extrabold text-indigo-800">Background & Gradients</span>
            <span className={`transform transition-transform duration-200 ${showGradients ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showGradients && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Overlay Color:</label>
                <input type="color" value={page.heroOverlayColor || 'rgba(0,0,0,0.5)'} onChange={e => setPage({ ...page, heroOverlayColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroOverlayColor || 'rgba(0,0,0,0.5)'} onChange={e => setPage({ ...page, heroOverlayColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-28" placeholder="rgba(0,0,0,0.5)" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Overlay Opacity:</label>
                <input type="range" min="0" max="1" step="0.01" value={page.heroOverlayOpacity ?? 0.5} onChange={e => setPage({ ...page, heroOverlayOpacity: parseFloat(e.target.value) })} className="w-32" />
                <span className="ml-2 text-xs">{page.heroOverlayOpacity ?? 0.5}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Gradient From:</label>
                <input type="color" value={page.heroGradientFrom || '#000000'} onChange={e => setPage({ ...page, heroGradientFrom: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientFrom || '#000000'} onChange={e => setPage({ ...page, heroGradientFrom: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#000000" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Gradient To:</label>
                <input type="color" value={page.heroGradientTo || '#000000'} onChange={e => setPage({ ...page, heroGradientTo: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientTo || '#000000'} onChange={e => setPage({ ...page, heroGradientTo: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#000000" />
              </div>
            </div>
          )}
        </div>
        
        {/* Schedule Button Section */}
        <div className="mb-6 bg-cyan-50 border-2 border-cyan-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowSchedule(prev => !prev)}>
            <span className="text-xl font-extrabold text-cyan-800">Schedule Button</span>
            <span className={`transform transition-transform duration-200 ${showSchedule ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showSchedule && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.scheduleButtonText || 'Schedule Now'} onChange={e => setPage({ ...page, scheduleButtonText: e.target.value })} placeholder="Schedule Button Text" />
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Button Color:</label>
                <input type="color" value={page.scheduleButtonColor || '#1787c9'} onChange={e => setPage({ ...page, scheduleButtonColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.scheduleButtonColor || '#1787c9'} onChange={e => setPage({ ...page, scheduleButtonColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1787c9" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Text Color:</label>
                <input type="color" value={page.scheduleButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, scheduleButtonTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.scheduleButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, scheduleButtonTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Contact Button Section */}
        <div className="mb-6 bg-orange-50 border-2 border-orange-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowContact(prev => !prev)}>
            <span className="text-xl font-extrabold text-orange-800">Contact Button</span>
            <span className={`transform transition-transform duration-200 ${showContact ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showContact && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.contactButtonText || 'Contact Us'} onChange={e => setPage({ ...page, contactButtonText: e.target.value })} placeholder="Contact Button Text" />
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Button Color:</label>
                <input type="color" value={page.contactButtonColor || '#f97316'} onChange={e => setPage({ ...page, contactButtonColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.contactButtonColor || '#f97316'} onChange={e => setPage({ ...page, contactButtonColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#f97316" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Text Color:</label>
                <input type="color" value={page.contactButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, contactButtonTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.contactButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, contactButtonTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Estimates Button Section */}
        <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowEstimates(prev => !prev)}>
            <span className="text-xl font-extrabold text-emerald-800">Estimates Button</span>
            <span className={`transform transition-transform duration-200 ${showEstimates ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showEstimates && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.estimatesButtonText || 'Get Estimate'} onChange={e => setPage({ ...page, estimatesButtonText: e.target.value })} placeholder="Estimates Button Text" />
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-primary-700">Button Color:</label>
                <input type="color" value={page.estimatesButtonColor || '#10b981'} onChange={e => setPage({ ...page, estimatesButtonColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.estimatesButtonColor || '#10b981'} onChange={e => setPage({ ...page, estimatesButtonColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#10b981" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Text Color:</label>
                <input type="color" value={page.estimatesButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, estimatesButtonTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.estimatesButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, estimatesButtonTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Expert Techs Section */}
        <div className="mb-6 bg-violet-50 border-2 border-violet-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowExpertTechs(prev => !prev)}>
            <span className="text-xl font-extrabold text-violet-800">Expert Techs</span>
            <span className={`transform transition-transform duration-200 ${showExpertTechs ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showExpertTechs && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.expertTechs || ''} onChange={e => setPage({ ...page, expertTechs: e.target.value })} placeholder="Expert Techs" />
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Text Color:</label>
                <input type="color" value={page.expertTechsColor || '#ffffff'} onChange={e => setPage({ ...page, expertTechsColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.expertTechsColor || '#ffffff'} onChange={e => setPage({ ...page, expertTechsColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Expert Techs 2 Section */}
        <div className="mb-6 bg-fuchsia-50 border-2 border-fuchsia-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowExpertTechs2(prev => !prev)}>
            <span className="text-xl font-extrabold text-fuchsia-800">Expert Techs 2</span>
            <span className={`transform transition-transform duration-200 ${showExpertTechs2 ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showExpertTechs2 && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.expertTechs2 || ''} onChange={e => setPage({ ...page, expertTechs2: e.target.value })} placeholder="Expert Techs 2" />
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-primary-700">Text Color:</label>
                <input type="color" value={page.expertTechs2Color || '#ffffff'} onChange={e => setPage({ ...page, expertTechs2Color: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.expertTechs2Color || '#ffffff'} onChange={e => setPage({ ...page, expertTechs2Color: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 