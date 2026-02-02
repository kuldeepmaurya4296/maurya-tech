import React from 'react';
import { TechnologiesPage } from '@/components/pages/technologies/TechnologiesPage';
import { technologyData } from '@/data/technologyData';

export const metadata = {
    title: 'Technologies',
    description: 'Tech Stack: We use cutting-edge technologies like React, Next.js, Node.js, Python, Flutter, and AWS.',
    alternates: {
        canonical: '/technologies',
    },
    keywords: ['ReactJS Development', 'Next.js Experts', 'Node.js Backend', 'Flutter Apps', 'Cloud Technologies'],
}

export default function Technologies() {
    return <TechnologiesPage technologyData={technologyData} />;
}
