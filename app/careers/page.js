import React from 'react';
import { CareersPage } from '@/components/pages/careers/CareersPage';
import { jobs as jobsData } from '@/data/jobs';
import { globalKeywordsList } from '@/data/seo-keywords';

export const metadata = {
    title: 'Careers',
    description: 'Join Our Team: Meaningful work, flexible culture, and rapid growth. Check open positions at Maurya Technologies.',
    alternates: {
        canonical: '/careers',
    },
    keywords: [...globalKeywordsList, 'Tech Jobs', 'Software Engineer Careers', 'Remote Developer Jobs', 'Hiring Developers', 'Maurya Tech Careers'],
}

export default function Careers() {
    return <CareersPage jobsData={jobsData} />;
}
