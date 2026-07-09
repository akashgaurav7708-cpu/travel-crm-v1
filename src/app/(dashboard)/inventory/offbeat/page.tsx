'use client';

import React, { useEffect, useState } from 'react';
import { Plus, MapPin, Edit2, Trash2, Compass, Loader2 } from 'lucide-react';
import { packagesService } from '@/lib/services/crm';
import { TourPackage } from '@/types/crm';

export default function AdminOffbeatPage() {
  const [destinations, setDestinations] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const data = await packagesService.getAll();
      setDestinations(data.filter(p => p.category === 'Offbeat' || p.tags?.includes('Offbeat')));
    } catch (error) {
      console.error("Error fetching offbeat destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Offbeat Destinations</h1>
          <p className="text-sm text-slate-500 font-medium">Manage hidden gems and expeditions</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
          <Plus size={16} /> Add New Destination
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-xs font-black uppercase tracking-widest">Loading Destinations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {destinations.map(dest => (
              <div key={dest.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                       <Compass size={24} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={14} /></button>
                       <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                 </div>
                 <h3 className="text-lg font-black text-slate-900 mb-2">{dest.name}</h3>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    <MapPin size={12} className="text-emerald-500" /> {dest.description?.slice(0, 30)}...
                 </div>
                 <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
                       <p className="text-lg font-black text-slate-900">₹{dest.price_per_person?.toLocaleString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                       Active
                    </span>
                 </div>
              </div>
           ))}
           {destinations.length === 0 && (
             <div className="col-span-full py-20 text-center border-2 border-dashed rounded-[3rem] border-slate-100 bg-slate-50/30">
                <Compass className="mx-auto mb-4 text-slate-200" size={48} />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No offbeat destinations found</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
