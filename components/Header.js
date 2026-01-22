"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useAnimations';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Technologies', href: '/technologies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const scrollPosition = useScrollPosition();
    const pathname = usePathname();

    const isScrolled = scrollPosition > 50;

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <motion.header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'glass-strong shadow-lg'
                    : 'bg-transparent'
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <nav className="section-container flex items-center justify-between h-16 lg:h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <span className="text-primary-foreground font-bold text-lg">M</span>
                    </motion.div>
                    <span className="font-display font-bold text-xl text-foreground hidden sm:block">
                        Maurya<span className="text-primary">Tech</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                                pathname === item.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <Link href="/admin">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            Admin
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button className="btn-primary text-sm">
                            <span className="relative z-10">Start a Project</span>
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-foreground" />
                    ) : (
                        <Menu className="w-6 h-6 text-foreground" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden glass-strong border-t border-border"
                    >
                        <div className="section-container py-4 space-y-2">
                            {navigation.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'block px-4 py-3 rounded-lg text-base font-medium transition-all',
                                            pathname === item.href
                                                ? 'text-primary bg-primary/10'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4 space-y-2"
                            >
                                <Link href="/admin" className="block">
                                    <Button variant="outline" className="w-full">Admin Dashboard</Button>
                                </Link>
                                <Link href="/contact" className="block">
                                    <Button className="w-full btn-primary">
                                        <span className="relative z-10">Start a Project</span>
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
