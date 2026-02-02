"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { Save, Eye, Plus, FileText, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const PoliciesTab = () => {
    const { policyData, setPolicyData } = useData();
    const [localData, setLocalData] = useState(policyData);
    const [editingSection, setEditingSection] = useState(null);

    const handleSave = () => {
        setPolicyData(localData);
        toast.success('Policies saved successfully!');
    };

    const handleUpdateSection = (type, index, section) => {
        const key = type === 'privacy' ? 'privacyPolicy' : 'termsConditions';
        const newSections = [...localData[key].sections];
        newSections[index] = section;
        setLocalData(prev => ({
            ...prev,
            [key]: { ...prev[key], sections: newSections }
        }));
        setEditingSection(null);
        toast.success('Section updated');
    };

    const handleDeleteSection = (type, index) => {
        const key = type === 'privacy' ? 'privacyPolicy' : 'termsConditions';
        const newSections = localData[key].sections.filter((_, i) => i !== index);
        setLocalData(prev => ({
            ...prev,
            [key]: { ...prev[key], sections: newSections }
        }));
        toast.success('Section deleted');
    };

    const handleAddSection = (type) => {
        const key = type === 'privacy' ? 'privacyPolicy' : 'termsConditions';
        const newSection = { title: 'New Section', content: 'Enter content here...' };
        setLocalData(prev => ({
            ...prev,
            [key]: { ...prev[key], sections: [...prev[key].sections, newSection] }
        }));
        toast.success('Section added');
    };

    const privacyColumns = [
        {
            key: 'title',
            header: 'Section Title',
            render: (section) => (
                <span className="font-medium">{section.title}</span>
            )
        },
        {
            key: 'content',
            header: 'Content Preview',
            render: (section) => (
                <span className="text-sm text-muted-foreground line-clamp-2">{section.content}</span>
            )
        },
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Legal Policies</h1>
                    <p className="text-muted-foreground">Manage Privacy Policy and Terms of Service</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.open('/privacy', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />Preview Privacy
                    </Button>
                    <Button variant="outline" onClick={() => window.open('/terms', '_blank')}>
                        <Eye className="w-4 h-4 mr-2" />Preview Terms
                    </Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="privacy" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="privacy" className="gap-2">
                        <Shield className="w-4 h-4" />Privacy Policy
                    </TabsTrigger>
                    <TabsTrigger value="terms" className="gap-2">
                        <FileText className="w-4 h-4" />Terms of Service
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="privacy" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Policy Settings</CardTitle>
                            <CardDescription>Edit the title and last updated date</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    value={localData.privacyPolicy.title}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        privacyPolicy: { ...prev.privacyPolicy, title: e.target.value }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label>Last Updated</Label>
                                <Input
                                    value={localData.privacyPolicy.lastUpdated}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        privacyPolicy: { ...prev.privacyPolicy, lastUpdated: e.target.value }
                                    }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <AdminDataTable
                        title="Privacy Policy Sections"
                        description="Manage sections of your privacy policy"
                        data={localData.privacyPolicy.sections}
                        columns={privacyColumns}
                        onEdit={(section) => {
                            const index = localData.privacyPolicy.sections.findIndex(s => s.title === section.title);
                            setEditingSection({ type: 'privacy', index, section });
                        }}
                        onDelete={(section) => {
                            const index = localData.privacyPolicy.sections.findIndex(s => s.title === section.title);
                            handleDeleteSection('privacy', index);
                        }}
                        onAdd={() => handleAddSection('privacy')}
                        addButtonText="Add Section"
                        getItemId={(section) => section.title}
                        emptyMessage="No sections added yet"
                    />
                </TabsContent>

                <TabsContent value="terms" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Terms of Service Settings</CardTitle>
                            <CardDescription>Edit the title and last updated date</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    value={localData.termsConditions.title}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        termsConditions: { ...prev.termsConditions, title: e.target.value }
                                    }))}
                                />
                            </div>
                            <div>
                                <Label>Last Updated</Label>
                                <Input
                                    value={localData.termsConditions.lastUpdated}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        termsConditions: { ...prev.termsConditions, lastUpdated: e.target.value }
                                    }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <AdminDataTable
                        title="Terms of Service Sections"
                        description="Manage sections of your terms of service"
                        data={localData.termsConditions.sections}
                        columns={privacyColumns}
                        onEdit={(section) => {
                            const index = localData.termsConditions.sections.findIndex(s => s.title === section.title);
                            setEditingSection({ type: 'terms', index, section });
                        }}
                        onDelete={(section) => {
                            const index = localData.termsConditions.sections.findIndex(s => s.title === section.title);
                            handleDeleteSection('terms', index);
                        }}
                        onAdd={() => handleAddSection('terms')}
                        addButtonText="Add Section"
                        getItemId={(section) => section.title}
                        emptyMessage="No sections added yet"
                    />
                </TabsContent>
            </Tabs>

            {/* Edit Section Dialog */}
            <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Section</DialogTitle>
                    </DialogHeader>
                    {editingSection && (
                        <div className="space-y-4">
                            <div>
                                <Label>Section Title</Label>
                                <Input
                                    value={editingSection.section.title}
                                    onChange={(e) => setEditingSection({
                                        ...editingSection,
                                        section: { ...editingSection.section, title: e.target.value }
                                    })}
                                />
                            </div>
                            <div>
                                <Label>Content</Label>
                                <Textarea
                                    value={editingSection.section.content}
                                    onChange={(e) => setEditingSection({
                                        ...editingSection,
                                        section: { ...editingSection.section, content: e.target.value }
                                    })}
                                    rows={10}
                                    className="font-mono text-sm"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                                <Button onClick={() => handleUpdateSection(editingSection.type, editingSection.index, editingSection.section)}>
                                    Save Section
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
