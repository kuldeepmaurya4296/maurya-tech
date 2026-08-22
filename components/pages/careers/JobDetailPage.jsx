'use client';

import React from 'react';
import { Layout } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowLeft,
  DollarSign,
  CheckCircle2,
  Cpu,
  Gift,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { JobApplicationForm } from './JobApplicationForm';
import ShareButtons from '@/components/ui/ShareButtons';

export const JobDetailPage = ({ job }) => {
  if (!job) return null;

  return (
    <Layout page={`careers-job-${job.id}`}>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden bg-slate-950 text-slate-100 border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/15 blur-3xl pointer-events-none -z-10" />

        <div className="container-custom relative z-10 max-w-6xl">
          <Link
            href="/careers"
            className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Openings
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {job.department}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {job.type}
              </span>
              {job.experience && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50">
                  {job.experience} Experience
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-4 leading-tight">
              {job.title}
            </h1>

            {/* Compensation Badge */}
            {job.salary && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-6">
                <span>💰 {job.salary}</span>
              </div>
            )}

            {/* Meta Strip & Share */}
            <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400 pt-5 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  {job.type}
                </span>
              </div>

              {/* Share Buttons */}
              <ShareButtons
                title={`Hiring: ${job.title} at Maurya Technologies`}
                description={`Apply for the ${job.title} position (${job.type}) at Maurya Technologies.`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content & Application Form */}
      <section className="py-16 md:py-24 bg-slate-950 text-slate-100">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Job Details */}
            <div className="lg:col-span-7 space-y-10">
              {/* Skills / Tech Stack Grid */}
              {job.skills && job.skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3.5"
                >
                  <div className="flex items-center gap-2 text-sm font-heading font-bold text-white">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Required Tech Stack & Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/30 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  About the Position & Work Model
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm">{job.description}</p>
              </motion.div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    Qualifications & Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4"
                >
                  <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-emerald-400" />
                    Perks, Benefits & PPO Path
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((ben, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right: Sticky Apply Form */}
            <div className="lg:col-span-5 sticky top-28">
              <JobApplicationForm jobTitle={job.title} jobId={job.id || job.customId} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
