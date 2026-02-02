"use client";
import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Section, SectionHeader, CTASection } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export const BlogPage = ({ blogData: serverBlogData }) => {
    const { blogData: contextBlogData } = useData();
    const blogData = serverBlogData || contextBlogData;
    const { hero, categories, posts } = blogData;
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? posts
        : posts.filter(post => post.category === activeCategory);

    const featuredPosts = posts.filter(post => post.featured);

    return (
        <Layout page="blog">
            {/* Hero */}
            <section className="hero-gradient pt-32 pb-12 md:pb-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                            {hero.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-hero-foreground mb-6">
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-hero-muted leading-relaxed">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <Section>
                    <SectionHeader title="Featured Articles" subtitle="Must reads" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 card-hover"
                            >
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                    <span className="px-2 py-1 rounded-md bg-accent/10 text-accent font-medium">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </Section>
            )}

            {/* All Posts */}
            <Section variant="muted">
                <SectionHeader title="All Articles" />

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-6 rounded-2xl bg-card border border-border card-hover"
                        >
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                <span className="px-2 py-1 rounded-md bg-accent/10 text-accent font-medium">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                            <h3 className="font-heading font-semibold text-lg mb-3 group-hover:text-accent transition-colors">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center gap-1 text-xs text-muted-foreground"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <CTASection
                title="Stay Updated"
                description="Get the latest insights delivered to your inbox."
                buttonText="Contact Us"
                buttonLink="/contact"
            />
        </Layout>
    );
};
