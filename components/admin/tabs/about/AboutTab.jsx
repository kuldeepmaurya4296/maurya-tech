"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { AdminHeader, AdminSection, AdminField, AdminListItem } from '@/components/admin/shared';

export const AboutTab = () => {
    const { aboutData, setAboutData } = useData();
    const [localData, setLocalData] = useState(aboutData);

    const handleSave = () => {
        setAboutData(localData);
        toast.success('About page updated successfully!');
    };

    const addCultureValue = () => {
        setLocalData(prev => ({
            ...prev,
            culture: {
                ...prev.culture,
                values: [...prev.culture.values, { icon: 'Heart', title: 'New Value', description: 'Description' }]
            }
        }));
    };

    const removeCultureValue = (index) => {
        setLocalData(prev => ({
            ...prev,
            culture: {
                ...prev.culture,
                values: prev.culture.values.filter((_, i) => i !== index)
            }
        }));
    };

    const addTeamMember = () => {
        setLocalData(prev => ({
            ...prev,
            team: {
                ...prev.team,
                members: [...prev.team.members, { name: 'New Member', role: 'Role', bio: 'Bio...', image: '' }]
            }
        }));
    };

    const removeTeamMember = (index) => {
        setLocalData(prev => ({
            ...prev,
            team: {
                ...prev.team,
                members: prev.team.members.filter((_, i) => i !== index)
            }
        }));
    };

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Edit About Page"
                description="Update your about page content"
                onSave={handleSave}
                onPreview={() => window.open('/about', '_blank')}
            />

            <Tabs defaultValue="hero" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="story">Story</TabsTrigger>
                    <TabsTrigger value="culture">Culture</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="hero">
                    <AdminSection title="Hero Section">
                        <AdminField
                            label="Subtitle"
                            value={localData.hero.subtitle}
                            onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
                        />
                        <AdminField
                            label="Title"
                            value={localData.hero.title}
                            onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                        />
                        <AdminField
                            label="Description"
                            type="textarea"
                            value={localData.hero.description}
                            onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                        />
                    </AdminSection>
                </TabsContent>

                <TabsContent value="story">
                    <AdminSection title="Our Story">
                        <AdminField
                            label="Title"
                            value={localData.story.title}
                            onChange={(e) => setLocalData(prev => ({ ...prev, story: { ...prev.story, title: e.target.value } }))}
                        />
                        <AdminField
                            label="Paragraphs"
                            type="textarea"
                            value={localData.story.paragraphs.join('\n\n')}
                            onChange={(e) => setLocalData(prev => ({ ...prev, story: { ...prev.story, paragraphs: e.target.value.split('\n\n').filter(p => p.trim()) } }))}
                            rows={8}
                            placeholder="Separate paragraphs with double newlines"
                        />
                    </AdminSection>
                </TabsContent>

                <TabsContent value="culture">
                    <AdminSection title="Culture Values">
                        <div className="flex justify-end mb-4">
                            <Button variant="outline" size="sm" onClick={addCultureValue}>
                                <Plus className="w-4 h-4 mr-1" /> Add Value
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {localData.culture.values.map((value, index) => (
                                <AdminListItem key={index} onRemove={() => removeCultureValue(index)}>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <AdminField
                                            label="Icon (Lucide)"
                                            value={value.icon}
                                            onChange={(e) => setLocalData(prev => ({ ...prev, culture: { ...prev.culture, values: prev.culture.values.map((v, i) => i === index ? { ...v, icon: e.target.value } : v) } }))}
                                        />
                                        <AdminField
                                            label="Title"
                                            value={value.title}
                                            onChange={(e) => setLocalData(prev => ({ ...prev, culture: { ...prev.culture, values: prev.culture.values.map((v, i) => i === index ? { ...v, title: e.target.value } : v) } }))}
                                        />
                                    </div>
                                    <AdminField
                                        label="Description"
                                        type="textarea"
                                        value={value.description}
                                        onChange={(e) => setLocalData(prev => ({ ...prev, culture: { ...prev.culture, values: prev.culture.values.map((v, i) => i === index ? { ...v, description: e.target.value } : v) } }))}
                                        rows={2}
                                    />
                                </AdminListItem>
                            ))}
                        </div>
                    </AdminSection>
                </TabsContent>

                <TabsContent value="team">
                    <AdminSection title="Team Members">
                        <div className="flex justify-end mb-4">
                            <Button variant="outline" size="sm" onClick={addTeamMember}>
                                <Plus className="w-4 h-4 mr-1" /> Add Member
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {localData.team.members.map((member, index) => (
                                <AdminListItem key={index} onRemove={() => removeTeamMember(index)}>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <AdminField
                                            label="Name"
                                            value={member.name}
                                            onChange={(e) => setLocalData(prev => ({ ...prev, team: { ...prev.team, members: prev.team.members.map((m, i) => i === index ? { ...m, name: e.target.value } : m) } }))}
                                        />
                                        <AdminField
                                            label="Role"
                                            value={member.role}
                                            onChange={(e) => setLocalData(prev => ({ ...prev, team: { ...prev.team, members: prev.team.members.map((m, i) => i === index ? { ...m, role: e.target.value } : m) } }))}
                                        />
                                    </div>
                                    <AdminField
                                        label="Bio"
                                        type="textarea"
                                        value={member.bio}
                                        onChange={(e) => setLocalData(prev => ({ ...prev, team: { ...prev.team, members: prev.team.members.map((m, i) => i === index ? { ...m, bio: e.target.value } : m) } }))}
                                        rows={2}
                                    />
                                </AdminListItem>
                            ))}
                        </div>
                    </AdminSection>
                </TabsContent>
            </Tabs>
        </div>
    );
};
