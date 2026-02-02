'use client';

import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Home, FileText, Briefcase, FolderKanban,
    Code, Users, Mail, Shield, Palette, Megaphone, Brush, Globe,
    LogOut, Menu, ChevronRight, Settings, BarChart3, Layers, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

// Import all tabs
import {
    DashboardTab,
    HomeTab,
    AboutTab,
    ServicesTab,
    ProductsTab,
    ProjectsTab,
    PricingTab,
    BlogTab,
    CareersTab,
    TechnologiesTab,
    ContactTab,
    ClientsTab,
    FooterTab,
    BrandingTab,
    AdvertisementsTab,
    SeoTab,
    ThemeTab,
    PoliciesTab
} from '@/components/admin/tabs';

// Navigation Structure configuration
const navStructure = {
    overview: {
        id: 'overview',
        label: 'Overview',
        icon: BarChart3,
        items: [
            { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
        ]
    },
    content: {
        id: 'content',
        label: 'Content Management',
        icon: Layers,
        items: [
            { name: 'Home Page', id: 'home', icon: Home },
            { name: 'About Us', id: 'about', icon: FileText },
            { name: 'Services', id: 'services', icon: Briefcase },
            { name: 'Products', id: 'products', icon: FolderKanban },
            { name: 'Projects', id: 'projects', icon: FolderKanban },
            { name: 'Blog', id: 'blog', icon: FileText },
            { name: 'Careers', id: 'careers', icon: Users },
            { name: 'Technologies', id: 'technologies', icon: Code },
            { name: 'Pricing', id: 'pricing', icon: Code },
        ]
    },
    engagement: {
        id: 'engagement',
        label: 'Engagement',
        icon: Zap,
        items: [
            { name: 'Contact', id: 'contact', icon: Mail },
            { name: 'Clients', id: 'clients', icon: Users },
        ]
    },
    settings: {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        items: [
            { name: 'Footer', id: 'footer', icon: LayoutDashboard },
            { name: 'Branding', id: 'branding', icon: Brush },
            { name: 'Advertisements', id: 'advertisements', icon: Megaphone },
            { name: 'SEO', id: 'seo', icon: Globe },
            { name: 'Theme', id: 'theme', icon: Palette },
            { name: 'Policies', id: 'policies', icon: Shield },
        ]
    }
};

export const AdminPage = () => {
    const [activeCategory, setActiveCategory] = useState({
        id: 'overview',
        label: 'Overview',
        icon: BarChart3,
        items: [
            { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
        ]
    });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        const categoryItems = category.items;
        const isCurrentTabInNewCategory = categoryItems.some(item => item.id === activeTab);

        if (!isCurrentTabInNewCategory) {
            setActiveTab(categoryItems[0].id);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardTab setActiveTab={setActiveTab} />;
            case 'home': return <HomeTab />;
            case 'about': return <AboutTab />;
            case 'services': return <ServicesTab />;
            case 'products': return <ProductsTab />;
            case 'projects': return <ProjectsTab />;
            case 'pricing': return <PricingTab />;
            case 'blog': return <BlogTab />;
            case 'careers': return <CareersTab />;
            case 'technologies': return <TechnologiesTab />;
            case 'contact': return <ContactTab />;
            case 'clients': return <ClientsTab />;
            case 'footer': return <FooterTab />;
            case 'branding': return <BrandingTab />;
            case 'advertisements': return <AdvertisementsTab />;
            case 'seo': return <SeoTab />;
            case 'theme': return <ThemeTab />;
            case 'policies': return <PoliciesTab />;
            default: return <DashboardTab />;
        }
    };

    // Shared Sidebar Navigation Logic
    const SidebarNavigation = ({ mobile = false }) => (
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
            <div className="space-y-1">
                {activeCategory.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (mobile) setIsMobileMenuOpen(false);
                            }}
                            className={cn(
                                "group flex items-center w-full gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-md transition-all duration-200 relative",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                                !isSidebarOpen && !mobile && "justify-center px-2"
                            )}
                            title={(!isSidebarOpen && !mobile) ? item.name : ''}
                        >
                            {/* Active Indicator Strip */}
                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-full" />}

                            <Icon className={cn(
                                "w-4 h-4 flex-shrink-0 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )} />

                            {(isSidebarOpen || mobile) && (
                                <span className="flex-1 text-left truncate">{item.name}</span>
                            )}

                            {(isSidebarOpen || mobile) && (
                                <ChevronRight className={cn(
                                    "w-3 h-3 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all ml-auto",
                                    isActive && "text-primary/50"
                                )} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const SidebarExitLink = ({ mobile = false }) => (
        <div className="p-4 border-t border-border/40 shrink-0">
            <Link href="/" className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full",
                !isSidebarOpen && !mobile && "justify-center px-0"
            )}>
                <LogOut className="w-4 h-4 flex-shrink-0" />
                {(isSidebarOpen || mobile) && <span>Exit Admin</span>}
            </Link>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background">
            {/* Top Navigation Bar (Tabs Style) */}
            <div className="h-14 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 flex items-center z-30 shrink-0">
                <nav className="flex space-x-1 h-full overflow-x-auto no-scrollbar w-full" aria-label="Tabs">
                    {Object.values(navStructure).map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory.id === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category)}
                                className={cn(
                                    "flex items-center gap-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 h-full",
                                    isActive
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                )}
                            >
                                <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                {category.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Layout (Sidebar + Content) */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Desktop Contextual Sidebar */}
                <aside
                    className={cn(
                        "hidden md:flex bg-card/50 border-r border-border/60 transition-all duration-300 flex-col z-20 overflow-hidden",
                        isSidebarOpen ? "w-[260px]" : "w-[60px]"
                    )}
                >
                    {/* Desktop Sidebar Header */}
                    <div className="h-12 flex items-center justify-between px-4 border-b border-border/40 shrink-0">
                        {isSidebarOpen && (
                            <span className="text-xs font-bold text-muted-foreground/70 uppercase tracking-widest truncate">
                                {activeCategory.label}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground ml-auto hover:text-foreground hover:bg-muted"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu className="w-4 h-4" />
                        </Button>
                    </div>

                    <SidebarNavigation />
                    <SidebarExitLink />
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-10 scroll-smooth relative">

                    {/* Mobile Breadcrumb / Menu Trigger */}
                    <div className="md:hidden flex items-center gap-2 mb-6 pb-4 border-b border-border/40">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                                    <Menu className="w-4 h-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
                                <SheetHeader className="h-14 border-b border-border px-4 flex items-center justify-center">
                                    <SheetTitle className="text-left w-full text-base font-bold uppercase tracking-wider text-muted-foreground/80">
                                        {activeCategory.label}
                                    </SheetTitle>
                                </SheetHeader>
                                <SidebarNavigation mobile={true} />
                                <SidebarExitLink mobile={true} />
                            </SheetContent>
                        </Sheet>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">
                                {activeCategory.label}
                            </span>
                            <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">
                                {activeCategory.items.find(i => i.id === activeTab)?.name || 'Dashboard'}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto h-full animate-in fade-in slide-in-from-bottom-3 duration-500 ease-in-out">
                        {renderTabContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};
