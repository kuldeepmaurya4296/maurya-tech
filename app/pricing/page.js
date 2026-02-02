import React from 'react';
import { PricingPage } from '@/components/pages/pricing/PricingPage';
import { pricingData } from '@/data/pricingData';

export const metadata = {
    title: 'Pricing | Maurya Tech',
    description: 'Transparent and flexible pricing plans for businesses of all sizes.',
}

export default function Pricing() {
    return <PricingPage pricingData={pricingData} />;
}
