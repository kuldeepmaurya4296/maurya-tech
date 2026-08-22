'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  Mail,
  Briefcase,
  FolderGit2,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSummary = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/analytics/summary');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading Maurya Admin Insights...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalViews: 0,
    totalApplications: 0,
    totalInquiries: 0,
    totalJobs: 0,
    totalProjects: 0,
  };

  const statCards = [
    {
      title: 'Total Visits / Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      subtext: 'Across all pages',
    },
    {
      title: 'Job Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      subtext: 'Received candidate profiles',
      link: '/admin/applications',
    },
    {
      title: 'Contact Inquiries',
      value: stats.totalInquiries,
      icon: Mail,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      subtext: 'Project & partnership leads',
      link: '/admin/inquiries',
    },
    {
      title: 'Active Job Postings',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      subtext: 'Open positions on /careers',
      link: '/admin/jobs',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-white">
            Executive Overview
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time analytics, recruitment pipeline, and CMS status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSummary}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-2 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/jobs"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-2xl bg-slate-900/80 border ${card.border} backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">{card.title}</p>
                  <p className="text-3xl font-bold text-white mt-2 font-heading">
                    {card.value}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">{card.subtext}</p>
                </div>
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              {card.link && (
                <Link
                  href={card.link}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300"
                >
                  <span>Manage</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Graph & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h2 className="font-heading font-semibold text-base text-white">
                Website Visitor Trend (7 Days)
              </h2>
            </div>
            <span className="text-xs text-slate-500">Live Traffic Logs</span>
          </div>

          <div className="h-64 w-full">
            {data?.timeline && data.timeline.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.timeline}>
                  <defs>
                    <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#f8fafc',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#viewGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                No recent visit traffic recorded yet. Visits will chart dynamically as users browse!
              </div>
            )}
          </div>
        </div>

        {/* Top Pages Visited */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="font-heading font-semibold text-base text-white mb-4">
              Most Visited Pages
            </h2>
            <div className="space-y-3">
              {data?.topPages && data.topPages.length > 0 ? (
                data.topPages.map((page, idx) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800"
                  >
                    <span className="text-xs font-mono text-cyan-300 truncate max-w-[180px]">
                      {page.path}
                    </span>
                    <span className="text-xs font-bold text-slate-300 px-2 py-0.5 rounded-full bg-slate-800">
                      {page.count} views
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-4 text-center">
                  Pages will show here as users navigate.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <Link
              href="/admin/settings"
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 transition"
            >
              <span>Seed / Populate Database</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Applications & Recent Inquiries Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-base text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Recent Job Applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            {data?.recentApplications && data.recentApplications.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Applicant</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Resume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recentApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 font-medium text-slate-200">
                        <div>{app.name}</div>
                        <div className="text-[11px] text-slate-500">{app.email}</div>
                      </td>
                      <td className="py-3 text-slate-300">{app.jobTitle}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            app.status === 'Shortlisted'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : app.status === 'Rejected'
                              ? 'bg-rose-500/10 text-rose-400'
                              : 'bg-cyan-500/10 text-cyan-400'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                No job applications received yet.
              </p>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-base text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              Recent Inquiries & Leads
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            {data?.recentInquiries && data.recentInquiries.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Contact</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recentInquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 font-medium text-slate-200">
                        <div>{inq.name || inq.contactName || inq.fullName}</div>
                        <div className="text-[11px] text-slate-500">
                          {inq.email || inq.workEmail || inq.officialEmail}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {inq.type}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-500 text-[11px]">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                No inquiries received yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
