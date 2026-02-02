import React from 'react';
import { BlogPage } from '@/components/pages/blog/BlogPage';
import { blogData } from '@/data/blogData';

export const metadata = {
    title: 'Blog',
    description: 'Insights & Updates: Read about software trends, development best practices, and company news.',
    alternates: {
        canonical: '/blog',
    },
    keywords: ['Tech Blog', 'Software Development Insights', 'Programming Tutorials', 'Tech News', 'Maurya Tech Blog'],
}

export default function Blog() {
    return <BlogPage blogData={blogData} />;
}
