import React from 'react';
import { PricingPage } from '@/components/pages/pricing/PricingPage';
import { pricingData } from '@/data/pricingData';

export const metadata = {
    title: 'Pricing',
    description: 'Transparent Pricing Plans: Choose the right plan for your business needs. Web, Mobile, and Marketing packages available.',
    alternates: {
        canonical: '/pricing',
    },
    keywords: ['Software Development Pricing', 'Web Design Cost', 'App Development Cost', 'Affordable SEO packages'],
}

export default function Pricing() {
    return <PricingPage pricingData={pricingData} />;
}
