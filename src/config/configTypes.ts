// src/config/configTypes.ts
// These types are used throughout the application and are NOT auto-generated
// Do NOT modify this file when publishing changes to the site configuration

export interface InfoBar {
  backgroundColor: string;
  phone: string;
  address: string;
  hours: string;
  textColor: string;
  message?: string;
}

export interface NavBar {
  backgroundColor: string;
  textColor: string;
  logo: string;
  siteTitle: string;
  siteTitleGradientFrom: string;
  siteTitleGradientTo: string;
  scheduleButtonText: string;
  scheduleButtonColor: string;
  activeTabColor: string;
  navLinks: { path: string; label: string }[];
}

export interface HomePage {
  badge: string;
  title: string;
  location: string;
  content: string;
  subtitle2: string;
  heroImage: string;
  heroGradientColor: string;
  heroRadialColor: string;
  heroGradientTop: string;
  heroGradientMiddle: string;
  heroGradientBottom: string;
  heroGradientLeft: string;
  heroBadgeColor: string;
  heroBadgeTitleColor: string;
  heroTitleColor: string;
  heroLocationColor: string;
  heroSubtitleColor: string;
  heroContentColor: string;
  heroScheduleButtonColor: string;
  heroScheduleButtonTextColor: string;
  heroContactButtonColor: string;
  heroContactButtonTextColor: string;
  heroContactButtonBorderColor: string;
  heroContactButtonHoverBgColor: string;
  heroContactButtonHoverTextColor: string;
  heroContactButtonHoverBorderColor: string;
  heroBox1BgColor: string;
  heroBox1TextColor: string;
  heroBox1BorderColor: string;
  heroBox1HoverBgColor: string;
  heroBox1HoverTextColor: string;
  heroBox1HoverBorderColor: string;
  heroBox1IconBgColor: string;
  heroBox1IconColor: string;
  heroBox2BgColor: string;
  heroBox2TextColor: string;
  heroBox2BorderColor: string;
  heroBox2HoverBgColor: string;
  heroBox2HoverTextColor: string;
  heroBox2HoverBorderColor: string;
  heroBox2IconBgColor: string;
  heroBox2IconColor: string;
  heroBox3BgColor: string;
  heroBox3TextColor: string;
  heroBox3BorderColor: string;
  heroBox3HoverBgColor: string;
  heroBox3HoverTextColor: string;
  heroBox3HoverBorderColor: string;
  heroBox3IconBgColor: string;
  heroBox3IconColor: string;
  heroCard1Text: string;
  heroCard2Text: string;
  heroCard3Text: string;
  contactButtonText: string;
  scheduleSection?: any;
  guaranteeSection?: any;
  [key: string]: any;
}

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

export interface SocialLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  [key: string]: string;
}

// The complete site configuration interface
export interface SiteConfig {
  showLogo: boolean;
  infoBar: InfoBar;
  navBar: NavBar;
  pages: {
    Home: HomePage;
    Contact?: any;
    Reviews?: any;
    Services?: any;
    [key: string]: any;
  };
  services?: any;
  guaranteeItems?: any[];
  description: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
  footerLinks: {
    path: string;
    label: string;
  }[];
  socialLinks: SocialLinks;
  schedulingButtonText: string;
  servicePages?: any;
  _lastUpdated?: string;
  footerStyle: FooterStyle;
  companyName: string;
  showJoinTeamButton: boolean;
  joinTeamText: string;
  joinTeamLink: string;
  copyright: string;
  theme: {
    primary600: string;
    primary700: string;
    [key: string]: string;
  };
  navLinks: { path: string; label: string }[];
  policies: {
    terms: string;
    privacy: string;
    [key: string]: string;
  };
  themeColor: string;
  themeLink: string;
  _timestamp?: string;
} 