'use client';

import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  PlusCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  Loader2,
  MapPin,
  Clock,
  DollarSign,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);

  // Confirmation dialog state
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    job: null,
    loading: false,
  });

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    department: 'Mobile Engineering',
    location: 'Remote (India)',
    type: 'Full-time',
    experience: '2+ years',
    salary: '',
    skills: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    isActive: true,
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/jobs?all=true');
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      toast.error('Failed to load jobs list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Mobile Engineering',
      location: 'Remote (India)',
      type: 'Full-time',
      experience: '2+ years',
      salary: '',
      skills: '',
      description: '',
      responsibilities: '',
      requirements: '',
      benefits: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || 'Mobile Engineering',
      location: job.location || 'Remote (India)',
      type: job.type || 'Full-time',
      experience: job.experience || '2+ years',
      salary: job.salary || '',
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '',
      description: job.description || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      benefits: Array.isArray(job.benefits) ? job.benefits.join('\n') : '',
      isActive: job.isActive !== undefined ? job.isActive : true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      skills: formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: formData.responsibilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: formData.requirements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: formData.benefits
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = editingJob ? `/api/jobs/${editingJob.id || editingJob._id}` : '/api/jobs';
      const method = editingJob ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        toast.success(editingJob ? 'Job updated successfully!' : 'Job posted successfully!');
        fetchJobs();
      } else {
        toast.error(json.message || 'Failed to save job');
      }
    } catch (err) {
      toast.error('Network error occurred while saving job');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (job) => {
    try {
      const newStatus = !job.isActive;
      const res = await fetch(`/api/jobs/${job.id || job._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) =>
            j._id === job._id || j.id === job.id ? { ...j, isActive: newStatus } : j
          )
        );
        toast.success(
          newStatus ? `"${job.title}" is now Active` : `"${job.title}" is now Inactive`
        );
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const promptDelete = (job) => {
    setDeleteConfirm({
      isOpen: true,
      job,
      loading: false,
    });
  };

  const executeDelete = async () => {
    const job = deleteConfirm.job;
    if (!job) return;

    setDeleteConfirm((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(`/api/jobs/${job.id || job._id}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j._id !== job._id && j.id !== job.id));
        toast.success(`Job "${job.title}" deleted successfully.`);
        setDeleteConfirm({ isOpen: false, job: null, loading: false });
      } else {
        toast.error('Failed to delete job posting.');
      }
    } catch (err) {
      toast.error('Error connecting to server.');
    } finally {
      setDeleteConfirm((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-cyan-400" />
            Careers CMS & Job Openings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, edit, toggle active status, and manage open positions on the website
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition shadow-lg shadow-cyan-500/20 cursor-pointer w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Job Posting</span>
        </button>
      </div>

      {/* Job Listings Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-2 text-sm">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            Loading job postings...
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No job postings found. Click &quot;Create New Job Posting&quot; to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold">
                  <th className="p-4">Position Title & Details</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Type & Exp</th>
                  <th className="p-4">Tech Stack / Skills</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {jobs.map((job) => (
                  <tr key={job._id || job.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-semibold text-slate-100 text-sm">{job.title}</div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location || 'Remote'}
                        </span>
                        {job.salary && (
                          <>
                            <span>&bull;</span>
                            <span className="text-emerald-400 font-medium">{job.salary}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300">
                        {job.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200 font-medium">{job.type}</div>
                      <div className="text-slate-500 text-[11px]">{job.experience}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      {job.skills && job.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-600 italic text-[11px]">No skills listed</span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition cursor-pointer ${
                          job.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                      >
                        {job.isActive ? (
                          <>
                            <Check className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/careers/${job.id || job._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                          title="View Live Listing"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => promptDelete(job)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 cursor-pointer transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Job Posting?"
        description={`Are you sure you want to permanently delete "${deleteConfirm.job?.title}"? Candidates will no longer be able to view or apply for this position.`}
        confirmText="Delete Posting"
        loading={deleteConfirm.loading}
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, job: null, loading: false })}
      />

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <span>{editingJob ? 'Edit Job Opening' : 'Create New Job Opening'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Full Stack Mobile Application Developer"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Security & Compliance">Security & Compliance</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Product & Operations">Product & Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Remote (India)"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Employment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="0 - 1 Year / 2+ years"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Salary / Stipend Range
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹20,000/mo Stipend or ₹8-12 LPA"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Skills / Tech Stack (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="Flutter, Dart, Node.js, Express, MongoDB"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview and impact of the role..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Develop Flutter mobile app&#10;Architect Node.js REST APIs&#10;Write clean unit tests"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Qualifications & Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Strong knowledge of Flutter & Dart&#10;Experience with Node.js & MongoDB"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Perks & Benefits (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="100% remote flexibility&#10;Competitive stipend / salary&#10;Mentorship"
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="isActive" className="text-slate-300 font-medium cursor-pointer">
                  Publish to live Careers page immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingJob ? 'Save Changes' : 'Publish Job'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
