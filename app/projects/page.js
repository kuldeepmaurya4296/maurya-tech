import React from 'react';
import { ProjectsPage } from '@/components/pages/projects/ProjectsPage';
import { projectsData } from '@/data/projectsData';

export const metadata = {
    title: 'Our Projects | Maurya Tech',
    description: 'Discover how we have helped businesses transform with our innovative software solutions.',
}

export default function Projects() {
    return <ProjectsPage projectsData={projectsData} />;
}
