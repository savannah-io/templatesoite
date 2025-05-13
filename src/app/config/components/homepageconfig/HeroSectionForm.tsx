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
    <div className="border border-gray-300 bg-white p-4 mb-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Hero Settings</h3>
      
      <div className="space-y-4">
        <div className="mb-2 flex items-center gap-2">
          <label className="font-medium text-gray-700 mr-2">Hero Image:</label>
          {page.heroImage ? (
            <img
              src={`/images/${page.heroImage}`}
              alt="Hero Image Preview"
              className="h-8 w-auto border border-gray-200"
              onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80x40?text=No+Image')}
            />
          ) : (
            <img
              src={'https://via.placeholder.com/80x40?text=No+Image'}
              alt="No Hero Image"
              className="h-8 w-auto border border-gray-200"
            />
          )}
          <input
            type="text"
            className="ml-2 px-2 py-1 border border-gray-300"
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
            className="ml-2 px-2 py-1 bg-gray-200 text-xs"
            onClick={() => setPage({ ...page, heroImage: '' })}
          >Remove</button>
        </div>
        
        {/* Hero Badge Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowBadge(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Hero Badge</span>
            <span className={`transform transition-transform duration-200 ${showBadge ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showBadge && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.badge || ''} onChange={e => setPage({ ...page, badge: e.target.value })} placeholder="Badge" />
              <div className="flex items-center gap-3">
                <input type="color" value={page.heroBadgeColor || '#1787c9'} onChange={e => setPage({ ...page, heroBadgeColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroBadgeColor || '#1787c9'} onChange={e => setPage({ ...page, heroBadgeColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={9} placeholder="#1787c9" />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <label className="text-sm text-gray-600">Badge Text Color:</label>
                <input type="color" value={page.heroBadgeTitleColor || '#fff'} onChange={e => setPage({ ...page, heroBadgeTitleColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroBadgeTitleColor || '#fff'} onChange={e => setPage({ ...page, heroBadgeTitleColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Hero Title Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowTitle(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Hero Title</span>
            <span className={`transform transition-transform duration-200 ${showTitle ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showTitle && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.title || ''} onChange={e => setPage({ ...page, title: e.target.value })} placeholder="Title" />
              <div className="flex items-center gap-3">
                <input type="color" value={page.heroTitleColor || '#fff'} onChange={e => setPage({ ...page, heroTitleColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroTitleColor || '#fff'} onChange={e => setPage({ ...page, heroTitleColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Location Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowLocation(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Location</span>
            <span className={`transform transition-transform duration-200 ${showLocation ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showLocation && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.location || ''} onChange={e => setPage({ ...page, location: e.target.value })} placeholder="Location" />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Location Text Color:</label>
                <input type="color" value={page.heroLocationColor || '#fff'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroLocationColor || '#fff'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Subtitle Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowSubtitle(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Subtitle</span>
            <span className={`transform transition-transform duration-200 ${showSubtitle ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showSubtitle && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.subtitle || ''} onChange={e => setPage({ ...page, subtitle: e.target.value })} placeholder="Subtitle" />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Subtitle Text Color:</label>
                <input type="color" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowContent(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Content</span>
            <span className={`transform transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showContent && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <textarea 
                className="w-full font-medium border border-gray-300 focus:outline-none p-2 mb-2" 
                value={page.content || ''} 
                onChange={e => setPage({ ...page, content: e.target.value })} 
                placeholder="Content"
                rows={4}
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Content Text Color:</label>
                <input type="color" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Gradients Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowGradients(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Background & Gradients</span>
            <span className={`transform transition-transform duration-200 ${showGradients ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showGradients && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Gradient Color:</label>
                <input type="color" value={page.heroGradientColor || '#1c3f31'} onChange={e => setPage({ ...page, heroGradientColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroGradientColor || '#1c3f31'} onChange={e => setPage({ ...page, heroGradientColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#1c3f31" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Radial Color:</label>
                <input type="color" value={page.heroRadialColor || '#387e62'} onChange={e => setPage({ ...page, heroRadialColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroRadialColor || '#387e62'} onChange={e => setPage({ ...page, heroRadialColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Gradient Top:</label>
                <input type="color" value={page.heroGradientTop || '#387e62'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroGradientTop || '#387e62'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Gradient Middle:</label>
                <input type="color" value={page.heroGradientMiddle || '#387e62'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroGradientMiddle || '#387e62'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Gradient Bottom:</label>
                <input type="color" value={page.heroGradientBottom || '#387e62'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroGradientBottom || '#387e62'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Gradient Left:</label>
                <input type="color" value={page.heroGradientLeft || '#387e62'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.heroGradientLeft || '#387e62'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
              </div>
            </div>
          )}
        </div>
        
        {/* Schedule Button Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowSchedule(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Schedule Button</span>
            <span className={`transform transition-transform duration-200 ${showSchedule ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showSchedule && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.scheduleButtonText || 'Schedule Now'} onChange={e => setPage({ ...page, scheduleButtonText: e.target.value })} placeholder="Schedule Button Text" />
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Button Color:</label>
                <input type="color" value={page.scheduleButtonColor || '#1787c9'} onChange={e => setPage({ ...page, scheduleButtonColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.scheduleButtonColor || '#1787c9'} onChange={e => setPage({ ...page, scheduleButtonColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#1787c9" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Text Color:</label>
                <input type="color" value={page.scheduleButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, scheduleButtonTextColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.scheduleButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, scheduleButtonTextColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Contact Button Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowContact(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Contact Button</span>
            <span className={`transform transition-transform duration-200 ${showContact ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showContact && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" value={page.contactButtonText || 'Contact Us'} onChange={e => setPage({ ...page, contactButtonText: e.target.value })} placeholder="Contact Button Text" />
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Button Color:</label>
                <input type="color" value={page.contactButtonColor || '#f97316'} onChange={e => setPage({ ...page, contactButtonColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.contactButtonColor || '#f97316'} onChange={e => setPage({ ...page, contactButtonColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#f97316" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Text Color:</label>
                <input type="color" value={page.contactButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, contactButtonTextColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.contactButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, contactButtonTextColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Estimates Button Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowEstimates(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Hero Card 1</span>
            <span className={`transform transition-transform duration-200 ${showEstimates ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showEstimates && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input 
                className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" 
                value={page.heroCard1Text || 'Hero Card 1'} 
                onChange={e => setPage({ ...page, heroCard1Text: e.target.value })} 
                placeholder="Hero Card 1 Text" 
              />
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm text-gray-600">Button Color:</label>
                <input type="color" value={page.estimatesButtonColor || '#10b981'} onChange={e => setPage({ ...page, estimatesButtonColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.estimatesButtonColor || '#10b981'} onChange={e => setPage({ ...page, estimatesButtonColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#10b981" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Text Color:</label>
                <input type="color" value={page.estimatesButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, estimatesButtonTextColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.estimatesButtonTextColor || '#ffffff'} onChange={e => setPage({ ...page, estimatesButtonTextColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Expert Techs Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowExpertTechs(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Hero Card 2</span>
            <span className={`transform transition-transform duration-200 ${showExpertTechs ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showExpertTechs && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input 
                className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" 
                value={page.heroCard2Text || 'Hero Card 2'} 
                onChange={e => setPage({ ...page, heroCard2Text: e.target.value })} 
                placeholder="Hero Card 2 Text" 
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Text Color:</label>
                <input type="color" value={page.expertTechsColor || '#ffffff'} onChange={e => setPage({ ...page, expertTechsColor: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.expertTechsColor || '#ffffff'} onChange={e => setPage({ ...page, expertTechsColor: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
        
        {/* Expert Techs 2 Section */}
        <div className="mb-4 border border-gray-300 p-3">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" 
                onClick={() => setShowExpertTechs2(prev => !prev)}>
            <span className="text-base font-bold text-gray-700">Hero Card 3</span>
            <span className={`transform transition-transform duration-200 ${showExpertTechs2 ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showExpertTechs2 && (
            <div className="pl-2 pt-2 flex flex-col gap-3">
              <input 
                className="w-full font-medium border-b border-gray-300 focus:outline-none mb-2" 
                value={page.heroCard3Text || 'Hero Card 3'} 
                onChange={e => setPage({ ...page, heroCard3Text: e.target.value })} 
                placeholder="Hero Card 3 Text" 
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Text Color:</label>
                <input type="color" value={page.expertTechs2Color || '#ffffff'} onChange={e => setPage({ ...page, expertTechs2Color: e.target.value })} className="w-8 h-8 border border-gray-300" />
                <input type="text" value={page.expertTechs2Color || '#ffffff'} onChange={e => setPage({ ...page, expertTechs2Color: e.target.value })} className="ml-1 text-xs border border-gray-300 px-2 py-1 w-20" maxLength={7} placeholder="#ffffff" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 