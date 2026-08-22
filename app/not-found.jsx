'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Briefcase, Code, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
      {/* Background glow mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold mb-6"
        >
          404 &bull; PAGE NOT FOUND
        </motion.div>



        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-10 leading-relaxed"
        >
          The page or position you are looking for might have been moved, renamed, or temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <Link href="/">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-6 py-5 rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/careers">
            <Button
              variant="outline"
              className="border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs px-6 py-5 rounded-xl cursor-pointer"
            >
              <Briefcase className="w-4 h-4 mr-2 text-cyan-400" />
              Explore Openings
            </Button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link href="/services" className="hover:text-cyan-400 transition">
            Services
          </Link>
          <Link href="/projects" className="hover:text-cyan-400 transition">
            Case Studies
          </Link>
          <Link href="/blog" className="hover:text-cyan-400 transition">
            Engineering Blog
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
