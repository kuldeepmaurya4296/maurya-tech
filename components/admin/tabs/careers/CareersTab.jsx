"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export const CareersTab = () => {
    const { jobsData, setJobsData } = useData();
    const [localData, setLocalData] = useState(jobsData);
    const [editingJob, setEditingJob] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setJobsData(localData);
        toast.success('Jobs updated successfully!');
    };

    const createNewJob = () => {
        const newJob = {
            id: `job-${Date.now()}`,
            title: 'New Position',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            experience: '3+ years',
            description: 'Job description.',
            requirements: ['Requirement 1'],
            responsibilities: ['Responsibility 1'],
            benefits: ['Benefit 1'],
            isActive: true
        };
        setLocalData(prev => ({ ...prev, jobs: [newJob, ...prev.jobs] }));
        setEditingJob(newJob);
        setIsDialogOpen(true);
    };

    const updateJob = (id, field, value) => {
        setLocalData(prev => ({ ...prev, jobs: prev.jobs.map(j => j.id === id ? { ...j, [field]: value } : j) }));
        if (editingJob && editingJob.id === id) {
            setEditingJob(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const deleteJob = (job) => {
        setLocalData(prev => ({ ...prev, jobs: prev.jobs.filter(j => j.id !== job.id) }));
        toast.success('Job deleted');
    };

    const columns = [
        {
            key: 'title',
            header: 'Position',
            render: (job) => (
                <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                    </div>
                </div>
            )
        },
        {
            key: 'location',
            header: 'Location',
            className: 'w-[150px]',
            render: (job) => (
                <span className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />{job.location}
                </span>
            )
        },
        {
            key: 'type',
            header: 'Type',
            className: 'w-[120px]',
            render: (job) => (
                <span className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />{job.type}
                </span>
            )
        },
        {
            key: 'experience',
            header: 'Experience',
            className: 'w-[120px]',
        },
        {
            key: 'isActive',
            header: 'Status',
            className: 'w-[100px]',
            render: (job) => (
                job.isActive ? (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                ) : (
                    <Badge variant="secondary">Inactive</Badge>
                )
            )
        },
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Careers</h1>
                    <p className="text-muted-foreground">{localData.jobs.filter(j => j.isActive).length} active positions</p>
                </div>
            </div>

            {/* Hero Section Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Careers Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={localData.hero.title}
                                onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                value={localData.hero.subtitle}
                                onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={localData.hero.description}
                            onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            <AdminDataTable
                title="Job Listings"
                description="Manage open positions"
                data={localData.jobs}
                columns={columns}
                getItemId={(j) => j.id}
                onAdd={createNewJob}
                addButtonText="Add Position"
                onEdit={(job) => { setEditingJob(job); setIsDialogOpen(true); }}
                onDelete={deleteJob}
                onSave={handleSave}
                onPreview={() => window.open('/careers', '_blank')}
                emptyMessage="No positions yet. Add your first job listing."
            />

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingJob(null); }}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingJob?.id.startsWith('job-') ? 'New Position' : 'Edit Position'}</DialogTitle>
                    </DialogHeader>
                    {editingJob && (
                        <div className="space-y-4 py-4">
                            <div>
                                <Label>Job Title</Label>
                                <Input value={editingJob.title} onChange={(e) => updateJob(editingJob.id, 'title', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Department</Label>
                                    <Input value={editingJob.department} onChange={(e) => updateJob(editingJob.id, 'department', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Location</Label>
                                    <Input value={editingJob.location} onChange={(e) => updateJob(editingJob.id, 'location', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Input value={editingJob.type} onChange={(e) => updateJob(editingJob.id, 'type', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Experience</Label>
                                    <Input value={editingJob.experience} onChange={(e) => updateJob(editingJob.id, 'experience', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Textarea value={editingJob.description} onChange={(e) => updateJob(editingJob.id, 'description', e.target.value)} rows={3} />
                            </div>
                            <div>
                                <Label>Requirements (one per line)</Label>
                                <Textarea value={editingJob.requirements.join('\n')} onChange={(e) => updateJob(editingJob.id, 'requirements', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                            </div>
                            <div>
                                <Label>Responsibilities (one per line)</Label>
                                <Textarea value={editingJob.responsibilities.join('\n')} onChange={(e) => updateJob(editingJob.id, 'responsibilities', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                            </div>
                            <div>
                                <Label>Benefits (one per line)</Label>
                                <Textarea value={editingJob.benefits.join('\n')} onChange={(e) => updateJob(editingJob.id, 'benefits', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch checked={editingJob.isActive} onCheckedChange={(checked) => updateJob(editingJob.id, 'isActive', checked)} />
                                <Label>Active Position</Label>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
