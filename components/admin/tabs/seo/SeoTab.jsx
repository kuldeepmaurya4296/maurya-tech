"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, Search, Globe, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const SeoTab = () => {
    const { seoData, setSeoData } = useData();
    const [localData, setLocalData] = useState(seoData);
    const [editingPage, setEditingPage] = useState(null);

    const handleSave = () => {
        setSeoData(localData);
        toast.success('SEO settings saved!');
    };

    if (!localData) return <div>Loading...</div>;

    const pages = Object.keys(localData.pages);

    const pageColumns = [
        {
            key: 'page',
            header: 'Page',
            render: (_, index) => (
                <span className="font-medium capitalize">{pages[index]}</span>
            )
        },
        {
            key: 'title',
            header: 'Title',
            render: (pageData) => (
                <span className="text-sm">{pageData.title}</span>
            )
        },
        {
            key: 'description',
            header: 'Description',
            render: (pageData) => (
                <span className="text-sm text-muted-foreground line-clamp-1">{pageData.description}</span>
            )
        },
    ];

    const pageDataArray = pages.map(page => ({
        page,
        ...localData.pages[page]
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">SEO Settings</h1>
                    <p className="text-muted-foreground">Optimize your site for search engines</p>
                </div>
                <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Save className="w-4 h-4 mr-2" />Save All Changes
                </Button>
            </div>

            <Tabs defaultValue="global" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="global" className="gap-2">
                        <Globe className="w-4 h-4" />Global Settings
                    </TabsTrigger>
                    <TabsTrigger value="pages" className="gap-2">
                        <FileText className="w-4 h-4" />Page SEO
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="global" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="w-5 h-5" />
                                Global SEO Settings
                            </CardTitle>
                            <CardDescription>Default settings applied across all pages</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Site Name</Label>
                                    <Input
                                        value={localData.global.siteName}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            global: { ...prev.global, siteName: e.target.value }
                                        }))}
                                    />
                                </div>
                                <div>
                                    <Label>Site URL</Label>
                                    <Input
                                        value={localData.global.siteUrl}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            global: { ...prev.global, siteUrl: e.target.value }
                                        }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Default Title</Label>
                                <Input
                                    value={localData.global.defaultTitle}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        global: { ...prev.global, defaultTitle: e.target.value }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label>Default Description</Label>
                                <Textarea
                                    value={localData.global.defaultDescription}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        global: { ...prev.global, defaultDescription: e.target.value }
                                    }))}
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {localData.global.defaultDescription.length}/160 characters recommended
                                </p>
                            </div>
                            <div>
                                <Label>Default Keywords (comma separated)</Label>
                                <Input
                                    value={localData.global.defaultKeywords.join(', ')}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        global: { ...prev.global, defaultKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) }
                                    }))}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>OG Image URL</Label>
                                    <Input
                                        value={localData.global.ogImage}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            global: { ...prev.global, ogImage: e.target.value }
                                        }))}
                                    />
                                </div>
                                <div>
                                    <Label>Twitter Handle</Label>
                                    <Input
                                        value={localData.global.twitterHandle}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            global: { ...prev.global, twitterHandle: e.target.value }
                                        }))}
                                        placeholder="@yourhandle"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pages" className="space-y-6">
                    <AdminDataTable
                        title="Page SEO Settings"
                        description="Configure SEO for individual pages"
                        data={pageDataArray}
                        columns={pageColumns}
                        onEdit={(item) => setEditingPage(item.page)}
                        getItemId={(item) => item.page}
                        emptyMessage="No pages configured"
                    />
                </TabsContent>
            </Tabs>

            {/* Edit Page SEO Dialog */}
            <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="capitalize">Edit {editingPage} Page SEO</DialogTitle>
                    </DialogHeader>
                    {editingPage && localData.pages[editingPage] && (
                        <div className="space-y-4">
                            <div>
                                <Label>Page Title</Label>
                                <Input
                                    value={localData.pages[editingPage].title}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        pages: {
                                            ...prev.pages,
                                            [editingPage]: { ...prev.pages[editingPage], title: e.target.value }
                                        }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label>Meta Description</Label>
                                <Textarea
                                    value={localData.pages[editingPage].description}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        pages: {
                                            ...prev.pages,
                                            [editingPage]: { ...prev.pages[editingPage], description: e.target.value }
                                        }
                                    }))}
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {localData.pages[editingPage].description.length}/160 characters recommended
                                </p>
                            </div>
                            <div>
                                <Label>Keywords (comma separated)</Label>
                                <Input
                                    value={localData.pages[editingPage].keywords.join(', ')}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        pages: {
                                            ...prev.pages,
                                            [editingPage]: {
                                                ...prev.pages[editingPage],
                                                keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                                            }
                                        }
                                    }))}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setEditingPage(null)}>Close</Button>
                                <Button onClick={() => {
                                    setEditingPage(null);
                                    toast.success('Page SEO updated');
                                }}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
