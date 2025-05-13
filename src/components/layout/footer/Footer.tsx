'use client'

import React, { useState, useEffect } from 'react'
import { usePrivacyPolicy, useTermsOfService } from '../../PolicyModals'
import localConfig, { LocalConfig } from '@/config/localConfig'
import FooterBrandSection from './FooterBrandSection'
import FooterLinks from './FooterLinks'
import FooterContactInfo from './FooterContactInfo'
import FooterInfoSection from './FooterInfoSection'
import FooterBottomBar from './FooterBottomBar'

// Update the LocalConfig interface or create a new extended interface
interface FooterConfig extends LocalConfig {
  showJoinTeamButton?: boolean;
  joinTeamText?: string;
  joinTeamLink?: string;
  copyright?: string;
  footerStyle?: {
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
  };
}

export default function Footer() {
  const { openPrivacyPolicy, PrivacyPolicyModal } = usePrivacyPolicy()
  const { openTermsOfService, TermsOfServiceModal } = useTermsOfService()
  
  // Use state to manage config to ensure it's reactive and fresh
  const [currentConfig, setCurrentConfig] = useState<FooterConfig>(localConfig)
  
  // Force refresh from localConfig on mount
  useEffect(() => {
    // This ensures we're always using the latest localConfig
    setCurrentConfig({...localConfig})
  }, [])
  
  // Get data from currentConfig
  const companyName = currentConfig.navBar?.siteTitle || "Davis Tree Removal";
  const description = currentConfig.description || "A trusted tree removal service in Duluth, GA.";
  const footerLinks = currentConfig.footerLinks || [];
  const socialLinks = typeof currentConfig.socialLinks === 'object' ? currentConfig.socialLinks : {};
  const contactInfo = currentConfig.contactInfo || {};
  const hours = currentConfig.hours || {};
  const showJoinTeamButton = currentConfig.showJoinTeamButton || false;
  const joinTeamText = currentConfig.joinTeamText || "Join Our Team";
  const joinTeamLink = currentConfig.joinTeamLink || "/careers";
  const copyright = currentConfig.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;
  
  // Get footer styling
  const style = currentConfig.footerStyle || {};
  const colors = {
    gradientFrom: style.gradientFromColor || "#ffffff",
    gradientTo: style.gradientToColor || "#f9fafb",
    title: style.titleColor || "#4f46e5",
    text: style.textColor || "#4b5563",
    link: style.linkColor || "#4b5563",
    linkHover: style.linkHoverColor || "#4f46e5",
    socialIcon: style.socialIconColor || "#4f46e5",
    divider: style.dividerColor || "rgba(79, 70, 229, 0.2)",
    quickLinksTitle: style.quickLinksTitleColor || "#4f46e5",
    contactInfoTitle: style.contactInfoTitleColor || "#4f46e5",
    infoTitle: style.infoTitleColor || "#4f46e5",
    joinButtonBg: style.joinButtonBgColor || "#4f46e5",
    joinButtonText: style.joinButtonTextColor || "#ffffff",
    joinButtonHoverBg: style.joinButtonHoverBgColor || "#4338ca",
    hoursCardBg: style.hoursCardBgColor || "rgba(255, 255, 255, 0.6)",
    hoursCardText: style.hoursCardTextColor || "#4b5563",
    hoursCardValue: style.hoursCardValueColor || "#4f46e5",
    copyrightText: style.copyrightTextColor || "#6b7280",
    policyLink: style.policyLinkColor || "#6b7280",
    policyLinkHover: style.policyLinkHoverColor || "#4f46e5"
  };

  return (
    <footer className="relative" style={{ 
      background: `linear-gradient(to bottom, ${colors.gradientFrom}, ${colors.gradientTo})` 
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Brand Section */}
          <FooterBrandSection 
            companyName={companyName}
            description={description}
            socialLinks={socialLinks}
            colors={{
              title: colors.title,
              text: colors.text,
              socialIcon: colors.socialIcon
            }}
          />

          {/* Quick Links */}
          <FooterLinks 
            title="Quick Links"
            links={footerLinks}
            colors={{
              quickLinksTitle: colors.quickLinksTitle,
              divider: colors.divider,
              link: colors.link,
              linkHover: colors.linkHover
            }}
          />

          {/* Contact Info */}
          <FooterContactInfo 
            contactInfo={contactInfo}
            colors={{
              contactInfoTitle: colors.contactInfoTitle,
              divider: colors.divider,
              text: colors.text,
              linkHover: colors.linkHover,
              socialIcon: colors.socialIcon
            }}
          />

          {/* Info Section */}
          <FooterInfoSection 
            hours={hours}
            showJoinTeamButton={showJoinTeamButton}
            joinTeamText={joinTeamText}
            joinTeamLink={joinTeamLink}
            colors={{
              infoTitle: colors.infoTitle,
              divider: colors.divider,
              socialIcon: colors.socialIcon,
              hoursCardBg: colors.hoursCardBg,
              hoursCardText: colors.hoursCardText,
              hoursCardValue: colors.hoursCardValue,
              joinButtonBg: colors.joinButtonBg,
              joinButtonText: colors.joinButtonText,
              joinButtonHoverBg: colors.joinButtonHoverBg
            }}
          />
        </div>

        {/* Bottom Bar */}
        <FooterBottomBar 
          copyright={copyright}
          openPrivacyPolicy={openPrivacyPolicy}
          openTermsOfService={openTermsOfService}
          colors={{
            divider: colors.divider,
            copyrightText: colors.copyrightText,
            policyLink: colors.policyLink,
            policyLinkHover: colors.policyLinkHover
          }}
        />
      </div>

      {/* Policy Modals */}
      <PrivacyPolicyModal />
      <TermsOfServiceModal />
    </footer>
  )
} 