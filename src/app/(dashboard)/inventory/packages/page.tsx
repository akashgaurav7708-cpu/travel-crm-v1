'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Map, Calendar, Loader2, DollarSign, Clock, Users, ArrowUpRight, Package } from 'lucide-react';
import { packagesService } from '@/lib/services/index';
import { TourPackage } from '@/types/crm';

export default function PackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await packagesService.getAll();
        setPackages(data as any);
      } catch (error) {
        console.error('Failed to load packages:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const filtered = packages.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.destinations?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tour Package Design</h2>
          <p className="text-slate-500 font-medium">Curate and publish high-converting travel itineraries and package deals.</p>
        </div>
        <Link
          href="/inventory/packages/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Package
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by package name or destination..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold">Synchronizing package engine...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => (
            <div key={pkg.id} className="overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-2xl transition-all group flex flex-col border-transparent hover:border-blue-100">
              <div className="h-56 bg-slate-200 relative overflow-hidden">
                {(pkg as any).package_images?.[0] ? (
                   <img src={(pkg as any).package_images[0].url} alt={pkg.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <Map className="h-12 w-12 mb-2 opacity-50" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Image Placeholder</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 rounded-xl bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                  {pkg.duration_days} Days / {pkg.duration_nights} Nights
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex-1">
                   <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-3">{pkg.name}</h3>
                   <div className="flex flex-wrap gap-1.5 mb-6">
                      {pkg.destinations?.map(d => (
                         <span key={d} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-tighter">
                            {d}
                         </span>
                      ))}
                   </div>
                   <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed italic mb-8 border-l-2 border-slate-100 pl-4">
                      {pkg.description || 'No description provided for this premium travel package.'}
                   </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Starting From</p>
                    <div className="flex items-baseline text-slate-900">
                       <span className="text-lg font-black">₹</span>
                       <span className="text-2xl font-black">{pkg.base_price?.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/inventory/packages/new?id=${pkg.id}`}
                    className="h-12 px-6 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center"
                  >
                    Customize <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-slate-200" />
          </div>
          <p className="text-slate-500 font-bold text-lg">No tour packages published.</p>
          <p className="text-slate-400 text-sm mt-1">Design your first premium travel experience to start selling.</p>
          <Link
            href="/inventory/packages/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            Design First Package
          </Link>
        </div>
      )}
    </div>
  );
}
