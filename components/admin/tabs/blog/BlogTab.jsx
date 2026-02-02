"use client";
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Star } from 'lucide-react';

export const BlogTab = () => {
    const { blogData, setBlogData } = useData();
    const [localData, setLocalData] = useState(blogData);
    const [editingPost, setEditingPost] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = () => {
        setBlogData(localData);
        toast.success('Blog posts updated successfully!');
    };

    const createNewPost = () => {
        const newPost = {
            id: Date.now().toString(),
            slug: `new-post-${Date.now()}`,
            title: 'New Blog Post',
            excerpt: 'A brief description of this blog post.',
            content: '# New Blog Post\n\nStart writing your content here...',
            author: 'Maurya Technologies',
            date: new Date().toISOString().split('T')[0],
            readTime: '5 min read',
            category: localData.categories[1] || 'General',
            tags: ['New'],
            featured: false,
        };
        setLocalData(prev => ({ ...prev, posts: [newPost, ...prev.posts] }));
        setEditingPost(newPost);
        setIsDialogOpen(true);
    };

    const updatePost = (id, field, value) => {
        setLocalData(prev => ({
            ...prev,
            posts: prev.posts.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
        if (editingPost && editingPost.id === id) {
            setEditingPost(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const deletePost = (post) => {
        setLocalData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== post.id) }));
        toast.success('Post deleted');
    };

    const columns = [
        {
            key: 'title',
            header: 'Title',
            render: (post) => (
                <div className="flex items-center gap-2">
                    <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'category',
            header: 'Category',
            className: 'w-[150px]',
            render: (post) => <Badge variant="secondary">{post.category}</Badge>
        },
        {
            key: 'author',
            header: 'Author',
            className: 'w-[150px]',
        },
        {
            key: 'date',
            header: 'Date',
            className: 'w-[120px]',
        },
        {
            key: 'readTime',
            header: 'Read Time',
            className: 'w-[100px]',
        },
        {
            key: 'featured',
            header: 'Featured',
            className: 'w-[100px]',
            render: (post) => (
                post.featured ? (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                )
            )
        },
    ];

    if (!localData) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl">Manage Blog</h1>
                    <p className="text-muted-foreground">{localData.posts.length} posts total</p>
                </div>
            </div>

            {/* Hero Section Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Blog Hero Section</CardTitle>
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
                title="Blog Posts"
                description="Manage your blog content"
                data={localData.posts}
                columns={columns}
                getItemId={(p) => p.id}
                onAdd={createNewPost}
                addButtonText="New Post"
                onEdit={(post) => { setEditingPost(post); setIsDialogOpen(true); }}
                onDelete={deletePost}
                onView={(post) => window.open(`/blog/${post.slug}`, '_blank')}
                onSave={handleSave}
                onPreview={() => window.open('/blog', '_blank')}
                emptyMessage="No posts yet. Create your first blog post."
            />

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingPost(null); }}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingPost?.id.length === 13 ? 'New Post' : 'Edit Post'}</DialogTitle>
                    </DialogHeader>
                    {editingPost && (
                        <div className="space-y-4 py-4">
                            <div>
                                <Label>Title</Label>
                                <Input value={editingPost.title} onChange={(e) => updatePost(editingPost.id, 'title', e.target.value)} />
                            </div>
                            <div>
                                <Label>Slug</Label>
                                <Input value={editingPost.slug} onChange={(e) => updatePost(editingPost.id, 'slug', e.target.value)} />
                            </div>
                            <div>
                                <Label>Excerpt</Label>
                                <Textarea value={editingPost.excerpt} onChange={(e) => updatePost(editingPost.id, 'excerpt', e.target.value)} rows={2} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Category</Label>
                                    <Select value={editingPost.category} onValueChange={(value) => updatePost(editingPost.id, 'category', value)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {localData.categories.filter(c => c !== 'All').map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Read Time</Label>
                                    <Input value={editingPost.readTime} onChange={(e) => updatePost(editingPost.id, 'readTime', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Author</Label>
                                    <Input value={editingPost.author} onChange={(e) => updatePost(editingPost.id, 'author', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Date</Label>
                                    <Input type="date" value={editingPost.date} onChange={(e) => updatePost(editingPost.id, 'date', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label>Tags (comma-separated)</Label>
                                <Input value={editingPost.tags.join(', ')} onChange={(e) => updatePost(editingPost.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
                            </div>
                            <div>
                                <Label>Content (Markdown)</Label>
                                <Textarea value={editingPost.content} onChange={(e) => updatePost(editingPost.id, 'content', e.target.value)} rows={15} className="font-mono text-sm" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch checked={editingPost.featured} onCheckedChange={(checked) => updatePost(editingPost.id, 'featured', checked)} />
                                <Label>Featured Post</Label>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
