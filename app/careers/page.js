import React from 'react';
import { CareersPage } from '@/components/pages/careers/CareersPage';
import { jobs as initialJobsData } from '@/data/jobs';
import { globalKeywordsList } from '@/data/seo-keywords';
import connectToDatabase from '@/lib/mongodb';
import Job from '@/lib/models/Job';

export const revalidate = 60; // ISR revalidation every 60 seconds

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

async function getCareersData() {
  try {
    await connectToDatabase();
    const dbJobs = await Job.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();

    if (dbJobs && dbJobs.length > 0) {
      const formattedJobs = dbJobs.map((j) => ({
        id: j.customId || j.slug || j._id.toString(),
        slug: j.slug || j.customId,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        experience: j.experience,
        salary: j.salary || '',
        skills: j.skills || [],
        description: j.description,
        responsibilities: j.responsibilities || [],
        requirements: j.requirements || [],
        benefits: j.benefits || [],
        isActive: j.isActive,
      }));

      return {
        ...initialJobsData,
        jobs: formattedJobs,
      };
    }
  } catch (error) {
    console.warn('MongoDB Careers fetch fallback to static data:', error.message);
  }

  return initialJobsData;
}

export default async function Careers() {
  const dynamicJobsData = await getCareersData();
  return <CareersPage jobsData={dynamicJobsData} />;
}
