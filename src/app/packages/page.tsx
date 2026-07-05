'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Map, Calendar, Loader2 } from 'lucide-react';
import { packagesService } from '@/lib/services';
import { TourPackage } from '@/types/crm';

export default function PackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await packagesService.getAll();
        setPackages(data);
      } catch (error) {
        console.error('Failed to load packages:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tour Packages</h2>
          <p className="text-slate-500">Create and manage curated tour itineraries.</p>
        </div>
        <Link
          href="/packages/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Link>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-slate-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <Map className="h-12 w-12" />
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  {pkg.duration_days} Days
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{pkg.description}</p>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Starts at</p>
                    <p className="text-lg font-bold text-blue-600">${pkg.base_price?.toLocaleString()}</p>
                  </div>
                  <Link
                    href={`/packages/new?id=${pkg.id}`}
                    className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-slate-500">No tour packages found.</p>
        </div>
      )}
    </div>
  );
}
