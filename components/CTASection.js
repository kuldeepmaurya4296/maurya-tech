"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeData } from '@/data/homeData';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';

export function CTASection() {
    const { cta } = homeData;

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <FloatingElement className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl" duration={10} />
            <FloatingElement className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" duration={12} distance={30} />

            <div className="section-container relative">
                <AnimatedSection>
                    <motion.div
                        className="max-w-3xl mx-auto text-center p-8 lg:p-16 rounded-3xl gradient-border"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <h2 className="heading-lg mb-4">{cta.title}</h2>
                        <p className="text-lg text-muted-foreground mb-8">{cta.subtitle}</p>

                        <Link href={cta.button.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="btn-accent text-lg px-10 py-6 group">
                                    <span className="flex items-center gap-2">
                                        {cta.button.text}
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}
