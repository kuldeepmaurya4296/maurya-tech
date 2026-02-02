import React from 'react';
import { ProjectsPage } from '@/components/pages/projects/ProjectsPage';
import { projectsData } from '@/data/projectsData';

export const metadata = {
    title: 'Projects',
    description: 'Case Studies and Portfolio: See how Maurya Technologies has delivered scalable solutions for startups and enterprises.',
    alternates: {
        canonical: '/projects',
    },
    keywords: ['Project Portfolio', 'Case Studies', 'Software Success Stories', 'Client Projects', 'Maurya Tech Portfolio'],
}

export default function Projects() {
    return <ProjectsPage projectsData={projectsData} />;
}
