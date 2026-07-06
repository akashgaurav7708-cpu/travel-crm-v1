'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Bus, Car, Plane, Loader2, Mail, Phone, DollarSign, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { transportService } from '@/lib/services/index';
import { Transport } from '@/types/crm';

export default function TransportPage() {
  const [transports, setTransports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadTransport() {
      try {
        const data = await transportService.getAll();
        setTransports(data as any);
      } catch (error) {
        console.error('Failed to load transport:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTransport();
  }, []);

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'air': return <Plane className="h-6 w-6" />;
      case 'road': return <Car className="h-6 w-6" />;
      case 'rail': return <Bus className="h-6 w-6" />;
      default: return <Bus className="h-6 w-6" />;
    }
  };

  const filtered = transports.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Transport Fleet</h2>
          <p className="text-slate-500 font-medium">Manage transport providers, vehicle availability, and logistics partners.</p>
        </div>
        <Link
          href="/transport/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Provider
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by provider name or transport type..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold">Connecting to logistics network...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-rotate-3">
                  {getIcon(t.type)}
                </div>
                <div className="flex gap-2">
                   <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 border">
                      {t.type || 'Standard'}
                   </span>
                   <Link href={`/transport/new?id=${t.id}`} className="p-2 text-slate-400 hover:text-blue-600 transition-all">
                      <ExternalLink className="h-4 w-4" />
                   </Link>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4">{t.name}</h3>

              <div className="space-y-3.5 mb-6">
                 <div className="flex items-center text-sm text-slate-600 font-medium">
                    <Mail className="h-3.5 w-3.5 mr-3 text-slate-400" />
                    {t.contact_email || 'No email'}
                 </div>
                 <div className="flex items-center text-sm text-slate-600 font-medium">
                    <Phone className="h-3.5 w-3.5 mr-3 text-slate-400" />
                    {t.contact_phone || 'No phone'}
                 </div>
                 <div className="flex items-center text-sm text-slate-600 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 mr-3 text-green-500" />
                    <span className="text-green-700">Verified Provider</span>
                 </div>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Vehicles</span>
                    <span className="text-lg font-black text-slate-900">{t.vehicles?.length || 0} active</span>
                 </div>
                 <button className="h-10 px-4 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
                    Manage Fleet
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed p-20 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <Bus className="h-10 w-10" />
          </div>
          <p className="text-slate-500 font-bold text-lg">No transport providers found.</p>
          <Link
            href="/transport/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            Add First Provider
          </Link>
        </div>
      )}
    </div>
  );
}
