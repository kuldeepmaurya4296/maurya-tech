import React from 'react';
import { CareersPage } from '@/components/pages/careers/CareersPage';
import { jobsData } from '@/data/jobsData';

export const metadata = {
    title: 'Careers',
    description: 'Join Our Team: Meaningful work, flexible culture, and rapid growth. Check open positions at Maurya Technologies.',
    alternates: {
        canonical: '/careers',
    },
    keywords: ['Tech Jobs', 'Software Engineer Careers', 'Remote Developer Jobs', 'Hiring Developers', 'Maurya Tech Careers'],
}

export default function Careers() {
    return <CareersPage jobsData={jobsData} />;
}
