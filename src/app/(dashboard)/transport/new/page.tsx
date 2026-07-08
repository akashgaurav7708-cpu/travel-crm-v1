'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, Bus, Mail, Phone, User, Globe, DollarSign, Plus } from 'lucide-react';
import { fleetService } from '@/lib/services/index';

function TransportForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Road',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
  });

  useEffect(() => {
    if (id) {
      async function fetchTransport() {
        try {
          const data = await fleetService.getById(id as string);
          if (data) {
            setFormData({
              name: data.name || '',
              type: data.type || 'Road',
              contact_person: data.contact_person || '',
              contact_email: data.contact_email || '',
              contact_phone: data.contact_phone || '',
            });
          }
        } catch (error) {
          console.error('Failed to fetch transport:', error);
        } finally {
          setFetching(false);
        }
      }
      fetchTransport();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await fleetService.update(id as string, formData);
      } else {
        await fleetService.create(formData);
      }
      router.push('/transport');
      router.refresh();
    } catch (error) {
      console.error('Failed to save transport:', error);
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
            {isEditing ? 'Edit Transport Provider' : 'Add Transport Provider'}
          </h2>
          <p className="text-slate-500 font-medium">Manage logistics partners and fleet details.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditing ? 'Update Provider' : 'Add Provider'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Bus className="h-4 w-4" />
              Provider Details
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company Name *</label>
              <input
                required
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Skyline Logistics"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Transport Category</label>
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Road">Road (Bus/Car)</option>
                <option value="Air">Air (Flights)</option>
                <option value="Rail">Rail (Train)</option>
                <option value="Sea">Sea (Ferry/Cruise)</option>
              </select>
            </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <User className="h-4 w-4" />
              Contact Information
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Point of Contact</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.contact_phone}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
           <div className="rounded-xl bg-blue-600 p-6 text-white">
              <h4 className="text-sm font-black uppercase tracking-widest mb-2">SaaS Provider Tier</h4>
              <p className="text-xs leading-relaxed opacity-90">This provider will be shared across your agency's sub-entities if multi-tenancy is active.</p>
           </div>
        </div>
      </form>
    </div>
  );
}

export default function NewTransportPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <TransportForm />
    </Suspense>
  );
}
