"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/layout';
import { useData } from '@/contexts/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
    ArrowLeft,
    ExternalLink,
    Check,
    Calendar,
    Clock,
    User,
    ChevronLeft,
    ChevronRight,
    Monitor,
    Smartphone
} from 'lucide-react';

export const ProjectDetailPage = () => {
    const params = useParams();
    const slug = params?.slug;
    const router = useRouter();
    const { projectsData } = useData();

    // Ensure projectsData is loaded
    if (!projectsData || !projectsData.projects) {
        return null;
    }

    const project = projectsData.projects.find(p => p.slug === slug);

    const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);

    if (!project) {
        return (
            <Layout page="projects">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                        <Button onClick={() => router.push('/projects')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Projects
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    const nextDesktop = () => setActiveDesktopIndex((prev) => (prev + 1) % project.desktopImages.length);
    const prevDesktop = () => setActiveDesktopIndex((prev) => (prev - 1 + project.desktopImages.length) % project.desktopImages.length);
    const nextMobile = () => setActiveMobileIndex((prev) => (prev + 1) % project.mobileImages.length);
    const prevMobile = () => setActiveMobileIndex((prev) => (prev - 1 + project.mobileImages.length) % project.mobileImages.length);

    return (
        <Layout page="projects">
            {/* Hero with Gradient Background */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Projects
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge className="bg-accent/10 text-accent border-accent/20">
                                {project.category}
                            </Badge>
                            {project.featured && (
                                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                    ⭐ Featured
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            {project.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            {project.fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-6 mb-8">
                            {project.client && (
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-accent" />
                                    <span className="text-muted-foreground">Client:</span>
                                    <span className="font-medium">{project.client}</span>
                                </div>
                            )}
                            {project.duration && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-accent" />
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span className="font-medium">{project.duration}</span>
                                </div>
                            )}
                            {project.year && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    <span className="text-muted-foreground">Year:</span>
                                    <span className="font-medium">{project.year}</span>
                                </div>
                            )}
                        </div>

                        {project.liveLink && (
                            <Button
                                size="lg"
                                className="bg-accent text-accent-foreground hover:bg-accent/90"
                                onClick={() => window.open(project.liveLink, '_blank')}
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                View Live Project
                            </Button>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Thumbnail */}
            {project.thumbnail && (
                <section className="py-12 bg-muted/30">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-auto object-cover aspect-video"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Desktop Screenshots Carousel */}
            {project.desktopImages && project.desktopImages.length > 0 && (
                <section className="py-16">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Monitor className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl md:text-3xl font-heading font-bold">Desktop View</h2>
                            </div>

                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
                                    {/* Browser Chrome */}
                                    <div className="h-10 bg-muted flex items-center px-4 gap-2 border-b border-border">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-destructive/50" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-background/50 rounded-md h-6 px-3 flex items-center text-xs text-muted-foreground max-w-md">
                                                {project.liveLink || 'https://project-demo.com'}
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeDesktopIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            src={project.desktopImages[activeDesktopIndex]}
                                            alt={`${project.title} desktop view ${activeDesktopIndex + 1}`}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Navigation */}
                                {project.desktopImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevDesktop}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextDesktop}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Dots */}
                            {project.desktopImages.length > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {project.desktopImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveDesktopIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === activeDesktopIndex ? 'bg-accent' : 'bg-muted-foreground/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Mobile Screenshots Carousel */}
            {project.mobileImages && project.mobileImages.length > 0 && (
                <section className="py-16 bg-muted/30">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Smartphone className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl md:text-3xl font-heading font-bold">Mobile View</h2>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative max-w-xs">
                                    {/* Phone Frame */}
                                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-card border-8 border-foreground/10">
                                        {/* Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground/10 rounded-b-2xl z-10" />

                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={activeMobileIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                src={project.mobileImages[activeMobileIndex]}
                                                alt={`${project.title} mobile view ${activeMobileIndex + 1}`}
                                                className="w-full aspect-[9/19] object-cover"
                                            />
                                        </AnimatePresence>
                                    </div>

                                    {/* Navigation */}
                                    {project.mobileImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevMobile}
                                                className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextMobile}
                                                className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-colors"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Dots */}
                            {project.mobileImages.length > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {project.mobileImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveMobileIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === activeMobileIndex ? 'bg-accent' : 'bg-muted-foreground/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Project Details */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Challenges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10"
                        >
                            <h3 className="font-heading font-bold text-xl mb-4 text-destructive">Challenges</h3>
                            <ul className="space-y-3">
                                {project.challenges && project.challenges.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <span className="text-destructive mt-0.5">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Solutions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-accent/5 border border-accent/10"
                        >
                            <h3 className="font-heading font-bold text-xl mb-4 text-accent">Solutions</h3>
                            <ul className="space-y-3">
                                {project.solutions && project.solutions.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <span className="text-accent mt-0.5">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Results */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-accent/5 border border-accent/10"
                        >
                            <h3 className="font-heading font-bold text-xl mb-4 text-accent">Results</h3>
                            <ul className="space-y-3">
                                {project.results && project.results.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="py-16 bg-muted/30">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Technologies Used</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {project.technologies && project.technologies.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-6 py-3 text-sm font-medium bg-card border border-border rounded-full hover:border-accent/50 transition-colors"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Interested in a Similar Project?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Let's discuss how we can bring your vision to life with the same level of quality and expertise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    Start a Conversation
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button size="lg" variant="outline">
                                    View More Projects
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};
