'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log runtime client error
    console.error('Next.js Client Boundary Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-lg w-full text-center py-16 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
          Something went wrong
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
          An unexpected error occurred while loading this view. Our team has been notified and is looking into it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-6 py-5 rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs px-6 py-5 rounded-xl cursor-pointer"
            >
              <Home className="w-4 h-4 mr-2 text-cyan-400" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
