"use client";
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeTab = () => {
    const { currentTheme, setTheme, themes } = useTheme();

    return (
        <div>
            <h1 className="font-heading font-bold text-3xl mb-2">Theme Settings</h1>
            <p className="text-muted-foreground mb-8">Choose a theme for your website. Changes apply instantly.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme, index) => (
                    <motion.div key={theme.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                        onClick={() => setTheme(theme.id)}
                        className={cn('relative p-6 rounded-xl border-2 cursor-pointer transition-all', currentTheme.id === theme.id ? 'border-accent shadow-lg' : 'border-border hover:border-accent/50')}>
                        {currentTheme.id === theme.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-4 h-4 text-accent-foreground" />
                            </div>
                        )}
                        <div className="flex gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: theme.primaryColor }} />
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: theme.accentColor }} />
                            <div className="w-8 h-8 rounded-lg border" style={{ backgroundColor: theme.backgroundColor }} />
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-1">{theme.name}</h3>
                        <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
