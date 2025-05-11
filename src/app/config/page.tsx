'use client';
import { useState, useRef, useEffect } from 'react';
import localConfig from '@/config/localConfig';

type NavBarConfig = {
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

function getInitialConfig() {
  // Try to load from localStorage first
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('siteConfig');
    if (saved) return JSON.parse(saved);
  }
  return localConfig;
}

export default function ConfigPage() {
  const [config, setConfig] = useState(localConfig);
  const [history, setHistory] = useState([localConfig]);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [navBarExpanded, setNavBarExpanded] = useState(true);
  const [showSchedule, setShowSchedule] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [showEstimates, setShowEstimates] = useState(true);
  const [showBadge, setShowBadge] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [showGradients, setShowGradients] = useState(true);
  const [showExpertTechs, setShowExpertTechs] = useState(true);

  // On mount, load config from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('siteConfig');
      if (saved) setConfig(JSON.parse(saved));
    }
  }, []);

  // Undo support (Ctrl+Z) and Save (Ctrl+S), Export (Ctrl+E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (history.length > 1) {
          setHistory(h => {
            const newHistory = h.slice(0, -1);
            setConfig(newHistory[newHistory.length - 1]);
            return newHistory;
          });
        }
      }
      // Ctrl+S/Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      }
      // Ctrl+E/Cmd+E to export
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        handleExport();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, config]);

  // Push to history on config change
  useEffect(() => {
    setHistory(h => (h[h.length - 1] !== config ? [...h, config] : h));
  }, [config]);

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
    alert('Config saved locally!');
  };

  // Reset to default
  const handleReset = () => {
    setConfig(localConfig);
    localStorage.removeItem('siteConfig');
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setConfig((prev: typeof config) => setDeepValue({ ...prev }, path, url));
    }
  };

  // Helper to update nested config
  function setDeepValue(obj: any, path: string[], value: any) {
    let temp = obj;
    for (let i = 0; i < path.length - 1; i++) {
      temp = temp[path[i]];
    }
    temp[path[path.length - 1]] = value;
    return obj;
  }

  // Helper to render color picker
  function ColorInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
      <div className="flex items-center gap-2 mb-2">
        <label className="font-semibold text-primary-700 mr-2">{label}:</label>
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 border rounded" />
        <span className="ml-2 text-xs">{value}</span>
      </div>
    );
  }

  // Helper to render image uploader
  function ImageInput({ label, value, onChange, pathKey, hidePreview }: { label: string, value: string, onChange: (v: string) => void, pathKey: string, hidePreview: boolean }) {
    return (
      <div className="mb-2 flex items-center gap-4">
        <label className="font-semibold text-primary-700 mr-2">{label}:</label>
        {hidePreview && (
        <input
          type="file"
          accept="image/*"
          ref={el => { fileInputRefs.current[pathKey] = el; }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              onChange(url);
            }
          }}
        />
        )}
        <button
          type="button"
          className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs"
          onClick={() => {
            if (fileInputRefs.current[pathKey]) fileInputRefs.current[pathKey]!.value = '';
            onChange('');
          }}
        >Remove</button>
      </div>
    );
  }

  // Helper to render editable array of links
  function EditableLinks({ links, onChange, label }: { links: any[], onChange: (v: any[]) => void, label: string }) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary-600 mb-2">{label}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link, i) => (
            <div key={i} className="bg-primary-50 rounded-lg p-4 shadow text-center flex flex-col gap-2">
              <input
                className="font-semibold text-primary-700 text-center bg-transparent border-b border-primary-200 focus:outline-none"
                value={link.label}
                onChange={e => {
                  const newLinks = [...links];
                  newLinks[i].label = e.target.value;
                  onChange(newLinks);
                }}
              />
              <input
                className="text-xs text-primary-500 text-center bg-transparent border-b border-primary-100 focus:outline-none"
                value={link.path}
                onChange={e => {
                  const newLinks = [...links];
                  newLinks[i].path = e.target.value;
                  onChange(newLinks);
                }}
              />
              <button
                className="text-xs text-red-500 mt-1"
                onClick={() => onChange(links.filter((_, idx) => idx !== i))}
              >Remove</button>
            </div>
          ))}
          <button
            className="bg-primary-100 text-primary-700 rounded-lg p-4 shadow text-center font-bold"
            onClick={() => onChange([...links, { label: '', path: '' }])}
          >Add Link</button>
        </div>
      </section>
    );
  }

  // Helper to render editable social links
  function EditableSocialLinks({ socialLinks, onChange }: { socialLinks: any, onChange: (v: any) => void }) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary-600 mb-2">Social Links</h2>
        <div className="flex flex-wrap gap-6 items-center text-gray-700 mb-2">
          {Object.entries(socialLinks).map(([platform, url]) => (
            <span key={platform} className="capitalize flex items-center gap-2">
              <strong>{platform}:</strong>
              <input
                className="text-primary-600 underline bg-transparent border-b border-primary-200 focus:outline-none"
                value={url as string}
                onChange={e => onChange({ ...socialLinks, [platform]: e.target.value })}
              />
            </span>
          ))}
        </div>
      </section>
    );
  }

  // Helper to render editable policies
  function EditablePolicies({ policies, onChange }: { policies: any, onChange: (v: any) => void }) {
    return (
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary-600 mb-2">Policies</h2>
        <div className="mb-2"><strong>Terms:</strong> <input className="text-gray-700 bg-transparent border-b border-primary-200 focus:outline-none w-full" value={policies.terms} onChange={e => onChange({ ...policies, terms: e.target.value })} /></div>
        <div><strong>Privacy:</strong> <input className="text-gray-700 bg-transparent border-b border-primary-200 focus:outline-none w-full" value={policies.privacy} onChange={e => onChange({ ...policies, privacy: e.target.value })} /></div>
      </section>
    );
  }

  // Helper to render editable reviews
  function EditableReviews({ reviews, onChange }: { reviews: any[], onChange: (v: any[]) => void }) {
    return (
      <div className="mb-1">
        <strong>Reviews:</strong>
        <ul className="list-disc ml-6">
          {reviews.map((review, i) => (
            <li key={i} className="mb-2">
              <input
                className="font-semibold text-primary-700 bg-transparent border-b border-primary-200 focus:outline-none"
                value={review.author}
                onChange={e => {
                  const newReviews = [...reviews];
                  newReviews[i].author = e.target.value;
                  onChange(newReviews);
                }}
              />
              <input
                type="number"
                min={1}
                max={5}
                className="text-yellow-500 w-12 bg-transparent border-b border-primary-100 focus:outline-none mx-2"
                value={review.rating}
                onChange={e => {
                  const newReviews = [...reviews];
                  newReviews[i].rating = Number(e.target.value);
                  onChange(newReviews);
                }}
              />
              <textarea
                className="text-gray-700 bg-transparent border-b border-primary-100 focus:outline-none w-full mt-1"
                value={review.text}
                onChange={e => {
                  const newReviews = [...reviews];
                  newReviews[i].text = e.target.value;
                  onChange(newReviews);
                }}
              />
              <button className="text-xs text-red-500 mt-1" onClick={() => onChange(reviews.filter((_, idx) => idx !== i))}>Remove</button>
            </li>
          ))}
        </ul>
        <button className="text-xs text-primary-700 mt-2" onClick={() => onChange([...reviews, { author: '', rating: 5, text: '' }])}>Add Review</button>
      </div>
    );
  }

  // Helper to render editable services
  function EditableServices({ services, onChange }: { services: any[], onChange: (v: any[]) => void }) {
    return (
      <div className="mb-1">
        <strong>Services:</strong>
        <ul className="list-disc ml-6">
          {services.map((service, i) => (
            <li key={i} className="mb-2">
              <input
                className="font-semibold text-primary-700 bg-transparent border-b border-primary-200 focus:outline-none"
                value={service.title}
                onChange={e => {
                  const newServices = [...services];
                  newServices[i].title = e.target.value;
                  onChange(newServices);
                }}
              />
              <textarea
                className="text-gray-700 bg-transparent border-b border-primary-100 focus:outline-none w-full mt-1"
                value={service.description}
                onChange={e => {
                  const newServices = [...services];
                  newServices[i].description = e.target.value;
                  onChange(newServices);
                }}
              />
              <button className="text-xs text-red-500 mt-1" onClick={() => onChange(services.filter((_, idx) => idx !== i))}>Remove</button>
            </li>
          ))}
        </ul>
        <button className="text-xs text-primary-700 mt-2" onClick={() => onChange([...services, { title: '', description: '' }])}>Add Service</button>
      </div>
    );
  }

  // Remove page with confirmation
  const handleRemovePage = (pageKey: string) => {
    if (window.confirm('Warning: Are you sure you want to remove this page? This action cannot be undone.')) {
      const newPages = { ...config.pages } as any;
      delete newPages[pageKey];
      setConfig({ ...config, pages: newPages });
      if (expandedPage === pageKey) setExpandedPage(null);
    }
  };

  // Add new page
  const handleAddPage = () => {
    const newPageKey = prompt('Enter a unique page key (e.g., About, Blog):');
    if (newPageKey && !(config.pages as any)[newPageKey]) {
      setConfig({
        ...config,
        pages: {
          ...config.pages,
          [newPageKey]: {
            title: '',
            content: '',
            heroImage: '',
          },
        },
      });
      setExpandedPage(newPageKey);
    } else if (newPageKey) {
      alert('Page key already exists or is invalid.');
    }
  };

  // Editable form for hero section (example for Home page, can be reused for others)
  function HeroSectionForm({ page, setPage }: { page: any, setPage: (v: any) => void }) {
    return (
      <div className="mb-4">
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
        <div className="mb-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowBadge(v => !v)}>
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
        <div className="mb-6 bg-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowTitle(v => !v)}>
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
        <div className="mb-6 bg-cyan-50 border-2 border-cyan-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowLocation(v => !v)}>
            <span className="text-xl font-extrabold text-cyan-800">Hero Location</span>
            <span className={`transform transition-transform duration-200 ${showLocation ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showLocation && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.location || ''} onChange={e => setPage({ ...page, location: e.target.value })} placeholder="Location" />
              <div className="flex items-center gap-4">
                <input type="color" value={page.heroLocationColor || '#38bdf8'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroLocationColor || '#38bdf8'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#38bdf8" />
              </div>
            </div>
          )}
        </div>
        <div className="mb-6 bg-fuchsia-50 border-2 border-fuchsia-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowSubtitle(v => !v)}>
            <span className="text-xl font-extrabold text-fuchsia-800">Hero Subtitle</span>
            <span className={`transform transition-transform duration-200 ${showSubtitle ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showSubtitle && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.subtitle2 || ''} onChange={e => setPage({ ...page, subtitle2: e.target.value })} placeholder="Subtitle" />
              <div className="flex items-center gap-4">
                <input type="color" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowContent(v => !v)}>
            <span className="text-xl font-extrabold text-blue-800">Hero Content</span>
            <span className={`transform transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showContent && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <textarea className="w-full text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.content || ''} onChange={e => setPage({ ...page, content: e.target.value })} placeholder="Content" />
              <div className="flex items-center gap-4">
                <input type="color" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
              </div>
            </div>
          )}
        </div>
        <div className="mb-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-lg p-4">
          <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowGradients(v => !v)}>
            <span className="text-xl font-extrabold text-indigo-800">Hero Gradients</span>
            <span className={`transform transition-transform duration-200 ${showGradients ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {showGradients && (
            <div className="pl-2 pt-2 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="w-32">Top:</label>
                <input type="color" value={page.heroGradientTop || '#2563eb'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientTop || '#2563eb'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#2563eb" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32">Middle:</label>
                <input type="color" value={page.heroGradientMiddle || '#1d4ed8'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientMiddle || '#1d4ed8'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1d4ed8" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32">Bottom:</label>
                <input type="color" value={page.heroGradientBottom || '#1e293b'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientBottom || '#1e293b'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e293b" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32">Left:</label>
                <input type="color" value={page.heroGradientLeft || '#1e293b'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="w-10 h-10 border rounded" />
                <input type="text" value={page.heroGradientLeft || '#1e293b'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e293b" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Helper to export config as JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localConfig.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add this helper component above the return statement:
  function EditableGuaranteeCards({ cards, onChange }: { cards: any[], onChange: (v: any[]) => void }) {
    return (
      <div>
        <strong className="block mb-2">Guarantee Cards</strong>
        <div className="space-y-4">
          {cards.map((card, i) => {
            return (
            <div key={i} className="flex flex-col md:flex-row items-center gap-4 bg-white border border-yellow-200 rounded p-3">
              <div className="flex flex-col items-center">
                {card.icon ? (
                  <img
                    src={`/images/${card.icon}`}
                    alt="icon preview"
                    className="h-10 w-10 mb-1 border border-gray-200 rounded"
                    onError={e => (e.currentTarget.src = 'https://via.placeholder.com/40x40?text=No+Icon')}
                  />
                ) : (
                  <img
                    src={'https://via.placeholder.com/40x40?text=No+Icon'}
                    alt="No Icon"
                    className="h-10 w-10 mb-1 border border-gray-200 rounded"
                  />
                )}
                <input
                  type="text"
                  className="mt-1 px-2 py-1 border rounded w-28"
                  value={card.icon || ''}
                  onChange={e => {
                    const newCards = [...cards];
                    newCards[i].icon = e.target.value;
                    onChange(newCards);
                  }}
                  placeholder="e.g. warranty.png"
                />
              </div>
              <input
                className="font-semibold text-yellow-900 bg-transparent border-b border-yellow-300 focus:outline-none flex-1"
                value={card.title || ''}
                onChange={e => {
                  const newCards = [...cards];
                  newCards[i].title = e.target.value;
                  onChange(newCards);
                }}
                placeholder="Card Title"
              />
              <input
                className="text-yellow-800 bg-transparent border-b border-yellow-200 focus:outline-none flex-1"
                value={card.description || ''}
                onChange={e => {
                  const newCards = [...cards];
                  newCards[i].description = e.target.value;
                  onChange(newCards);
                }}
                placeholder="Card Description"
              />
              <button
                className="text-xs text-red-500 px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                onClick={() => onChange(cards.filter((_, idx) => idx !== i))}
              >Remove</button>
            </div>
            );
          })}
          <button
            className="mt-2 px-4 py-2 bg-yellow-200 text-yellow-900 rounded shadow font-bold hover:bg-yellow-300"
            onClick={() => onChange([...cards, { icon: '', title: '', description: '' }])}
          >Add Guarantee Card</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    document.body.setAttribute('data-config-page', 'true');
    return () => {
      document.body.removeAttribute('data-config-page');
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f3ff] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#ede9fe] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-primary-700 border-b pb-4">Site Configuration</h1>

        {/* Info Bar Section */}
        <section className="mb-10">
          <div className="mb-6 p-6 bg-blue-50 border-2 border-blue-300 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-primary-700 mb-4">Info Bar</h2>
            <div className="mb-2 flex items-center gap-4">
              <label className="font-semibold text-primary-700 mr-2">Background Color:</label>
              <input
                type="color"
                value={config.infoBar?.backgroundColor || '#1787c9'}
                onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, backgroundColor: e.target.value } })}
                className="w-10 h-10 border rounded"
              />
              <input
                type="text"
                value={config.infoBar?.backgroundColor || '#1787c9'}
                onChange={e => {
                  const val = e.target.value;
                  if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(val) || val === '') {
                    setConfig({ ...config, infoBar: { ...config.infoBar, backgroundColor: val } });
                  }
                }}
                className="ml-2 text-xs border rounded px-2 py-1 w-20"
                maxLength={7}
                placeholder="#1787c9"
              />
            </div>
            <div className="mb-2 flex items-center gap-4">
              <label className="font-semibold text-primary-700 mr-2">Phone:</label>
              <input
                type="text"
                value={config.infoBar?.phone || ''}
                onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, phone: e.target.value } })}
                className="border rounded px-2 py-1 w-56"
                placeholder="Phone"
              />
            </div>
            <div className="mb-2 flex items-center gap-4">
              <label className="font-semibold text-primary-700 mr-2">Address:</label>
            <input
                type="text"
                value={config.infoBar?.address || ''}
                onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, address: e.target.value } })}
                className="border rounded px-2 py-1 w-96"
                placeholder="Address"
              />
            </div>
            <div className="mb-2 flex items-center gap-4">
              <label className="font-semibold text-primary-700 mr-2">Hours:</label>
              <input
                type="text"
                value={config.infoBar?.hours || ''}
                onChange={e => setConfig({ ...config, infoBar: { ...config.infoBar, hours: e.target.value } })}
                className="border rounded px-2 py-1 w-64"
                placeholder="Hours"
              />
            </div>
          </div>
        </section>

        {/* Nav Bar Section */}
        <section className="mb-10">
          <div className="mb-8 p-8 bg-blue-50 border-2 border-blue-300 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary-700">Nav Bar</h2>
              <button
                className="text-primary-600 font-semibold px-3 py-1 rounded hover:bg-blue-100 transition flex items-center gap-1"
                onClick={() => setNavBarExpanded(e => !e)}
                aria-expanded={navBarExpanded}
                aria-controls="nav-bar-section"
              >
                <span className={`transform transition-transform duration-200 ${navBarExpanded ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
            {navBarExpanded && (
              <div id="nav-bar-section">
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Colors */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 bg-[#f8fafc] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Background Color:</label>
                      <input
                        type="color"
                        value={config.navBar?.backgroundColor || '#ffffff'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, backgroundColor: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={config.navBar?.backgroundColor || '#ffffff'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, backgroundColor: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#e0f2fe] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Text Color:</label>
                      <input
                        type="color"
                        value={config.navBar?.textColor || '#0369a1'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, textColor: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={config.navBar?.textColor || '#0369a1'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, textColor: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#e0f7fa] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Site Title Gradient From:</label>
                      <input
                        type="color"
                        value={config.navBar?.siteTitleGradientFrom || '#3b82f6'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientFrom: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={config.navBar?.siteTitleGradientFrom || '#3b82f6'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientFrom: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#e0f7fa] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Site Title Gradient To:</label>
                      <input
                        type="color"
                        value={config.navBar?.siteTitleGradientTo || '#06b6d4'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientTo: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={config.navBar?.siteTitleGradientTo || '#06b6d4'}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitleGradientTo: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#f1f8e9] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Schedule Button Text:</label>
                      <input
                        type="text"
                        value={(config.navBar as NavBarConfig)?.scheduleButtonText || 'Schedule Now'}
                        onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfig), scheduleButtonText: e.target.value } })}
                        className="w-48 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#e3f2fd] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Schedule Button Color:</label>
                      <input
                        type="color"
                        value={(config.navBar as NavBarConfig)?.scheduleButtonColor || '#2563eb'}
                        onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfig), scheduleButtonColor: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={(config.navBar as NavBarConfig)?.scheduleButtonColor || '#2563eb'}
                        onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfig), scheduleButtonColor: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#ede7f6] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Active Tab Color:</label>
                      <input
                        type="color"
                        value={(config.navBar as NavBarConfig)?.activeTabColor || '#3b82f6'}
                        onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfig), activeTabColor: e.target.value } })}
                        className="w-10 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={(config.navBar as NavBarConfig)?.activeTabColor || '#3b82f6'}
                        onChange={e => setConfig({ ...config, navBar: { ...(config.navBar as NavBarConfig), activeTabColor: e.target.value } })}
                        className="w-24 border rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                  {/* Logo and Title Controls */}
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex items-center gap-3 bg-[#fffde7] p-2 rounded">
                      <input
                        type="checkbox"
                        checked={!!config.showLogo}
                        onChange={e => setConfig({ ...config, showLogo: e.target.checked })}
                        id="showLogo"
                        className="accent-primary-600 w-5 h-5"
                      />
                      <label htmlFor="showLogo" className="font-semibold text-primary-700">Show Logo in Nav Bar</label>
                    </div>
                    <div className="flex flex-col gap-2 w-full bg-[#e1f5fe] p-2 rounded">
                      <span className="font-semibold text-primary-700">Logo:</span>
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 text-sm w-full"
                          value={config.navBar?.logo?.startsWith('/images/') ? config.navBar.logo.slice(8) : (config.navBar?.logo || '')}
                          onChange={e => {
                            let val = e.target.value.trim();
                            if (val.startsWith('/images/')) val = val.slice(8);
                            setConfig({ ...config, navBar: { ...config.navBar, logo: val } });
                          }}
                          placeholder="e.g. bon.png"
                        />
                        <button
                          type="button"
                          className="ml-2 px-2 py-1 bg-gray-200 rounded text-xs"
                          onClick={() => setConfig({ ...config, navBar: { ...config.navBar, logo: '' } })}
                        >Remove</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full bg-[#f3e5f5] p-2 rounded">
                      <label className="font-semibold text-primary-700 w-32">Nav Bar Text:</label>
                      <input
                        type="text"
                        value={config.navBar?.siteTitle || ''}
                        onChange={e => setConfig({ ...config, navBar: { ...config.navBar, siteTitle: e.target.value } })}
                        className="flex-1 border rounded px-2 py-1 text-lg font-semibold min-w-0"
                        placeholder="Site Title"
                      />
                    </div>
                  </div>
                </div>
                {/* Pages in Nav Bar */}
                <div className="mb-4">
                  <div className="mb-2 font-semibold text-primary-700">Pages in Nav Bar</div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {Object.keys(config.pages).map((pageKey) => {
                      const inNav = config.navBar && Array.isArray(config.navBar.navLinks)
                        ? config.navBar.navLinks.some((link: any) => link.label === pageKey || link.label === `${pageKey} Page`)
                        : false;
                      return (
                        <div key={pageKey} className="flex flex-col items-start gap-2 bg-white border border-blue-200 rounded-lg shadow-sm p-3 min-w-[180px] max-w-xs">
                          <div className="font-semibold text-primary-700 mb-1">{pageKey}</div>
                          <div className="flex gap-2 w-full justify-between items-center mt-1">
                            {inNav ? (
                              <button
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                onClick={() => {
                                  const newLinks = config.navBar.navLinks.filter((link: any) => link.label !== pageKey && link.label !== `${pageKey} Page`);
                                  setConfig({ ...config, navBar: { ...config.navBar, navLinks: newLinks } });
                                }}
                              >Remove from Nav</button>
                            ) : (
                              <button
                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                                onClick={() => {
                                  const newLinks = [...config.navBar.navLinks, { label: pageKey, path: `/${pageKey.toLowerCase()}` }];
                                  setConfig({ ...config, navBar: { ...config.navBar, navLinks: newLinks } });
                                }}
                              >Add to Nav</button>
                            )}
                            <button
                              className="px-2 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-200"
                              onClick={() => handleRemovePage(pageKey)}
                            >Delete Page</button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className="flex flex-col items-center justify-center min-w-[120px] max-w-xs h-[88px] bg-blue-50 border-2 border-dashed border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold transition-colors"
                      onClick={() => {
                        const newPageKey = prompt('Enter a unique page key (e.g., About, Blog):');
                        if (newPageKey && !(config.pages as any)[newPageKey]) {
                          setConfig({
                            ...config,
                            pages: {
                              ...config.pages,
                              [newPageKey]: {
                                title: '',
                                content: '',
                                heroImage: '',
                              },
                            },
                          });
                        } else if (newPageKey) {
                          alert('Page key already exists or is invalid.');
                        }
                      }}
                    >
                      <span className="text-2xl">+</span>
                      <span className="text-xs">Add Page</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pages Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary-700 mb-2">Pages</h2>
            <button className="px-4 py-2 bg-primary-600 text-white rounded shadow font-bold hover:bg-primary-700" onClick={handleAddPage}>Add Page</button>
          </div>
          <div className="space-y-4">
            {Object.keys(config.pages as any).map((pageKey) => {
              const page = (config.pages as any)[pageKey];
              const setPage = (newPage: any) => setConfig((prev: any) => ({
                ...prev,
                pages: {
                  ...(prev.pages as any),
                  [pageKey]: newPage
                }
              }));
              const isExpanded = expandedPage === pageKey;
              return (
                <div key={pageKey} className="bg-blue-50 rounded-xl shadow p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedPage(isExpanded ? null : pageKey)}>
                    <h3 className="text-lg font-semibold text-primary-700">{pageKey} Page</h3>
                    <span className={`text-primary-600 text-xl transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                  {isExpanded && (
                    <div className="mt-4">
                      {/* Hero Section for Home Page */}
                      {pageKey === 'Home' && (
                        <div className="mb-8">
                          <div className="rounded-2xl shadow-2xl border border-[#c4b5fd] bg-white/80 p-8 mb-8">
                            <h3 className="text-2xl font-bold text-purple-700 mb-6">Hero Section</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Hero Image */}
                              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4 flex flex-col items-start">
                                <div className="text-xl font-extrabold text-blue-800 mb-2">Hero Image</div>
                                {page.heroImage ? (
                                  <img
                                    src={`/images/${page.heroImage}`}
                                    alt="Hero Preview"
                                    className="h-24 w-auto rounded shadow border border-blue-200 mb-2 bg-white"
                                    onError={e => (e.currentTarget.src = 'https://via.placeholder.com/120x80?text=No+Image')}
                                  />
                                ) : (
                                  <img
                                    src={'https://via.placeholder.com/120x80?text=No+Image'}
                                    alt="No Hero Image"
                                    className="h-24 w-auto rounded shadow border border-blue-200 mb-2 bg-white"
                                  />
                                )}
                                <input
                                  className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2"
                                  value={page.heroImage || ''}
                                  onChange={e => setPage({ ...page, heroImage: e.target.value })}
                                  placeholder="Hero Image (e.g. hero-home.jpg)"
                                />
                              </div>
                              {/* Hero Badge Section */}
                              <div className="mb-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowBadge(v => !v)}>
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
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowTitle(v => !v)}>
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
                              {/* Hero Location Section */}
                              <div className="mb-6 bg-cyan-50 border-2 border-cyan-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowLocation(v => !v)}>
                                  <span className="text-xl font-extrabold text-cyan-800">Hero Location</span>
                                  <span className={`transform transition-transform duration-200 ${showLocation ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showLocation && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.location || ''} onChange={e => setPage({ ...page, location: e.target.value })} placeholder="Location" />
                                <div className="flex items-center gap-4">
                                  <input type="color" value={page.heroLocationColor || '#38bdf8'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroLocationColor || '#38bdf8'} onChange={e => setPage({ ...page, heroLocationColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#38bdf8" />
                                </div>
                              </div>
                                )}
                              </div>
                              {/* Hero Subtitle Section */}
                              <div className="mb-6 bg-fuchsia-50 border-2 border-fuchsia-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowSubtitle(v => !v)}>
                                  <span className="text-xl font-extrabold text-fuchsia-800">Hero Subtitle</span>
                                  <span className={`transform transition-transform duration-200 ${showSubtitle ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showSubtitle && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <input className="w-full font-semibold text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.subtitle2 || ''} onChange={e => setPage({ ...page, subtitle2: e.target.value })} placeholder="Subtitle" />
                                <div className="flex items-center gap-4">
                                  <input type="color" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroSubtitleColor || '#fff'} onChange={e => setPage({ ...page, heroSubtitleColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                </div>
                              </div>
                                )}
                              </div>
                              {/* Hero Content Section */}
                              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowContent(v => !v)}>
                                  <span className="text-xl font-extrabold text-blue-800">Hero Content</span>
                                  <span className={`transform transition-transform duration-200 ${showContent ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showContent && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <textarea className="w-full text-primary-600 bg-transparent border-b border-primary-200 focus:outline-none mb-2" value={page.content || ''} onChange={e => setPage({ ...page, content: e.target.value })} placeholder="Content" />
                                <div className="flex items-center gap-4">
                                  <input type="color" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroContentColor || '#fff'} onChange={e => setPage({ ...page, heroContentColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                </div>
                              </div>
                                )}
                              </div>
                              {/* Hero Gradients Section */}
                              <div className="mb-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowGradients(v => !v)}>
                                  <span className="text-xl font-extrabold text-indigo-800">Hero Gradients</span>
                                  <span className={`transform transition-transform duration-200 ${showGradients ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showGradients && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                  <label className="w-32">Top:</label>
                                  <input type="color" value={page.heroGradientTop || '#2563eb'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroGradientTop || '#2563eb'} onChange={e => setPage({ ...page, heroGradientTop: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#2563eb" />
                                </div>
                                <div className="flex items-center gap-4">
                                  <label className="w-32">Middle:</label>
                                  <input type="color" value={page.heroGradientMiddle || '#1d4ed8'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroGradientMiddle || '#1d4ed8'} onChange={e => setPage({ ...page, heroGradientMiddle: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1d4ed8" />
                                </div>
                                <div className="flex items-center gap-4">
                                  <label className="w-32">Bottom:</label>
                                  <input type="color" value={page.heroGradientBottom || '#1e293b'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroGradientBottom || '#1e293b'} onChange={e => setPage({ ...page, heroGradientBottom: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e293b" />
                                </div>
                                <div className="flex items-center gap-4">
                                  <label className="w-32">Left:</label>
                                  <input type="color" value={page.heroGradientLeft || '#1e293b'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroGradientLeft || '#1e293b'} onChange={e => setPage({ ...page, heroGradientLeft: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e293b" />
                                </div>
                              </div>
                                )}
                              </div>
                              {/* Hero Schedule Button Section */}
                              <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowSchedule(v => !v)}>
                                  <span className="text-xl font-extrabold text-green-800">Schedule Button</span>
                                  <span className={`transform transition-transform duration-200 ${showSchedule ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showSchedule && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-green-800">Button Color:</label>
                                      <input type="color" value={page.heroScheduleButtonColor || '#25eb71'} onChange={e => setPage({ ...page, heroScheduleButtonColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroScheduleButtonColor || '#25eb71'} onChange={e => setPage({ ...page, heroScheduleButtonColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#25eb71" />
                                </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-green-800">Text Color:</label>
                                  <input type="color" value={page.heroScheduleButtonTextColor || '#fff'} onChange={e => setPage({ ...page, heroScheduleButtonTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                  <input type="text" value={page.heroScheduleButtonTextColor || '#fff'} onChange={e => setPage({ ...page, heroScheduleButtonTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                </div>
                              </div>
                                )}
                            </div>
                              {/* Hero Contact Us Button Section */}
                              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowContact(v => !v)}>
                                  <span className="text-xl font-extrabold text-blue-800">Contact Us Button</span>
                                  <span className={`transform transition-transform duration-200 ${showContact ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showContact && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Button Color:</label>
                                      <input type="color" value={page.heroContactButtonColor || '#fff'} onChange={e => setPage({ ...page, heroContactButtonColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonColor || '#fff'} onChange={e => setPage({ ...page, heroContactButtonColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                          </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Text Color:</label>
                                      <input type="color" value={page.heroContactButtonTextColor || '#1c91d7'} onChange={e => setPage({ ...page, heroContactButtonTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonTextColor || '#1c91d7'} onChange={e => setPage({ ...page, heroContactButtonTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1c91d7" />
                          </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Border Color:</label>
                                      <input type="color" value={page.heroContactButtonBorderColor || '#fff'} onChange={e => setPage({ ...page, heroContactButtonBorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonBorderColor || '#fff'} onChange={e => setPage({ ...page, heroContactButtonBorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                            </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover BG Color:</label>
                                      <input type="color" value={page.heroContactButtonHoverBgColor || '#f5cb1a'} onChange={e => setPage({ ...page, heroContactButtonHoverBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonHoverBgColor || '#f5cb1a'} onChange={e => setPage({ ...page, heroContactButtonHoverBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#f5cb1a" />
                            </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Text Color:</label>
                                      <input type="color" value={page.heroContactButtonHoverTextColor || '#1787c9'} onChange={e => setPage({ ...page, heroContactButtonHoverTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonHoverTextColor || '#1787c9'} onChange={e => setPage({ ...page, heroContactButtonHoverTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1787c9" />
                          </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Border Color:</label>
                                      <input type="color" value={page.heroContactButtonHoverBorderColor || '#1787c9'} onChange={e => setPage({ ...page, heroContactButtonHoverBorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroContactButtonHoverBorderColor || '#1787c9'} onChange={e => setPage({ ...page, heroContactButtonHoverBorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1787c9" />
                            </div>
                          </div>
                                )}
                              </div>
                              {/* Hero Free Estimates Card Section */}
                              <div className="mb-6 bg-cyan-50 border-2 border-cyan-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowEstimates(v => !v)}>
                                  <span className="text-xl font-extrabold text-cyan-800">Hero Box 1</span>
                                  <span className={`transform transition-transform duration-200 ${showEstimates ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showEstimates && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Box BG Color:</label>
                                      <input type="color" value={page.heroBox1BgColor || '#387e62'} onChange={e => setPage({ ...page, heroBox1BgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1BgColor || '#387e62'} onChange={e => setPage({ ...page, heroBox1BgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Text Color:</label>
                                      <input type="color" value={page.heroBox1TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox1TextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox1TextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Border Color:</label>
                                      <input type="color" value={page.heroBox1BorderColor || '#387e62'} onChange={e => setPage({ ...page, heroBox1BorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1BorderColor || '#387e62'} onChange={e => setPage({ ...page, heroBox1BorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#387e62" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Hover BG Color:</label>
                                      <input type="color" value={page.heroBox1HoverBgColor || '#2e6b54'} onChange={e => setPage({ ...page, heroBox1HoverBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1HoverBgColor || '#2e6b54'} onChange={e => setPage({ ...page, heroBox1HoverBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#2e6b54" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Hover Text Color:</label>
                                      <input type="color" value={page.heroBox1HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox1HoverTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox1HoverTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Hover Border Color:</label>
                                      <input type="color" value={page.heroBox1HoverBorderColor || '#2e6b54'} onChange={e => setPage({ ...page, heroBox1HoverBorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1HoverBorderColor || '#2e6b54'} onChange={e => setPage({ ...page, heroBox1HoverBorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#2e6b54" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Icon BG Color:</label>
                                      <input type="color" value={page.heroBox1IconBgColor || '#31937a'} onChange={e => setPage({ ...page, heroBox1IconBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1IconBgColor || '#31937a'} onChange={e => setPage({ ...page, heroBox1IconBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#31937a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-cyan-800">Icon Color:</label>
                                      <input type="color" value={page.heroBox1IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox1IconColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox1IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox1IconColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* Hero Box 2 Section */}
                              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowExpertTechs(v => !v)}>
                                  <span className="text-xl font-extrabold text-blue-800">Hero Box 2</span>
                                  <span className={`transform transition-transform duration-200 ${showExpertTechs ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showExpertTechs && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Box BG Color:</label>
                                      <input type="color" value={page.heroBox2BgColor || '#25647a'} onChange={e => setPage({ ...page, heroBox2BgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2BgColor || '#25647a'} onChange={e => setPage({ ...page, heroBox2BgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#25647a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Text Color:</label>
                                      <input type="color" value={page.heroBox2TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox2TextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox2TextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Border Color:</label>
                                      <input type="color" value={page.heroBox2BorderColor || '#25647a'} onChange={e => setPage({ ...page, heroBox2BorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2BorderColor || '#25647a'} onChange={e => setPage({ ...page, heroBox2BorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#25647a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover BG Color:</label>
                                      <input type="color" value={page.heroBox2HoverBgColor || '#17475a'} onChange={e => setPage({ ...page, heroBox2HoverBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2HoverBgColor || '#17475a'} onChange={e => setPage({ ...page, heroBox2HoverBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#17475a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Text Color:</label>
                                      <input type="color" value={page.heroBox2HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox2HoverTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox2HoverTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Border Color:</label>
                                      <input type="color" value={page.heroBox2HoverBorderColor || '#17475a'} onChange={e => setPage({ ...page, heroBox2HoverBorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2HoverBorderColor || '#17475a'} onChange={e => setPage({ ...page, heroBox2HoverBorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#17475a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Icon BG Color:</label>
                                      <input type="color" value={page.heroBox2IconBgColor || '#1e5a7a'} onChange={e => setPage({ ...page, heroBox2IconBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2IconBgColor || '#1e5a7a'} onChange={e => setPage({ ...page, heroBox2IconBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e5a7a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Icon Color:</label>
                                      <input type="color" value={page.heroBox2IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox2IconColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox2IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox2IconColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* Hero Box 3 Section */}
                              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-4">
                                <button className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none" onClick={() => setShowExpertTechs(v => !v)}>
                                  <span className="text-xl font-extrabold text-blue-800">Hero Box 3</span>
                                  <span className={`transform transition-transform duration-200 ${showExpertTechs ? 'rotate-180' : ''}`}>▼</span>
                                </button>
                                {showExpertTechs && (
                                  <div className="pl-2 pt-2 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Box BG Color:</label>
                                      <input type="color" value={page.heroBox3BgColor || '#25647a'} onChange={e => setPage({ ...page, heroBox3BgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3BgColor || '#25647a'} onChange={e => setPage({ ...page, heroBox3BgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#25647a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Text Color:</label>
                                      <input type="color" value={page.heroBox3TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox3TextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3TextColor || '#fff'} onChange={e => setPage({ ...page, heroBox3TextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Border Color:</label>
                                      <input type="color" value={page.heroBox3BorderColor || '#25647a'} onChange={e => setPage({ ...page, heroBox3BorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3BorderColor || '#25647a'} onChange={e => setPage({ ...page, heroBox3BorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#25647a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover BG Color:</label>
                                      <input type="color" value={page.heroBox3HoverBgColor || '#17475a'} onChange={e => setPage({ ...page, heroBox3HoverBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3HoverBgColor || '#17475a'} onChange={e => setPage({ ...page, heroBox3HoverBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#17475a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Text Color:</label>
                                      <input type="color" value={page.heroBox3HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox3HoverTextColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3HoverTextColor || '#fff'} onChange={e => setPage({ ...page, heroBox3HoverTextColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Hover Border Color:</label>
                                      <input type="color" value={page.heroBox3HoverBorderColor || '#17475a'} onChange={e => setPage({ ...page, heroBox3HoverBorderColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3HoverBorderColor || '#17475a'} onChange={e => setPage({ ...page, heroBox3HoverBorderColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#17475a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Icon BG Color:</label>
                                      <input type="color" value={page.heroBox3IconBgColor || '#1e5a7a'} onChange={e => setPage({ ...page, heroBox3IconBgColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3IconBgColor || '#1e5a7a'} onChange={e => setPage({ ...page, heroBox3IconBgColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#1e5a7a" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <label className="text-sm font-medium text-blue-800">Icon Color:</label>
                                      <input type="color" value={page.heroBox3IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox3IconColor: e.target.value })} className="w-10 h-10 border rounded" />
                                      <input type="text" value={page.heroBox3IconColor || '#fff'} onChange={e => setPage({ ...page, heroBox3IconColor: e.target.value })} className="ml-2 text-xs border rounded px-2 py-1 w-20" maxLength={7} placeholder="#fff" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div> {/* <-- Close the grid for hero section config */}
                          </div> {/* <-- Close the white/rounded hero section card */}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Save/Reset Buttons */}
      <div className="flex gap-4 mt-10">
        <button className="px-6 py-2 bg-primary-600 text-white rounded shadow font-bold hover:bg-primary-700" onClick={handleSave}>Save</button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded shadow font-bold hover:bg-gray-300" onClick={handleReset}>Reset</button>
        <button className="px-6 py-2 bg-blue-200 text-blue-700 rounded shadow font-bold hover:bg-blue-300" onClick={handleExport}>Export</button>
      </div>
    </div>
  </main>
);
} 