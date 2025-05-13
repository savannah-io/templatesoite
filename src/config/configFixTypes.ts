/**
 * This file provides utility functions and type fixes for the site configuration.
 * It handles converting between the auto-generated config types and the proper structure.
 * 
 * These functions ensure type safety without needing to modify the auto-generated localConfig.ts
 */

// Import any necessary types here
import { LocalConfig } from './localConfig';

/**
 * FooterStyle with all properties defined properly 
 */
export interface FooterStyle {
  backgroundColor: string;
  gradientFromColor: string;
  gradientToColor: string;
  titleColor: string;
  textColor: string;
  linkColor: string;
  linkHoverColor: string;
  socialIconColor: string;
  dividerColor: string;
  quickLinksTitleColor: string;
  contactInfoTitleColor: string;
  infoTitleColor: string;
  joinButtonBgColor: string;
  joinButtonTextColor: string;
  joinButtonHoverBgColor: string;
  hoursCardBgColor: string;
  hoursCardTextColor: string;
  hoursCardValueColor: string;
  copyrightTextColor: string;
  policyLinkColor: string;
  policyLinkHoverColor: string;
}

/**
 * SocialLinks with expected structure
 */
export interface SocialLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  [key: string]: string;
}

/**
 * Function to ensure the footer style object has all required properties
 * with proper defaults if missing
 */
export function getFooterStyle(config: any): FooterStyle {
  const defaults: FooterStyle = {
    backgroundColor: "#ffffff",
    gradientFromColor: "rgba(255, 255, 255, 1.0)",
    gradientToColor: "rgba(249, 250, 251, 1.0)",
    titleColor: "#4f46e5",
    textColor: "#4b5563",
    linkColor: "#4b5563",
    linkHoverColor: "#4f46e5",
    socialIconColor: "#4f46e5",
    dividerColor: "rgba(79, 70, 229, 0.2)",
    quickLinksTitleColor: "#4f46e5",
    contactInfoTitleColor: "#4f46e5",
    infoTitleColor: "#4f46e5",
    joinButtonBgColor: "#4f46e5",
    joinButtonTextColor: "#ffffff",
    joinButtonHoverBgColor: "#4338ca",
    hoursCardBgColor: "rgba(255, 255, 255, 0.6)",
    hoursCardTextColor: "#4b5563",
    hoursCardValueColor: "#4f46e5",
    copyrightTextColor: "#6b7280",
    policyLinkColor: "#6b7280",
    policyLinkHoverColor: "#4f46e5"
  };

  // Use the footerStyle from config if available, otherwise use an empty object
  const footerStyle = config?.footerStyle || {};
  
  // Return an object with all defaults overridden by any properties from footerStyle
  return { ...defaults, ...footerStyle };
}

/**
 * Function to ensure social links have the expected structure
 */
export function getSocialLinks(config: any): SocialLinks {
  const defaults: SocialLinks = {
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  };
  
  // Handle both possible data structures based on what's in the config
  if (!config.socialLinks) {
    return defaults;
  }
  
  // Handle array format (coming from auto-generated type)
  if (Array.isArray(config.socialLinks)) {
    const result = { ...defaults };
    config.socialLinks.forEach((item: any) => {
      if (item.platform && item.url) {
        result[item.platform] = item.url;
      }
    });
    return result;
  }
  
  // Handle object format (the format we actually want)
  if (typeof config.socialLinks === 'object') {
    return { ...defaults, ...config.socialLinks };
  }
  
  return defaults;
}

/**
 * Function to normalize the entire config object and ensure it has the correct structure
 */
export function normalizeConfig(config: any): any {
  // Clone the config to avoid mutation
  const normalizedConfig = { ...config };
  
  // Fix the footerStyle
  normalizedConfig.footerStyle = getFooterStyle(config);
  
  // Fix the socialLinks
  normalizedConfig.socialLinks = getSocialLinks(config);
  
  // Ensure Home page button properties exist
  if (normalizedConfig.pages?.Home) {
    normalizedConfig.pages.Home = {
      ...normalizedConfig.pages.Home,
      // Schedule button defaults
      scheduleButtonText: normalizedConfig.pages.Home.scheduleButtonText || 'Schedule Now',
      scheduleButtonColor: normalizedConfig.pages.Home.scheduleButtonColor || '#c9ba18',
      
      // Contact button defaults
      contactButtonText: normalizedConfig.pages.Home.contactButtonText || 'Contact Us',
      contactButtonColor: normalizedConfig.pages.Home.contactButtonColor || '#ffffff',
      contactButtonTextColor: normalizedConfig.pages.Home.contactButtonTextColor || '#4fc917'
    };
  }
  
  return normalizedConfig;
} 