import { notFound } from 'next/navigation';
import { ProjectDetailPage } from '@/components/pages/projects/ProjectDetailPage';
import { projects as fallbackProjects } from '@/data/projects';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export const revalidate = 60;

async function getProjectBySlug(slug) {
  try {
    await connectToDatabase();
    const project = await Project.findOne({
      $or: [
        { slug },
        { customId: slug },
        { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null },
      ],
    }).lean();

    if (project) {
      return JSON.parse(JSON.stringify(project));
    }
  } catch (err) {
    console.warn('MongoDB Project lookup fallback:', err.message);
  }

  return (fallbackProjects.projects || []).find((p) => p.slug === slug || p.id === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Case Study | Maurya Technologies`,
    description: project.shortDescription || 'Case study and software architecture by Maurya Technologies.',
    alternates: {
      canonical: `/projects/${project.slug || project.id}`,
    },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: 'website',
      url: `https://maurya-tech.com/projects/${project.slug || project.id}`,
    },
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
