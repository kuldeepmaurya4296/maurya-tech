"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export const PricingTab = () => {
    const { pricingData, setPricingData } = useData();
    const [localData, setLocalData] = useState(pricingData);
    const [activeCategory, setActiveCategory] = useState(pricingData.categories[0]?.id || '');
    const [editingPlan, setEditingPlan] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);

    const handleSave = () => {
        setPricingData(localData);
        toast.success('Pricing updated successfully!');
    };

    const currentCategory = localData.categories.find(c => c.id === activeCategory);

    const addPlan = () => {
        const newPlan = {
            name: 'New Plan',
            price: '0',
            period: 'month',
            description: 'Plan description',
            features: ['Feature 1'],
            popular: false
        };

        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? { ...cat, plans: [...cat.plans, newPlan] }
                    : cat
            )
        }));
        setEditingPlan({ ...newPlan, _index: currentCategory.plans.length });
        setIsDialogOpen(true);
    };

    const updatePlan = (planIndex, field, value) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        plans: cat.plans.map((p, i) =>
                            i === planIndex ? { ...p, [field]: value } : p
                        )
                    }
                    : cat
            )
        }));
        if (editingPlan && editingPlan._index === planIndex) {
            setEditingPlan(prev => ({ ...prev, [field]: value }));
        }
    };

    const deletePlan = (plan) => {
        const planIndex = currentCategory.plans.indexOf(plan);
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? { ...cat, plans: cat.plans.filter((_, i) => i !== planIndex) }
                    : cat
            )
        }));
        toast.success('Plan deleted');
    };

    const addFeature = (planIndex) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        plans: cat.plans.map((p, i) =>
                            i === planIndex
                                ? { ...p, features: [...p.features, 'New Feature'] }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingPlan && editingPlan._index === planIndex) {
            setEditingPlan(prev => ({
                ...prev,
                features: [...prev.features, 'New Feature']
            }));
        }
    };

    const updateFeature = (planIndex, featureIndex, value) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        plans: cat.plans.map((p, i) =>
                            i === planIndex
                                ? {
                                    ...p,
                                    features: p.features.map((f, fi) => fi === featureIndex ? value : f)
                                }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingPlan && editingPlan._index === planIndex) {
            setEditingPlan(prev => ({
                ...prev,
                features: prev.features.map((f, i) => i === featureIndex ? value : f)
            }));
        }
    };

    const removeFeature = (planIndex, featureIndex) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        plans: cat.plans.map((p, i) =>
                            i === planIndex
                                ? {
                                    ...p,
                                    features: p.features.filter((_, fi) => fi !== featureIndex)
                                }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingPlan && editingPlan._index === planIndex) {
            setEditingPlan(prev => ({
                ...prev,
                features: prev.features.filter((_, i) => i !== featureIndex)
            }));
        }
    };

    // FAQ Management
    const addFaq = () => {
        const newFaq = { question: 'New Question', answer: 'Answer...' };
        setLocalData(prev => ({ ...prev, faq: [...prev.faq, newFaq] }));
        setEditingFaq({ ...newFaq, _index: localData.faq.length });
        setIsFaqDialogOpen(true);
    };

    const updateFaq = (faqIndex, field, value) => {
        setLocalData(prev => ({
            ...prev,
            faq: prev.faq.map((f, i) => i === faqIndex ? { ...f, [field]: value } : f)
        }));
        if (editingFaq && editingFaq._index === faqIndex) {
            setEditingFaq(prev => ({ ...prev, [field]: value }));
        }
    };

    const deleteFaq = (faq) => {
        const faqIndex = localData.faq.indexOf(faq);
        setLocalData(prev => ({ ...prev, faq: prev.faq.filter((_, i) => i !== faqIndex) }));
        toast.success('FAQ deleted');
    };

    const planColumns = [
        { key: 'name', header: 'Plan Name', className: 'font-medium' },
        {
            key: 'price',
            header: 'Price',
            render: (plan) => <span>{localData.currency}{plan.price}/{plan.period}</span>
        },
        {
            key: 'popular',
            header: 'Popular',
            render: (plan) => plan.popular ? <span className="text-accent">✓</span> : '-'
        }
    ];

    const faqColumns = [
        { key: 'question', header: 'Question', className: 'font-medium' },
        {
            key: 'answer',
            header: 'Answer',
            render: (faq) => <span className="text-sm text-muted-foreground line-clamp-1">{faq.answer}</span>
        }
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Pricing</h1>
                    <p className="text-muted-foreground">Configure pricing plans and FAQs</p>
                </div>
                <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pricing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label>Page Title</Label>
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
                            <Label>Currency Symbol</Label>
                            <Input
                                value={localData.currency}
                                onChange={(e) => setLocalData(prev => ({ ...prev, currency: e.target.value }))}
                                className="max-w-[100px]"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Disclaimer</Label>
                        <Textarea
                            value={localData.disclaimer}
                            onChange={(e) => setLocalData(prev => ({ ...prev, disclaimer: e.target.value }))}
                            rows={3}
                        />
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
                    {localData.categories.map((cat) => (
                        <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                            {cat.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {localData.categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Name</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    value={category.name}
                                    onChange={(e) => setLocalData(prev => ({
                                        ...prev,
                                        categories: prev.categories.map(c =>
                                            c.id === category.id ? { ...c, name: e.target.value } : c
                                        )
                                    }))}
                                />
                            </CardContent>
                        </Card>

                        <AdminDataTable
                            title={`${category.name} Plans`}
                            description={`Manage pricing plans for ${category.name}`}
                            data={category.plans}
                            columns={planColumns}
                            getItemId={(_, index) => index}
                            onAdd={addPlan}
                            addButtonText="Add Plan"
                            onEdit={(plan) => {
                                const index = category.plans.indexOf(plan);
                                setEditingPlan({ ...plan, _index: index });
                                setIsDialogOpen(true);
                            }}
                            onDelete={deletePlan}
                            emptyMessage="No plans in this category."
                        />
                    </TabsContent>
                ))}
            </Tabs>

            {/* FAQ Section */}
            <AdminDataTable
                title="Frequently Asked Questions"
                description="Manage pricing FAQs"
                data={localData.faq}
                columns={faqColumns}
                getItemId={(_, index) => index}
                onAdd={addFaq}
                addButtonText="Add FAQ"
                onEdit={(faq) => {
                    const index = localData.faq.indexOf(faq);
                    setEditingFaq({ ...faq, _index: index });
                    setIsFaqDialogOpen(true);
                }}
                onDelete={deleteFaq}
                emptyMessage="No FAQs found."
            />

            {/* Plan Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingPlan(null); }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Pricing Plan</DialogTitle>
                    </DialogHeader>
                    {editingPlan && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Plan Name</Label>
                                    <Input
                                        value={editingPlan.name}
                                        onChange={(e) => updatePlan(editingPlan._index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Price</Label>
                                    <Input
                                        value={editingPlan.price}
                                        onChange={(e) => updatePlan(editingPlan._index, 'price', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Period</Label>
                                    <Input
                                        value={editingPlan.period}
                                        onChange={(e) => updatePlan(editingPlan._index, 'period', e.target.value)}
                                        placeholder="month, year, one-time"
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-7">
                                    <Switch
                                        checked={editingPlan.popular || false}
                                        onCheckedChange={(checked) => updatePlan(editingPlan._index, 'popular', checked)}
                                    />
                                    <Label>Mark as Popular</Label>
                                </div>
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea
                                    value={editingPlan.description}
                                    onChange={(e) => updatePlan(editingPlan._index, 'description', e.target.value)}
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Features</h4>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addFeature(editingPlan._index)}
                                    >
                                        <Plus className="w-4 h-4 mr-1" />Add Feature
                                    </Button>
                                </div>
                                {editingPlan.features?.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(editingPlan._index, index, e.target.value)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFeature(editingPlan._index, index)}
                                            className="text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* FAQ Edit Dialog */}
            <Dialog open={isFaqDialogOpen} onOpenChange={(open) => { setIsFaqDialogOpen(open); if (!open) setEditingFaq(null); }}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit FAQ</DialogTitle>
                    </DialogHeader>
                    {editingFaq && (
                        <div className="space-y-4">
                            <div>
                                <Label>Question</Label>
                                <Input
                                    value={editingFaq.question}
                                    onChange={(e) => updateFaq(editingFaq._index, 'question', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Answer</Label>
                                <Textarea
                                    value={editingFaq.answer}
                                    onChange={(e) => updateFaq(editingFaq._index, 'answer', e.target.value)}
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
