'use client'

import React, { useState, useEffect } from 'react'
import { usePrivacyPolicy, useTermsOfService } from '../../PolicyModals'
import localConfig from '@/config/localConfig'
import { getFooterStyle, getSocialLinks, normalizeConfig } from '@/config/configFixTypes'
import FooterBrandSection from './FooterBrandSection'
import FooterLinks from './FooterLinks'
import FooterContactInfo from './FooterContactInfo'
import FooterInfoSection from './FooterInfoSection'
import FooterBottomBar from './FooterBottomBar'

export default function Footer() {
  const { openPrivacyPolicy, PrivacyPolicyModal } = usePrivacyPolicy()
  const { openTermsOfService, TermsOfServiceModal } = useTermsOfService()
  
  // Use state to manage config to ensure it's reactive and fresh
  const [currentConfig, setCurrentConfig] = useState<any>(normalizeConfig(localConfig))
  
  // Force refresh from localConfig on mount
  useEffect(() => {
    // This ensures we're always using the latest localConfig with proper structure
    setCurrentConfig(normalizeConfig({...localConfig}))
  }, [])
  
  // Get data from currentConfig
  const companyName = currentConfig.navBar?.siteTitle || "Davis Tree Removal";
  const description = currentConfig.description || "A trusted tree removal service in Duluth, GA.";
  const footerLinks = currentConfig.footerLinks || [];
  const socialLinks = getSocialLinks(currentConfig);
  const contactInfo = currentConfig.contactInfo || {};
  const hours = currentConfig.hours || {};
  const showJoinTeamButton = currentConfig.showJoinTeamButton || false;
  const joinTeamText = currentConfig.joinTeamText || "Join Our Team";
  const joinTeamLink = currentConfig.joinTeamLink || "/careers";
  const copyright = currentConfig.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;
  
  // Get footer styling with proper structure
  const style = getFooterStyle(currentConfig);
  const colors = {
    gradientFrom: style.gradientFromColor,
    gradientTo: style.gradientToColor,
    title: style.titleColor,
    text: style.textColor,
    link: style.linkColor,
    linkHover: style.linkHoverColor,
    socialIcon: style.socialIconColor,
    divider: style.dividerColor,
    quickLinksTitle: style.quickLinksTitleColor,
    contactInfoTitle: style.contactInfoTitleColor,
    infoTitle: style.infoTitleColor,
    joinButtonBg: style.joinButtonBgColor,
    joinButtonText: style.joinButtonTextColor,
    joinButtonHoverBg: style.joinButtonHoverBgColor,
    hoursCardBg: style.hoursCardBgColor,
    hoursCardText: style.hoursCardTextColor,
    hoursCardValue: style.hoursCardValueColor,
    copyrightText: style.copyrightTextColor,
    policyLink: style.policyLinkColor,
    policyLinkHover: style.policyLinkHoverColor
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