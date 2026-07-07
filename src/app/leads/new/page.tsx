'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, Calendar, DollarSign, MapPin, User, Mail, Phone, Info } from 'lucide-react';
import { leadsService } from '@/lib/services/index';

function LeadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    destination: '',
    budget: 0,
    status: 'New',
    priority: 'Medium',
    source: 'Website',
    travel_date: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      async function fetchLead() {
        try {
          const data = await leadsService.getById(id as string);
          if (data) {
            setFormData({
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              email: data.email || '',
              phone: data.phone || '',
              destination: data.destination || '',
              budget: data.budget || 0,
              status: data.status || 'New',
              priority: data.priority || 'Medium',
              source: data.source || 'Website',
              travel_date: data.travel_date || '',
              notes: data.notes || '',
            });
          }
        } catch (error) {
          console.error('Failed to fetch lead:', error);
        } finally {
          setFetching(false);
        }
      }
      fetchLead();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await leadsService.update(id as string, formData as any);
      } else {
        await leadsService.create(formData as any);
      }
      router.push('/leads');
      router.refresh();
    } catch (error) {
      console.error('Failed to save lead:', error);
      alert('Error saving lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    setLoading(true);
    try {
      await leadsService.delete(id as string);
      router.push('/leads');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Edit Lead' : 'Create New Lead'}
          </h2>
          <p className="text-slate-500">
            {isEditing ? 'Update lead information and tracking status.' : 'Capture a new potential customer inquiry.'}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Primary Info */}
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                <User className="h-4 w-4" />
                Contact Information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">First Name *</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. John"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Last Name *</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Doe"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center">
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center">
                    <Phone className="h-3 w-3 mr-1" /> Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                <MapPin className="h-4 w-4" />
                Travel Requirements
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Destination *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Maldives, Europe, Japan"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" /> Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.travel_date}
                    onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" /> Estimated Budget (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Notes & Special Requests</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional details about the lead's requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Status & Priority */}
            <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                <Info className="h-4 w-4" />
                Lead Status
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Current Status</label>
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Interested">Interested</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Priority</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p as any })}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        formData.priority === p
                          ? p === 'High' ? 'bg-red-50 border-red-200 text-red-600' :
                            p === 'Medium' ? 'bg-orange-50 border-orange-200 text-orange-600' :
                            'bg-green-50 border-green-200 text-green-600'
                          : 'bg-white text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Lead Source</label>
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                >
                  <option value="Website">Website</option>
                  <option value="Google">Google Search</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral</option>
                  <option value="Walking">Walking</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-500 disabled:opacity-50 transition-all transform active:scale-95"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              {isEditing ? 'Update Lead' : 'Save Lead'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function NewLeadPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <LeadForm />
    </Suspense>
  );
}
