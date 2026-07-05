'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Bus, Car, Plane, Loader2 } from 'lucide-react';
import { transportService } from '@/lib/services';
import { Transport } from '@/types/crm';

export default function TransportPage() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransport() {
      try {
        const data = await transportService.getAll();
        setTransports(data);
      } catch (error) {
        console.error('Failed to load transport:', error);
      } finally {
        setLoading(false);
      }
    }
    loadTransport();
  }, []);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      default: return <Bus className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Transport</h2>
          <p className="text-slate-500">Manage transport providers and options.</p>
        </div>
        <Link
          href="/transport/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Provider
        </Link>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : transports.length > 0 ? (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Provider</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Base Price</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transports.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-lg bg-blue-50 p-2 text-blue-600">
                        {getIcon(t.type)}
                      </div>
                      <div className="font-medium text-slate-900">{t.provider}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 capitalize">
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{t.contact_info || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">${t.base_price?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/transport/new?id=${t.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-slate-500">No transport providers found.</p>
        </div>
      )}
    </div>
  );
}
