"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, User, ArrowRight, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { Input } from '@/components/ui/input';
import { blogData } from '@/data/blogData';

export default function Blog() {
    const { hero, categories, posts } = blogData;
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = posts.filter(p => p.featured);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient" />
                    <FloatingElement className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl" duration={8} />

                    <div className="section-container relative">
                        <div className="max-w-4xl mx-auto text-center">
                            <AnimatedSection>
                                <motion.span
                                    className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {hero.badge}
                                </motion.span>
                            </AnimatedSection>

                            <AnimatedSection delay={0.1}>
                                <h1 className="heading-xl mb-6">{hero.title}</h1>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {hero.description}
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Search and Filter */}
                <section className="py-8 border-b border-border sticky top-16 lg:top-20 z-40 glass-strong">
                    <div className="section-container">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-muted border-border"
                                />
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground hover:text-foreground'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {cat.name}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Posts */}
                {activeCategory === 'all' && searchQuery === '' && (
                    <section className="section-padding bg-card">
                        <div className="section-container">
                            <AnimatedSection className="mb-8">
                                <h2 className="heading-md">Featured Articles</h2>
                            </AnimatedSection>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {featuredPosts.slice(0, 2).map((post, index) => (
                                    <AnimatedSection key={post.id} delay={index * 0.1}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <motion.article
                                                className="group card-premium overflow-hidden h-full"
                                                whileHover={{ y: -5 }}
                                            >
                                                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                                    <span className="text-6xl font-bold gradient-text opacity-30">
                                                        {post.title.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                                                            {post.category}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="heading-sm mb-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                                                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                                                        Read More
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </motion.article>
                                        </Link>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* All Posts */}
                <section className="section-padding">
                    <div className="section-container">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No articles found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post, index) => (
                                    <AnimatedSection key={post.id} delay={index * 0.05}>
                                        <Link href={`/blog/${post.slug}`}>
                                            <motion.article
                                                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all h-full"
                                                whileHover={{ y: -3 }}
                                            >
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                    <span className="px-2 py-1 rounded bg-muted text-xs">
                                                        {post.category}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{post.author}</span>
                                                    <span className="text-xs text-muted-foreground">• {post.date}</span>
                                                </div>
                                            </motion.article>
                                        </Link>
                                    </AnimatedSection>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
