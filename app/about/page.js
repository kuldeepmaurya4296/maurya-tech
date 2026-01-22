"use client";

import { motion } from 'framer-motion';
import { Target, Eye, Shield, Zap, Users, Code, MessageSquare, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { aboutData } from '@/data/aboutData';

const iconMap = {
    Target,
    Eye,
    Shield,
    Zap,
    Users,
    Code,
    MessageSquare,
    TrendingUp,
};

export default function About() {
    const { hero, mission, vision, values, stats } = aboutData;

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient" />
                    <FloatingElement className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" duration={8} />
                    <FloatingElement className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl" duration={10} />

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
                                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    {hero.description}
                                </p>
                            </AnimatedSection>

                            <AnimatedSection delay={0.3}>
                                <blockquote className="text-xl font-medium text-foreground italic border-l-4 border-primary pl-6 text-left max-w-2xl mx-auto">
                                    "{hero.quote}"
                                </blockquote>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section-padding bg-card">
                    <div className="section-container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatedSection direction="left">
                                <motion.div
                                    className="card-premium p-8 h-full"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                        <Target className="w-7 h-7 text-primary" />
                                    </div>
                                    <h2 className="heading-md mb-4">{mission.title}</h2>
                                    <p className="text-muted-foreground">{mission.description}</p>
                                </motion.div>
                            </AnimatedSection>

                            <AnimatedSection direction="right">
                                <motion.div
                                    className="card-premium p-8 h-full"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                        <Eye className="w-7 h-7 text-accent" />
                                    </div>
                                    <h2 className="heading-md mb-4">{vision.title}</h2>
                                    <p className="text-muted-foreground mb-4">{vision.description}</p>
                                    <ul className="space-y-2">
                                        {vision.points.map((point, index) => (
                                            <li key={index} className="flex items-center gap-2 text-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                    <div className="section-container relative">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <AnimatedSection key={stat.label} delay={index * 0.1}>
                                    <div className="text-center">
                                        <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                                            <AnimatedCounter end={stat.value} />
                                            <span className="text-primary">{stat.suffix}</span>
                                        </div>
                                        <div className="text-muted-foreground">{stat.label}</div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section-padding">
                    <div className="section-container">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="heading-lg mb-4">Our Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, index) => {
                                const Icon = iconMap[value.icon] || Shield;
                                return (
                                    <AnimatedSection key={value.title} delay={index * 0.1}>
                                        <motion.div
                                            className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="heading-sm mb-2">{value.title}</h3>
                                            <p className="text-muted-foreground text-sm">{value.description}</p>
                                        </motion.div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
