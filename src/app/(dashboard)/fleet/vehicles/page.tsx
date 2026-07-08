'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Car, Loader2, MoreVertical, Gauge, Database, Info } from 'lucide-react';
import { fleetService } from '@/lib/services/index';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fleetService.getVehicles();
        setVehicles(data);
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
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Vehicle Inventory</h2>
          <p className="text-slate-500 font-medium text-sm">Manage fleet assets, maintenance, and allocation.</p>
        </div>
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center active:scale-95">
           <Plus className="h-4 w-4 mr-2" /> Add Vehicle
        </button>
      </div>

      {loading ? (
         <div className="flex flex-col items-center justify-center p-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Fleet Assets...</p>
         </div>
      ) : vehicles.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(v => (
               <div key={v.id} className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="p-8">
                     <div className="flex items-start justify-between mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                           <Car className="h-7 w-7" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-black uppercase text-slate-500 border border-slate-100">
                           {v.type}
                        </span>
                     </div>
                     <h4 className="text-xl font-black text-slate-900 mb-1">{v.name}</h4>
                     <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{v.registration_number}</p>

                     <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                           <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Capacity</p>
                           <p className="text-sm font-black text-slate-900">{v.capacity} Pax</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                           <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Status</p>
                           <p className="text-sm font-black text-green-600">Active</p>
                        </div>
                     </div>
                  </div>
                  <div className="px-8 py-5 bg-slate-50 border-t flex items-center justify-between">
                     <button className="text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 tracking-widest flex items-center">
                        <Gauge className="h-3 w-3 mr-2" /> Maintenance
                     </button>
                     <button className="p-2 rounded-lg hover:bg-white text-slate-400 shadow-sm"><MoreVertical className="h-4 w-4" /></button>
                  </div>
               </div>
            ))}
         </div>
      ) : (
         <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white">
            <Car className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold text-lg">Your fleet inventory is empty.</p>
         </div>
      )}
    </div>
  )
}
