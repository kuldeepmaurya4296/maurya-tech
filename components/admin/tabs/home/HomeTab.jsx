"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AdminHeader, AdminSection, AdminField } from '@/components/admin/shared';

export const HomeTab = () => {
    const { homeData, setHomeData } = useData();
    const [localData, setLocalData] = useState(homeData);

    const handleSave = () => {
        setHomeData(localData);
        toast.success('Home page updated successfully!');
    };

    const updateHero = (field, value) => {
        setLocalData(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const updateStat = (index, field, value) => {
        setLocalData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                stats: prev.hero.stats.map((stat, i) =>
                    i === index ? { ...stat, [field]: value } : stat
                )
            }
        }));
    };

    const addStat = () => {
        setLocalData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                stats: [...prev.hero.stats, { value: '0+', label: 'New Stat' }]
            }
        }));
    };

    const removeStat = (index) => {
        setLocalData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                stats: prev.hero.stats.filter((_, i) => i !== index)
            }
        }));
    };

    const updateProblem = (index, value) => {
        setLocalData(prev => ({
            ...prev,
            problem: {
                ...prev.problem,
                problems: prev.problem.problems.map((p, i) =>
                    i === index ? { ...p, text: value } : p
                )
            }
        }));
    };

    const updateReason = (index, field, value) => {
        setLocalData(prev => ({
            ...prev,
            whyChooseUs: {
                ...prev.whyChooseUs,
                reasons: prev.whyChooseUs.reasons.map((r, i) =>
                    i === index ? { ...r, [field]: value } : r
                )
            }
        }));
    };

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Edit Home Page"
                description="Update your homepage content"
                onSave={handleSave}
                onPreview={() => window.open('/', '_blank')}
            />

            <Tabs defaultValue="hero" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="problem">Guarantee</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="why">Why Us</TabsTrigger>
                    <TabsTrigger value="cta">CTA</TabsTrigger>
                </TabsList>

                <TabsContent value="hero">
                    <AdminSection title="Hero Section">
                        <AdminField
                            label="Subheadline"
                            value={localData.hero.subheadline}
                            onChange={(e) => updateHero('subheadline', e.target.value)}
                        />
                        <AdminField
                            label="Headline"
                            value={localData.hero.headline}
                            onChange={(e) => updateHero('headline', e.target.value)}
                        />
                        <AdminField
                            label="Description"
                            type="textarea"
                            value={localData.hero.description}
                            onChange={(e) => updateHero('description', e.target.value)}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                            <AdminField
                                label="Primary CTA Text"
                                value={localData.hero.ctaPrimary.text}
                                onChange={(e) => setLocalData(prev => ({
                                    ...prev,
                                    hero: { ...prev.hero, ctaPrimary: { ...prev.hero.ctaPrimary, text: e.target.value } }
                                }))}
                            />
                            <AdminField
                                label="Secondary CTA Text"
                                value={localData.hero.ctaSecondary.text}
                                onChange={(e) => setLocalData(prev => ({
                                    ...prev,
                                    hero: { ...prev.hero, ctaSecondary: { ...prev.hero.ctaSecondary, text: e.target.value } }
                                }))}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2 mt-4">
                                <h4 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Stats</h4>
                                <Button variant="outline" size="sm" onClick={addStat}>
                                    <Plus className="w-4 h-4 mr-1" /> Add Stat
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {localData.hero.stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-2 items-start"
                                    >
                                        <AdminField
                                            placeholder="Value"
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            className="w-24"
                                        />
                                        <AdminField
                                            placeholder="Label"
                                            value={stat.label}
                                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeStat(index)}>
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </AdminSection>
                </TabsContent>

                <TabsContent value="problem">
                    <AdminSection title="Guarantee Section">
                        <AdminField
                            label="Title"
                            value={localData.problem.title}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                problem: { ...prev.problem, title: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Subtitle"
                            value={localData.problem.subtitle}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                problem: { ...prev.problem, subtitle: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Value Statement"
                            value={localData.problem.solution}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                problem: { ...prev.problem, solution: e.target.value }
                            }))}
                        />
                        <div>
                            <h4 className="text-sm font-medium mb-2">Guarantees List</h4>
                            <div className="space-y-2">
                                {localData.problem.problems.map((problem, index) => (
                                    <AdminField
                                        key={index}
                                        value={problem.text}
                                        onChange={(e) => updateProblem(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    </AdminSection>
                </TabsContent>

                <TabsContent value="engagement">
                    <AdminSection title="Engagement Model">
                        <AdminField
                            label="Title"
                            value={localData.engagementModel.title}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                engagementModel: { ...prev.engagementModel, title: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Subtitle"
                            value={localData.engagementModel.subtitle}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                engagementModel: { ...prev.engagementModel, subtitle: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Description"
                            type="textarea"
                            value={localData.engagementModel.description}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                engagementModel: { ...prev.engagementModel, description: e.target.value }
                            }))}
                        />
                        <div>
                            <h4 className="text-sm font-medium mb-2">Steps</h4>
                            <div className="space-y-4">
                                {localData.engagementModel.steps.map((step, index) => (
                                    <div key={index} className="p-4 border rounded-lg space-y-2">
                                        <div className="flex gap-2">
                                            <AdminField
                                                value={step.number}
                                                onChange={(e) => setLocalData(prev => ({
                                                    ...prev,
                                                    engagementModel: {
                                                        ...prev.engagementModel,
                                                        steps: prev.engagementModel.steps.map((s, i) =>
                                                            i === index ? { ...s, number: e.target.value } : s
                                                        )
                                                    }
                                                }))}
                                                className="w-20"
                                                placeholder="01"
                                            />
                                            <AdminField
                                                value={step.title}
                                                onChange={(e) => setLocalData(prev => ({
                                                    ...prev,
                                                    engagementModel: {
                                                        ...prev.engagementModel,
                                                        steps: prev.engagementModel.steps.map((s, i) =>
                                                            i === index ? { ...s, title: e.target.value } : s
                                                        )
                                                    }
                                                }))}
                                                className="flex-1"
                                                placeholder="Title"
                                            />
                                        </div>
                                        <AdminField
                                            value={step.description}
                                            onChange={(e) => setLocalData(prev => ({
                                                ...prev,
                                                engagementModel: {
                                                    ...prev.engagementModel,
                                                    steps: prev.engagementModel.steps.map((s, i) =>
                                                        i === index ? { ...s, description: e.target.value } : s
                                                    )
                                                }
                                            }))}
                                            placeholder="Description"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AdminSection>
                </TabsContent>

                <TabsContent value="why">
                    <AdminSection title="Why Choose Us">
                        <AdminField
                            label="Title"
                            value={localData.whyChooseUs.title}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                whyChooseUs: { ...prev.whyChooseUs, title: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Subtitle"
                            value={localData.whyChooseUs.subtitle}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                whyChooseUs: { ...prev.whyChooseUs, subtitle: e.target.value }
                            }))}
                        />
                        <div>
                            <h4 className="text-sm font-medium mb-2">Reasons</h4>
                            <div className="space-y-4">
                                {localData.whyChooseUs.reasons.map((reason, index) => (
                                    <div key={index} className="p-4 border rounded-lg space-y-2">
                                        <AdminField
                                            value={reason.title}
                                            onChange={(e) => updateReason(index, 'title', e.target.value)}
                                            placeholder="Title"
                                        />
                                        <AdminField
                                            type="textarea"
                                            value={reason.description}
                                            onChange={(e) => updateReason(index, 'description', e.target.value)}
                                            placeholder="Description"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AdminSection>
                </TabsContent>

                <TabsContent value="cta">
                    <AdminSection title="Call to Action">
                        <AdminField
                            label="Title"
                            value={localData.cta.title}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                cta: { ...prev.cta, title: e.target.value }
                            }))}
                        />
                        <AdminField
                            label="Description"
                            type="textarea"
                            value={localData.cta.description}
                            onChange={(e) => setLocalData(prev => ({
                                ...prev,
                                cta: { ...prev.cta, description: e.target.value }
                            }))}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                            <AdminField
                                label="Button Text"
                                value={localData.cta.buttonText}
                                onChange={(e) => setLocalData(prev => ({
                                    ...prev,
                                    cta: { ...prev.cta, buttonText: e.target.value }
                                }))}
                            />
                            <AdminField
                                label="Button Link"
                                value={localData.cta.buttonLink}
                                onChange={(e) => setLocalData(prev => ({
                                    ...prev,
                                    cta: { ...prev.cta, buttonLink: e.target.value }
                                }))}
                            />
                        </div>
                    </AdminSection>
                </TabsContent>
            </Tabs>
        </div>
    );
};
