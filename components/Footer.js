"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Github,
    ArrowUp
} from 'lucide-react';
import { contactData } from '@/data/contactData';

const footerLinks = {
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Careers', href: '/careers' },
    ],
    resources: [
        { name: 'Blog', href: '/blog' },
        { name: 'Technologies', href: '/technologies' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms & Conditions', href: '/terms' },
    ],
};

const socialIcons = {
    Linkedin,
    Twitter,
    Github,
};

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-card border-t border-border overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" />

            <div className="section-container section-padding relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">M</span>
                            </div>
                            <span className="font-display font-bold text-xl text-foreground">
                                Maurya<span className="text-primary">Tech</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            We build scalable software without upfront risk. From startups to enterprises,
                            we deliver high-quality digital products with our proven pilot model.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href={`mailto:${contactData.info.email}`}
                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{contactData.info.email}</span>
                            </a>
                            <a
                                href={`tel:${contactData.info.phone}`}
                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">{contactData.info.phone}</span>
                            </a>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{contactData.info.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="mt-6">
                            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                            <div className="flex gap-3">
                                {contactData.social.map((social) => {
                                    const Icon = socialIcons[social.icon] || Linkedin;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
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

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Maurya Technologies & Services. All rights reserved.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
