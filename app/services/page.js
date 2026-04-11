import React from 'react';
import { ServicesPage } from '@/components/pages/services/ServicesPage';
import { services as servicesData } from '@/data/services';
import { globalKeywordsList } from '@/data/seo-keywords';

// Filter for only service-specific and 'near me' keywords
const serviceKeywords = globalKeywordsList.filter(k => 
    k.includes('development') || k.includes('near me') || k.includes('software') || k.includes('service')
);

export const metadata = {
    title: 'Services',
    description: 'Explore our services: Web Development, Mobile Apps, Cloud Solutions, AI/ML Service, and Enterprise Software Consulting.',
    alternates: {
        canonical: '/services',
    },
    keywords: [...serviceKeywords, 'Web Development Services', 'App Development', 'Cloud Consulting', 'AI Services', 'Software Outsourcing'],
}

export default function Services() {
    return <ServicesPage servicesData={servicesData} />;
}
