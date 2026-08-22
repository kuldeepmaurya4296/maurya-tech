'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButtons({ title = '', url = '', description = '' }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return url || window.location.href;
    }
    return url;
  };

  const currentUrl = getShareUrl();

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${title} by @mauryatech`);
    const shareUrl = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${title}*\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Share:
      </span>

      {/* LinkedIn */}
      <button
        onClick={handleShareLinkedIn}
        className="p-2 rounded-xl bg-card hover:bg-accent/10 hover:text-accent border border-border text-muted-foreground text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Twitter / X */}
      <button
        onClick={handleShareTwitter}
        className="p-2 rounded-xl bg-card hover:bg-accent/10 hover:text-accent border border-border text-muted-foreground text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="Share on X / Twitter"
      >
        <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
        <span className="hidden sm:inline">X / Twitter</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleShareWhatsApp}
        className="p-2 rounded-xl bg-card hover:bg-accent/10 hover:text-accent border border-border text-muted-foreground text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-xl bg-card hover:bg-accent/10 hover:text-accent border border-border text-muted-foreground text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="Copy Page Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
