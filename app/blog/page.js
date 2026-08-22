import React from 'react';
import { BlogPage } from '@/components/pages/blog/BlogPage';
import { posts as initialBlogData } from '@/data/posts';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const revalidate = 60;

export const metadata = {
  title: 'Blog & Insights',
  description:
    'Practical software engineering insights, SaaS scaling strategies, and architectural best practices by Maurya Technologies.',
  alternates: {
    canonical: '/blog',
  },
  keywords: [
    'Tech Blog',
    'Software Architecture',
    'SaaS Engineering',
    'Next.js Scaling',
    'Maurya Tech Blog',
  ],
};

async function getBlogData() {
  try {
    await connectToDatabase();
    const dbPosts = await Post.find({ isPublished: true }).sort({ createdAt: -1 }).lean();

    if (dbPosts && dbPosts.length > 0) {
      const formattedPosts = dbPosts.map((p) => ({
        id: p.customId || p._id.toString(),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: p.author || 'Maurya Technologies',
        date: p.date || new Date(p.createdAt).toISOString().split('T')[0],
        readTime: p.readTime || '5 min read',
        category: p.category || 'Technology',
        tags: p.tags || [],
        featured: p.featured || false,
      }));

      return {
        ...initialBlogData,
        posts: formattedPosts,
      };
    }
  } catch (err) {
    console.warn('MongoDB Blog list fallback:', err.message);
  }

  return initialBlogData;
}

export default async function Blog() {
  const dynamicBlogData = await getBlogData();
  return <BlogPage blogData={dynamicBlogData} />;
}
