'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Home, Loader2, MoreVertical, Star, MapPin, Anchor } from 'lucide-react';
import { accommodationsService } from '@/lib/services/index';

export default function HouseboatsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await accommodationsService.getAll();
        setItems(data.filter((a: any) => a.type === 'houseboat'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Premium Houseboats</h2>
          <p className="text-slate-500 font-medium text-sm">Manage luxury houseboat inventory and private cruises.</p>
        </div>
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center active:scale-95">
           <Plus className="h-4 w-4 mr-2" /> Add Houseboat
        </button>
      </div>

      {loading ? (
         <div className="flex flex-col items-center justify-center p-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Marine Inventory...</p>
         </div>
      ) : items.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
               <div key={item.id} className="rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all group border-transparent hover:border-blue-100">
                  <div className="h-56 bg-slate-200 relative overflow-hidden">
                     <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <Anchor className="h-12 w-12 mb-2 opacity-50" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Vessel Image</span>
                     </div>
                     <div className="absolute top-4 left-4 flex gap-1">
                        {[...Array(item.star_rating)].map((_, i) => (
                           <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                     </div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-xl font-black text-slate-900 mb-2">{item.name}</h3>
                     <div className="flex items-center text-xs font-bold text-blue-600 mb-6">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" /> {item.location}
                     </div>
                     <div className="pt-6 border-t flex items-center justify-between">
                        <div>
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Nightly Cruise</p>
                           <p className="text-xl font-black text-slate-900">$450</p>
                        </div>
                        <button className="h-10 px-4 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Manage</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      ) : (
         <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white">
            <Anchor className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-lg">No houseboats found in inventory.</p>
         </div>
      )}
    </div>
  )
}
