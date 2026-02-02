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
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export const ProductsTab = () => {
    const { productsData, setProductsData } = useData();
    const [localData, setLocalData] = useState(productsData);
    const [activeCategory, setActiveCategory] = useState(productsData.categories[0]?.id || '');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setProductsData(localData);
        toast.success('Products updated successfully!');
    };

    const currentCategory = localData.categories.find(c => c.id === activeCategory);

    const addProduct = () => {
        const newProduct = {
            id: `product_${Date.now()}`,
            title: 'New Product',
            description: 'Product description',
            features: ['Feature 1', 'Feature 2'],
            pricingType: 'Subscription'
        };

        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? { ...cat, products: [...cat.products, newProduct] }
                    : cat
            )
        }));
        setEditingProduct(newProduct);
        setIsDialogOpen(true);
    };

    const updateProduct = (productId, field, value) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        products: cat.products.map(p =>
                            p.id === productId ? { ...p, [field]: value } : p
                        )
                    }
                    : cat
            )
        }));
        if (editingProduct && editingProduct.id === productId) {
            setEditingProduct(prev => ({ ...prev, [field]: value }));
        }
    };

    const deleteProduct = (product) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? { ...cat, products: cat.products.filter(p => p.id !== product.id) }
                    : cat
            )
        }));
        toast.success('Product deleted');
    };

    const addFeature = (productId) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        products: cat.products.map(p =>
                            p.id === productId
                                ? { ...p, features: [...(p.features || []), 'New Feature'] }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingProduct && editingProduct.id === productId) {
            setEditingProduct(prev => ({
                ...prev,
                features: [...(prev.features || []), 'New Feature']
            }));
        }
    };

    const updateFeature = (productId, featureIndex, value) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        products: cat.products.map(p =>
                            p.id === productId
                                ? {
                                    ...p,
                                    features: p.features.map((f, i) => i === featureIndex ? value : f)
                                }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingProduct && editingProduct.id === productId) {
            setEditingProduct(prev => ({
                ...prev,
                features: prev.features.map((f, i) => i === featureIndex ? value : f)
            }));
        }
    };

    const removeFeature = (productId, featureIndex) => {
        setLocalData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === activeCategory
                    ? {
                        ...cat,
                        products: cat.products.map(p =>
                            p.id === productId
                                ? {
                                    ...p,
                                    features: p.features.filter((_, i) => i !== featureIndex)
                                }
                                : p
                        )
                    }
                    : cat
            )
        }));
        if (editingProduct && editingProduct.id === productId) {
            setEditingProduct(prev => ({
                ...prev,
                features: prev.features.filter((_, i) => i !== featureIndex)
            }));
        }
    };

    const columns = [
        { key: 'title', header: 'Product Name', className: 'font-medium' },
        { key: 'pricingType', header: 'Pricing Type' },
        {
            key: 'features',
            header: 'Features',
            render: (product) => <span className="text-sm">{product.features?.length || 0} features</span>
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Products</h1>
                    <p className="text-muted-foreground">Organize your product catalog by category</p>
                </div>
                <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Overview</CardTitle>
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
                </CardContent>
            </Card>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                    {localData.categories.map((cat) => (
                        <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                            {cat.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {localData.categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Category Title</Label>
                                    <Input
                                        value={category.title}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            categories: prev.categories.map(c =>
                                                c.id === category.id ? { ...c, title: e.target.value } : c
                                            )
                                        }))}
                                    />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Input
                                        value={category.description}
                                        onChange={(e) => setLocalData(prev => ({
                                            ...prev,
                                            categories: prev.categories.map(c =>
                                                c.id === category.id ? { ...c, description: e.target.value } : c
                                            )
                                        }))}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <AdminDataTable
                            title={`${category.title} Products`}
                            description={`Manage products in ${category.title} category`}
                            data={category.products}
                            columns={columns}
                            getItemId={(p) => p.id}
                            onAdd={addProduct}
                            addButtonText="Add Product"
                            onEdit={(product) => { setEditingProduct(product); setIsDialogOpen(true); }}
                            onDelete={deleteProduct}
                            emptyMessage="No products in this category."
                        />
                    </TabsContent>
                ))}
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingProduct(null); }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {editingProduct && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Product Name</Label>
                                    <Input
                                        value={editingProduct.title}
                                        onChange={(e) => updateProduct(editingProduct.id, 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Pricing Type</Label>
                                    <Input
                                        value={editingProduct.pricingType || ''}
                                        onChange={(e) => updateProduct(editingProduct.id, 'pricingType', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea
                                    value={editingProduct.description || ''}
                                    onChange={(e) => updateProduct(editingProduct.id, 'description', e.target.value)}
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Features</h4>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addFeature(editingProduct.id)}
                                    >
                                        <Plus className="w-4 h-4 mr-1" />Add Feature
                                    </Button>
                                </div>
                                {editingProduct.features?.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(editingProduct.id, index, e.target.value)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFeature(editingProduct.id, index)}
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
        </div>
    );
};
