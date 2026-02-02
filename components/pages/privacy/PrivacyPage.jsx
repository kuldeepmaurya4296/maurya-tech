"use client";
import React from 'react';
import { Layout } from '@/components/layout';
import { Section } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export const PrivacyPage = () => {
    const { policyData } = useData();
    const { privacyPolicy } = policyData;

    return (
        <Layout page="privacy">
            <section className="hero-gradient pt-32 pb-16">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-hero-foreground mb-4">{privacyPolicy.title}</h1>
                        <p className="text-hero-muted">Last updated: {privacyPolicy.lastUpdated}</p>
                    </motion.div>
                </div>
            </section>
            <Section>
                <div className="max-w-3xl mx-auto prose prose-lg">
                    {privacyPolicy.sections.map((section, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="mb-8">
                            <h2 className="font-heading font-bold text-xl mb-3">{section.title}</h2>
                            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </Layout>
    );
};
