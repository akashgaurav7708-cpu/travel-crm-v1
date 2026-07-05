'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Star, MapPin, Building2, Loader2 } from 'lucide-react';
import { hotelsService } from '@/lib/services';
import { Hotel } from '@/types/crm';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await hotelsService.getAll();
        setHotels(data as any);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Hotels</h2>
          <p className="text-slate-500">Manage your hotel inventory and partnerships.</p>
        </div>
        <Link
          href="/hotels/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <select className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition-colors">
          <option>Sort by: Rating (High to Low)</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Name (A-Z)</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {hotels.map((hotel: any) => (
            <div key={hotel.id} className="rounded-xl border bg-white p-5 shadow-sm hover:border-blue-200 transition-all">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="h-32 w-48 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400">
                  <Building2 className="h-10 w-10" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                    <div className="flex">
                      {[...Array(hotel.star_rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    {hotel.location}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {hotel.amenities?.map((amenity: string) => (
                      <span key={amenity} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 border">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-40 md:border-l md:pl-6 flex flex-col justify-center items-end md:items-start gap-1">
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-xl font-bold text-slate-900">${hotel.base_price?.toLocaleString() || '0'}/night</p>
                  <button className="mt-2 text-sm font-medium text-blue-600 hover:underline">Manage rates</button>
                </div>
              </div>
            </div>
          ))}
          {hotels.length === 0 && (
            <div className="p-20 text-center text-slate-500 border rounded-xl bg-white border-dashed">
              No hotels in inventory yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
