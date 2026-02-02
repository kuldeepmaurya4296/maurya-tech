"use client";
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Sparkles, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AdvertisementDialog = () => {
    const [open, setOpen] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        // Show dialog after 2 seconds
        const openTimer = setTimeout(() => {
            setOpen(true);
        }, 2000);

        return () => clearTimeout(openTimer);
    }, []);

    useEffect(() => {
        if (open) {
            // Auto close after 15 seconds (giving users enough time to read) or 5 seconds?
            // User asked for "after 5 second".
            const closeTimer = setTimeout(() => {
                setOpen(false);
            }, 5000);
            return () => clearTimeout(closeTimer);
        }
    }, [open]);

    const handleContact = () => {
        setOpen(false);
        navigate.push('/contact');
    };

    const handleShare = async () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareData = {
            title: 'Maurya Tech Exclusive Offers!',
            text: '🚀 Get up to 60% OFF on Software Services & 30% Partnership Share with Maurya Tech! Check it out:',
            url
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                toast.success("Offer link copied to clipboard!");
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md bg-gradient-to-br from-background to-accent/5 border-accent/20">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2 animate-pulse">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
                            Exclusive Offers!
                        </span>
                    </DialogTitle>
                    <DialogDescription asChild className="text-center text-lg mt-2 space-y-4">
                        <div className="text-center text-lg mt-2 space-y-4">
                            <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                                <p className="font-semibold text-foreground text-lg">Up to 60% OFF</p>
                                <p className="text-sm">on all Software & Web Services</p>
                            </div>

                            <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                                <p className="font-semibold text-foreground text-lg">Up to 30% Partnership</p>
                                <p className="text-sm">Share for Sales Partners</p>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-4">
                    <Button
                        size="lg"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                        onClick={handleContact}
                    >
                        Get Offer Now <ArrowRight className="w-4 h-4" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30"
                        asChild
                    >
                        <a href="https://wa.me/916263638053" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5" />
                            Chat on WhatsApp
                        </a>
                    </Button>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="w-full gap-2"
                        onClick={handleShare}
                    >
                        <Share2 className="w-4 h-4" />
                        Share with Friends
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AdvertisementDialog;




