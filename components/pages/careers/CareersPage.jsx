"use client";
import React from 'react';
import { Layout } from '@/components/layout';
import { Section, SectionHeader, FeatureCard, CTASection } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, ArrowRight, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const CareersPage = ({ jobsData: serverJobsData }) => {
    const { jobsData: contextJobsData } = useData();
    const jobsData = serverJobsData || contextJobsData;
    const { hero, culture, jobs, benefits } = jobsData;

    const activeJobs = jobs.filter(job => job.isActive);

    return (
        <Layout page="careers">
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

            {/* Culture */}
            <Section>
                <SectionHeader title={culture.title} />
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-accent/5 border border-accent/20"
                    >
                        <h4 className="font-heading font-semibold text-lg mb-4 text-accent">We Value</h4>
                        <div className="space-y-3">
                            {culture.values.map((value, index) => {
                                const IconComponent = LucideIcons[value.icon] || LucideIcons.Star;
                                return (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <IconComponent className="w-4 h-4 text-accent" />
                                        </div>
                                        <span className="font-medium">{value.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20"
                    >
                        <h4 className="font-heading font-semibold text-lg mb-4 text-destructive">We Do Not Believe In</h4>
                        <div className="space-y-3">
                            {culture.antiValues.map((value, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                                        <X className="w-4 h-4 text-destructive" />
                                    </div>
                                    <span className="font-medium">{value.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-lg font-medium text-accent mt-8"
                >
                    {culture.tagline}
                </motion.p>
            </Section>

            {/* Benefits */}
            <Section variant="muted">
                <SectionHeader title={benefits.title} />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.items.map((benefit, index) => (
                        <FeatureCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            index={index}
                        />
                    ))}
                </div>
            </Section>

            {/* Open Positions */}
            <Section>
                <SectionHeader
                    title="Open Positions"
                    subtitle={`${activeJobs.length} positions available`}
                />
                <div className="space-y-6 max-w-4xl mx-auto">
                    {activeJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 md:p-8 rounded-2xl bg-card border border-border card-hover"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="font-heading font-bold text-xl mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" />
                                            {job.department}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {job.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                                        {job.experience}
                                    </span>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-6">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.requirements.slice(0, 3).map((req, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
                                    >
                                        {req}
                                    </span>
                                ))}
                            </div>
                            <Link href="/contact">
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CTA */}
            <CTASection
                title="Don't See the Right Role?"
                description="We're always looking for talented people. Send us your resume and let's chat."
                buttonText="Get in Touch"
                buttonLink="/contact"
            />
        </Layout>
    );
};
