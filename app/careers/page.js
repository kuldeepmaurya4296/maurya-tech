import React from 'react';
import { CareersPage } from '@/components/pages/careers/CareersPage';
import { jobsData } from '@/data/jobsData';

export const metadata = {
    title: 'Careers | Maurya Tech',
    description: 'Join our team of innovators and help us build the future of technology.',
}

export default function Careers() {
    return <CareersPage jobsData={jobsData} />;
}
