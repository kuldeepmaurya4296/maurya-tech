"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Code, Rocket, Cloud, Settings, Palette, ShoppingCart,
    ArrowRight, CheckCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { servicesData } from '@/data/servicesData';

const iconMap = {
    Code,
    Rocket,
    Cloud,
    Settings,
    Palette,
    ShoppingCart,
};

export default function Services() {
    const { hero, services, process } = servicesData;

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient" />
                    <FloatingElement className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" duration={8} />

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
                                <h1 className="heading-xl mb-6">
                                    {hero.title} <span className="gradient-text">{hero.titleHighlight}</span>
                                </h1>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {hero.description}
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="section-padding bg-card">
                    <div className="section-container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => {
                                const Icon = iconMap[service.icon] || Code;
                                return (
                                    <AnimatedSection key={service.id} delay={index * 0.1}>
                                        <motion.div
                                            className="group card-premium p-8 h-full flex flex-col"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-7 h-7 text-primary" />
                                            </div>

                                            <h3 className="heading-sm mb-3">{service.title}</h3>
                                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                                {service.shortDescription}
                                            </p>

                                            <div className="space-y-2 mb-6">
                                                {service.features.slice(0, 3).map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                                                        <span className="text-foreground">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="section-padding">
                    <div className="section-container">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="heading-lg mb-4">{process.title}</h2>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {process.steps.map((step, index) => (
                                <AnimatedSection key={step.number} delay={index * 0.1}>
                                    <motion.div
                                        className="relative p-6 rounded-xl border border-border bg-card h-full"
                                        whileHover={{ y: -3 }}
                                    >
                                        <div className="text-5xl font-bold gradient-text mb-4">{step.number}</div>
                                        <h3 className="heading-sm mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
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
                            <h2 className="heading-lg mb-4">Ready to Start Your Project?</h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Let's discuss your requirements and create something amazing together.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="btn-primary group">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started
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
