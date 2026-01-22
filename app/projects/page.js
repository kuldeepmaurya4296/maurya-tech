"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projectsData';

export default function Projects() {
    const { hero, categories, projects } = projectsData;
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient" />
                    <FloatingElement className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" duration={8} />

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

                {/* Category Filter */}
                <section className="py-8 border-b border-border sticky top-16 lg:top-20 z-40 glass-strong">
                    <div className="section-container">
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
                </section>

                {/* Projects Grid */}
                <section className="section-padding">
                    <div className="section-container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredProjects.map((project, index) => (
                                <AnimatedSection key={project.id} delay={index * 0.1}>
                                    <motion.div
                                        className="group card-premium overflow-hidden"
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Project Image Placeholder */}
                                        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                            <span className="text-6xl font-bold gradient-text opacity-30">
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                                                    {project.category}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{project.duration}</span>
                                            </div>

                                            <h3 className="heading-sm mb-2 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                {project.shortDescription}
                                            </p>

                                            {/* Results */}
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                {project.results.map((result, i) => (
                                                    <div key={i} className="text-center">
                                                        <div className="text-lg font-bold text-foreground">{result.value}</div>
                                                        <div className="text-xs text-muted-foreground">{result.label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding bg-card">
                    <div className="section-container">
                        <AnimatedSection className="text-center">
                            <h2 className="heading-lg mb-4">Want to Be Our Next Success Story?</h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Let's discuss your project and see how we can help you achieve your goals.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="btn-primary group">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Your Project
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
