"use client";
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReadingProgress, ReadingProgressCircle } from '@/components/ReadingProgress';
import Link from 'next/link';

export const BlogPostPage = () => {
    const params = useParams();
    const slug = params?.slug;
    const router = useRouter();
    const { blogData } = useData();

    // Safe access to blogData
    const post = blogData?.posts?.find(p => p.slug === slug);

    useEffect(() => {
        // If data is loaded but post is not found, redirect
        if (blogData && blogData.posts && !post) {
            router.push('/blog');
        }
    }, [post, blogData, router]);

    if (!blogData || !post) {
        return null; // Or a loading spinner
    }

    // Get related posts
    const relatedPosts = blogData.posts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

    return (
        <Layout page="blog">
            <ReadingProgress />
            <ReadingProgressCircle />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />

                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Link href="/blog">
                            <Button variant="ghost" className="mb-6 group">
                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Back to Blog
                            </Button>
                        </Link>

                        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                            {post.category}
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:font-bold
                prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-card prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-accent prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-li:text-muted-foreground"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content
                                        .replace(/^# .+$/gm, (match) => `<h1 class="!mt-0">${match.slice(2)}</h1>`)
                                        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/^\- (.+)$/gm, '<li>$1</li>')
                                        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                                        .replace(/^(?!<[hul]|$)(.+)$/gm, '<p>$1</p>')
                                        .replace(/\n\n/g, '')
                                }}
                            />
                        </motion.article>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12 pt-8 border-t border-border"
                        >
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-4 h-4 text-muted-foreground" />
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="hover:bg-accent/10 transition-colors cursor-pointer">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>

                        {/* Author Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 p-8 bg-gradient-to-br from-muted to-muted/50 rounded-2xl border border-border"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2">{post.author}</h3>
                                    <p className="text-muted-foreground">
                                        Sharing insights and practical knowledge from real software development projects.
                                        We write about what works, what doesn't, and lessons learned along the way.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-muted/30">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading font-bold text-2xl mb-8">Related Articles</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {relatedPosts.map((relatedPost, index) => (
                                    <motion.article
                                        key={relatedPost.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -4 }}
                                        className="group"
                                    >
                                        <Link href={`/blog/${relatedPost.slug}`}>
                                            <div className="p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all hover:shadow-lg">
                                                <Badge variant="secondary" className="mb-3">
                                                    {relatedPost.category}
                                                </Badge>
                                                <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                                <div className="mt-4 text-xs text-muted-foreground">
                                                    {relatedPost.readTime}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading font-bold text-2xl mb-4">Want More Insights?</h2>
                        <p className="text-muted-foreground mb-8">
                            Check out our other articles for more practical knowledge from real projects.
                        </p>
                        <Link href="/blog">
                            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                Explore All Articles
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};
