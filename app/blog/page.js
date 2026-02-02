import React from 'react';
import { BlogPage } from '@/components/pages/blog/BlogPage';
import { blogData } from '@/data/blogData';

export const metadata = {
    title: 'Blog | Maurya Tech',
    description: 'Insights, updates, and thoughts on technology, innovation, and business growth.',
}

export default function Blog() {
    return <BlogPage blogData={blogData} />;
}
