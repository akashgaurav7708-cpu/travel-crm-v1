'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2 } from 'lucide-react';
import { packagesService } from '@/lib/services';

function PackageForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_days: 1,
    base_price: 0,
    destinations: '',
  });

  useEffect(() => {
    if (id) {
      async function fetchPackage() {
        try {
          const data = await packagesService.getById(id as string);
          if (data) {
            setFormData({
              name: data.name || '',
              description: data.description || '',
              duration_days: data.duration_days || 1,
              base_price: data.base_price || 0,
              destinations: Array.isArray(data.destinations) ? data.destinations.join(', ') : '',
            });
          }
        } catch (error) {
          console.error('Failed to fetch package:', error);
        } finally {
          setFetching(false);
        }
      }
      fetchPackage();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        destinations: formData.destinations.split(',').map(d => d.trim()).filter(d => d),
      };
      if (isEditing) {
        await packagesService.update(id as string, payload);
      } else {
        await packagesService.create(payload as any);
      }
      router.push('/packages');
      router.refresh();
    } catch (error) {
      console.error('Failed to save package:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    setLoading(true);
    try {
      await packagesService.delete(id as string);
      router.push('/packages');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete package:', error);
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Edit Package' : 'Create New Package'}
          </h2>
          <p className="text-slate-500">Define tour itinerary and pricing.</p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Package Name *</label>
            <input
              required
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. European Wonders"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Tell us about the tour..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Duration (Days) *</label>
              <input
                required
                type="number"
                min="1"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.duration_days}
                onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Base Price *</label>
              <input
                required
                type="number"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Destinations (Comma separated)</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paris, London, Rome"
              value={formData.destinations}
              onChange={(e) => setFormData({ ...formData, destinations: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-slate-50 p-6 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditing ? 'Update Package' : 'Create Package'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewPackagePage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <PackageForm />
    </Suspense>
  );
}
