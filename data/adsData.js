export const adsData = {
    banners: [
        {
            id: "1",
            title: "Start Your Risk-Free Pilot Today",
            description: "Build first. Pay later. See your product live before any commitment.",
            ctaText: "Get Started",
            ctaLink: "/contact",
            isActive: true,
            position: "hero",
            style: "gradient"
        },
        {
            id: "2",
            title: "Free Technical Consultation",
            description: "Get expert advice on your project. No strings attached.",
            ctaText: "Book Now",
            ctaLink: "/contact",
            isActive: true,
            position: "sidebar",
            style: "solid"
        }
    ],
    popups: [
        {
            id: "1",
            title: "Limited Time Offer",
            description: "Get 20% off your first project when you start before the end of this month.",
            ctaText: "Claim Offer",
            ctaLink: "/contact",
            isActive: false,
            triggerType: "exit-intent",
            delay: 0
        }
    ],
    floatingCta: {
        text: "Talk to an Expert",
        link: "/contact",
        icon: "MessageCircle",
        isActive: true
    }
};
