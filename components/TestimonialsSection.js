"use client";

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { clientData } from '@/data/clientData';
import { AnimatedSection } from '@/components/AnimatedSection';

export function TestimonialsSection() {
    const { testimonials, title, subtitle } = clientData;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-30" />

            <div className="section-container relative">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="heading-lg mb-4">{title}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                            <motion.div
                                className="card-premium p-6 lg:p-8 h-full"
                                whileHover={{ y: -5 }}
                            >
                                {/* Quote icon */}
                                <Quote className="w-10 h-10 text-primary/30 mb-4" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                    ))}
                                </div>

                                {/* Quote text */}
                                <p className="text-foreground mb-6 text-lg leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ClientLogosSection() {
    const { clients } = clientData;

    return (
        <section className="py-12 border-y border-border bg-card/50">
            <div className="section-container">
                <AnimatedSection className="text-center mb-8">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                        Trusted by innovative companies
                    </p>
                </AnimatedSection>

                <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                    {clients.map((client, index) => (
                        <AnimatedSection key={client.name} delay={index * 0.05}>
                            <motion.div
                                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                            >
                                <span className="font-display font-bold text-xl">{client.name}</span>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
