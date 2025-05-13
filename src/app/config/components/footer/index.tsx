'use client'

import React, { useState } from 'react'
import FooterStyleConfig from './FooterStyleConfig'
import { LocalConfig } from '@/config/localConfig'

// Extend LocalConfig to include footerStyle
interface FooterStyle {
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

interface ExtendedLocalConfig extends LocalConfig {
  footerStyle?: FooterStyle;
}

interface FooterConfigProps {
  config: ExtendedLocalConfig;
  setConfig: (config: ExtendedLocalConfig) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export default function FooterConfig({
  config,
  setConfig,
  expanded,
  setExpanded
}: FooterConfigProps) {
  return (
    <div>
      <button
        className="flex items-center w-full text-left gap-2 mb-4 focus:outline-none"
        onClick={() => setExpanded(!expanded)}
        type="button"
        style={{ color: '#111827' }}
      >
        <h2 className="text-xl font-bold">Footer</h2>
        <span className={`ml-2 text-xl transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''} text-gray-900`}>▼</span>
      </button>
      
      {expanded && (
        <div className="space-y-4">
          <FooterStyleConfig 
            config={config}
            setConfig={setConfig}
          />
          
          {/* Here you would add other footer config components:
              - FooterLinksConfig
              - FooterContactInfoConfig
              - FooterInfoSectionConfig
              - FooterCopyrightConfig
          */}
        </div>
      )}
    </div>
  )
} 