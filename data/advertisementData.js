export const advertisementData = {
  advertisements: [
    {
      id: 'ad-welcome-dialog',
      title: 'Welcome Promotion',
      description: 'Welcome dialog for new visitors',
      content: {
        headline: '🚀 Start Your Digital Journey',
        body: 'Ready to transform your business with cutting-edge technology? Get a free consultation and discover how we can accelerate your growth.',
        imageUrl: '/placeholder.svg',
        ctaText: 'Get Free Consultation',
        ctaLink: '/contact',
        secondaryCtaText: 'Learn More',
        secondaryCtaLink: '/services',
      },
      display: {
        type: 'dialog',
        position: 'center',
        showCloseButton: true,
        delayShowSeconds: 3,
      },
      targeting: {
        mode: 'homepage',
        selectedPages: ['/'],
        excludedPages: ['/admin'],
      },
      schedule: {
        isActive: true,
        showOncePerSession: true,
      },
      style: {
        showGradient: true,
        showImage: false,
      },
      analytics: {
        impressions: 0,
        clicks: 0,
        dismissals: 0,
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'ad-special-offer',
      title: 'Special Offer Banner',
      description: 'Limited time offer banner',
      content: {
        headline: '🎉 Limited Time: 20% Off All Services',
        body: 'Transform your business with our premium software solutions. Offer ends soon!',
        ctaText: 'Claim Offer',
        ctaLink: '/contact',
      },
      display: {
        type: 'banner',
        position: 'top',
        showCloseButton: true,
      },
      targeting: {
        mode: 'all',
        selectedPages: [],
        excludedPages: ['/admin'],
      },
      schedule: {
        isActive: true,
        showOncePerSession: true,
      },
      style: {
        showGradient: true,
        showImage: false,
      },
      analytics: {
        impressions: 0,
        clicks: 0,
        dismissals: 0,
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'ad-newsletter',
      title: 'Newsletter Floating',
      description: 'Newsletter signup floating widget',
      content: {
        headline: '📧 Stay Updated',
        body: 'Subscribe to our newsletter for the latest tech insights and exclusive offers.',
        ctaText: 'Subscribe Now',
        ctaLink: '#newsletter',
      },
      display: {
        type: 'floating',
        position: 'bottom-right',
        showCloseButton: true,
        delayShowSeconds: 10,
      },
      targeting: {
        mode: 'exclude',
        selectedPages: [],
        excludedPages: ['/admin', '/contact'],
      },
      schedule: {
        isActive: true,
        showOncePerSession: true,
      },
      style: {
        showGradient: true,
        showImage: false,
      },
      analytics: {
        impressions: 0,
        clicks: 0,
        dismissals: 0,
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ],
  globalSettings: {
    enableAds: true,
    maxAdsPerPage: 2,
    respectDoNotTrack: true,
    showOnMobile: true,
    showOnDesktop: true,
  },
};
