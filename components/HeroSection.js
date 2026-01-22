"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeData } from '@/data/homeData';
import { AnimatedSection, TextReveal, FloatingElement } from '@/components/AnimatedSection';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const { hero } = homeData;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-gradient" />
            <div className="absolute inset-0 hero-pattern" />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Floating orbs */}
            <FloatingElement className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" duration={8} />
            <FloatingElement className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" duration={10} distance={25} />
            <FloatingElement className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-2xl" duration={6} distance={10} />

            {/* Main content */}
            <motion.div
                style={{ y, opacity }}
                className="section-container relative z-10 py-12 lg:py-20"
            >
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <AnimatedSection delay={0.1}>
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-sm text-muted-foreground">{hero.badge}</span>
                        </motion.div>
                    </AnimatedSection>

                    {/* Headline */}
                    <AnimatedSection delay={0.2} className="mb-6">
                        <h1 className="heading-xl">
                            <TextReveal text={hero.headline} className="text-foreground" />
                            <br />
                            <span className="gradient-text">{hero.headlineHighlight}</span>
                        </h1>
                    </AnimatedSection>

                    {/* Subheadline */}
                    <AnimatedSection delay={0.4} className="mb-4">
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                            {hero.subheadline}
                        </p>
                    </AnimatedSection>

                    {/* Description */}
                    <AnimatedSection delay={0.5} className="mb-10">
                        <p className="text-base text-foreground/80 font-medium max-w-2xl mx-auto">
                            {hero.description}
                        </p>
                    </AnimatedSection>

                    {/* CTA Buttons */}
                    <AnimatedSection delay={0.6} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href={hero.cta.primary.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="btn-primary text-base px-8 py-6 group">
                                    <span className="relative z-10 flex items-center gap-2">
                                        {hero.cta.primary.text}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href={hero.cta.secondary.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" variant="outline" className="btn-secondary text-base px-8 py-6">
                                    {hero.cta.secondary.text}
                                </Button>
                            </motion.div>
                        </Link>
                    </AnimatedSection>

                    {/* Stats */}
                    <AnimatedSection delay={0.8} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                        {hero.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                                    <AnimatedCounter end={stat.value} />
                                    <span className="text-primary">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </AnimatedSection>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-3 rounded-full bg-primary"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
