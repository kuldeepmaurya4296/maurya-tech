'use client';

import React from 'react';
import { Layout } from '@/components/layout';
import { Section, SectionHeader, FeatureCard, ProcessStep, CTASection, TestimonialCard } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AnimatedBackground, CursorEffect, GradientShimmer } from '@/components/effects';
import AdvertisementDialog from '@/components/AdvertisementDialog';

export function HomePage({ homeData: serverHomeData, clientData: serverClientData }) {
    const { homeData: contextHomeData, clientData: contextClientData } = useData();
    const homeData = serverHomeData || contextHomeData;
    const clientData = serverClientData || contextClientData;
    const { hero, problem, engagementModel, whyChooseUs, cta } = homeData;

    return (
        <Layout page="home">
            {/* Advertisement Dialog */}
            <AdvertisementDialog />

            {/* Global Cursor Effect */}
            <CursorEffect />

            {/* Enhanced Hero Section with Animations */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Animated Background */}
                <AnimatedBackground variant="orbs" />

                {/* Hero Gradient Overlay */}
                <div className="absolute inset-0 hero-gradient opacity-90" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--hero-text)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--hero-text)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

                <div className="container-custom relative z-10 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        {hero.subheadline && (
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 opacity-0 animate-fade-in"
                            >
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <GradientShimmer className="text-sm font-medium">
                                    {hero.subheadline}
                                </GradientShimmer>
                            </div>
                        )}

                        <div className="mb-6">
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-hero-foreground leading-tight opacity-0 animate-fade-in animation-delay-100"
                            >
                                {hero.headline}
                            </h1>
                        </div>

                        <p
                            className="text-lg md:text-xl text-hero-muted leading-relaxed mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200"
                        >
                            {hero.description}
                        </p>

                        <div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in animation-delay-300"
                        >
                            {hero.ctaPrimary && (
                                <a href={hero.ctaPrimary.link}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 rounded-lg font-semibold glow flex items-center gap-2 transition-all"
                                    >
                                        {hero.ctaPrimary.text}
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.button>
                                </a>
                            )}
                            {hero.ctaSecondary && (
                                <a href={hero.ctaSecondary.link}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 text-lg px-8 py-4 rounded-lg font-medium transition-all"
                                    >
                                        {hero.ctaSecondary.text}
                                    </motion.button>
                                </a>
                            )}
                        </div>

                        {hero.stats && hero.stats.length > 0 && (
                            <div
                                className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-hero-foreground/10 opacity-0 animate-fade-in animation-delay-400"
                            >
                                {hero.stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="text-center"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="text-3xl md:text-4xl font-heading font-bold text-accent mb-1">
                                            <GradientShimmer>{stat.value}</GradientShimmer>
                                        </div>
                                        <div className="text-sm text-hero-muted">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <Section variant="muted">
                <SectionHeader
                    title={problem.title}
                    subtitle={problem.subtitle}
                />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {problem.problems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-accent/10 hover:border-accent/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-5 h-5 text-accent" />
                                </div>
                                <span className="text-card-foreground font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-card rounded-2xl border border-accent/20 shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Check className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl mb-4">{problem.solution}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our unique Pilot Model ensures you see real results before making any commitment.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Engagement Model */}
            <Section>
                <SectionHeader
                    title={engagementModel.title}
                    subtitle={engagementModel.subtitle}
                    description={engagementModel.description}
                />
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-0">
                        {engagementModel.steps.map((step, index) => (
                            <ProcessStep
                                key={index}
                                number={step.number}
                                title={step.title}
                                description={step.description}
                                isLast={index === engagementModel.steps.length - 1}
                                index={index}
                            />
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-muted rounded-2xl sticky top-28 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                        <div className="relative z-10">
                            <h4 className="font-heading font-semibold text-xl mb-6">What You Get</h4>
                            <div className="space-y-4">
                                {engagementModel.benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-accent" />
                                        </div>
                                        <span className="font-medium">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Why Choose Us */}
            <Section variant="muted">
                <SectionHeader
                    title={whyChooseUs.title}
                    subtitle={whyChooseUs.subtitle}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyChooseUs.reasons.map((reason, index) => (
                        <FeatureCard
                            key={index}
                            icon={reason.icon}
                            title={reason.title}
                            description={reason.description}
                            index={index}
                        />
                    ))}
                </div>
            </Section>

            {/* Testimonials */}
            <Section>
                <SectionHeader
                    title={clientData.testimonials.title}
                    subtitle={clientData.testimonials.subtitle}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clientData.clients.slice(0, 3).map((client, index) => (
                        client.testimonial && (
                            <TestimonialCard
                                key={client.id}
                                quote={client.testimonial.quote}
                                author={client.testimonial.author}
                                role={client.testimonial.role}
                                index={index}
                            />
                        )
                    ))}
                </div>
            </Section>

            {/* CTA Section */}
            <CTASection
                title={cta.title}
                description={cta.description}
                buttonText={cta.buttonText}
                buttonLink={cta.buttonLink}
            />
        </Layout>
    );
}
