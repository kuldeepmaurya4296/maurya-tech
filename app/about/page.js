import React from 'react';
import { AboutPage } from '@/components/pages/about/AboutPage';
import { about as aboutData } from '@/data/about';
import { seoData } from '@/data/seo-keywords';

// Use all typo and brand permutations for About page
const aboutKeywords = [...seoData.typos, ...seoData.brands, ...seoData.services];

export const metadata = {
    title: 'About Us',
    description: 'Learn about Maurya Technologies, our mission, vision, Pilot Model, and the team driving innovation in software development.',
    alternates: {
        canonical: '/about',
    },
    keywords: [...aboutKeywords, 'About Maurya Tech', 'Maurya Team', 'Software Company History', 'Our Mission', 'Kuldeep Maurya'],
}

export default function About() {
    return <AboutPage aboutData={aboutData} />;
}
