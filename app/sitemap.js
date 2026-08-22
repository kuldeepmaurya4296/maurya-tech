import connectToDatabase from '@/lib/mongodb';
import Job from '@/lib/models/Job';
import Project from '@/lib/models/Project';
import Post from '@/lib/models/Post';
import { jobs as fallbackJobs } from '@/data/jobs';
import { projects as fallbackProjects } from '@/data/projects';
import { posts as fallbackPosts } from '@/data/posts';

export default async function sitemap() {
  const baseUrl = 'https://maurya-tech.com';
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/products',
    '/pricing',
    '/technologies',
    '/careers',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicJobRoutes = [];
  let dynamicProjectRoutes = [];
  let dynamicBlogRoutes = [];

  try {
    await connectToDatabase();

    const [dbJobs, dbProjects, dbPosts] = await Promise.all([
      Job.find({ isActive: true }).select('customId slug _id updatedAt').lean(),
      Project.find({ isPublished: true }).select('slug customId _id updatedAt').lean(),
      Post.find({ isPublished: true }).select('slug customId _id updatedAt').lean(),
    ]);

    if (dbJobs && dbJobs.length > 0) {
      dynamicJobRoutes = dbJobs.map((j) => ({
        url: `${baseUrl}/careers/${j.customId || j._id}`,
        lastModified: j.updatedAt ? new Date(j.updatedAt).toISOString() : currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }

    if (dbProjects && dbProjects.length > 0) {
      dynamicProjectRoutes = dbProjects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug || p.customId || p._id}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt).toISOString() : currentDate,
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
    }

    if (dbPosts && dbPosts.length > 0) {
      dynamicBlogRoutes = dbPosts.map((b) => ({
        url: `${baseUrl}/blog/${b.slug || b.customId || b._id}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt).toISOString() : currentDate,
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
    }
  } catch (error) {
    console.warn('Sitemap dynamic query fallback:', error.message);
  }

  // Fallbacks if empty
  if (dynamicJobRoutes.length === 0) {
    dynamicJobRoutes = (fallbackJobs.jobs || []).filter((j) => j.isActive).map((job) => ({
      url: `${baseUrl}/careers/${job.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  }

  if (dynamicProjectRoutes.length === 0) {
    dynamicProjectRoutes = (fallbackProjects.projects || []).map((project) => ({
      url: `${baseUrl}/projects/${project.slug || project.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));
  }

  if (dynamicBlogRoutes.length === 0) {
    dynamicBlogRoutes = (fallbackPosts.posts || []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug || post.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));
  }

  return [...staticRoutes, ...dynamicJobRoutes, ...dynamicProjectRoutes, ...dynamicBlogRoutes];
}
