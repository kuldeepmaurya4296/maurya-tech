"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Eye, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

export const TechnologiesTab = () => {
    const { technologyData, setTechnologyData } = useData();
    const [localData, setLocalData] = useState(technologyData);

    const handleSave = () => {
        setTechnologyData(localData);
        toast.success('Technologies page updated successfully!');
    };

    const addDomain = () => {
        setLocalData(prev => ({
            ...prev,
            domains: [
                ...prev.domains,
                {
                    id: `domain-${Date.now()}`,
                    icon: 'Code',
                    name: 'New Domain',
                    description: 'Description of the new domain.',
                    capabilities: [],
                    techStack: []
                }
            ]
        }));
    };

    const removeDomain = (index) => {
        setLocalData(prev => ({
            ...prev,
            domains: prev.domains.filter((_, i) => i !== index)
        }));
    };

    const updateDomain = (index, field, value) => {
        setLocalData(prev => ({
            ...prev,
            domains: prev.domains.map((d, i) => i === index ? { ...d, [field]: value } : d)
        }));
    };

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Edit Technologies</h1>
                    <p className="text-muted-foreground">Manage your technology stack and capabilities</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.open('/technologies', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />Preview
                    </Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="domains" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="hero">Hero Section</TabsTrigger>
                    <TabsTrigger value="domains">Technology Domains</TabsTrigger>
                    <TabsTrigger value="expertise">Expertise</TabsTrigger>
                </TabsList>

                <TabsContent value="hero">
                    <Card>
                        <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div><Label>Subtitle</Label><Input value={localData.hero.subtitle} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} /></div>
                            <div><Label>Title</Label><Input value={localData.hero.title} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} /></div>
                            <div><Label>Description</Label><Textarea value={localData.hero.description} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))} rows={3} /></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="domains" className="space-y-6">
                    {localData.domains.map((domain, index) => (
                        <Card key={domain.id || index} className="relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="destructive" size="sm" onClick={() => removeDomain(index)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted p-2 rounded"><GripVertical className="w-4 h-4 text-muted-foreground" /></div>
                                    <div>
                                        <CardTitle>{domain.name || 'New Domain'}</CardTitle>
                                        <CardDescription>Domain #{index + 1}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div><Label>Name</Label><Input value={domain.name} onChange={(e) => updateDomain(index, 'name', e.target.value)} /></div>
                                    <div><Label>Icon Name</Label><Input value={domain.icon} onChange={(e) => updateDomain(index, 'icon', e.target.value)} /></div>
                                </div>
                                <div><Label>Description</Label><Textarea value={domain.description} onChange={(e) => updateDomain(index, 'description', e.target.value)} /></div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="mb-2 block">Capabilities (One per line)</Label>
                                        <Textarea
                                            value={domain.capabilities.join('\n')}
                                            onChange={(e) => updateDomain(index, 'capabilities', e.target.value.split('\n').filter(l => l.trim()))}
                                            className="min-h-[150px]"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Foundational skills and methodologies.</p>
                                    </div>
                                    <div>
                                        <Label className="mb-2 block">Tech Stack (One per line)</Label>
                                        <Textarea
                                            value={domain.techStack.join('\n')}
                                            onChange={(e) => updateDomain(index, 'techStack', e.target.value.split('\n').filter(l => l.trim()))}
                                            className="min-h-[150px]"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Specific tools and frameworks used.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button onClick={addDomain} className="w-full border-dashed" variant="outline"><Plus className="w-4 h-4 mr-2" />Add New Domain</Button>
                </TabsContent>

                <TabsContent value="expertise">
                    <Card>
                        <CardHeader><CardTitle>Our Expertise</CardTitle></CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="space-y-4">
                                <Label>Section Title</Label>
                                <Input
                                    value={localData.expertise.title}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, expertise: { ...prev.expertise, title: e.target.value } }))}
                                />
                            </div>

                            <div className="grid gap-6">
                                {localData.expertise.items.map((item, index) => (
                                    <div key={index} className="p-4 border rounded-lg grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><Label>Icon</Label><Input value={item.icon} onChange={(e) => {
                                                const newItems = [...localData.expertise.items];
                                                newItems[index] = { ...item, icon: e.target.value };
                                                setLocalData(prev => ({ ...prev, expertise: { ...prev.expertise, items: newItems } }));
                                            }} /></div>
                                            <div><Label>Title</Label><Input value={item.title} onChange={(e) => {
                                                const newItems = [...localData.expertise.items];
                                                newItems[index] = { ...item, title: e.target.value };
                                                setLocalData(prev => ({ ...prev, expertise: { ...prev.expertise, items: newItems } }));
                                            }} /></div>
                                        </div>
                                        <div><Label>Description</Label><Textarea value={item.description} onChange={(e) => {
                                            const newItems = [...localData.expertise.items];
                                            newItems[index] = { ...item, description: e.target.value };
                                            setLocalData(prev => ({ ...prev, expertise: { ...prev.expertise, items: newItems } }));
                                        }} /></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
