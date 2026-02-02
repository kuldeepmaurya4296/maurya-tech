"use client";
import React from 'react';
import { Layout } from '@/components/layout';
import { Section, SectionHeader, FeatureCard, CTASection } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export const TechnologiesPage = ({ technologyData: serverTechnologyData }) => {
    const { technologyData: contextTechnologyData } = useData();
    const technologyData = serverTechnologyData || contextTechnologyData;
    const { hero, domains, expertise } = technologyData;

    return (
        <Layout page="technologies">
            <section className="hero-gradient pt-32 pb-12 md:pb-20">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
                        <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">{hero.subtitle}</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-hero-foreground mb-6">{hero.title}</h1>
                        <p className="text-lg md:text-xl text-hero-muted leading-relaxed">{hero.description}</p>
                    </motion.div>
                </div>
            </section>

            <Section>
                <div className="grid gap-8">
                    {domains.map((domain, index) => {
                        return (
                            <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden bg-card rounded-2xl border border-border p-8 hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 grid md:grid-cols-12 gap-8">
                                    {/* Header Section */}
                                    <div className="md:col-span-4 space-y-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                            <span className="font-heading font-bold text-xl">{domain.name[0]}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-heading font-bold mb-2">{domain.name}</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {domain.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Capabilities Section */}
                                    <div className="md:col-span-4">
                                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Capabilities</h4>
                                        <ul className="space-y-2">
                                            {domain.capabilities.map((capability, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                    <span className="text-sm font-medium">{capability}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack Section */}
                                    <div className="md:col-span-4">
                                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Core Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {domain.techStack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-xs font-medium hover:bg-accent/10 hover:border-accent/30 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            <Section variant="muted">
                <SectionHeader title={expertise.title} />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {expertise.items.map((item, index) => (
                        <FeatureCard key={index} icon={item.icon} title={item.title} description={item.description} index={index} />
                    ))}
                </div>
            </Section>

            <CTASection title="Let's Build Together" description="We use the right tools for your project." buttonText="Start Your Project" buttonLink="/contact" />
        </Layout>
    );
};
