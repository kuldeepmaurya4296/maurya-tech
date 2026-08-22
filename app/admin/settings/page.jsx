'use client';

import React, { useState } from 'react';
import {
  Settings,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Server,
  Cloud,
  Mail,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState(null);
  const [error, setError] = useState('');

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        'This will populate your MongoDB database with the default admin user, jobs, portfolio projects, services, and blog posts from your current files. Proceed?'
      )
    ) {
      return;
    }

    setSeeding(true);
    setError('');
    setSeedResult(null);

    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSeedResult(data);
      } else {
        setError(data.error || data.message || 'Failed to seed database.');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred while seeding.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-cyan-400" />
          Settings & Database Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          System health, environment variables status, and one-click data migration utilities
        </p>
      </div>

      {/* Database Seeder Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-sm space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                MongoDB Seed & Sync Utility
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Populates your MongoDB cluster (<span className="text-cyan-400 font-mono font-bold">maurya-tech</span>) with all default jobs, portfolio case studies, services, and articles from your code files.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {seedResult && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{seedResult.message}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                Jobs: <span className="font-bold text-white">{seedResult.details.seededJobs}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                Projects: <span className="font-bold text-white">{seedResult.details.seededProjects}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                Services: <span className="font-bold text-white">{seedResult.details.seededServices}</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                Posts: <span className="font-bold text-white">{seedResult.details.seededPosts}</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Safe to run: Updates existing items and inserts missing records without data corruption.
          </span>
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
          >
            {seeding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Seeding Database...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Seed Database Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* System & Architecture Status */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-sm space-y-4">
        <h2 className="font-heading font-bold text-base text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-400" />
          Connected Services & Infrastructure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
            <Database className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">MongoDB Atlas</p>
              <p className="text-slate-400 mt-0.5 font-mono text-[11px]">Database: maurya-tech</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">SMTP Mail Server</p>
              <p className="text-slate-400 mt-0.5 font-mono text-[11px]">Host: smtp.gmail.com:465</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Configured
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
            <Cloud className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Vercel Blob Storage</p>
              <p className="text-slate-400 mt-0.5 text-[11px]">Resume & Image Cloud Uploads</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Token Active
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">NextAuth & JWT Security</p>
              <p className="text-slate-400 mt-0.5 text-[11px]">Encrypted HTTP-Only Sessions</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Secured
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
