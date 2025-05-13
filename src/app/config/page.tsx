'use client';
import { useState, useRef, useEffect } from 'react';
import localConfig from '../../config/localConfig';
import { useTheme } from './ThemeProvider';
import { disableReloadWarning } from '../../utils/preventReloadWarning';

// Import the components
import HeroSectionForm from './components/homepageconfig/HeroSectionForm';
import EditableGuaranteeCards from './components/homepageconfig/EditableGuaranteeCards';
import ColorSelectorInput from './components/ColorSelectorInput';
import NavBarConfig from './components/NavBarConfig';
import InfoBarConfig from './components/homepageconfig/InfoBarConfig';
import GuaranteeSection from './components/homepageconfig/GuaranteeSection';
import ServicesSection from './components/homepageconfig/ServicesSection';
import ScheduleSection from './components/homepageconfig/ScheduleSection';
import ServicePageConfig from './components/servicesconfig/ServicePageConfig';
import ReviewPageConfig from './components/reviewsconfig/ReviewPageConfig';
import ContactPageConfig from './components/contactconfig/ContactPageConfig';
import FooterConfig from './components/FooterConfig';

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
  return localConfig;
}

// Toast component
function Toast({ message, show }: { message: string, show: boolean }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-transform duration-500 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}
      style={{ pointerEvents: 'none' }}
    >
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      <span className="font-semibold">{message}</span>
    </div>
  );
}

export default function ConfigPage() {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  
  // Use a default theme color that will be replaced by the actual one once client-side code runs
  const [localThemeColor, setLocalThemeColor] = useState('#a259e6');
  
  // Safely try to use the theme context, but provide fallback for SSR
  let themeContextValue: { themeColor: string; setThemeColor: (color: string) => void } = { 
    themeColor: localThemeColor, 
    setThemeColor: (color: string) => setLocalThemeColor(color) 
  };
  try {
    themeContextValue = useTheme();
  } catch (e) {
    // During SSR or early rendering, useTheme might fail - we'll use our default values
    console.log('Theme context not available yet, using default values');
  }
  
  const { themeColor, setThemeColor } = themeContextValue;
  
  const [config, setConfig] = useState(getInitialConfig());
  const [history, setHistory] = useState([localConfig]);
  const [redoHistory, setRedoHistory] = useState<any[]>([]);
  const [isRestoringFromHistory, setIsRestoringFromHistory] = useState(false);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showEstimates, setShowEstimates] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showGradients, setShowGradients] = useState(false);
  const [showExpertTechs, setShowExpertTechs] = useState(false);
  const [showExpertTechs2, setShowExpertTechs2] = useState(false);
  const [showHeroSection, setShowHeroSection] = useState<{ [key: string]: boolean }>({});
  const [showScheduleSection, setShowScheduleSection] = useState(false);
  const [showGuaranteeSection, setShowGuaranteeSection] = useState(false);
  const [showServicesSection, setShowServicesSection] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [splitPosition, setSplitPosition] = useState(35); // Default split at 35% for config panel (was 50%)
  const [isDragging, setIsDragging] = useState(false);
  const splitDividerRef = useRef<HTMLDivElement>(null);

  // New: Handle Publish to localConfig.ts
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [publishStatus, setPublishStatus] = useState<'success' | 'error' | null>(null);

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // New: Current Theme Link
  const [themeLink, setThemeLink] = useState('');

  // Collapsible Info Bar state
  const [infoBarExpanded, setInfoBarExpanded] = useState<boolean>(true);

  // Mobile detection for preview
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const configPanelRef = useRef<HTMLDivElement>(null);

  // Add new state for editable header title
  const [headerTitle, setHeaderTitle] = useState('Site Configuration');

  // Add a new state for instructions modal
  const [showInstructions, setShowInstructions] = useState(false);

  // Add basic instructions content
  const instructionsContent = [
    { title: "Getting Started", content: "Configure your site by adjusting settings in each section. Changes are previewed in real-time on the right." },
    { title: "Saving Work", content: "Click 'Save' to store your changes locally. Use 'Publish' when you're ready to apply changes to your site." },
    { title: "Color Scheme", content: "Set your theme color using the color picker in the top header. This will be applied throughout the site." },
    { title: "Section Configuration", content: "Expand each section to modify specific elements like the Info Bar, Navigation, Footer, and Pages." },
    { title: "Preview Options", content: "Toggle between Mobile and Desktop views to ensure your site looks great on all devices." }
  ];

  // Close to the other useRef hooks, add:
  const prevConfigRef = useRef<typeof config | null>(null);

  // In the useEffect where config changes, add:
  useEffect(() => {
    // Auto-save config to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      // Don't auto-save immediately for footerStyle changes
      const prevConfig = prevConfigRef.current;
      const isFooterStyleChange = prevConfig && 
        JSON.stringify(prevConfig.footerStyle) !== JSON.stringify(config.footerStyle);
      
      if (!isFooterStyleChange) {
        localStorage.setItem('siteConfig', JSON.stringify(config));
        console.log('Auto-saved config to localStorage');
      }
      
      // Update the prevConfig ref for the next change
      prevConfigRef.current = { ...config };
    }
  }, [config, themeColor, isRestoringFromHistory]);

  // Also fix the second instance:
  useEffect(() => {
    // Auto-save config to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      // Skip immediate auto-save for footer style changes to prevent interrupting the user
      const prevConfig = prevConfigRef.current;
      const isFooterStyleChange = prevConfig && 
        JSON.stringify(prevConfig.footerStyle) !== JSON.stringify(config.footerStyle);
      
      if (!isFooterStyleChange) {
        localStorage.setItem('siteConfig', JSON.stringify(config));
        console.log('Auto-saved config to localStorage');
      }
      
      // Update the prevConfig ref for the next change
      prevConfigRef.current = { ...config };
    }
  }, [config, themeColor, isRestoringFromHistory]);

  // Add this effect at the beginning of other useEffect blocks
  useEffect(() => {
    setIsClientLoaded(true);
    
    // Once client-side code is running, try to get the theme color from localStorage
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
      setLocalThemeColor(savedThemeColor);
      // Only call setThemeColor from context if it's available
      if (themeContextValue.setThemeColor !== setLocalThemeColor) {
        setThemeColor(savedThemeColor);
      }
    }
    
    // Also try to get theme link from localStorage
    const savedThemeLink = localStorage.getItem('themeLink');
    if (savedThemeLink) {
      setThemeLink(savedThemeLink);
    }
  }, []);

  // Handle scroll for "back to top" button on mobile
  useEffect(() => {
    if (!isMobileDevice) return;
    
    const handleScroll = () => {
      if (configPanelRef.current) {
        setShowBackToTop(configPanelRef.current.scrollTop > 300);
      }
    };
    
    const configPanel = configPanelRef.current;
    if (configPanel) {
      configPanel.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (configPanel) {
        configPanel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobileDevice]);

  // Function to scroll back to top
  const scrollToTop = () => {
    if (configPanelRef.current) {
      configPanelRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Detect mobile device for preview restriction
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener to update when orientation changes
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Resizable panel functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const container = document.getElementById('split-container');
      if (!container) return;
      
      // Apply cursor styling to the body during dragging
      document.body.style.cursor = 'col-resize';
      document.body.classList.add('select-none'); // Prevent text selection during resize
      
      const containerRect = container.getBoundingClientRect();
      const newSplitPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Limit the range from 25% to 50%
      if (newSplitPosition >= 25 && newSplitPosition <= 50) {
        setSplitPosition(newSplitPosition);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset cursor and text selection
      document.body.style.cursor = '';
      document.body.classList.remove('select-none');
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.classList.remove('select-none');
    };
  }, [isDragging]);

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // ALWAYS initialize with localConfig
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeConfig = async () => {
        try {
          // Try to fetch the latest config from the JSON file first (most current)
          const response = await fetch('/current-config.json?' + new Date().getTime());
          if (response.ok) {
            const latestConfig = await response.json();
            console.log('Loaded config from JSON file');
            
            // Force a purple color theme (in localStorage) if none set
            if (!localStorage.getItem('themeColor')) {
              localStorage.setItem('themeColor', '#a259e6');
            }
            
            // Ensure the themeColor is properly loaded too
            const savedThemeColor = localStorage.getItem('themeColor');
            if (savedThemeColor) {
              setThemeColor(savedThemeColor);
            }
            
            // Update all our state variables
            setConfig(latestConfig);
            
            // Save to localStorage with metadata to ensure persistence
            const configToSave = {
              ...latestConfig,
              _timestamp: new Date().toISOString(),
              _meta: {
                headerTitle: headerTitle || 'Site Configuration',
                themeColor: savedThemeColor || themeColor,
                infoBarExpanded: infoBarExpanded
              }
            };
            
            localStorage.setItem('siteConfig', JSON.stringify(configToSave));
            localStorage.setItem('siteConfig_backup', JSON.stringify(configToSave));
            setHistory([latestConfig]);
            
            // Load header title if available
            const savedTitle = localStorage.getItem('headerTitle');
            if (savedTitle) {
              console.log('Loaded header title on initialization:', savedTitle);
              setHeaderTitle(savedTitle);
            }
            
            return;
          }
        } catch (error) {
          console.log('Could not load config from JSON file, falling back to localStorage or default');
        }
        
        // ENHANCED RECOVERY: Check multiple storage locations
        let parsedConfig = null;
        let source = '';
        
        // Try main localStorage item first
        const savedConfig = localStorage.getItem('siteConfig');
        if (savedConfig) {
          try {
            parsedConfig = JSON.parse(savedConfig);
            source = 'primary localStorage';
          } catch (e) {
            console.log('Primary localStorage config corrupt, trying backup');
          }
        }
        
        // If that fails, try the backup localStorage
        if (!parsedConfig) {
          const backupConfig = localStorage.getItem('siteConfig_backup');
          if (backupConfig) {
            try {
              parsedConfig = JSON.parse(backupConfig);
              source = 'backup localStorage';
            } catch (e) {
              console.log('Backup localStorage config corrupt, trying sessionStorage');
            }
          }
        }
        
        // If both localStorage options fail, try sessionStorage
        if (!parsedConfig) {
          const emergencyConfig = sessionStorage.getItem('siteConfig_emergency');
          if (emergencyConfig) {
            try {
              parsedConfig = JSON.parse(emergencyConfig);
              source = 'sessionStorage emergency backup';
            } catch (e) {
              console.log('All stored configs corrupt, using default');
            }
          }
        }
        
        // If we found a valid config, use it
        if (parsedConfig) {
          console.log(`Loaded config from ${source}`);
          
          // Load any metadata if available
          if (parsedConfig._meta) {
            console.log('Found metadata in saved config:', parsedConfig._meta);
            
            // Restore headerTitle from metadata
            if (parsedConfig._meta.headerTitle) {
              setHeaderTitle(parsedConfig._meta.headerTitle);
              localStorage.setItem('headerTitle', parsedConfig._meta.headerTitle);
              console.log('Restored headerTitle from config metadata:', parsedConfig._meta.headerTitle);
            }
            
            // Restore theme color from metadata
            if (parsedConfig._meta.themeColor) {
              setThemeColor(parsedConfig._meta.themeColor);
              localStorage.setItem('themeColor', parsedConfig._meta.themeColor);
            }
            
            // Restore theme link from metadata
            if (parsedConfig._meta.themeLink) {
              setThemeLink(parsedConfig._meta.themeLink);
              localStorage.setItem('themeLink', parsedConfig._meta.themeLink);
              console.log('Restored themeLink from config metadata:', parsedConfig._meta.themeLink);
            }
            
            // Restore infoBarExpanded state from metadata
            if (parsedConfig._meta.infoBarExpanded !== undefined) {
              setInfoBarExpanded(parsedConfig._meta.infoBarExpanded);
              localStorage.setItem('infoBarExpanded', parsedConfig._meta.infoBarExpanded.toString());
            }
            
            // Remove metadata before setting config to avoid UI confusion
            const { _meta, _timestamp, ...configWithoutMeta } = parsedConfig;
            setConfig(configWithoutMeta);
            setHistory([configWithoutMeta]);
          } else {
            // No metadata, just use the parsed config
            setConfig(parsedConfig);
            setHistory([parsedConfig]);
            
            // Try to get header title from localStorage as fallback
            const savedTitle = localStorage.getItem('headerTitle');
            if (savedTitle) {
              setHeaderTitle(savedTitle);
            }
            
            // Try to get theme color from localStorage as fallback
            const savedThemeColor = localStorage.getItem('themeColor');
            if (savedThemeColor) {
              setThemeColor(savedThemeColor);
            }
          }
          
          // Ensure all backups are in sync
          localStorage.setItem('siteConfig', JSON.stringify(parsedConfig));
          localStorage.setItem('siteConfig_backup', JSON.stringify(parsedConfig));
          sessionStorage.setItem('siteConfig_emergency', JSON.stringify(parsedConfig));
        } else {
          // Reset to default
          localStorage.setItem('siteConfig', JSON.stringify({
            ...localConfig,
            _meta: {
              headerTitle: 'Site Configuration',
              themeColor: '#a259e6',
              themeLink: '',
              infoBarExpanded: true
            }
          }));
          localStorage.setItem('siteConfig_backup', JSON.stringify({
            ...localConfig,
            _meta: {
              headerTitle: 'Site Configuration',
              themeColor: '#a259e6',
              themeLink: '',
              infoBarExpanded: true
            }
          }));
          setConfig(localConfig);
          setHistory([localConfig]);
          console.log('Reset to default config due to no valid saved config found');
        }
      };
      
      initializeConfig();
    }
  }, []);

  // Add debug logging for save functionality
  useEffect(() => {
    console.log("Save effect initialized");

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(`Key pressed: ${e.key}, ctrlKey: ${e.ctrlKey}, metaKey: ${e.metaKey}`);
      
      // Handle Ctrl+Z / Cmd+Z (undo)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        console.log("Undo triggered");
        
        if (history.length > 1) {
          // Get the previous state with proper typing
          const previousConfig: any = history[history.length - 2];
          
          // Set flag to prevent re-adding this change to history
          setIsRestoringFromHistory(true);
          
          // Save current state to redo history
          const currentConfig = history[history.length - 1];
          setRedoHistory(prev => [...prev, currentConfig]);
          
          // Restore the previous config state
          setConfig(previousConfig);
          
          // Also restore theme color and theme link if present
          if (previousConfig.themeColor) {
            setThemeColor(previousConfig.themeColor);
          }
          
          if (previousConfig.themeLink) {
            setThemeLink(previousConfig.themeLink);
          }
          
          // Update the history array to remove the current state
          setHistory(prev => prev.slice(0, -1));
          
          // Show a notification
          setShowToast(false);
          setTimeout(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
          }, 10);
        }
      }
      
      // Handle Ctrl+Shift+Z / Cmd+Shift+Z (redo)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        console.log("Redo triggered");
        
        if (redoHistory.length > 0) {
          // Get the last item from redo history
          const redoConfig = redoHistory[redoHistory.length - 1];
          
          // Set flag to prevent adding this change back to history
          setIsRestoringFromHistory(true);
          
          // Restore the redo config state
          setConfig(redoConfig);
          
          // Also restore theme color and theme link if present
          if (redoConfig.themeColor) {
            setThemeColor(redoConfig.themeColor);
          }
          
          if (redoConfig.themeLink) {
            setThemeLink(redoConfig.themeLink);
          }
          
          // Add the redo state back to history
          setHistory(prev => [...prev, redoConfig]);
          
          // Remove the used redo state
          setRedoHistory(prev => prev.slice(0, -1));
          
          // Show a notification
          setShowToast(false);
          setTimeout(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
          }, 10);
        }
      }
      
      // Ctrl+S/Cmd+S to save - this might be getting blocked
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log("Save shortcut detected - attempting to save...");
        
        // Inline save functionality instead of calling handleSave()
        try {
          console.log('Save shortcut triggered at', new Date().toISOString());
          
          // Create a complete config object that includes all necessary data
          const completeConfig = {
            ...config,
            _timestamp: new Date().toISOString(),
            _meta: {
              headerTitle: headerTitle,
              themeColor: themeColor,
              infoBarExpanded: infoBarExpanded
            }
          };
          
          // Save to multiple locations for redundancy
          localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
          localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
          sessionStorage.setItem('siteConfig_emergency', JSON.stringify(completeConfig));
          
          // Also save individual settings for redundancy
          localStorage.setItem('themeColor', themeColor);
          localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
          localStorage.setItem('headerTitle', headerTitle);
          
          // Show notification
          setShowToast(false);
          setTimeout(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
          }, 10);
        } catch (error) {
          console.error('Error saving:', error);
          alert('Failed to save: ' + (error instanceof Error ? error.message : String(error)));
        }
      }
      
      // Ctrl+E/Cmd+E to export
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        console.log("Export triggered");
        
        // Inline export functionality instead of calling handleExport()
        const dataStr = JSON.stringify(config, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'siteConfig.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, config, themeColor, redoHistory]);

  // Push to history on config change
  useEffect(() => {
    // Only add to history if not restoring from history
    if (!isRestoringFromHistory) {
      setHistory(h => {
        if (h[h.length - 1] !== config) {
          // Clear redo history when a new change is made
          setRedoHistory([]);
          return [...h, config];
        }
        return h;
      });
    } else {
      // Reset the flag
      setIsRestoringFromHistory(false);
    }
    
    // Continue with existing code for iframe updates
    // Send updates to the preview iframe when config changes
    const previewIframes = document.querySelectorAll('iframe');
    previewIframes.forEach(iframe => {
      if (iframe && iframe.contentWindow) {
        try {
          // Update sessionStorage first for future iframe loads
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('previewConfig', JSON.stringify({
              ...config,
              themeColor
            }));
          }
          
          // Post a message to any already loaded iframes
          iframe.contentWindow.postMessage({
            type: 'configUpdate',
            config: {
              ...config,
              themeColor
            },
            themeColor
          }, '*');
        } catch (error) {
          console.error('Error sending config to preview:', error);
        }
      }
    });
    
    // Auto-save config to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      // Don't auto-save immediately for footerStyle changes
      const prevConfig = prevConfigRef.current;
      const isFooterStyleChange = prevConfig && 
        JSON.stringify(prevConfig.footerStyle) !== JSON.stringify(config.footerStyle);
      
      if (!isFooterStyleChange) {
        localStorage.setItem('siteConfig', JSON.stringify(config));
        console.log('Auto-saved config to localStorage');
      }
      
      // Update the prevConfig ref for the next change
      prevConfigRef.current = { ...config };
    }
  }, [config, themeColor, isRestoringFromHistory]);

  // Set up periodic auto-save
  useEffect(() => {
    // Auto-save every 30 seconds instead of 10 seconds
    const autoSaveInterval = setInterval(() => {
      if (typeof window !== 'undefined') {
        // Create a complete config object that includes all necessary data
        const completeConfig = {
          ...config,
          _timestamp: new Date().toISOString(),
          themeColor: themeColor,
          themeLink: themeLink,
          _meta: {
            headerTitle: headerTitle,
            themeColor: themeColor,
            themeLink: themeLink,
            infoBarExpanded: infoBarExpanded
          }
        };
        
        // Save to localStorage
        localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
        
        // Also save a backup copy
        localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
        
        // Also save individual settings for redundancy
        localStorage.setItem('headerTitle', headerTitle);
        localStorage.setItem('themeColor', themeColor);
        localStorage.setItem('themeLink', themeLink);
        localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
        console.log('Auto-saved all config data at ' + new Date().toISOString());
      }
    }, 30000); // Every 30 seconds instead of 10
    
    return () => {
      clearInterval(autoSaveInterval);
    };
  }, [config, headerTitle, themeColor, themeLink, infoBarExpanded]);

  // Save to localStorage
  const handleSave = () => {
    try {
      console.log('handleSave function triggered at', new Date().toISOString());
      
      // Create a complete config object that includes all necessary data
      const completeConfig = {
        ...config,
        _timestamp: new Date().toISOString(),
        _meta: {
          headerTitle: headerTitle,
          themeColor: themeColor,
          infoBarExpanded: infoBarExpanded
        }
      };
      
      console.log('Saving config with meta:', completeConfig._meta);
      
      // Save to multiple locations for redundancy
      localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
      localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
      sessionStorage.setItem('siteConfig_emergency', JSON.stringify(completeConfig));
      
      console.log('Config saved to storage');
      
      // Also save individual settings for redundancy
      localStorage.setItem('themeColor', themeColor);
      localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
      localStorage.setItem('headerTitle', headerTitle);
      console.log('All individual settings saved, headerTitle:', headerTitle);
      
      // Dispatch event to notify components that config has been updated
      if (typeof window !== 'undefined') {
        // Standard config loaded event
        const configLoadedEvent = new Event('config-loaded');
        document.dispatchEvent(configLoadedEvent);
        
        // Create a custom event with the full config data
        const saveEvent = new CustomEvent('config-saved', { 
          detail: { config: completeConfig } 
        });
        document.dispatchEvent(saveEvent);
        
        console.log('Dispatched config events');
      }
      
      // Force update the toast state variables to ensure they update
      setShowToast(false);
      setTimeout(() => {
        setShowToast(true);
        console.log('Toast shown');
        setTimeout(() => setShowToast(false), 2000);
      }, 10);
      
      return true;
    } catch (error) {
      console.error('Error in handleSave:', error);
      alert('Failed to save. Error: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
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
                placeholder="Card Description"
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

  // Helper to export config as JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'siteConfig.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // New: Handle Publish to localConfig.ts
  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      setPublishMessage(null);
      
      // Dispatch event to indicate publishing has started
      document.dispatchEvent(new CustomEvent('publishing-started'));
      
      // Disable reload warnings before publishing to prevent interruptions
      disableReloadWarning();
      
      // Ensure we have the latest themeColor and themeLink
      const savedThemeColor = localStorage.getItem('themeColor');
      const savedThemeLink = localStorage.getItem('themeLink');
      
      if (savedThemeColor) {
        setThemeColor(savedThemeColor);
      }
      
      if (savedThemeLink) {
        setThemeLink(savedThemeLink);
      }
      
      // Save themeColor and themeLink to the config object directly
      const updatedConfig = {
        ...config,
        themeColor: savedThemeColor || themeColor,
        themeLink: savedThemeLink || themeLink,
        _timestamp: new Date().toISOString() // Add a timestamp to force updates
      };
      
      // First, save to localStorage to ensure we have the latest config
      localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
      localStorage.setItem('themeColor', themeColor); // Save theme explicitly too
      localStorage.setItem('themeLink', themeLink); // Save theme link explicitly too
      
      console.log("Publishing with themeColor:", updatedConfig.themeColor);
      console.log("Publishing with themeLink:", updatedConfig.themeLink);
      
      // Send the config to the API endpoint to update localConfig.ts
      const response = await fetch('/api/publish-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPublishStatus('success');
        setPublishMessage('Configuration published successfully! The changes are now in your code.');
        
        // Update localStorage with timestamp from server for cache-busting
        if (result.timestamp) {
          updatedConfig._timestamp = result.timestamp;
          localStorage.setItem('siteConfig', JSON.stringify(updatedConfig));
        }
        
        // Dispatch comprehensive events to trigger config refresh across the app
        
        // 1. Standard event for basic notification
        document.dispatchEvent(new Event('config-published'));
        
        // 2. Custom event with full config data for components that need it
        const publishEvent = new CustomEvent('config-full-update', {
          detail: { 
            config: updatedConfig,
            themeColor: themeColor,
            timestamp: result.timestamp || new Date().toISOString()
          }
        });
        document.dispatchEvent(publishEvent);
        
        // 3. Specific footer update event to ensure footer receives changes
        const footerUpdateEvent = new CustomEvent('footer-config-updated', {
          detail: {
            config: updatedConfig
          }
        });
        document.dispatchEvent(footerUpdateEvent);
        
        console.log('Dispatched all config update events');
        
        // Show a success toast
        setShowToast(false);
        setTimeout(() => {
          setShowToast(true);
          console.log('Toast shown');
          setTimeout(() => setShowToast(false), 2000);
        }, 10);
      } else {
        setPublishStatus('error');
        setPublishMessage(`Failed to publish: ${result.message}`);
      }
    } catch (error) {
      setPublishStatus('error');
      setPublishMessage(`Error publishing configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsPublishing(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setPublishMessage(null);
        setPublishStatus(null);
      }, 5000);
    }
  };

  // Load theme link from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLink = localStorage.getItem('themeLink');
      if (savedLink) setThemeLink(savedLink);
    }
  }, []);

  // Save theme link and color to localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeLink', themeLink);
      localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
    }
  }, [themeLink, infoBarExpanded]);

  // Update infoBarExpanded from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('infoBarExpanded');
      if (saved !== null) {
        setInfoBarExpanded(saved === 'true');
      }
    }
  }, []);

  // Load header title from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHeaderTitle = localStorage.getItem('headerTitle');
      if (savedHeaderTitle) {
        setHeaderTitle(savedHeaderTitle);
        console.log('Loaded header title from localStorage:', savedHeaderTitle);
      }
    }
  }, []);

  // Save header title to localStorage when changed
  useEffect(() => {
    if (typeof window !== 'undefined' && headerTitle) {
      localStorage.setItem('headerTitle', headerTitle);
      console.log('Saved header title to localStorage:', headerTitle);
    }
  }, [headerTitle]);

  // Add data-config-page attribute
  useEffect(() => {
    document.body.setAttribute('data-config-page', 'true');
    
    // Force all rotation states to be consistent with server rendering on initial client render
    // This helps prevent hydration mismatches
    setNavBarExpanded(false);
    setFooterExpanded(false);
    setShowHeroSection({});
    setShowScheduleSection(false);
    setShowGuaranteeSection(false);
    setShowServicesSection(false);
    
    // Add beforeunload event listener to save headerTitle before page refresh
    const handleBeforeUnload = () => {
      if (headerTitle) {
        localStorage.setItem('headerTitle', headerTitle);
        console.log('Saved header title before unload:', headerTitle);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      document.body.removeAttribute('data-config-page');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [headerTitle]);

  // Helper to apply theme color to className or style
  const themed = (defaultClass: string, colorClass?: string) =>
    colorClass ? `${defaultClass} ${colorClass}` : defaultClass;

  // Apply styles to dropdown icons after initial render to avoid hydration mismatch
  useEffect(() => {
    // Info Bar dropdown
    const infoBarDropdownIcon = document.querySelector('.info-bar-dropdown-icon');
    if (infoBarDropdownIcon && infoBarExpanded) {
      infoBarDropdownIcon.classList.add('rotate-180');
    }

    // Page section dropdowns
    const pageDropdownIcons = document.querySelectorAll('.page-dropdown-icon');
    pageDropdownIcons.forEach((icon, index) => {
      // Only rotate if the corresponding page is expanded
      const pageKeys = ['Home', 'Services', 'Reviews', 'Contact', ...Object.keys(config.pages || {}).filter(key => !['Home', 'Services', 'Reviews', 'Contact'].includes(key))];
      if (expandedPage === pageKeys[index]) {
        icon.querySelector('.dropdown-arrow')?.classList.add('rotate-180');
      }
    });

    // Hero section dropdowns
    Object.keys(showHeroSection).forEach(key => {
      const heroIcon = document.querySelector(`.hero-section-icon[data-page="${key}"]`);
      if (heroIcon && showHeroSection[key]) {
        heroIcon.querySelector('.dropdown-arrow')?.classList.add('rotate-180');
      }
    });
  }, [infoBarExpanded, expandedPage, config.pages, showHeroSection]);

  // Add beforeunload event listener to ensure saving on page close
  useEffect(() => {
    // Flag to track if we're in the publishing process
    let isPublishingInProgress = false;
    
    // Set up a custom event listener to disable warnings during publishing
    const handlePublishStart = () => {
      isPublishingInProgress = true;
      // Reset after 5 seconds (longer than typical publish time)
      setTimeout(() => {
        isPublishingInProgress = false;
      }, 5000);
    };
    
    // Listen for our custom publishing event
    document.addEventListener('publishing-started', handlePublishStart);
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Skip the warning if we're in the publishing process
      if (isPublishingInProgress) {
        return undefined;
      }
      
      // Force a full save to ensure nothing is lost
      const completeConfig = {
        ...config,
        _meta: {
          headerTitle,
          themeColor,
          infoBarExpanded,
          _lastSaved: new Date().toISOString()
        }
      };
      
      localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
      localStorage.setItem('headerTitle', headerTitle);
      localStorage.setItem('themeColor', themeColor);
      localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
      console.log('Emergency save completed on page close');
      
      // Show a warning if they try to leave
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return e.returnValue;
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('publishing-started', handlePublishStart);
    };
  }, [config, headerTitle, themeColor, infoBarExpanded as boolean]);

  // Set up periodic auto-save
  useEffect(() => {
    // Auto-save every 30 seconds (less aggressive than 5)
    const saveInterval = setInterval(() => {
      if (typeof window !== 'undefined') {
        try {
          // Save the latest config
          localStorage.setItem('siteConfig', JSON.stringify(config));
          localStorage.setItem('siteConfig_backup', JSON.stringify(config));
          
          // Dispatch a custom event for components that need to know about config changes
          const configEvent = new CustomEvent('config-autosaved', { 
            detail: { 
              timestamp: new Date().toISOString(),
              source: 'auto-save interval'
            } 
          });
          document.dispatchEvent(configEvent);
          
          console.log('Auto-saved all config data at ' + new Date().toISOString());
        } catch (error) {
          console.error('Error in auto-save interval:', error);
        }
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(saveInterval);
  }, [config]);

  // Add more aggressive saving for ANY config change
  useEffect(() => {
    // Immediate save whenever config changes
    if (typeof window !== 'undefined') {
      // Create a complete config object that includes all necessary data
      const completeConfig = {
        ...config,
        _timestamp: new Date().toISOString(),
        _meta: {
          headerTitle: headerTitle,
          themeColor: themeColor,
          infoBarExpanded: infoBarExpanded
        }
      };
      
      // Save to localStorage immediately
      localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
      localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
      console.log('Immediate save on config change at ' + new Date().toISOString());
    }
  }, [config]);
  
  // Add aggressive saving for theme color changes
  useEffect(() => {
    if (typeof window !== 'undefined' && themeColor) {
      localStorage.setItem('themeColor', themeColor);
      
      // Also update in the config object and save the full config
      const completeConfig = {
        ...config,
        _timestamp: new Date().toISOString(),
        _meta: {
          headerTitle: headerTitle,
          themeColor: themeColor,
          infoBarExpanded: infoBarExpanded
        }
      };
      
      localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
      localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
    }
  }, [themeColor]);

  // Modify the initialization to handle multiple backup sources
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeConfig = async () => {
        try {
          // Try to fetch the latest config from the JSON file first (most current)
          const response = await fetch('/current-config.json?' + new Date().getTime());
          if (response.ok) {
            const latestConfig = await response.json();
            console.log('Loaded config from JSON file');
            
            // Force a purple color theme (in localStorage) if none set
            if (!localStorage.getItem('themeColor')) {
              localStorage.setItem('themeColor', '#a259e6');
            }
            
            // Ensure the themeColor is properly loaded too
            const savedThemeColor = localStorage.getItem('themeColor');
            if (savedThemeColor) {
              setThemeColor(savedThemeColor);
            }
            
            // Update all our state variables
            setConfig(latestConfig);
            
            // Save to localStorage with metadata to ensure persistence
            const configToSave = {
              ...latestConfig,
              _timestamp: new Date().toISOString(),
              _meta: {
                headerTitle: headerTitle || 'Site Configuration',
                themeColor: savedThemeColor || themeColor,
                infoBarExpanded: infoBarExpanded
              }
            };
            
            localStorage.setItem('siteConfig', JSON.stringify(configToSave));
            localStorage.setItem('siteConfig_backup', JSON.stringify(configToSave));
            setHistory([latestConfig]);
            
            // Load header title if available
            const savedTitle = localStorage.getItem('headerTitle');
            if (savedTitle) {
              console.log('Loaded header title on initialization:', savedTitle);
              setHeaderTitle(savedTitle);
            }
            
            return;
          }
        } catch (error) {
          console.log('Could not load config from JSON file, falling back to localStorage or default');
        }
        
        // ENHANCED RECOVERY: Check multiple storage locations
        let parsedConfig = null;
        let source = '';
        
        // Try main localStorage item first
        const savedConfig = localStorage.getItem('siteConfig');
        if (savedConfig) {
          try {
            parsedConfig = JSON.parse(savedConfig);
            source = 'primary localStorage';
          } catch (e) {
            console.log('Primary localStorage config corrupt, trying backup');
          }
        }
        
        // If that fails, try the backup localStorage
        if (!parsedConfig) {
          const backupConfig = localStorage.getItem('siteConfig_backup');
          if (backupConfig) {
            try {
              parsedConfig = JSON.parse(backupConfig);
              source = 'backup localStorage';
            } catch (e) {
              console.log('Backup localStorage config corrupt, trying sessionStorage');
            }
          }
        }
        
        // If both localStorage options fail, try sessionStorage
        if (!parsedConfig) {
          const emergencyConfig = sessionStorage.getItem('siteConfig_emergency');
          if (emergencyConfig) {
            try {
              parsedConfig = JSON.parse(emergencyConfig);
              source = 'sessionStorage emergency backup';
            } catch (e) {
              console.log('All stored configs corrupt, using default');
            }
          }
        }
        
        // If we found a valid config, use it
        if (parsedConfig) {
          console.log(`Loaded config from ${source}`);
          
          // Load any metadata if available
          if (parsedConfig._meta) {
            console.log('Found metadata in saved config:', parsedConfig._meta);
            
            // Restore headerTitle from metadata
            if (parsedConfig._meta.headerTitle) {
              setHeaderTitle(parsedConfig._meta.headerTitle);
              localStorage.setItem('headerTitle', parsedConfig._meta.headerTitle);
              console.log('Restored headerTitle from config metadata:', parsedConfig._meta.headerTitle);
            }
            
            // Restore theme color from metadata
            if (parsedConfig._meta.themeColor) {
              setThemeColor(parsedConfig._meta.themeColor);
              localStorage.setItem('themeColor', parsedConfig._meta.themeColor);
            }
            
            // Restore theme link from metadata
            if (parsedConfig._meta.themeLink) {
              setThemeLink(parsedConfig._meta.themeLink);
              localStorage.setItem('themeLink', parsedConfig._meta.themeLink);
              console.log('Restored themeLink from config metadata:', parsedConfig._meta.themeLink);
            }
            
            // Restore infoBarExpanded state from metadata
            if (parsedConfig._meta.infoBarExpanded !== undefined) {
              setInfoBarExpanded(parsedConfig._meta.infoBarExpanded);
              localStorage.setItem('infoBarExpanded', parsedConfig._meta.infoBarExpanded.toString());
            }
            
            // Remove metadata before setting config to avoid UI confusion
            const { _meta, _timestamp, ...configWithoutMeta } = parsedConfig;
            setConfig(configWithoutMeta);
            setHistory([configWithoutMeta]);
          } else {
            // No metadata, just use the parsed config
            setConfig(parsedConfig);
            setHistory([parsedConfig]);
            
            // Try to get header title from localStorage as fallback
            const savedTitle = localStorage.getItem('headerTitle');
            if (savedTitle) {
              setHeaderTitle(savedTitle);
            }
            
            // Try to get theme color from localStorage as fallback
            const savedThemeColor = localStorage.getItem('themeColor');
            if (savedThemeColor) {
              setThemeColor(savedThemeColor);
            }
          }
          
          // Ensure all backups are in sync
          localStorage.setItem('siteConfig', JSON.stringify(parsedConfig));
          localStorage.setItem('siteConfig_backup', JSON.stringify(parsedConfig));
          sessionStorage.setItem('siteConfig_emergency', JSON.stringify(parsedConfig));
        } else {
          // Reset to default
          localStorage.setItem('siteConfig', JSON.stringify({
            ...localConfig,
            _meta: {
              headerTitle: 'Site Configuration',
              themeColor: '#a259e6',
              themeLink: '',
              infoBarExpanded: true
            }
          }));
          localStorage.setItem('siteConfig_backup', JSON.stringify({
            ...localConfig,
            _meta: {
              headerTitle: 'Site Configuration',
              themeColor: '#a259e6',
              themeLink: '',
              infoBarExpanded: true
            }
          }));
          setConfig(localConfig);
          setHistory([localConfig]);
          console.log('Reset to default config due to no valid saved config found');
        }
      };
      
      initializeConfig();
    }
  }, []);

  // Add a window focus event listener to check for any changes
  useEffect(() => {
    const handleWindowFocus = () => {
      console.log('Window focused - ensuring all data is saved');
      // Use the existing handleSave function
      handleSave();
    };
    
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [config, headerTitle, themeColor, infoBarExpanded]);

  // Add a window blur event listener to save everything
  useEffect(() => {
    const handleWindowBlur = () => {
      console.log('Window blurred - emergency save');
      
      // Create a complete config object that includes all necessary data
      const completeConfig = {
        ...config,
        _timestamp: new Date().toISOString(),
        _meta: {
          headerTitle: headerTitle,
          themeColor: themeColor,
          infoBarExpanded: infoBarExpanded
        }
      };
      
      // Save to multiple locations for redundancy
      localStorage.setItem('siteConfig', JSON.stringify(completeConfig));
      localStorage.setItem('siteConfig_backup', JSON.stringify(completeConfig));
      sessionStorage.setItem('siteConfig_emergency', JSON.stringify(completeConfig));
      
      // Also save individual settings
      localStorage.setItem('themeColor', themeColor);
      localStorage.setItem('infoBarExpanded', infoBarExpanded.toString());
      localStorage.setItem('headerTitle', headerTitle);
    };
    
    window.addEventListener('blur', handleWindowBlur);
    
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [config, headerTitle, themeColor, infoBarExpanded]);

  // Add dedicated effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S for save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault(); // Prevent browser's save dialog
        console.log('Ctrl+S detected, triggering save...');
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [config, headerTitle, themeColor, infoBarExpanded]); // Dependencies for handleSave

  // Add a new state to track history restoration
  const [historyIndex, setHistoryIndex] = useState(0);

  // Implement the undo functionality
  const handleUndo = () => {
    if (history.length > 1) {
      // Go back one step in history
      const newIndex = history.length - 2; // Previous state
      
      if (newIndex >= 0) {
        console.log(`Undoing to history state ${newIndex} of ${history.length - 1}`);
        
        // Set flag to prevent adding this change back to history
        setIsRestoringFromHistory(true);
        
        // Restore the previous config state
        const previousConfig: any = history[newIndex];
        
        // Save current state to redo history
        const currentConfig = history[history.length - 1];
        setRedoHistory(prev => [...prev, currentConfig]);
        
        // Update the config state
        setConfig(previousConfig);
        
        // Also update related states if they exist in the previous config
        if ('themeColor' in previousConfig) {
          setThemeColor(previousConfig.themeColor as string);
          localStorage.setItem('themeColor', previousConfig.themeColor as string);
        }
        
        if ('themeLink' in previousConfig) {
          setThemeLink(previousConfig.themeLink as string);
          localStorage.setItem('themeLink', previousConfig.themeLink as string);
        }
        
        // Remove the current state from history
        setHistory(prev => prev.slice(0, -1));
        
        // Show toast notification
        setShowToast(false);
        setTimeout(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }, 10);
        
        return true;
      }
    }
    
    console.log('Nothing to undo');
    return false;
  };

  // Implement the redo functionality
  const handleRedo = () => {
    if (redoHistory.length > 0) {
      console.log(`Redoing to state. Redo history length: ${redoHistory.length}`);
      
      // Set flag to prevent adding this change back to history
      setIsRestoringFromHistory(true);
      
      // Get the last item from redo history
      const redoConfig = redoHistory[redoHistory.length - 1];
      
      // Update the config state
      setConfig(redoConfig);
      
      // Also update related states if they exist in the redo config
      if ('themeColor' in redoConfig) {
        setThemeColor(redoConfig.themeColor as string);
        localStorage.setItem('themeColor', redoConfig.themeColor as string);
      }
      
      if ('themeLink' in redoConfig) {
        setThemeLink(redoConfig.themeLink as string);
        localStorage.setItem('themeLink', redoConfig.themeLink as string);
      }
      
      // Add the redo state back to history
      setHistory(prev => [...prev, redoConfig]);
      
      // Remove the used redo state
      setRedoHistory(prev => prev.slice(0, -1));
      
      // Show toast notification
      setShowToast(false);
      setTimeout(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }, 10);
      
      return true;
    }
    
    console.log('Nothing to redo');
    return false;
  };

  // Update the keyboard event handler to use handleUndo for Ctrl+Z
  useEffect(() => {
    console.log("Keyboard handler initialized");

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl+Z / Cmd+Z (undo)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        console.log("Undo shortcut detected");
        handleUndo();
        return;
      }
      
      // Handle Ctrl+Shift+Z / Cmd+Shift+Z (redo)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        console.log("Redo shortcut detected");
        handleRedo();
        return;
      }
      
      // Ctrl+S/Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log("Save shortcut detected - attempting to save...");
        handleSave();
        return;
      }
      
      // Ctrl+E/Cmd+E to export
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        console.log("Export triggered");
        handleExport();
        return;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history.length, redoHistory.length]); // Include redoHistory.length in dependencies

  // Update the config change effect to handle history and redo properly
  useEffect(() => {
    // Only add to history if not restoring from history
    if (!isRestoringFromHistory) {
      setHistory(prevHistory => {
        const lastConfig = prevHistory[prevHistory.length - 1];
        // Only add if different from last entry
        if (JSON.stringify(lastConfig) !== JSON.stringify(config)) {
          console.log('Adding new state to history. History length:', prevHistory.length + 1);
          // Clear redo history when a new change is made
          setRedoHistory([]);
          return [...prevHistory, {...config}];
        }
        return prevHistory;
      });
    } else {
      // Reset the flag
      setIsRestoringFromHistory(false);
    }
    
    // Continue with existing code for iframe updates
    // Send updates to the preview iframe when config changes
    const previewIframes = document.querySelectorAll('iframe');
    previewIframes.forEach(iframe => {
      if (iframe && iframe.contentWindow) {
        try {
          // Update sessionStorage first for future iframe loads
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('previewConfig', JSON.stringify({
              ...config,
              themeColor
            }));
          }
          
          // Post a message to any already loaded iframes
          iframe.contentWindow.postMessage({
            type: 'configUpdate',
            config: {
              ...config,
              themeColor
            },
            themeColor
          }, '*');
        } catch (error) {
          console.error('Error sending config to preview:', error);
        }
      }
    });
    
    // Auto-save config to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      // Skip immediate auto-save for footer style changes to prevent interrupting the user
      const prevConfig = prevConfigRef.current;
      const isFooterStyleChange = prevConfig && 
        JSON.stringify(prevConfig.footerStyle) !== JSON.stringify(config.footerStyle);
      
      if (!isFooterStyleChange) {
        localStorage.setItem('siteConfig', JSON.stringify(config));
        console.log('Auto-saved config to localStorage');
      }
      
      // Update the prevConfig ref for the next change
      prevConfigRef.current = { ...config };
    }
  }, [config, themeColor, isRestoringFromHistory]);

  // Add effect to disable reload dialogs (moved from outside the component)
  useEffect(() => {
    // Disable all reload dialogs
    const disableReloadWarnings = () => {
      // Disable beforeunload
      window.onbeforeunload = null;
      
      // Handle any reload dialogs
      const handleReloadDialogs = () => {
        const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
        dialogs.forEach(dialog => {
          // Check any checkboxes
          const checkbox = dialog.querySelector('input[type="checkbox"]');
          if (checkbox) {
            (checkbox as HTMLInputElement).checked = true;
          }
          
          // Find and click reload buttons
          const buttons = dialog.querySelectorAll('button');
          buttons.forEach(button => {
            if (button.textContent?.includes('Reload')) {
              setTimeout(() => button.click(), 10);
            }
          });
        });
      };
      
      // Run immediately
      handleReloadDialogs();
      
      // And again after a delay
      setTimeout(handleReloadDialogs, 50);
    };
    
    // Listen for config changes
    document.addEventListener('config-published', disableReloadWarnings);
    
    // Also disable on mount
    disableReloadWarnings();
    
    return () => {
      document.removeEventListener('config-published', disableReloadWarnings);
    };
  }, []);

  // Add this useEffect near the other event listeners
  useEffect(() => {
    // Listen for manual save requests (like from the footer style config)
    const handleSaveRequest = (event: any) => {
      console.log('Manual save requested from:', event.detail?.source);
      handleSave();
    };
    
    document.addEventListener('config-save-requested', handleSaveRequest);
    
    return () => {
      document.removeEventListener('config-save-requested', handleSaveRequest);
    };
  }, []);

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50" id="config-page">
      {/* Header */}
      <header className="border-b border-gray-300 bg-white py-3 px-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={headerTitle}
              onChange={e => setHeaderTitle(e.target.value)}
              className="text-xl font-bold text-gray-700 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none"
              aria-label="Configuration Title"
            />
            <button
              onClick={() => setShowInstructions(true)}
              className="text-gray-400 hover:text-gray-700"
              aria-label="Show Instructions"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Right: Actions & Preview Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 sm:mr-2">
              <label htmlFor="themeColor" className="text-sm text-gray-600 hidden sm:inline">Theme:</label>
              <input
                type="color"
                id="themeColor"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-8 h-8 p-0 border border-gray-300 rounded-sm cursor-pointer"
              />
            </div>

            <div className="hidden sm:flex items-center">
              <button onClick={handleUndo} disabled={history.length <= 1} className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button onClick={handleRedo} disabled={redoHistory.length === 0} className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div className="hidden sm:block border border-gray-300 h-6"></div>

            <div className="flex items-center">
              <button
                onClick={() => setMobilePreview(!mobilePreview)}
                className={`p-2 ${mobilePreview ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900`}
                aria-label={mobilePreview ? "Switch to Desktop Preview" : "Switch to Mobile Preview"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <div className="hidden sm:block border border-gray-300 h-6"></div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 text-sm flex items-center gap-1 hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-3 py-1.5 bg-gray-700 text-white text-sm flex items-center gap-1 hover:bg-gray-600 disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Publishing...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Published Message */}
      {publishMessage && (
        <div className={`border-t border-b ${publishStatus === 'success' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'} py-2 px-4 text-center`}>
          {publishMessage}
        </div>
      )}
      
      {/* Loader if config not loaded yet */}
      {!isClientLoaded && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading configuration...</p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div id="split-container" className="relative flex h-[calc(100vh-57px)]" style={{ visibility: isClientLoaded ? 'visible' : 'hidden' }}>
        {/* Config Panel */}
        <div
          ref={configPanelRef}
          className="overflow-y-auto pb-40"
          style={{ width: `${splitPosition}%`, maxWidth: isMobileDevice ? '100%' : undefined }}
        >
          {/* Mobile Preview Warning */}
          {isMobileDevice && mobilePreview && (
            <div className="bg-yellow-50 border border-yellow-300 p-3 m-4 text-sm text-yellow-800">
              Mobile preview is not available on mobile devices. Please use a desktop browser for this feature.
            </div>
          )}
          
          <div className="p-4">
            {/* Info Bar Configuration */}
            {config.infoBar && (
              <div className="mb-6 border border-gray-300 bg-white">
                <div
                  className="flex items-center justify-between w-full p-4 text-left focus:outline-none cursor-pointer"
                  onClick={() => setInfoBarExpanded(prev => !prev)}
                >
                  <h2 className="text-xl font-bold text-gray-700">Info Bar Configuration</h2>
                  <span className={`transform transition-duration-200 info-bar-dropdown-icon ${infoBarExpanded ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {infoBarExpanded && (
                  <div className="p-4 border-t border-gray-300">
                    <InfoBarConfig config={config} setConfig={setConfig} />
                  </div>
                )}
              </div>
            )}
            
            {/* Navbar Configuration */}
            {config.navBar && (
              <div className="mb-6 border border-gray-300 bg-white">
                <div
                  className="flex items-center justify-between w-full p-4 text-left focus:outline-none cursor-pointer"
                  onClick={() => setNavBarExpanded(prev => !prev)}
                >
                  <h2 className="text-xl font-bold text-gray-700">Navigation Bar</h2>
                  <span className={`transform transition-duration-200 ${navBarExpanded ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {navBarExpanded && (
                  <div className="p-4 border-t border-gray-300">
                    <NavBarConfig config={config} setConfig={setConfig} />
                  </div>
                )}
              </div>
            )}

            {/* Pages Configuration */}
            <div className="mb-6 border border-gray-300 bg-white">
              <h2 className="text-xl font-bold text-gray-700 p-4">Page Configuration</h2>
              <div className="border-t border-gray-300">
                {Object.entries(config.pages || {}).map(([pageKey, pageConfig], index) => (
                  <div key={pageKey} className="border-b border-gray-300 last:border-b-0">
                    <div
                      className="flex items-center justify-between w-full p-4 text-left focus:outline-none cursor-pointer page-dropdown-icon"
                      onClick={() => setExpandedPage(expandedPage === pageKey ? null : pageKey)}
                    >
                      <span className="font-bold text-gray-700">{pageKey} Page</span>
                      <div className="flex items-center">
                        {pageKey !== 'Home' && 
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePage(pageKey);
                            }}
                            className="mr-2 text-red-500 hover:text-red-700 focus:outline-none"
                            aria-label={`Delete ${pageKey} Page`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        }
                        <span className={`transform transition-duration-200 dropdown-arrow ${expandedPage === pageKey ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </div>
                    {expandedPage === pageKey && (
                      <div className="p-4 border-t border-gray-300">
                        {/* Home Page specific configuration */}
                        {pageKey === 'Home' && (
                          <div className="space-y-4">
                            <HeroSectionForm page={pageConfig as any} setPage={(newPage: any) => setConfig((prev: any) => ({
                              ...prev,
                              pages: {
                                ...prev.pages,
                                [pageKey]: newPage
                              }
                            }))} />

                            {/* Schedule Section */}
                            <div className="border border-gray-300 p-4 mb-4">
                              <div
                                className="flex items-center justify-between w-full text-left focus:outline-none cursor-pointer"
                                onClick={() => setShowScheduleSection(prev => !prev)}
                              >
                                <h3 className="text-lg font-bold text-gray-700">Schedule Section</h3>
                                <span className={`transform transition-duration-200 ${showScheduleSection ? 'rotate-180' : ''}`}>▼</span>
                              </div>
                              {showScheduleSection && config.pages?.Home?.scheduleSection && (
                                <div className="mt-4">
                                  <ScheduleSection 
                                    page={config.pages.Home}
                                    setPage={(newPage: any) => setConfig((prev: any) => ({
                                      ...prev,
                                      pages: {
                                        ...prev.pages,
                                        Home: newPage
                                      }
                                    }))}
                                    showScheduleSection={showScheduleSection}
                                    setShowScheduleSection={setShowScheduleSection}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Guarantee Section */}
                            <div className="border border-gray-300 p-4 mb-4">
                              <div
                                className="flex items-center justify-between w-full text-left focus:outline-none cursor-pointer"
                                onClick={() => setShowGuaranteeSection(prev => !prev)}
                              >
                                <h3 className="text-lg font-bold text-gray-700">Guarantee Section</h3>
                                <span className={`transform transition-duration-200 ${showGuaranteeSection ? 'rotate-180' : ''}`}>▼</span>
                              </div>
                              {showGuaranteeSection && config.pages?.Home?.guaranteeSection && (
                                <div className="mt-4">
                                  <GuaranteeSection 
                                    page={config.pages.Home}
                                    setPage={(newPage: any) => setConfig((prev: any) => ({
                                      ...prev,
                                      pages: {
                                        ...prev.pages,
                                        Home: newPage
                                      }
                                    }))}
                                    showGuaranteeSection={showGuaranteeSection}
                                    setShowGuaranteeSection={setShowGuaranteeSection}
                                  />
                                </div>
                              )}
                            </div>

                            {/* Services Section */}
                            <div className="border border-gray-300 p-4 mb-4">
                              <div
                                className="flex items-center justify-between w-full text-left focus:outline-none cursor-pointer"
                                onClick={() => setShowServicesSection(prev => !prev)}
                              >
                                <h3 className="text-lg font-bold text-gray-700">Services Section</h3>
                                <span className={`transform transition-duration-200 ${showServicesSection ? 'rotate-180' : ''}`}>▼</span>
                              </div>
                              {showServicesSection && (
                                <div className="mt-4">
                                  <ServicesSection 
                                    page={config.pages.Home}
                                    setPage={(newPage: any) => setConfig((prev: any) => ({
                                      ...prev,
                                      pages: {
                                        ...prev.pages,
                                        Home: newPage
                                      }
                                    }))}
                                    showServicesSection={showServicesSection}
                                    setShowServicesSection={setShowServicesSection}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        {!isMobileDevice && (
          <div 
            ref={splitDividerRef}
            className={`hidden lg:flex absolute top-0 bottom-0 w-2 cursor-col-resize z-20 flex-col items-center justify-center transition-colors ${isDragging ? 'bg-purple-200' : ''}`}
            style={{ 
              left: `${splitPosition}%`, 
              transform: 'translateX(-50%)', 
              background: 'var(--theme-color)'
            }}
            onMouseDown={handleDividerMouseDown}
          >
            <div className="h-16 flex flex-col items-center justify-center space-y-1">
              <div className="w-0.5 h-8 bg-white opacity-70"></div>
              <div className="w-0.5 h-8 bg-white opacity-70"></div>
            </div>
          </div>
        )}

        {/* Preview Panel - Right Side */}
        {!isMobileDevice && (
          <div 
            className="w-full lg:h-screen bg-white hidden lg:block"
            style={{ 
              width: `${100 - splitPosition}%`, 
              background: 'var(--theme-color-light)',
              borderLeft: `2px solid ${themeColor}`
            }}
          >
            {/* Preview header */}
            <div 
              className="h-12 flex items-center justify-between px-6 relative overflow-hidden group" 
              style={{ 
                background: `linear-gradient(135deg, var(--theme-color), ${themeColor}cc)`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -inset-[10%] bg-white/10 rounded-full blur-xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-1500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-bold text-white tracking-wide relative z-10">Live Preview</span>
                <div 
                  onClick={() => setShowInstructions(true)}
                  className="relative ml-1 cursor-pointer group/pulse"
                >
                  <div className="h-5 w-5 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75 duration-1000" style={{ animationIterationCount: 'infinite', animationDuration: '2s' }}></div>
                </div>
              </div>
              
              <div className="flex space-x-2 items-center relative z-10">
                <div className="flex bg-white/10 p-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  <button 
                    className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-105 ${!mobilePreview ? 'bg-white/20' : ''}`}
                    style={{ 
                      color: '#fff'
                    }}
                    onClick={() => setMobilePreview(false)}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Desktop</span>
                    </div>
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-105 ${mobilePreview ? 'bg-white/20' : ''}`}
                    style={{ 
                      color: '#fff' 
                    }}
                    onClick={() => setMobilePreview(true)}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Mobile</span>
                    </div>
                  </button>
                </div>
                
                <button 
                  className="px-3 py-1 rounded text-xs font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-1.5"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    color: '#fff' 
                  }}
                  onClick={() => window.open('/preview', '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>New Tab</span>
                </button>
              </div>
            </div>
            
            {/* Preview content */}
            <div className="w-full h-[calc(100vh-3rem)] overflow-hidden flex items-center justify-center" style={{ background: 'var(--theme-color-light)' }}>
              {mobilePreview ? (
                <div className="bg-gray-800 rounded-3xl p-3 shadow-xl w-[375px] h-[85vh] overflow-hidden">
                  <div className="w-full h-6 flex justify-center items-center mb-1">
                    <div className="w-20 h-3 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="bg-white h-[calc(100%-1.75rem)] rounded-2xl overflow-hidden">
                    <iframe 
                      src="/preview" 
                      className="w-full h-full border-none"
                      title="Mobile Website Preview"
                      id="preview-mobile"
                      data-preview-frame="true"
                    />
                  </div>
                </div>
              ) : (
                <iframe 
                  src="/preview" 
                  className="w-full h-full border-none"
                  title="Website Preview"
                  id="preview-desktop"
                  data-preview-frame="true"
                />
              )}
            </div>
          </div>
        )}

        {/* Back to Top Button - Mobile Only */}
        {isMobileDevice && showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 text-white"
            style={{ background: 'var(--theme-color)' }}
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
