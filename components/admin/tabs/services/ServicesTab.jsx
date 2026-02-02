"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { AdminHeader, AdminSection, AdminField } from '@/components/admin/shared';

export const ServicesTab = () => {
    const { servicesData, setServicesData } = useData();
    const [localData, setLocalData] = useState(servicesData);
    const [editingService, setEditingService] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setServicesData(localData);
        toast.success('Services updated successfully!');
    };

    const createNewService = () => {
        const newService = {
            id: `service-${Date.now()}`,
            icon: 'Star',
            title: 'New Service',
            shortDescription: 'Description of the new service',
            fullDescription: 'Full description of the new service goes here.',
            features: ['Feature 1', 'Feature 2'],
            technologies: ['Tech 1', 'Tech 2'],
        };
        setLocalData(prev => ({ ...prev, services: [...prev.services, newService] }));
        setEditingService(newService);
        setIsDialogOpen(true);
    };

    const updateService = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s)
        }));
        if (editingService && editingService.id === id) {
            setEditingService(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const deleteService = (service) => {
        setLocalData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== service.id) }));
        toast.success('Service deleted');
    };

    const columns = [
        {
            key: 'icon',
            header: '',
            className: 'w-[60px]',
            render: (service) => (
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-accent" />
                </div>
            )
        },
        {
            key: 'title',
            header: 'Service',
            render: (service) => (
                <div>
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{service.shortDescription}</div>
                </div>
            )
        },
        {
            key: 'features',
            header: 'Features',
            className: 'w-[120px]',
            render: (service) => (
                <Badge variant="secondary">{service.features.length} features</Badge>
            )
        },
        {
            key: 'technologies',
            header: 'Technologies',
            render: (service) => (
                <div className="flex flex-wrap gap-1">
                    {service.technologies.slice(0, 3).map(tech => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                    {service.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{service.technologies.length - 3}</Badge>
                    )}
                </div>
            )
        },
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Manage Services"
                description={`${localData.services.length} services total`}
            />

            {/* Hero Section Settings */}
            <AdminSection title="Services Hero Section">
                <div className="grid md:grid-cols-2 gap-4">
                    <AdminField
                        label="Title"
                        value={localData.hero.title}
                        onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                    />
                    <AdminField
                        label="Subtitle"
                        value={localData.hero.subtitle}
                        onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
                    />
                </div>
                <AdminField
                    label="Description"
                    type="textarea"
                    value={localData.hero.description}
                    onChange={(e) => setLocalData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                    rows={2}
                />
            </AdminSection>

            <AdminDataTable
                title="Services"
                description="Manage your service offerings"
                data={localData.services}
                columns={columns}
                getItemId={(s) => s.id}
                onAdd={createNewService}
                addButtonText="Add Service"
                onEdit={(service) => { setEditingService(service); setIsDialogOpen(true); }}
                onDelete={deleteService}
                onSave={handleSave}
                onPreview={() => window.open('/services', '_blank')}
                emptyMessage="No services yet. Add your first service."
            />

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingService(null); }}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingService?.id.startsWith('service-') ? 'New Service' : 'Edit Service'}</DialogTitle>
                    </DialogHeader>
                    {editingService && (
                        <div className="space-y-4 py-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <AdminField
                                    label="Icon (Lucide name)"
                                    value={editingService.icon}
                                    onChange={(e) => updateService(editingService.id, 'icon', e.target.value)}
                                />
                                <AdminField
                                    label="Title"
                                    value={editingService.title}
                                    onChange={(e) => updateService(editingService.id, 'title', e.target.value)}
                                />
                            </div>
                            <AdminField
                                label="Short Description"
                                value={editingService.shortDescription}
                                onChange={(e) => updateService(editingService.id, 'shortDescription', e.target.value)}
                            />
                            <AdminField
                                label="Full Description"
                                type="textarea"
                                value={editingService.fullDescription}
                                onChange={(e) => updateService(editingService.id, 'fullDescription', e.target.value)}
                                rows={3}
                            />
                            <AdminField
                                label="Features (one per line)"
                                type="textarea"
                                value={editingService.features.join('\n')}
                                onChange={(e) => updateService(editingService.id, 'features', e.target.value.split('\n').filter(f => f.trim()))}
                                rows={4}
                            />
                            <AdminField
                                label="Technologies (comma-separated)"
                                value={editingService.technologies.join(', ')}
                                onChange={(e) => updateService(editingService.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                placeholder="React, Node.js, PostgreSQL"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
