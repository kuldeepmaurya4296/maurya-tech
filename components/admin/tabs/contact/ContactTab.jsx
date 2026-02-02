"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const ContactTab = () => {
    const { contactData, setContactData } = useData();
    const [localData, setLocalData] = useState(contactData);

    const handleSave = () => { setContactData(localData); toast.success('Contact page updated!'); };

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="font-heading font-bold text-3xl">Edit Contact Page</h1><p className="text-muted-foreground">Update contact information</p></div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.open('/contact', '_blank')}><Eye className="w-4 h-4 mr-2" />Preview</Button>
                    <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90"><Save className="w-4 h-4 mr-2" />Save Changes</Button>
                </div>
            </div>

            <Card><CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div><Label>Subtitle</Label><Input value={localData.hero.subtitle} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} /></div>
                    <div><Label>Title</Label><Input value={localData.hero.title} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} /></div>
                    <div><Label>Description</Label><Textarea value={localData.hero.description} onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))} rows={2} /></div>
                </CardContent>
            </Card>

            <Card><CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div><Label>Email</Label><Input value={localData.info.email} onChange={(e) => setLocalData(prev => ({ ...prev, info: { ...prev.info, email: e.target.value } }))} /></div>
                        <div><Label>Phone</Label><Input value={localData.info.phone} onChange={(e) => setLocalData(prev => ({ ...prev, info: { ...prev.info, phone: e.target.value } }))} /></div>
                    </div>
                    <div><Label>Location</Label><Input value={localData.info.location} onChange={(e) => setLocalData(prev => ({ ...prev, info: { ...prev.info, location: e.target.value } }))} /></div>
                    <div><Label>Working Hours</Label><Input value={localData.info.workingHours} onChange={(e) => setLocalData(prev => ({ ...prev, info: { ...prev.info, workingHours: e.target.value } }))} /></div>
                </CardContent>
            </Card>

            <Card><CardHeader><CardTitle>Contact Form Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div><Label>Form Title</Label><Input value={localData.form.title} onChange={(e) => setLocalData(prev => ({ ...prev, form: { ...prev.form, title: e.target.value } }))} /></div>
                    <div><Label>Submit Button Text</Label><Input value={localData.form.submitButton} onChange={(e) => setLocalData(prev => ({ ...prev, form: { ...prev.form, submitButton: e.target.value } }))} /></div>
                </CardContent>
            </Card>
        </div>
    );
};
