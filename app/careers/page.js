"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Brain, Lightbulb, TrendingUp, Heart, XCircle,
    Globe, Clock, Users, Laptop, Shield, MapPin, Briefcase, ArrowRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { jobsData } from '@/data/jobsData';

const iconMap = {
    Brain,
    Lightbulb,
    TrendingUp,
    Heart,
    XCircle,
    Globe,
    Clock,
    Users,
    Laptop,
    Shield,
};

export default function Careers() {
    const { hero, culture, benefits, positions } = jobsData;
    const activePositions = positions.filter(p => p.isActive);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0 mesh-gradient" />
                    <FloatingElement className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" duration={8} />
                    <FloatingElement className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl" duration={10} />

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

                {/* Culture Section */}
                <section className="section-padding bg-card">
                    <div className="section-container">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="heading-lg">{culture.title}</h2>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* We Value */}
                            <AnimatedSection direction="left">
                                <div className="p-6 rounded-xl border border-border bg-background">
                                    <h3 className="heading-sm mb-6 text-success">{culture.weValue.title}</h3>
                                    <div className="space-y-4">
                                        {culture.weValue.items.map((item, index) => {
                                            const Icon = iconMap[item.icon] || Brain;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-success/5"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <Icon className="w-5 h-5 text-success" />
                                                    <span className="text-foreground">{item.text}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* We Don't Believe In */}
                            <AnimatedSection direction="right">
                                <div className="p-6 rounded-xl border border-border bg-background">
                                    <h3 className="heading-sm mb-6 text-destructive">{culture.weDontBelieve.title}</h3>
                                    <div className="space-y-4">
                                        {culture.weDontBelieve.items.map((item, index) => {
                                            const Icon = iconMap[item.icon] || XCircle;
                                            return (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <Icon className="w-5 h-5 text-destructive" />
                                                    <span className="text-foreground">{item.text}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="section-padding">
                    <div className="section-container">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="heading-lg mb-4">Benefits & Perks</h2>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => {
                                const Icon = iconMap[benefit.icon] || Globe;
                                return (
                                    <AnimatedSection key={benefit.title} delay={index * 0.1}>
                                        <motion.div
                                            className="p-6 rounded-xl border border-border bg-card text-center"
                                            whileHover={{ y: -3, borderColor: 'hsl(var(--primary) / 0.5)' }}
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                        </motion.div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="section-padding bg-card">
                    <div className="section-container">
                        <AnimatedSection className="text-center mb-12">
                            <h2 className="heading-lg mb-4">Open Positions</h2>
                            <p className="text-muted-foreground">
                                {activePositions.length} open position{activePositions.length !== 1 ? 's' : ''}
                            </p>
                        </AnimatedSection>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {activePositions.map((position, index) => (
                                <AnimatedSection key={position.id} delay={index * 0.1}>
                                    <motion.div
                                        className="group p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-all"
                                        whileHover={{ y: -2 }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="heading-sm mb-2 group-hover:text-primary transition-colors">
                                                    {position.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4" />
                                                        {position.department}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {position.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {position.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href="/contact">
                                                <Button variant="outline" className="group/btn">
                                                    Apply Now
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>

                                        <p className="text-muted-foreground text-sm mt-4">{position.description}</p>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                                                {position.experience}
                                            </span>
                                        </div>
                                    </motion.div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
