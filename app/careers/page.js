import React from 'react';
import { CareersPage } from '@/components/pages/careers/CareersPage';
import { jobs as initialJobsData } from '@/data/jobs';
import { globalKeywordsList } from '@/data/seo-keywords';

// Static Edge Pre-rendering with background ISR - Delivers < 50ms TTFB
export const revalidate = 3600; // 1 hour static cache for instant LCP

export const metadata = {
  title: 'IT Jobs in Bhopal | Careers at Maurya Technologies Bhopal',
  description:
    'Explore top software engineering jobs & tech internships in Bhopal, MP at Maurya Technologies. Hiring Full Stack Mobile Developers (Flutter/Node), MERN + Next.js Developers, DevOps Engineers, Cyber Security Engineers, and QA Test Engineers in Bhopal.',
  alternates: {
    canonical: '/careers',
  },
  keywords: [
    ...globalKeywordsList,
    'Jobs in Bhopal',
    'IT Jobs in Bhopal',
    'Software Developer Jobs in Bhopal',
    'Tech Jobs in Bhopal',
    'Flutter Developer Jobs in Bhopal',
    'Flutter Internship in Bhopal',
    'MERN Stack Developer Jobs Bhopal',
    'Next.js Developer Hiring Bhopal',
    'DevOps Engineer Jobs in Bhopal',
    'Cyber Security Engineer Jobs Bhopal',
    'QA Test Engineer Jobs Bhopal',
    'Software Testing Internship Bhopal',
    'IT Fresher Jobs in Bhopal',
    'Top IT Companies in Bhopal',
    'Software Company in Bhopal Hiring',
    'Maurya Technologies Bhopal Careers',
  ],
};

export default function Careers() {
  return <CareersPage jobsData={initialJobsData} />;
}
