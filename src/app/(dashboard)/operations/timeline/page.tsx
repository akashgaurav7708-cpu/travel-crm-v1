'use client';

import React, { useEffect, useState } from 'react';
import { History, Clock, CheckCircle2, Loader2, MapPin, Package, Calendar, User, Search, Filter } from 'lucide-react';
import { bookingsService } from '@/lib/services/index';
import { format } from 'date-fns';

export default function TimelineTracker() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     async function load() {
        try {
           const data = await bookingsService.getAll();
           setItems(data);
        } catch (err) {
           console.error(err);
        } finally {
           setLoading(false);
        }
     }
     load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Live Operation Timeline</h2>
          <p className="text-slate-500 font-bold">Monitor every stage of the travel lifecycle from lead to completion.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
           {items.map(booking => (
              <div key={booking.id} className="bg-white rounded-[2.5rem] border shadow-sm p-10 hover:shadow-xl transition-all">
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-slate-50">
                    <div className="flex items-center gap-6">
                       <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl">
                          {booking.customers?.first_name[0]}
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-slate-900">{booking.customers?.first_name} {booking.customers?.last_name}</h3>
                          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{booking.tour_packages?.name || 'Custom Package'}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Operation Status</p>
                          <p className="text-lg font-black text-slate-900">{booking.status}</p>
                       </div>
                       <button className="h-12 px-6 rounded-xl bg-slate-950 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">View Full Log</button>
                    </div>
                 </div>

                 {/* Custom Timeline Visual */}
                 <div className="relative pt-4">
                    <div className="absolute top-[44px] left-0 right-0 h-1 bg-slate-100 rounded-full"></div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                       <TimelineStep label="Lead Captured" date="Jun 10" active />
                       <TimelineStep label="Quotation Sent" date="Jun 11" active />
                       <TimelineStep label="Confirmed" date="Jun 12" active />
                       <TimelineStep label="Vouchers Ready" date="Jun 14" current />
                       <TimelineStep label="Tour Started" date="TBD" disabled />
                    </div>
                 </div>
              </div>
           ))}
        </div>
      )}
    </div>
  )
}

function TimelineStep({ label, date, active = false, current = false, disabled = false }: any) {
   return (
      <div className="flex flex-col items-center text-center space-y-4 group">
         <div className={`h-14 w-14 rounded-full border-4 flex items-center justify-center transition-all ${
            active ? 'bg-blue-600 border-white text-white shadow-xl shadow-blue-100 scale-110' :
            current ? 'bg-white border-blue-600 text-blue-600 shadow-xl' :
            'bg-slate-100 border-white text-slate-300'
         }`}>
            {active ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
         </div>
         <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${disabled ? 'text-slate-300' : 'text-slate-900'}`}>{label}</p>
            <p className="text-[9px] font-bold text-slate-400 mt-0.5">{date}</p>
         </div>
      </div>
   )
}
