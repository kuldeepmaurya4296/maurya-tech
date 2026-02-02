"use client";
import React, { useState } from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Upload, Palette, Type, Globe, Building2, Moon, Sun, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const BrandingTab = () => {
    const { brandData, setBrandData, isDarkMode, toggleThemeMode } = useBrand();
    // Ensure we have default values to prevent undefined errors if context is not yet loaded
    const [localData, setLocalData] = useState(brandData || {
        colors: {},
        socialLinks: [],
        footer: { sections: [] },
        logo: {},
        typography: {},
        theme: {},
        contact: {}
    });

    // Effect to update localData when brandData loads
    React.useEffect(() => {
        if (brandData) {
            setLocalData(brandData);
        }
    }, [brandData]);

    if (!brandData) return <div>Loading...</div>;


    const handleSave = () => {
        setBrandData(localData);
        toast.success('Brand settings saved successfully!');
    };

    const updateColors = (key, value) => {
        setLocalData(prev => ({
            ...prev,
            colors: { ...prev.colors, [key]: value }
        }));
    };

    const updateSocialLink = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(link =>
                link.id === id ? { ...link, [field]: value } : link
            )
        }));
    };

    const colorPresets = [
        { name: 'Tech Dark', primary: '222 47% 11%', accent: '160 84% 39%', bg: '222 47% 11%', fg: '210 40% 98%' },
        { name: 'Ocean Blue', primary: '213 73% 15%', accent: '187 100% 42%', bg: '0 0% 100%', fg: '215 25% 27%' },
        { name: 'Purple SaaS', primary: '243 75% 59%', accent: '84 81% 44%', bg: '220 14% 96%', fg: '221 39% 11%' },
        { name: 'Forest', primary: '163 88% 20%', accent: '38 92% 50%', bg: '40 6% 97%', fg: '140 50% 10%' },
        { name: 'Minimal', primary: '0 0% 0%', accent: '16 100% 50%', bg: '0 0% 100%', fg: '0 0% 0%' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Brand Configuration</h1>
                    <p className="text-muted-foreground">Customize your brand identity, colors, and theme settings</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />Preview Site
                    </Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="identity" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="identity"><Building2 className="w-4 h-4 mr-2" />Identity</TabsTrigger>
                    <TabsTrigger value="colors"><Palette className="w-4 h-4 mr-2" />Colors</TabsTrigger>
                    <TabsTrigger value="typography"><Type className="w-4 h-4 mr-2" />Typography</TabsTrigger>
                    <TabsTrigger value="theme"><Moon className="w-4 h-4 mr-2" />Theme</TabsTrigger>
                    <TabsTrigger value="social"><Globe className="w-4 h-4 mr-2" />Social</TabsTrigger>
                </TabsList>

                {/* IDENTITY TAB */}
                <TabsContent value="identity" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Identity</CardTitle>
                            <CardDescription>Core brand information displayed throughout the website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Company Name</Label>
                                    <Input
                                        value={localData.companyName || ''}
                                        onChange={(e) => setLocalData(prev => ({ ...prev, companyName: e.target.value }))}
                                        placeholder="Your Company Name"
                                    />
                                </div>
                                <div>
                                    <Label>Tagline</Label>
                                    <Input
                                        value={localData.tagline || ''}
                                        onChange={(e) => setLocalData(prev => ({ ...prev, tagline: e.target.value }))}
                                        placeholder="Your company tagline"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Logo Type</Label>
                                <Select
                                    value={localData.logo.type || 'text'}
                                    onValueChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        logo: { ...prev.logo, type: v }
                                    }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text Logo</SelectItem>
                                        <SelectItem value="image">Image Logo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {localData.logo.type === 'text' ? (
                                <div>
                                    <Label>Logo Text</Label>
                                    <Input
                                        value={localData.logo.text || ''}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            logo: { ...prev.logo, text: e.target.value }
                                        }))}
                                        placeholder="MT"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Label>Logo Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={localData.logo.imageUrl || ''}
                                            onChange={(e) => setLocalData(prev => ({
                                                ...prev,
                                                logo: { ...prev.logo, imageUrl: e.target.value }
                                            }))}
                                            placeholder="https://example.com/logo.png"
                                        />
                                        <Button variant="outline"><Upload className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <Label>Industry / Business Type</Label>
                                <Select
                                    value={localData.industry || 'technology'}
                                    onValueChange={(v) => setLocalData(prev => ({ ...prev, industry: v }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="saas">SaaS</SelectItem>
                                        <SelectItem value="agency">Agency</SelectItem>
                                        <SelectItem value="consulting">Consulting</SelectItem>
                                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Business contact details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        value={localData.contact.email || ''}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            contact: { ...prev.contact, email: e.target.value }
                                        }))}
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={localData.contact.phone || ''}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            contact: { ...prev.contact, phone: e.target.value }
                                        }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    value={localData.contact.address || ''}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        contact: { ...prev.contact, address: e.target.value }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label>Working Hours</Label>
                                <Input
                                    value={localData.contact.workingHours || ''}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        contact: { ...prev.contact, workingHours: e.target.value }
                                    }))}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* COLORS TAB */}
                <TabsContent value="colors" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Color Presets</CardTitle>
                            <CardDescription>Quick apply pre-designed color schemes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {colorPresets.map((preset) => (
                                    <motion.button
                                        key={preset.name}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setLocalData(prev => ({
                                            ...prev,
                                            colors: {
                                                primary: preset.primary,
                                                secondary: prev.colors.secondary,
                                                accent: preset.accent,
                                                background: preset.bg,
                                                foreground: preset.fg,
                                            }
                                        }))}
                                        className="p-4 rounded-xl border-2 border-border hover:border-accent transition-colors text-left"
                                    >
                                        <div className="flex gap-1 mb-3">
                                            <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.primary})` }} />
                                            <div className="w-6 h-6 rounded" style={{ backgroundColor: `hsl(${preset.accent})` }} />
                                            <div className="w-6 h-6 rounded border" style={{ backgroundColor: `hsl(${preset.bg})` }} />
                                        </div>
                                        <span className="text-sm font-medium">{preset.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Colors (HSL Values)</CardTitle>
                            <CardDescription>Fine-tune your brand colors using HSL format (e.g., "222 47% 11%")</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {localData.colors && Object.entries(localData.colors).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-lg border-2 border-border"
                                        style={{ backgroundColor: `hsl(${value})` }}
                                    />
                                    <div className="flex-1">
                                        <Label className="capitalize">{key}</Label>
                                        <Input
                                            value={value}
                                            onChange={(e) => updateColors(key, e.target.value)}
                                            placeholder="H S% L%"
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TYPOGRAPHY TAB */}
                <TabsContent value="typography" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Font Families</CardTitle>
                            <CardDescription>Choose fonts for headings, body text, and code</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Heading Font</Label>
                                <Select
                                    value={localData.typography.headingFont || 'Inter'}
                                    onValueChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        typography: { ...prev.typography, headingFont: v }
                                    }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                                        <SelectItem value="Inter">Inter</SelectItem>
                                        <SelectItem value="Poppins">Poppins</SelectItem>
                                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                                        <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: localData.typography.headingFont }}>
                                    Preview: The quick brown fox jumps over the lazy dog
                                </p>
                            </div>
                            <div>
                                <Label>Body Font</Label>
                                <Select
                                    value={localData.typography.bodyFont || 'Inter'}
                                    onValueChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        typography: { ...prev.typography, bodyFont: v }
                                    }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                                        <SelectItem value="Roboto">Roboto</SelectItem>
                                        <SelectItem value="Inter">Inter</SelectItem>
                                        <SelectItem value="Lato">Lato</SelectItem>
                                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Monospace Font</Label>
                                <Select
                                    value={localData.typography.monoFont || 'Fira from'}
                                    onValueChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        typography: { ...prev.typography, monoFont: v }
                                    }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fira Code">Fira Code</SelectItem>
                                        <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                                        <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
                                        <SelectItem value="IBM Plex Mono">IBM Plex Mono</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* THEME TAB */}
                <TabsContent value="theme" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Mode</CardTitle>
                            <CardDescription>Configure light/dark mode settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                                <div className="flex items-center gap-4">
                                    {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                                    <div>
                                        <p className="font-medium">Current Mode: {isDarkMode ? 'Dark' : 'Light'}</p>
                                        <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                                    </div>
                                </div>
                                <Switch checked={isDarkMode} onCheckedChange={toggleThemeMode} />
                            </div>

                            <div>
                                <Label>Default Theme Mode</Label>
                                <Select
                                    value={localData.theme.defaultMode || 'dark'}
                                    onValueChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        theme: { ...prev.theme, defaultMode: v }
                                    }))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dark">Dark (Recommended for Tech)</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Allow User Toggle</p>
                                    <p className="text-sm text-muted-foreground">Let visitors switch between light/dark mode</p>
                                </div>
                                <Switch
                                    checked={localData.theme.allowUserToggle}
                                    onCheckedChange={(v) => setLocalData(prev => ({
                                        ...prev,
                                        theme: { ...prev.theme, allowUserToggle: v }
                                    }))}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SOCIAL TAB */}
                <TabsContent value="social" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>Manage your social media presence</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {localData.socialLinks && localData.socialLinks.map((link) => (
                                <div key={link.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Platform</Label>
                                            <Select
                                                value={link.platform}
                                                onValueChange={(v) => updateSocialLink(link.id, 'platform', v)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="facebook">Facebook</SelectItem>
                                                    <SelectItem value="twitter">Twitter / X</SelectItem>
                                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                    <SelectItem value="instagram">Instagram</SelectItem>
                                                    <SelectItem value="youtube">YouTube</SelectItem>
                                                    <SelectItem value="github">GitHub</SelectItem>
                                                    <SelectItem value="discord">Discord</SelectItem>
                                                    <SelectItem value="tiktok">TikTok</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>URL</Label>
                                            <Input
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                                                placeholder="https://"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={link.isActive}
                                            onCheckedChange={(v) => updateSocialLink(link.id, 'isActive', v)}
                                        />
                                        <span className="text-xs text-muted-foreground">{link.isActive ? 'Active' : 'Hidden'}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
