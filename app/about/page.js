import React from 'react';
import { AboutPage } from '@/components/pages/about/AboutPage';
import { aboutData } from '@/data/aboutData';

export const metadata = {
    title: 'About Us | Maurya Tech',
    description: 'Learn about our mission, vision, and the team driving innovation at Maurya Tech.',
}

export default function About() {
    return <AboutPage aboutData={aboutData} />;
}
