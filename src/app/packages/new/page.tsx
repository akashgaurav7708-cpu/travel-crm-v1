'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, Map, DollarSign, Clock, Info, CheckCircle2, Plus, Image as ImageIcon } from 'lucide-react';
import { packagesService } from '@/lib/services/index';

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
    duration_nights: 0,
    base_price: 0,
    destinations: [] as string[],
    inclusions: [] as string[],
    exclusions: [] as string[],
  });

  const [tempDest, setTempDest] = useState('');

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
              duration_nights: data.duration_nights || 0,
              base_price: data.base_price || 0,
              destinations: data.destinations || [],
              inclusions: data.inclusions || [],
              exclusions: data.exclusions || [],
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
      if (isEditing) {
        await packagesService.update(id as string, formData);
      } else {
        await packagesService.create(formData);
      }
      router.push('/packages');
      router.refresh();
    } catch (error) {
      console.error('Failed to save package:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDest = () => {
     if (tempDest && !formData.destinations.includes(tempDest)) {
        setFormData({ ...formData, destinations: [...formData.destinations, tempDest] });
        setTempDest('');
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
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Refine Tour Concept' : 'Design New Experience'}
          </h2>
          <p className="text-slate-500 font-medium">Curate a premium travel package with full logistics and costing details.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditing ? 'Publish Updates' : 'Publish Package'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           {/* General Details */}
          <section className="bg-white rounded-xl border shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Map className="h-4 w-4" />
              Experience Definition
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Package Title *</label>
              <input
                required
                type="text"
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Maldives Luxury Escape"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deep Description</label>
              <textarea
                rows={6}
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the journey, emotions, and highlights of this tour..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </section>

          {/* Logistics */}
          <section className="bg-white rounded-xl border shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              Duration & Costing
            </div>
            <div className="grid grid-cols-3 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Days</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-bold outline-none"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nights</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-bold outline-none"
                    value={formData.duration_nights}
                    onChange={(e) => setFormData({ ...formData, duration_nights: parseInt(e.target.value) })}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Base Price (₹)</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <input
                        type="number"
                        className="w-full rounded-xl border border-slate-100 bg-slate-50/50 pl-10 pr-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.base_price}
                        onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
                     />
                  </div>
               </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-blue-50">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">
                <Map className="h-4 w-4" /> Destinations Covered
             </div>
             <div className="flex flex-wrap gap-2 mb-6">
                {formData.destinations.map(d => (
                   <span key={d} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center">
                      {d} <button type="button" onClick={() => setFormData({...formData, destinations: formData.destinations.filter(x => x !== d)})} className="ml-2 hover:text-red-400"><X className="h-3 w-3" /></button>
                   </span>
                ))}
             </div>
             <div className="flex gap-2">
                <input
                   type="text"
                   className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-blue-500"
                   placeholder="Add City"
                   value={tempDest}
                   onChange={(e) => setTempDest(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDest())}
                />
                <button type="button" onClick={addDest} className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-all"><Plus className="h-4 w-4" /></button>
             </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
             <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                <ImageIcon className="h-4 w-4" /> Cover Asset
             </div>
             <div className="aspect-video rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300 hover:bg-slate-100 transition-all cursor-pointer">
                <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                <span className="text-[10px] font-black uppercase">Upload Cover</span>
             </div>
          </section>
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
