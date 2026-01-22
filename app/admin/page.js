"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Home, Info, Briefcase, FolderOpen, Newspaper, Users,
    Cpu, Mail, Shield, FileText, Settings, Eye, Edit, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const adminSections = [
    { id: 'home', name: 'Home Page', icon: Home, description: 'Edit hero, stats, and CTA sections' },
    { id: 'about', name: 'About Page', icon: Info, description: 'Manage mission, vision, and values' },
    { id: 'services', name: 'Services', icon: Briefcase, description: 'Add or update service offerings' },
    { id: 'projects', name: 'Projects', icon: FolderOpen, description: 'Manage portfolio and case studies' },
    { id: 'blog', name: 'Blog Posts', icon: Newspaper, description: 'Create, edit, and publish articles' },
    { id: 'careers', name: 'Careers', icon: Users, description: 'Manage job listings and culture' },
    { id: 'technologies', name: 'Technologies', icon: Cpu, description: 'Update tech stack information' },
    { id: 'contact', name: 'Contact Info', icon: Mail, description: 'Edit contact details and form' },
    { id: 'seo', name: 'SEO Settings', icon: Settings, description: 'Manage meta tags and keywords' },
    { id: 'policies', name: 'Legal Pages', icon: Shield, description: 'Edit privacy and terms pages' },
];

export default function Admin() {
    const [activeSection, setActiveSection] = useState('home');

    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Admin Header */}
                <header className="h-16 border-b border-border glass-strong sticky top-0 z-50">
                    <div className="h-full px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">M</span>
                                </div>
                                <span className="font-display font-bold text-lg">
                                    Admin<span className="text-primary">Panel</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Eye className="w-4 h-4" />
                                    View Site
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* Sidebar */}
                    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-border bg-card p-4 hidden lg:block">
                        <nav className="space-y-1">
                            {adminSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <motion.button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                                            activeSection === section.id
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        )}
                                        whileHover={{ x: 2 }}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{section.name}</span>
                                    </motion.button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-6 lg:p-8">
                        <div className="max-w-5xl mx-auto">
                            {/* Section Header */}
                            <div className="mb-8">
                                <h1 className="heading-lg mb-2">
                                    {adminSections.find(s => s.id === activeSection)?.name}
                                </h1>
                                <p className="text-muted-foreground">
                                    {adminSections.find(s => s.id === activeSection)?.description}
                                </p>
                            </div>

                            {/* Content Area */}
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Demo Content */}
                                <div className="p-8 rounded-xl border border-border bg-card text-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Edit className="w-8 h-8 text-primary" />
                                    </div>
                                    <h2 className="heading-sm mb-2">Content Editor</h2>
                                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                        This is a frontend-only admin panel. All content is managed through
                                        static data files in the <code className="text-primary">/data</code> folder.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Edit the corresponding data file to update this section's content:
                                    </p>
                                    <code className="block mt-2 text-primary font-mono">
                                        data/{activeSection}Data.js
                                    </code>
                                </div>

                                {/* Quick Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {adminSections.slice(0, 4).map((section) => {
                                        const Icon = section.icon;
                                        return (
                                            <motion.button
                                                key={section.id}
                                                onClick={() => setActiveSection(section.id)}
                                                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all text-left group"
                                                whileHover={{ y: -2 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                        <Icon className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{section.name}</div>
                                                        <div className="text-xs text-muted-foreground">{section.description}</div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};
