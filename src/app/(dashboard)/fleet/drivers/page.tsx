'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, User, Phone, ShieldCheck, Loader2, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { fleetService } from '@/lib/services/index';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fleetService.getDrivers();
        setDrivers(data);
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
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Driver Database</h2>
          <p className="text-slate-500 font-medium text-sm">Manage verified drivers, availability, and documents.</p>
        </div>
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center active:scale-95">
           <Plus className="h-4 w-4 mr-2" /> Register Driver
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
           <input type="text" placeholder="Search by name or license number..." className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
      </div>

      {loading ? (
         <div className="flex flex-col items-center justify-center p-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Personnel Registry...</p>
         </div>
      ) : drivers.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map(driver => (
               <div key={driver.id} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {driver.name[0]}
                     </div>
                     <div>
                        <h4 className="font-black text-slate-900">{driver.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <span className={`h-2 w-2 rounded-full ${driver.is_available ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{driver.is_available ? 'On Duty' : 'On Leave'}</span>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-3 mb-6">
                     <div className="flex items-center text-xs font-bold text-slate-600">
                        <Phone className="h-3.5 w-3.5 mr-3 text-slate-400" /> {driver.phone || 'N/A'}
                     </div>
                     <div className="flex items-center text-xs font-bold text-slate-600">
                        <ShieldCheck className="h-3.5 w-3.5 mr-3 text-green-500" /> {driver.license_number || 'N/A'}
                     </div>
                  </div>
                  <div className="pt-5 border-t flex items-center justify-between">
                     <button className="text-[10px] font-black uppercase text-blue-600 hover:underline tracking-widest">Duty History</button>
                     <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400"><MoreVertical className="h-4 w-4" /></button>
                  </div>
               </div>
            ))}
         </div>
      ) : (
         <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white">
            <User className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No drivers registered in fleet.</p>
         </div>
      )}
    </div>
  )
}
