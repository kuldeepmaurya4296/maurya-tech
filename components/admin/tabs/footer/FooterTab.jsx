"use client";
import React, { useState } from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const FooterTab = () => {
    const { brandData, setBrandData } = useBrand();
    // Ensure we have default values to prevent undefined errors
    const [localData, setLocalData] = useState(brandData?.footer || {
        description: '',
        sections: [],
        copyrightText: '',
        showPoweredBy: false,
        poweredByText: ''
    });

    React.useEffect(() => {
        if (brandData?.footer) {
            setLocalData(brandData.footer);
        }
    }, [brandData]);

    if (!brandData) return <div>Loading...</div>;

    const handleSave = () => {
        setBrandData(prev => ({
            ...prev,
            footer: localData
        }));
        toast.success('Footer settings saved!');
    };

    const updateSection = (index, field, value) => {
        setLocalData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === index ? { ...section, [field]: value } : section
            )
        }));
    };

    const updateLink = (sectionIndex, linkIndex, field, value) => {
        setLocalData(prev => ({
            ...prev,
            sections: prev.sections.map((section, si) =>
                si === sectionIndex ? {
                    ...section,
                    links: section.links.map((link, li) =>
                        li === linkIndex ? { ...link, [field]: value } : link
                    )
                } : section
            )
        }));
    };

    const addLink = (sectionIndex) => {
        setLocalData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === sectionIndex ? {
                    ...section,
                    links: [...section.links, { name: 'New Link', path: '/' }]
                } : section
            )
        }));
    };

    const removeLink = (sectionIndex, linkIndex) => {
        setLocalData(prev => ({
            ...prev,
            sections: prev.sections.map((section, si) =>
                si === sectionIndex ? {
                    ...section,
                    links: section.links.filter((_, li) => li !== linkIndex)
                } : section
            )
        }));
    };

    const addSection = () => {
        setLocalData(prev => ({
            ...prev,
            sections: [...prev.sections, { title: 'New Section', links: [] }]
        }));
    };

    const removeSection = (index) => {
        setLocalData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Footer Settings</h1>
                    <p className="text-muted-foreground">Customize footer content and navigation links</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />Preview
                    </Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="content" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="navigation">Navigation Sections</TabsTrigger>
                    <TabsTrigger value="copyright">Copyright</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Footer Description</CardTitle>
                            <CardDescription>Main text displayed in the footer</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={localData.description}
                                onChange={(e) => setLocalData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                placeholder="Company description for footer..."
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="navigation" className="space-y-6">
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={addSection}>
                            <Plus className="w-4 h-4 mr-2" />Add Section
                        </Button>
                    </div>

                    {localData.sections.map((section, sectionIndex) => (
                        <Card key={sectionIndex}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex-1">
                                    <Label>Section Title</Label>
                                    <Input
                                        value={section.title}
                                        onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                                        className="max-w-xs mt-1"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSection(sectionIndex)}
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="flex items-center gap-4">
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Link Name</Label>
                                                <Input
                                                    value={link.name}
                                                    onChange={(e) => updateLink(sectionIndex, linkIndex, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label>Path</Label>
                                                <Input
                                                    value={link.path}
                                                    onChange={(e) => updateLink(sectionIndex, linkIndex, 'path', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeLink(sectionIndex, linkIndex)}
                                            className="text-destructive mt-6"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addLink(sectionIndex)}>
                                    <Plus className="w-4 h-4 mr-2" />Add Link
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="copyright" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Copyright Settings</CardTitle>
                            <CardDescription>Use {'{year}'} for current year and {'{company}'} for company name</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Copyright Text</Label>
                                <Input
                                    value={localData.copyrightText}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, copyrightText: e.target.value }))}
                                    placeholder="© {year} {company}. All rights reserved."
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Show Powered By</Label>
                                    <p className="text-sm text-muted-foreground">Display additional tagline</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={localData.showPoweredBy}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, showPoweredBy: e.target.checked }))}
                                    className="w-4 h-4"
                                />
                            </div>
                            {localData.showPoweredBy && (
                                <div>
                                    <Label>Tagline</Label>
                                    <Input
                                        value={localData.poweredByText}
                                        onChange={(e) => setLocalData(prev => ({ ...prev, poweredByText: e.target.value }))}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
