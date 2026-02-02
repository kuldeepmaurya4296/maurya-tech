"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { Save, Plus, Eye, Trash2, Edit2, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

export const AdvertisementsTab = () => {
    const { adsData, setAdsData } = useData();
    const [localData, setLocalData] = useState(adsData);
    const [editingAd, setEditingAd] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Update local state if context data changes significantly or initially
    React.useEffect(() => {
        if (adsData) {
            setLocalData(adsData);
        }
    }, [adsData]);

    if (!localData) return <div>Loading...</div>;

    const handleSave = () => {
        setAdsData(localData);
        toast.success('Advertisement settings saved!');
    };

    const handleDeleteAd = (id) => {
        setLocalData(prev => ({
            ...prev,
            advertisements: prev.advertisements.filter(ad => ad.id !== id)
        }));
        toast.success('Advertisement deleted');
    };

    const handleEditAd = (ad) => {
        setEditingAd(ad);
        setIsDialogOpen(true);
    };

    const handleSaveAd = () => {
        if (!editingAd) return;

        setLocalData(prev => ({
            ...prev,
            advertisements: prev.advertisements.some(a => a.id === editingAd.id)
                ? prev.advertisements.map(a => a.id === editingAd.id ? editingAd : a)
                : [...prev.advertisements, editingAd]
        }));

        setIsDialogOpen(false);
        setEditingAd(null);
        toast.success('Advertisement saved!');
    };

    const createNewAd = () => ({
        id: `ad-${Date.now()}`,
        title: 'New Advertisement',
        description: '',
        content: {
            headline: '',
            body: '',
            ctaText: 'Learn More',
            ctaLink: '/contact',
        },
        display: {
            type: 'dialog',
            position: 'center',
            showCloseButton: true,
        },
        targeting: {
            mode: 'all',
            selectedPages: [],
            excludedPages: ['/admin'],
        },
        schedule: {
            isActive: false,
            showOncePerSession: true,
        },
        style: {
            showGradient: true,
            showImage: false,
        },
        analytics: {
            impressions: 0,
            clicks: 0,
            dismissals: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    const columns = [
        {
            key: 'title', header: 'Title', render: (ad) => (
                <div>
                    <p className="font-medium">{ad.title}</p>
                    <p className="text-xs text-muted-foreground">{ad.content.headline}</p>
                </div>
            )
        },
        {
            key: 'type', header: 'Type', render: (ad) => (
                <span className="capitalize px-2 py-1 rounded bg-muted text-xs">{ad.display.type}</span>
            )
        },
        {
            key: 'targeting', header: 'Targeting', render: (ad) => (
                <span className="capitalize text-sm">{ad.targeting.mode === 'homepage' ? 'Homepage Only' : ad.targeting.mode}</span>
            )
        },
        {
            key: 'status', header: 'Status', render: (ad) => (
                <Switch
                    checked={ad.schedule.isActive}
                    onCheckedChange={(v) => {
                        setLocalData(prev => ({
                            ...prev,
                            advertisements: prev.advertisements.map(a =>
                                a.id === ad.id ? { ...a, schedule: { ...a.schedule, isActive: v } } : a
                            )
                        }));
                    }}
                />
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Advertisements</h1>
                    <p className="text-muted-foreground">Manage promotional dialogs, banners, and floating ads</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setEditingAd(createNewAd());
                            setIsDialogOpen(true);
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" />Add New Ad
                    </Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />Save All
                    </Button>
                </div>
            </div>

            {/* Global Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="w-5 h-5" />
                        Global Settings
                    </CardTitle>
                    <CardDescription>Control overall advertisement behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                            <div>
                                <p className="font-medium">Enable Ads</p>
                                <p className="text-xs text-muted-foreground">Master switch for all ads</p>
                            </div>
                            <Switch
                                checked={localData.globalSettings.enableAds}
                                onCheckedChange={(v) => setLocalData(prev => ({
                                    ...prev,
                                    globalSettings: { ...prev.globalSettings, enableAds: v }
                                }))}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                            <div>
                                <p className="font-medium">Show on Mobile</p>
                                <p className="text-xs text-muted-foreground">Display ads on mobile devices</p>
                            </div>
                            <Switch
                                checked={localData.globalSettings.showOnMobile}
                                onCheckedChange={(v) => setLocalData(prev => ({
                                    ...prev,
                                    globalSettings: { ...prev.globalSettings, showOnMobile: v }
                                }))}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                            <div>
                                <p className="font-medium">Respect Do Not Track</p>
                                <p className="text-xs text-muted-foreground">Hide ads if DNT is enabled</p>
                            </div>
                            <Switch
                                checked={localData.globalSettings.respectDoNotTrack}
                                onCheckedChange={(v) => setLocalData(prev => ({
                                    ...prev,
                                    globalSettings: { ...prev.globalSettings, respectDoNotTrack: v }
                                }))}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Ads Table */}
            <AdminDataTable
                title="Advertisements"
                description="All promotional dialogs, banners, and floating ads"
                data={localData.advertisements}
                columns={columns}
                onView={(ad) => handleEditAd(ad)}
                onEdit={(ad) => handleEditAd(ad)}
                onDelete={(ad) => handleDeleteAd(ad.id)}
                getItemId={(ad) => ad.id}
            />

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingAd?.id.includes('ad-') && editingAd?.createdAt === editingAd?.updatedAt ? 'Create' : 'Edit'} Advertisement</DialogTitle>
                    </DialogHeader>

                    {editingAd && (
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <Label>Title (Internal)</Label>
                                    <Input
                                        value={editingAd.title}
                                        onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Headline</Label>
                                    <Input
                                        value={editingAd.content.headline}
                                        onChange={(e) => setEditingAd({
                                            ...editingAd,
                                            content: { ...editingAd.content, headline: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label>Body Text</Label>
                                    <Textarea
                                        value={editingAd.content.body}
                                        onChange={(e) => setEditingAd({
                                            ...editingAd,
                                            content: { ...editingAd.content, body: e.target.value }
                                        })}
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>CTA Button Text</Label>
                                        <Input
                                            value={editingAd.content.ctaText}
                                            onChange={(e) => setEditingAd({
                                                ...editingAd,
                                                content: { ...editingAd.content, ctaText: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <Label>CTA Link</Label>
                                        <Input
                                            value={editingAd.content.ctaLink}
                                            onChange={(e) => setEditingAd({
                                                ...editingAd,
                                                content: { ...editingAd.content, ctaLink: e.target.value }
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Display Settings */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Display Settings</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Ad Type</Label>
                                        <Select
                                            value={editingAd.display.type}
                                            onValueChange={(v) => setEditingAd({
                                                ...editingAd,
                                                display: { ...editingAd.display, type: v }
                                            })}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dialog">Dialog / Modal</SelectItem>
                                                <SelectItem value="banner">Top Banner</SelectItem>
                                                <SelectItem value="floating">Floating Widget</SelectItem>
                                                <SelectItem value="inline">Inline</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Position</Label>
                                        <Select
                                            value={editingAd.display.position}
                                            onValueChange={(v) => setEditingAd({
                                                ...editingAd,
                                                display: { ...editingAd.display, position: v }
                                            })}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="center">Center</SelectItem>
                                                <SelectItem value="top">Top</SelectItem>
                                                <SelectItem value="bottom">Bottom</SelectItem>
                                                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Show Close Button</Label>
                                    <Switch
                                        checked={editingAd.display.showCloseButton}
                                        onCheckedChange={(v) => setEditingAd({
                                            ...editingAd,
                                            display: { ...editingAd.display, showCloseButton: v }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label>Delay Before Showing (seconds)</Label>
                                    <Input
                                        type="number"
                                        value={editingAd.display.delayShowSeconds || 0}
                                        onChange={(e) => setEditingAd({
                                            ...editingAd,
                                            display: { ...editingAd.display, delayShowSeconds: parseInt(e.target.value) || undefined }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Targeting */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Page Targeting</h4>
                                <div>
                                    <Label>Targeting Mode</Label>
                                    <Select
                                        value={editingAd.targeting.mode}
                                        onValueChange={(v) => setEditingAd({
                                            ...editingAd,
                                            targeting: { ...editingAd.targeting, mode: v }
                                        })}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Pages</SelectItem>
                                            <SelectItem value="homepage">Homepage Only</SelectItem>
                                            <SelectItem value="selected">Selected Pages</SelectItem>
                                            <SelectItem value="exclude">Exclude Pages</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Style */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Style</h4>
                                <div className="flex items-center justify-between">
                                    <Label>Use Gradient Background</Label>
                                    <Switch
                                        checked={editingAd.style.showGradient}
                                        onCheckedChange={(v) => setEditingAd({
                                            ...editingAd,
                                            style: { ...editingAd.style, showGradient: v }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Schedule</h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Active</Label>
                                        <p className="text-xs text-muted-foreground">Enable this advertisement</p>
                                    </div>
                                    <Switch
                                        checked={editingAd.schedule.isActive}
                                        onCheckedChange={(v) => setEditingAd({
                                            ...editingAd,
                                            schedule: { ...editingAd.schedule, isActive: v }
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Show Once Per Session</Label>
                                        <p className="text-xs text-muted-foreground">Don't show again after dismissed</p>
                                    </div>
                                    <Switch
                                        checked={editingAd.schedule.showOncePerSession}
                                        onCheckedChange={(v) => setEditingAd({
                                            ...editingAd,
                                            schedule: { ...editingAd.schedule, showOncePerSession: v }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSaveAd}>Save Advertisement</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
