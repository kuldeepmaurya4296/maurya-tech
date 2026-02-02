import React from 'react';
import { TechnologiesPage } from '@/components/pages/technologies/TechnologiesPage';
import { technologyData } from '@/data/technologyData';

export const metadata = {
    title: 'Technologies | Maurya Tech',
    description: 'Explore the cutting-edge technologies we use to build scalable and robust solutions.',
}

export default function Technologies() {
    return <TechnologiesPage technologyData={technologyData} />;
}
