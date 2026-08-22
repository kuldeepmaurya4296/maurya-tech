'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { CTASection } from '@/components/sections';
import { useData } from '@/contexts/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  ArrowDown,
  Search,
  Filter,
  X,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Code2,
  Building2,
  CheckCircle2,
  XCircle,
  Users,
  Compass,
  Star,
} from 'lucide-react';

export const CareersPage = ({ jobsData: serverJobsData }) => {
  const { jobsData: contextJobsData } = useData();
  const jobsData = serverJobsData || contextJobsData;
  const { hero, culture, jobs, benefits } = jobsData;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const activeJobs = jobs.filter((job) => job.isActive);

  // Departments list
  const departments = [
    'All',
    ...Array.from(new Set(activeJobs.map((j) => j.department).filter(Boolean))),
  ];

  // Filtered jobs
  const filteredJobs = activeJobs.filter((job) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      (job.skills && job.skills.some((s) => s.toLowerCase().includes(query)));

    const matchesDept =
      selectedDepartment === 'All' || job.department === selectedDepartment;

    const matchesType =
      selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesDept && matchesType;
  });

  const scrollToOpenings = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setFilterSkill = (skill) => {
    setSearchQuery(skill);
    scrollToOpenings();
  };

  return (
    <Layout page="careers">
      {/* 1. HERO SECTION: Ultra-Modern Glow & Bento Hero */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden bg-slate-950 text-slate-100">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Live Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-cyan-500/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>We Are Actively Hiring &bull; {activeJobs.length} Open Roles</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6 leading-[1.15]"
            >
              Architect Next-Gen Systems.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                Accelerate Your Career.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Join an engineering-first squad building mission-critical SaaS, cloud infrastructure, and mobile applications. All roles follow a high-impact{' '}
              <strong className="text-slate-200 font-semibold">Hybrid Model</strong> with 3 months intensive in-office mentorship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                onClick={scrollToOpenings}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-6 rounded-2xl shadow-xl shadow-cyan-500/25 transition hover:scale-[1.02] cursor-pointer w-full sm:w-auto text-sm"
              >
                <span>Explore Open Positions</span>
                <ArrowDown className="w-4 h-4 ml-2 animate-bounce" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToOpenings}
                className="border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-6 rounded-2xl backdrop-blur-md transition hover:scale-[1.02] cursor-pointer w-full sm:w-auto text-sm"
              >
                <Search className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Search by Tech Stack</span>
              </Button>
            </motion.div>

            {/* Smart Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto p-2 sm:p-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search roles e.g. Flutter, Next.js, DevOps, Cyber Security, QA..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button
                  onClick={scrollToOpenings}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer shrink-0"
                >
                  Find Openings
                </Button>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex items-center gap-2 pt-2 px-2 overflow-x-auto text-[11px] text-slate-400 scrollbar-none">
                <span className="text-slate-500 font-medium shrink-0">Popular:</span>
                {['Flutter', 'Next.js 15', 'DevOps', 'Cyber Security', 'QA Automation'].map(
                  (skill) => (
                    <button
                      key={skill}
                      onClick={() => setFilterSkill(skill)}
                      className="px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-700/60 transition cursor-pointer whitespace-nowrap"
                    >
                      {skill}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Quick Stats Strip */}
        <div className="container-custom mt-16 pt-8 border-t border-slate-800/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="text-xl md:text-2xl font-bold font-heading text-cyan-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">1-on-1 In-Office Mentorship</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="text-xl md:text-2xl font-bold font-heading text-emerald-400">Hybrid</div>
              <div className="text-xs text-slate-400 mt-0.5">3-Month In-Office Foundation</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="text-xl md:text-2xl font-bold font-heading text-blue-400">PPO Track</div>
              <div className="text-xs text-slate-400 mt-0.5">Performance-Based Full-Time</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/40">
              <div className="text-xl md:text-2xl font-bold font-heading text-purple-400">Zero</div>
              <div className="text-xs text-slate-400 mt-0.5">Micromanagement Policy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CULTURE & ENGINEERING DNA BENTO GRID */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Engineering Culture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
              How We Build & Collaborate
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              We reject corporate bureaucracy and toxic politics in favor of autonomous craft, speed, and real-world impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* What We Value */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-6 border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Our Core Principles</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-6">
                  What We Value & Reward
                </h3>

                <div className="space-y-4">
                  {culture.values.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 border border-cyan-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{val.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Prioritizing long-term architectural stability and product usability.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-cyan-400 font-medium">
                &rarr; High autonomy with clear, objective accountability.
              </div>
            </motion.div>

            {/* What We Reject */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-900/80 border border-rose-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-6 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Strict Anti-Patterns</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-6">
                  What We Actively Reject
                </h3>

                <div className="space-y-4">
                  {culture.antiValues.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 border border-rose-500/20">
                        <X className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{val.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Eliminating blockers so you can focus 100% on deep engineering work.
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-rose-400 font-medium">
                &rarr; Zero tolerance for office politics and unproductive meetings.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS SECTION: Modern Cards with Interactive Filters */}
      <section id="open-positions" className="py-20 md:py-28 scroll-mt-16 bg-slate-950">
        <div className="container-custom max-w-6xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Current Opportunities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-1">
                Explore Open Positions
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Showing {filteredJobs.length} active opportunities across Mobile, Full-Stack, DevOps, Security & QA.
              </p>
            </div>

            {/* Quick Count Badge */}
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 w-fit">
              🔥 <span className="text-cyan-400 font-bold">{filteredJobs.length}</span> positions available
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mb-10 space-y-4">
            {/* Search Input inside filter bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by role title or tech stack (e.g. Flutter, Next.js, Docker, Cypress, Penetration Testing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department and Type Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
              {/* Department Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-none">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      selectedDepartment === dept
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Type Toggle */}
              <div className="flex items-center gap-1.5 shrink-0">
                {['All', 'Internship', 'Full-time'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      selectedType === type
                        ? 'bg-white text-slate-950 shadow-md'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filter Prompt */}
            {(searchQuery || selectedDepartment !== 'All' || selectedType !== 'All') && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>
                  Filters active &bull; Filtered down to <strong>{filteredJobs.length}</strong> roles
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                    setSelectedType('All');
                  }}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-5">
            {filteredJobs.length === 0 ? (
              <div className="p-16 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4">
                <Search className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-xl font-bold font-heading text-white">
                  No Openings Matched Your Filters
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Try adjusting your search query or selecting a different department category.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('All');
                    setSelectedType('All');
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs mt-2"
                >
                  Show All {activeJobs.length} Positions
                </Button>
              </div>
            ) : (
              filteredJobs.map((job, idx) => (
                <motion.div
                  key={job.id || job.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="p-6 md:p-8 rounded-3xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl group"
                >
                  {/* Top Row: Department Badge + Type + Experience */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {job.department}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50">
                        {job.experience} Exp
                      </span>
                    </div>

                    {/* Salary / Stipend Badge */}
                    {job.salary && (
                      <div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        💰 {job.salary}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors mb-3">
                    {job.title}
                  </h3>

                  {/* Meta Strip: Location */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {job.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-400 mb-5 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills Chips */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-1">
                      {job.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 group-hover:border-cyan-500/20 transition"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Fast-track review within 48 hours
                    </span>

                    <Link href={`/careers/${job.id || job.slug}`}>
                      <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/15 group-hover:scale-105 transition cursor-pointer">
                        <span>View Details & Apply</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. PERKS & BENEFITS GRID */}
      <section className="py-20 bg-slate-900/50 border-t border-slate-800/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Comprehensive Perks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-1">
              Why Join Maurya Technologies?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              We design our compensation and workplace environment to foster deep technical craftsmanship and continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Hybrid Work Culture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                3 months intensive in-office onboarding & mentorship, followed by flexible hybrid scheduling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Performance-Based PPO</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct full-time conversion opportunities for top-performing interns based on merit and evaluation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/30 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Modern Tech Stack</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Work hands-on with Next.js 15, Flutter, TypeScript, Docker, Kubernetes, AWS, and AI systems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-white">Market Compensation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Competitive stipends and salary packages as per industry standards with performance bonuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <CTASection
        title="Don't See Your Exact Role?"
        description="We are constantly scouting for exceptional full-stack engineers, cloud architects, and security researchers. Drop your profile and let's talk."
        buttonText="Send Open Application"
        buttonLink="/contact"
      />
    </Layout>
  );
};
