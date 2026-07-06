'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Star, MapPin, Building2, Loader2, DollarSign, Image as ImageIcon, ExternalLink, Settings } from 'lucide-react';
import { hotelsService } from '@/lib/services/index';
import { Hotel } from '@/types/crm';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Hotel Inventory</h2>
          <p className="text-slate-500 font-medium">Manage your partnered properties, rates, and availability across destinations.</p>
        </div>
        <Link
          href="/hotels/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Hotel
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by hotel name or location..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="rounded-lg border bg-white px-3 py-2.5 text-sm font-bold text-slate-700 outline-none hover:bg-slate-50 transition-all">
          <option>Sort by: Rating</option>
          <option>Sort by: Price</option>
          <option>Sort by: Name</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold">Retrieving hotel database...</p>
        </div>
      ) : filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {(hotel as any).hotel_images?.[0] ? (
                  <img src={(hotel as any).hotel_images[0].url} alt={hotel.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <Building2 className="h-12 w-12 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Image Available</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-1">
                  {[...Array(hotel.star_rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center text-white text-xs font-bold">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {hotel.location}
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{hotel.name}</h3>
                  <Link href={`/hotels/new?id=${hotel.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {hotel.amenities?.slice(0, 4).map((a) => (
                    <span key={a} className="px-2 py-0.5 rounded bg-slate-50 border text-[10px] font-black text-slate-500 uppercase">
                      {a}
                    </span>
                  ))}
                  {hotel.amenities?.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-slate-50 border text-[10px] font-black text-slate-400 uppercase">
                      +{hotel.amenities.length - 4} More
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Starting Rates</span>
                    <div className="flex items-baseline text-slate-900">
                      <span className="text-lg font-black">$</span>
                      <span className="text-2xl font-black">{(hotel as any).hotel_room_types?.[0]?.base_price || 0}</span>
                      <span className="text-xs font-bold text-slate-400 ml-1">/ night</span>
                    </div>
                  </div>
                  <button className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-md">
                     <Settings className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed p-20 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-slate-200" />
          </div>
          <p className="text-slate-500 font-bold text-lg">Hotel inventory is empty.</p>
          <p className="text-slate-400 text-sm mt-1">Add hotels and partnered resorts to build your inventory for packages.</p>
          <Link
            href="/hotels/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            Add Partner Hotel
          </Link>
        </div>
      )}
    </div>
  );
}
