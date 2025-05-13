// src/context/ConfigContext.tsx
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { normalizeConfig } from '@/config/configFixTypes';

interface ConfigContextType {
  config: any;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ config: initialConfig, children }: { config: any; children: ReactNode }) {
  // Normalize the initial config to ensure it has the correct structure
  const [config, setConfig] = useState(normalizeConfig(initialConfig));
  
  // Function to reload configuration from the server
  const refreshConfig = async () => {
    try {
      // First try to get config from window global (if available)
      if (typeof window !== 'undefined' && (window as any).__CURRENT_CONFIG__) {
        const newConfig = normalizeConfig((window as any).__CURRENT_CONFIG__);
        setConfig(newConfig);
        console.log("Config updated from window.__CURRENT_CONFIG__", 
          newConfig?.pages?.Home?.heroScheduleButtonColor,
          newConfig?.pages?.Home?.heroContactButtonColor
        );
        return;
      }
      
      // Otherwise fetch from API endpoint
      const timestamp = new Date().getTime();
      const response = await fetch(`/current-config.json?t=${timestamp}`);
      
      if (response.ok) {
        const freshConfig = await response.json();
        const normalizedConfig = normalizeConfig(freshConfig);
        setConfig(normalizedConfig);
        // Store in window for future reference
        if (typeof window !== 'undefined') {
          (window as any).__CURRENT_CONFIG__ = normalizedConfig;
        }
      } else {
        throw new Error('Failed to fetch config');
      }
    } catch (error) {
      console.error("Failed to refresh configuration:", error);
      
      // If all else fails, try the API endpoint
      try {
        const response = await fetch(`/api/get-config?t=${new Date().getTime()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.config) {
            setConfig(normalizeConfig(data.config));
          }
        }
      } catch (fallbackError) {
        console.error("Failed all config refresh methods:", fallbackError);
      }
    }
  };
  
  // Listen for changes in the preview configuration and global config
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for window global config first (from layout.tsx)
      if ((window as any).__CURRENT_CONFIG__) {
        setConfig(normalizeConfig((window as any).__CURRENT_CONFIG__));
      }
      
      // Check if we're in a preview context and there's a preview config available
      if ((window as any).__PREVIEW_CONFIG__) {
        setConfig(normalizeConfig((window as any).__PREVIEW_CONFIG__));
      }
      
      // Listen for preview config loaded event
      const handlePreviewConfigLoaded = () => {
        if ((window as any).__PREVIEW_CONFIG__) {
          setConfig(normalizeConfig((window as any).__PREVIEW_CONFIG__));
        }
      };
      
      // Listen for config-loaded event (from layout.tsx)
      const handleConfigLoaded = () => {
        if ((window as any).__CURRENT_CONFIG__) {
          setConfig(normalizeConfig((window as any).__CURRENT_CONFIG__));
        }
      };
      
      // Listen for config published event
      const handleConfigPublished = () => {
        refreshConfig();
      };
      
      document.addEventListener('preview-config-loaded', handlePreviewConfigLoaded);
      document.addEventListener('config-published', handleConfigPublished);
      document.addEventListener('config-loaded', handleConfigLoaded);
      
      // Initial fetch on mount
      refreshConfig();
      
      return () => {
        document.removeEventListener('preview-config-loaded', handlePreviewConfigLoaded);
        document.removeEventListener('config-published', handleConfigPublished);
        document.removeEventListener('config-loaded', handleConfigLoaded);
      };
    }
  }, []);
  
  return (
    <ConfigContext.Provider value={{ config, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context.config;
}

export function useConfigRefresh() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigRefresh must be used within a ConfigProvider');
  }
  return context.refreshConfig;
}