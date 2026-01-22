"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { technologiesData } from '@/data/technologiesData';

export default function Technologies() {
    const { hero, categories } = technologiesData;

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center pt-32 pb-16 overflow-hidden">
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

                {/* Technology Categories */}
                <section className="section-padding">
                    <div className="section-container">
                        <div className="space-y-16">
                            {categories.map((category, catIndex) => (
                                <AnimatedSection key={category.id} delay={catIndex * 0.1}>
                                    <div className="mb-8">
                                        <h2 className="heading-md mb-2">{category.title}</h2>
                                        <p className="text-muted-foreground">{category.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {category.technologies.map((tech, techIndex) => (
                                            <motion.div
                                                key={tech.name}
                                                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
                                                whileHover={{ y: -3 }}
                                            >
                                                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                    {tech.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>

                                                {/* Proficiency Bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-muted-foreground">Proficiency</span>
                                                        <span className="text-primary">{tech.proficiency}%</span>
                                                    </div>
                                                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-primary to-accent"
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${tech.proficiency}%` }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            viewport={{ once: true }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
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
