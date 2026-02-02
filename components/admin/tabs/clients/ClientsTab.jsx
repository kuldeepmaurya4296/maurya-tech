"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { toast } from 'sonner';

export const ClientsTab = () => {
    const { clientData, setClientData } = useData();
    const [localData, setLocalData] = useState(clientData);
    const [editingClient, setEditingClient] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setClientData(localData);
        toast.success('Clients updated successfully!');
    };

    const createClient = () => {
        const newClient = {
            id: Date.now().toString(),
            name: 'New Client',
            industry: 'Industry',
            testimonial: {
                quote: 'Testimonial quote...',
                author: 'Author Name',
                role: 'Role',
            }
        };
        setLocalData(prev => ({ ...prev, clients: [newClient, ...prev.clients] }));
        setEditingClient(newClient);
        setIsDialogOpen(true);
    };

    const updateClient = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            clients: prev.clients.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
        if (editingClient && editingClient.id === id) {
            setEditingClient(prev => ({ ...prev, [field]: value }));
        }
    };

    const updateTestimonial = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            clients: prev.clients.map(c => c.id === id ? { ...c, testimonial: { ...c.testimonial, [field]: value } } : c)
        }));
        if (editingClient && editingClient.id === id) {
            setEditingClient(prev => ({ ...prev, testimonial: { ...prev.testimonial, [field]: value } }));
        }
    };


    const deleteClient = (client) => {
        setLocalData(prev => ({ ...prev, clients: prev.clients.filter(c => c.id !== client.id) }));
        toast.success('Client deleted');
    };

    const columns = [
        { key: 'name', header: 'Client Name', className: 'font-medium' },
        { key: 'industry', header: 'Industry' },
        {
            key: 'testimonial',
            header: 'Testimonial',
            render: (client) => <span className="text-sm text-muted-foreground line-clamp-1">{client.testimonial.author}</span>
        }
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Clients</h1>
                    <p className="text-muted-foreground">Manage client testimonials and logos</p>
                </div>
                <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Section Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={localData.title}
                                onChange={(e) => setLocalData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                value={localData.subtitle}
                                onChange={(e) => setLocalData(prev => ({ ...prev, subtitle: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Testimonials Title</Label>
                            <Input
                                value={localData.testimonials.title}
                                onChange={(e) => setLocalData(prev => ({ ...prev, testimonials: { ...prev.testimonials, title: e.target.value } }))}
                            />
                        </div>
                        <div>
                            <Label>Testimonials Subtitle</Label>
                            <Input
                                value={localData.testimonials.subtitle}
                                onChange={(e) => setLocalData(prev => ({ ...prev, testimonials: { ...prev.testimonials, subtitle: e.target.value } }))}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AdminDataTable
                title="Clients List"
                description="Manage your clients"
                data={localData.clients}
                columns={columns}
                getItemId={(c) => c.id}
                onAdd={createClient}
                addButtonText="Add Client"
                onEdit={(client) => { setEditingClient(client); setIsDialogOpen(true); }}
                onDelete={deleteClient}
                emptyMessage="No clients found."
            />

            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingClient(null); }}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Client</DialogTitle>
                    </DialogHeader>
                    {editingClient && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Name</Label>
                                    <Input value={editingClient.name} onChange={(e) => updateClient(editingClient.id, 'name', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Industry</Label>
                                    <Input value={editingClient.industry} onChange={(e) => updateClient(editingClient.id, 'industry', e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <h4 className="font-medium">Testimonial</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Author</Label>
                                        <Input value={editingClient.testimonial.author} onChange={(e) => updateTestimonial(editingClient.id, 'author', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Role</Label>
                                        <Input value={editingClient.testimonial.role} onChange={(e) => updateTestimonial(editingClient.id, 'role', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Quote</Label>
                                    <Textarea value={editingClient.testimonial.quote} onChange={(e) => updateTestimonial(editingClient.id, 'quote', e.target.value)} rows={3} />
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
