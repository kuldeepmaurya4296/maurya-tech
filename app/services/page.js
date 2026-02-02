import React from 'react';
import { ServicesPage } from '@/components/pages/services/ServicesPage';
import { servicesData } from '@/data/servicesData';

export const metadata = {
    title: 'Services',
    description: 'Explore our services: Web Development, Mobile Apps, Cloud Solutions, AI/ML Service, and Enterprise Software Consulting.',
    alternates: {
        canonical: '/services',
    },
    keywords: ['Web Development Services', 'App Development', 'Cloud Consulting', 'AI Services', 'Software Outsourcing'],
}

export default function Services() {
    return <ServicesPage servicesData={servicesData} />;
}
