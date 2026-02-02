// Brand Configuration Data - Multi-Brand Ready
// This file contains all brand-specific settings that can be customized per deployment
// Structured for future database integration













export const brandData = {
  companyName: "Maurya Technologies",
  tagline: "Building Tomorrow's Digital Solutions",
  logo: {
    type: 'image',
    imageUrl: '/logo.png',
    altText: 'Maurya Technologies Logo',
  },
  favicon: '/favicon.ico',

  contact: {
    email: 'hello@mauryatech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Park, Silicon Valley, CA 94025',
    workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
  },

  socialLinks: [
    { id: 'social-1', platform: 'linkedin', url: 'https://linkedin.com/company/mauryatech', isActive: true },
    { id: 'social-2', platform: 'twitter', url: 'https://twitter.com/mauryatech', isActive: true },
    { id: 'social-3', platform: 'github', url: 'https://github.com/mauryatech', isActive: true },
    { id: 'social-4', platform: 'facebook', url: 'https://facebook.com/mauryatech', isActive: false },
    { id: 'social-5', platform: 'instagram', url: 'https://instagram.com/mauryatech', isActive: false },
    { id: 'social-6', platform: 'youtube', url: 'https://youtube.com/@mauryatech', isActive: false },
  ],

  colors: {
    primary: "222 47% 11%",
    secondary: "217 33% 17%",
    accent: "160 84% 39%",
    background: "222 47% 11%",
    foreground: "210 40% 98%",
  },

  typography: {
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    monoFont: 'Fira Code',
  },

  theme: {
    defaultMode: 'dark',
    allowUserToggle: true,
    currentThemeId: 'engineer-dark',
  },

  footer: {
    description: 'We build innovative software solutions that help businesses grow and succeed in the digital age.',
    sections: [
      {
        title: 'Company',
        links: [
          { name: 'About Us', path: '/about' },
          { name: 'Services', path: '/services' },
          { name: 'Projects', path: '/projects' },
          { name: 'Careers', path: '/careers' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { name: 'Blog', path: '/blog' },
          { name: 'Technologies', path: '/technologies' },
          { name: 'Contact', path: '/contact' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { name: 'Privacy Policy', path: '/privacy' },
          { name: 'Terms of Service', path: '/terms' },
        ],
      },
    ],
    copyrightText: '© {year} {company}. All rights reserved.',
    showPoweredBy: true,
    poweredByText: 'Crafted with passion for excellence',
  },

  industry: 'technology',

  meta: {
    lastUpdated: '2024-01-01T00:00:00.000Z',
    version: '1.0.0',
  },
};



