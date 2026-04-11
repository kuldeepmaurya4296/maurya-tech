'use client';

import React from 'react';
import { Layout } from '@/components/layout';
import { Section } from '@/components/sections';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { JobApplicationForm } from './JobApplicationForm';

export const JobDetailPage = ({ job }) => {
    return (
        <Layout page={`careers-job-${job.id}`}>
            <section className="pt-32 pb-12 md:pb-20 border-b border-border bg-muted/30">
                <div className="container-custom">
                    <Link href="/careers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-accent mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Careers
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
                                {job.title}
                            </h1>
                            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold whitespace-nowrap">
                                {job.experience} Experience
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-6 text-base text-muted-foreground mb-8">
                            <span className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-accent" />
                                {job.department}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                {job.type}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Section className="py-12">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Job Details */}
                        <div className="lg:col-span-2 space-y-10">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <h2 className="text-2xl font-heading font-bold mb-4">About the Role</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{job.description}</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <h2 className="text-2xl font-heading font-bold mb-4">Responsibilities</h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((resp, idx) => (
                                        <li key={idx} className="flex gap-3 text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                                            <span className="text-lg">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <h2 className="text-2xl font-heading font-bold mb-4">Requirements</h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((req, idx) => (
                                        <li key={idx} className="flex gap-3 text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                                            <span className="text-lg">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <h2 className="text-2xl font-heading font-bold mb-4">Benefits & Perks</h2>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex gap-3 text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                                            <span className="text-lg">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Application Form */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <JobApplicationForm jobTitle={job.title} jobId={job.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};
