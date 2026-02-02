'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminLayout({ children }) {
    const { currentTheme, setTheme, themes } = useTheme();

    return (
        <div className="fixed inset-0 w-full h-full z-[100] flex flex-col bg-muted overflow-hidden">
            <header className="flex-none z-50 bg-card border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                                <span className="text-accent-foreground font-bold">M</span>
                            </div>
                            <span className="font-heading font-bold">Admin Panel</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select value={currentTheme.id} onValueChange={setTheme}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme.id} value={theme.id}>
                                        {theme.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to Site</Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}

