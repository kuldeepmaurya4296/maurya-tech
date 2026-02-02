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
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

export const ProjectsTab = () => {
    const { projectsData, setProjectsData } = useData();
    const [localData, setLocalData] = useState(projectsData);
    const [editingProject, setEditingProject] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setProjectsData(localData);
        toast.success('Projects updated!');
    };

    const createNewProject = () => {
        const newProject = {
            id: `project-${Date.now()}`,
            slug: `new-project-${Date.now()}`,
            title: 'New Project',
            category: localData.categories[0] || 'SaaS',
            shortDescription: 'Description',
            fullDescription: 'Full description',
            challenges: ['Challenge 1'],
            solutions: ['Solution 1'],
            results: ['Result 1'],
            technologies: ['React', 'Node.js'],
            thumbnail: '',
            liveLink: '',
            desktopImages: [],
            mobileImages: [],
            featured: false,
            client: '',
            duration: '',
            year: new Date().getFullYear().toString(),
        };
        setLocalData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
        setEditingProject(newProject);
        setIsDialogOpen(true);
    };

    const updateProject = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
        if (editingProject && editingProject.id === id) {
            setEditingProject(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const deleteProject = (project) => {
        setLocalData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== project.id) }));
        toast.success('Project deleted');
    };

    const columns = [
        {
            key: 'thumbnail',
            header: '',
            className: 'w-[60px]',
            render: (project) => (
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                        <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    )}
                </div>
            )
        },
        {
            key: 'title',
            header: 'Project',
            render: (project) => (
                <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{project.shortDescription}</div>
                </div>
            )
        },
        {
            key: 'category',
            header: 'Category',
            render: (project) => (
                <Badge variant="secondary">{project.category}</Badge>
            )
        },
        {
            key: 'technologies',
            header: 'Tech Stack',
            render: (project) => (
                <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                    {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{project.technologies.length - 3}</Badge>
                    )}
                </div>
            )
        },
        {
            key: 'liveLink',
            header: 'Live',
            className: 'w-[80px]',
            render: (project) => (
                project.liveLink ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); window.open(project.liveLink, '_blank'); }}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                )
            )
        },
        {
            key: 'featured',
            header: 'Featured',
            className: 'w-[100px]',
            render: (project) => (
                project.featured ? (
                    <Badge className="bg-amber-500/10 text-amber-500">⭐ Yes</Badge>
                ) : (
                    <span className="text-muted-foreground text-sm">No</span>
                )
            )
        },
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Projects</h1>
                    <p className="text-muted-foreground">{localData.projects.length} projects total</p>
                </div>
            </div>

            <AdminDataTable
                title="Projects"
                description="Manage your portfolio projects"
                data={localData.projects}
                columns={columns}
                getItemId={(p) => p.id}
                onAdd={createNewProject}
                addButtonText="Add Project"
                onEdit={(project) => { setEditingProject(project); setIsDialogOpen(true); }}
                onDelete={deleteProject}
                onView={(project) => window.open(`/projects/${project.slug}`, '_blank')}
                onSave={handleSave}
                onPreview={() => window.open('/projects', '_blank')}
                emptyMessage="No projects yet. Add your first project."
            />

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingProject(null); }}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProject?.id.startsWith('project-') ? 'New Project' : 'Edit Project'}</DialogTitle>
                    </DialogHeader>
                    {editingProject && (
                        <div className="space-y-6 py-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input value={editingProject.title} onChange={(e) => updateProject(editingProject.id, 'title', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Slug (URL)</Label>
                                    <Input value={editingProject.slug} onChange={(e) => updateProject(editingProject.id, 'slug', e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label>Short Description</Label>
                                <Textarea value={editingProject.shortDescription} onChange={(e) => updateProject(editingProject.id, 'shortDescription', e.target.value)} rows={2} />
                            </div>

                            <div>
                                <Label>Full Description</Label>
                                <Textarea value={editingProject.fullDescription} onChange={(e) => updateProject(editingProject.id, 'fullDescription', e.target.value)} rows={4} />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <Label>Client</Label>
                                    <Input value={editingProject.client || ''} onChange={(e) => updateProject(editingProject.id, 'client', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Duration</Label>
                                    <Input value={editingProject.duration || ''} onChange={(e) => updateProject(editingProject.id, 'duration', e.target.value)} placeholder="e.g. 6 months" />
                                </div>
                                <div>
                                    <Label>Year</Label>
                                    <Input value={editingProject.year || ''} onChange={(e) => updateProject(editingProject.id, 'year', e.target.value)} placeholder="e.g. 2024" />
                                </div>
                            </div>

                            <Card>
                                <CardHeader><CardTitle className="text-base">Links & Media</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Live Link (URL)</Label>
                                        <Input value={editingProject.liveLink || ''} onChange={(e) => updateProject(editingProject.id, 'liveLink', e.target.value)} placeholder="https://example.com" />
                                    </div>
                                    <div>
                                        <Label>Thumbnail Image URL</Label>
                                        <Input value={editingProject.thumbnail || ''} onChange={(e) => updateProject(editingProject.id, 'thumbnail', e.target.value)} placeholder="https://..." />
                                    </div>
                                    <div>
                                        <Label>Desktop Screenshots (one URL per line)</Label>
                                        <Textarea
                                            value={editingProject.desktopImages.join('\n')}
                                            onChange={(e) => updateProject(editingProject.id, 'desktopImages', e.target.value.split('\n').filter(r => r.trim()))}
                                            rows={3}
                                            placeholder="https://image1.jpg&#10;https://image2.jpg"
                                        />
                                    </div>
                                    <div>
                                        <Label>Mobile Screenshots (one URL per line)</Label>
                                        <Textarea
                                            value={editingProject.mobileImages.join('\n')}
                                            onChange={(e) => updateProject(editingProject.id, 'mobileImages', e.target.value.split('\n').filter(r => r.trim()))}
                                            rows={3}
                                            placeholder="https://mobile1.jpg&#10;https://mobile2.jpg"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <Label>Technologies (comma-separated)</Label>
                                <Input value={editingProject.technologies.join(', ')} onChange={(e) => updateProject(editingProject.id, 'technologies', e.target.value.split(',').map(t => t.trim()))} />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <Label>Challenges (one per line)</Label>
                                    <Textarea value={editingProject.challenges.join('\n')} onChange={(e) => updateProject(editingProject.id, 'challenges', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                                </div>
                                <div>
                                    <Label>Solutions (one per line)</Label>
                                    <Textarea value={editingProject.solutions.join('\n')} onChange={(e) => updateProject(editingProject.id, 'solutions', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                                </div>
                                <div>
                                    <Label>Results (one per line)</Label>
                                    <Textarea value={editingProject.results.join('\n')} onChange={(e) => updateProject(editingProject.id, 'results', e.target.value.split('\n').filter(r => r.trim()))} rows={4} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Switch
                                    checked={editingProject.featured}
                                    onCheckedChange={(checked) => updateProject(editingProject.id, 'featured', checked)}
                                />
                                <Label>Featured Project</Label>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
