"use client";

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { blogData } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

export default function BlogPost({ params }) {
    // Since this is a client component, we'd typically fetch data. 
    // For this static data example, we'll just find the post.
    // In a real app, params would be used to fetch the specific post.
    // Note: params is only available in Server Components by default in standard Next.js app router 
    // but passed as prop to page components.
    // However, since we are doing a static export/data based site, we need to handle this.

    // Quick fix for this demo: we will extract slug from URL if params is not populated correctly in dynamic route
    // or just use a placeholder if we can't find it.

    // Actually, let's just use the `usePathname` to find the slug for now as a fallback
    const pathname = usePathname();
    const slug = pathname?.split('/').pop();

    const post = blogData.posts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog">
                        <Button>Back to Blog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="pt-32 pb-16">
                <article className="section-container max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <AnimatedSection>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="heading-xl mb-6">{post.title}</h1>

                        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-border">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <User className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                                <div className="font-semibold text-foreground">{post.author}</div>
                                <div className="text-xs text-muted-foreground">Author</div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                                {post.content}
                            </p>
                            <p className="text-muted-foreground">
                                (Full content placeholder. In a real application, this would contain the complete markdown or rich text content of the blog post.)
                            </p>
                        </div>
                    </AnimatedSection>
                </article>
            </main>
            <Footer />
        </>
    );
}
