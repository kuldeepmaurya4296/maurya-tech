'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const JobApplicationForm = ({ jobTitle, jobId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        resume: '',
        coverLetter: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, jobTitle, jobId }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                toast.success('Application submitted successfully!');
            } else {
                toast.error(result.message || 'Failed to submit application.');
            }
        } catch (error) {
            toast.error('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="p-8 bg-card rounded-2xl border border-border text-center space-y-4"
            >
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold">Application Received!</h3>
                <p className="text-muted-foreground">
                    Thank you for applying for the {jobTitle} position. Our team will review your profile and get back to you soon.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="p-6 md:p-8 bg-card rounded-2xl border border-border shadow-sm"
        >
            <div className="mb-6">
                <h3 className="font-heading font-bold text-xl">Apply for this role</h3>
                <p className="text-sm text-muted-foreground mt-1">Submit your profile to join our team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                    <Input name="name" placeholder="Jane Doe" required value={formData.name} onChange={handleChange} />
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                    <Input type="email" name="email" placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                    <Input type="tel" name="phone" placeholder="+1 (555) 000-0000" required value={formData.phone} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn Profile <span className="text-destructive">*</span></label>
                    <Input type="url" name="linkedin" placeholder="https://linkedin.com/in/janedoe" required value={formData.linkedin} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Resume Link (Drive/Dropbox) <span className="text-destructive">*</span></label>
                    <Input type="url" name="resume" placeholder="https://drive.google.com/..." required value={formData.resume} onChange={handleChange} />
                    <p className="text-xs text-muted-foreground">Please ensure the link is publicly accessible.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Cover Letter / Note <span className="text-muted-foreground font-normal">(Optional)</span></label>
                    <Textarea name="coverLetter" placeholder="Why are you a great fit?" rows={4} value={formData.coverLetter} onChange={handleChange} />
                </div>

                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-4" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'} 
                    {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
            </form>
        </motion.div>
    );
};
