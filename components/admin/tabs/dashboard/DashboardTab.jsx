'use client';

import React from 'react';
import { Home, FileText, Briefcase, FolderKanban, Palette, Users } from 'lucide-react';

const quickLinks = [
    { name: 'Home Page', tab: 'home', icon: Home, color: 'bg-blue-500' },
    { name: 'Services', tab: 'services', icon: Briefcase, color: 'bg-green-500' },
    { name: 'Projects', tab: 'projects', icon: FolderKanban, color: 'bg-purple-500' },
    { name: 'Blog Posts', tab: 'blog', icon: FileText, color: 'bg-orange-500' },
    { name: 'Careers', tab: 'careers', icon: Users, color: 'bg-pink-500' },
    { name: 'Theme', tab: 'theme', icon: Palette, color: 'bg-indigo-500' },
];

export const DashboardTab = ({ setActiveTab }) => {
    return (
        <div>
            <h1 className="font-heading font-bold text-3xl mb-2">Welcome to Admin Panel</h1>
            <p className="text-muted-foreground mb-8">Manage all your website content from here. Changes reflect instantly.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <div key={link.tab}>
                            <button
                                onClick={() => setActiveTab(link.tab)}
                                className="w-full text-left p-6 bg-card rounded-xl border border-border hover:border-accent transition-colors cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-4`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg">{link.name}</h3>
                                <p className="text-sm text-muted-foreground">Edit {link.name.toLowerCase()}</p>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <h2 className="font-heading font-semibold text-lg mb-2">Quick Tips</h2>
                <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• All changes are saved automatically and reflect instantly on the website</li>
                    <li>• Use the Theme section to switch between 5 beautiful themes</li>
                    <li>• SEO settings help your website rank better on Google</li>
                </ul>
            </div>
        </div>
    );
}

