// src/context/ConfigContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';

interface ConfigContextType {
  config: any;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ config, children }: { config: any; children: ReactNode }) {
  return (
    <ConfigContext.Provider value={{ config }}>
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