"use client";
import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Section, CTASection } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';

export const ProjectsPage = ({ projectsData: serverProjectsData }) => {
    const { projectsData: contextProjectsData } = useData();
    const projectsData = serverProjectsData || contextProjectsData;
    const { hero, categories, projects, pilot } = projectsData;
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <Layout page="projects">
            {/* Hero with Gradient */}
            <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                            {hero.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects */}
            <Section>
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group rounded-2xl bg-card border border-border overflow-hidden card-hover"
                        >
                            {/* Thumbnail */}
                            {project.thumbnail && (
                                <Link href={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            )}

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                                        {project.category}
                                    </span>
                                    {project.liveLink && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => { e.preventDefault(); window.open(project.liveLink, '_blank'); }}
                                            className="h-8 px-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                <Link href={`/projects/${project.slug}`}>
                                    <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                </Link>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    {project.shortDescription}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 4).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    {project.featured && (
                                        <span className="text-xs font-medium text-amber-500">⭐ Featured</span>
                                    )}
                                    <Link href={`/projects/${project.slug}`} className="ml-auto">
                                        <Button variant="ghost" size="sm" className="text-accent">
                                            View Details
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Pilot Model */}
            <Section variant="muted">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20"
                    >
                        <div className="text-center mb-8">
                            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                                {pilot.subtitle}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                {pilot.title}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                                {pilot.description}
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {pilot.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-card rounded-xl"
                                >
                                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link href={pilot.ctaLink}>
                                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    {pilot.ctaText}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* CTA */}
            <CTASection
                title="Have a Project in Mind?"
                description="Let's discuss how we can bring your vision to life."
                buttonText="Start the Conversation"
                buttonLink="/contact"
            />
        </Layout>
    );
};
