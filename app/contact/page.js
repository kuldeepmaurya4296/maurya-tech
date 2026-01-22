"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedSection, FloatingElement } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { contactData } from '@/data/contactData';

const socialIcons = {
    Linkedin,
    Twitter,
    Github,
};

export default function Contact() {
    const { hero, info, process, form, social } = contactData;
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent!",
            description: "We'll get back to you within 24 hours.",
        });

        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center pt-32 pb-16 overflow-hidden">
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

                {/* Contact Section */}
                <section className="section-padding">
                    <div className="section-container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Info */}
                            <AnimatedSection direction="left">
                                <div className="space-y-8">
                                    {/* 3-Step Process */}
                                    <div className="p-6 rounded-xl border border-border bg-card">
                                        <h3 className="heading-sm mb-6">{process.title}</h3>
                                        <div className="space-y-4">
                                            {process.steps.map((step, index) => (
                                                <motion.div
                                                    key={step.number}
                                                    className="flex gap-4"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-primary font-bold">{step.number}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="p-6 rounded-xl border border-border bg-card">
                                        <h3 className="heading-sm mb-6">Get in Touch</h3>
                                        <div className="space-y-4">
                                            <a
                                                href={`mailto:${info.email}`}
                                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Mail className="w-5 h-5" />
                                                <span>{info.email}</span>
                                            </a>
                                            <a
                                                href={`tel:${info.phone}`}
                                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Phone className="w-5 h-5" />
                                                <span>{info.phone}</span>
                                            </a>
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <MapPin className="w-5 h-5" />
                                                <span>{info.location}</span>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="mt-6 pt-6 border-t border-border">
                                            <h4 className="font-semibold mb-4">Follow Us</h4>
                                            <div className="flex gap-3">
                                                {social.map((s) => {
                                                    const Icon = socialIcons[s.icon] || Linkedin;
                                                    return (
                                                        <motion.a
                                                            key={s.name}
                                                            href={s.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Icon className="w-5 h-5" />
                                                        </motion.a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Contact Form */}
                            <AnimatedSection direction="right">
                                <motion.div
                                    className="card-premium p-8"
                                    whileHover={{ y: -3 }}
                                >
                                    <h3 className="heading-sm mb-6">{form.title}</h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    required
                                                    className="bg-muted border-border"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email *</label>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@company.com"
                                                    required
                                                    className="bg-muted border-border"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Company</label>
                                                <Input
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="Acme Inc."
                                                    className="bg-muted border-border"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Budget</label>
                                                <Select
                                                    value={formData.budget}
                                                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                                >
                                                    <SelectTrigger className="bg-muted border-border">
                                                        <SelectValue placeholder="Select budget" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="<10k">{"< $10K"}</SelectItem>
                                                        <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                                                        <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                                                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                                                        <SelectItem value="100k+">$100K+</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project Details *</label>
                                            <Textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us about your project..."
                                                rows={5}
                                                required
                                                className="bg-muted border-border resize-none"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {isSubmitting ? 'Sending...' : form.submitText}
                                                <Send className="w-4 h-4" />
                                            </span>
                                        </Button>
                                    </form>
                                </motion.div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
