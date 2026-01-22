"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { policyData } from '@/data/policyData';

export default function Privacy() {
    const { privacy } = policyData;

    return (
        <>
            <Header />
            <main className="pt-32 pb-16">
                <div className="section-container">
                    <AnimatedSection className="max-w-3xl mx-auto">
                        <h1 className="heading-xl mb-4">{privacy.title}</h1>
                        <p className="text-muted-foreground mb-12">Last updated: {privacy.lastUpdated}</p>

                        <div className="prose prose-invert max-w-none">
                            {privacy.sections.map((section, index) => (
                                <AnimatedSection key={index} delay={index * 0.1} className="mb-8">
                                    <h2 className="heading-sm mb-4">{section.title}</h2>
                                    <p className="text-muted-foreground mb-4">{section.content}</p>
                                    {section.items && (
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                            {section.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </main>
            <Footer />
        </>
    );
}
