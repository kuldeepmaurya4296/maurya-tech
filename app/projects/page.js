import React from 'react';
import { ProjectsPage } from '@/components/pages/projects/ProjectsPage';
import { projects as initialProjectsData } from '@/data/projects';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export const revalidate = 60;

export const metadata = {
  title: 'Projects & Case Studies',
  description:
    'Explore our portfolio of scalable SaaS platforms, enterprise web applications, and autonomous systems engineered by Maurya Technologies.',
  alternates: {
    canonical: '/projects',
  },
  keywords: [
    'Project Portfolio',
    'Case Studies',
    'SaaS Engineering Success Stories',
    'Client Projects',
    'Maurya Tech Portfolio',
  ],
};

async function getProjectsData() {
  try {
    await connectToDatabase();
    const dbProjects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).lean();

    if (dbProjects && dbProjects.length > 0) {
      const formattedProjects = dbProjects.map((p) => ({
        id: p.customId || p.slug || p._id.toString(),
        slug: p.slug,
        title: p.title,
        category: p.category,
        role: p.role,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        problem: p.problem,
        solution: p.solution,
        keyFeatures: p.keyFeatures || [],
        techStack: p.techStack || {},
        results: p.results || [],
        thumbnail: p.thumbnail,
        liveLink: p.liveLink,
        githubLink: p.githubLink,
        desktopImages: p.desktopImages || [],
        mobileImages: p.mobileImages || [],
      }));

      return {
        ...initialProjectsData,
        projects: formattedProjects,
      };
    }
  } catch (err) {
    console.warn('MongoDB Projects list fallback:', err.message);
  }

  return initialProjectsData;
}

export default async function Projects() {
  const dynamicProjectsData = await getProjectsData();
  return <ProjectsPage projectsData={dynamicProjectsData} />;
}
