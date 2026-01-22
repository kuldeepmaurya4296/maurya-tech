"use client";

import { motion } from 'framer-motion';
import {
    XCircle,
    CheckCircle,
    Eye,
    Target,
    Code,
    MessageSquare,
    Shield,
    Handshake
} from 'lucide-react';
import { homeData } from '@/data/homeData';
import { AnimatedSection, StaggerChildren } from '@/components/AnimatedSection';

const iconMap = {
    XCircle,
    CheckCircle,
    Eye,
    Target,
    Code,
    MessageSquare,
    Shield,
    Handshake,
};

export function ProblemsSection() {
    const { problems } = homeData;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

            <div className="section-container relative">
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="heading-lg mb-4">{problems.title}</h2>
                        <p className="text-lg text-muted-foreground mb-10">{problems.subtitle}</p>
                    </AnimatedSection>

                    <StaggerChildren className="space-y-4 mb-10">
                        {problems.items.map((item, index) => {
                            const Icon = iconMap[item.icon] || XCircle;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                                    whileHover={{ x: 5 }}
                                >
                                    <Icon className="w-6 h-6 text-destructive flex-shrink-0" />
                                    <span className="text-foreground text-left">{item.text}</span>
                                </motion.div>
                            );
                        })}
                    </StaggerChildren>

                    <AnimatedSection delay={0.5}>
                        <p className="text-xl font-semibold text-foreground">
                            {problems.solution}
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

export function PilotModelSection() {
    const { pilotModel } = homeData;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-50" />

            <div className="section-container relative">
                <div className="text-center mb-16">
                    <AnimatedSection>
                        <motion.span
                            className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6"
                            whileHover={{ scale: 1.02 }}
                        >
                            {pilotModel.badge}
                        </motion.span>
                        <h2 className="heading-lg mb-4">{pilotModel.title}</h2>
                        <p className="text-2xl font-semibold gradient-text mb-4">{pilotModel.subtitle}</p>
                        <p className="text-muted-foreground max-w-2xl mx-auto">{pilotModel.description}</p>
                    </AnimatedSection>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {pilotModel.steps.map((step, index) => (
                        <AnimatedSection key={step.number} delay={index * 0.1}>
                            <motion.div
                                className="card-premium p-6 h-full"
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-5xl font-bold gradient-text mb-4">{step.number}</div>
                                <h3 className="heading-sm mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Benefits */}
                <AnimatedSection delay={0.4}>
                    <div className="flex flex-wrap justify-center gap-4">
                        {pilotModel.benefits.map((benefit, index) => {
                            const Icon = iconMap[benefit.icon] || CheckCircle;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full glass"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon className="w-5 h-5 text-success" />
                                    <span className="text-sm text-foreground">{benefit.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

export function WhyUsSection() {
    const { whyUs } = homeData;

    return (
        <section className="section-padding relative overflow-hidden bg-card">
            <div className="section-container relative">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="heading-lg">{whyUs.title}</h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyUs.items.map((item, index) => {
                        const Icon = iconMap[item.icon] || CheckCircle;
                        return (
                            <AnimatedSection key={item.title} delay={index * 0.1}>
                                <motion.div
                                    className="group p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="heading-sm mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
