import React from 'react';
import { AboutPage } from '@/components/pages/about/AboutPage';
import { aboutData } from '@/data/aboutData';

export const metadata = {
    title: 'About Us',
    description: 'Learn about Maurya Technologies, our mission, vision, Pilot Model, and the team driving innovation in software development.',
    alternates: {
        canonical: '/about',
    },
    keywords: ['About Maurya Tech', 'Maurya Team', 'Software Company History', 'Our Mission', 'Kuldeep Maurya'],
}

export default function About() {
    return <AboutPage aboutData={aboutData} />;
}
