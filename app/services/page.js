import React from 'react';
import { ServicesPage } from '@/components/pages/services/ServicesPage';
import { servicesData } from '@/data/servicesData';

export const metadata = {
    title: 'Services | Maurya Tech',
    description: 'Explore our comprehensive range of software development and IT consulting services.',
}

export default function Services() {
    return <ServicesPage servicesData={servicesData} />;
}
