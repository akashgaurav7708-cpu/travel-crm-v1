'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, FileText, Loader2, Download, ExternalLink, Printer, Mail, Send } from 'lucide-react';
import { financeService } from '@/lib/services/index';
import { format } from 'date-fns';

export default function VouchersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation for Enterprise Vouchers
    setTimeout(() => {
      setItems([
        { id: '1', type: 'Hotel Voucher', ref: 'V-HTL-9402', client: 'Alice Johnson', provider: 'Grand Plaza Resort', date: '2024-06-15' },
        { id: '2', type: 'Cab Voucher', ref: 'V-CAB-1123', client: 'Alice Johnson', provider: 'Skyline Fleet', date: '2024-06-15' },
        { id: '3', type: 'Driver Voucher', ref: 'V-DRV-8821', client: 'Bob Smith', provider: 'Private Chauffeur', date: '2024-06-18' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Service Vouchers</h2>
          <p className="text-slate-500 font-bold">Generate and share branded vouchers for Hotels, Cabs, and Drivers.</p>
        </div>
        <div className="flex gap-3">
           <button className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center">
              <Plus className="h-4 w-4 mr-2" /> New Voucher
           </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map(v => (
             <div key={v.id} className="bg-white rounded-[2rem] border shadow-sm hover:shadow-xl transition-all p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-transparent hover:border-blue-100">
                <div className="flex items-center gap-6">
                   <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 transition-all">
                      <FileText className="h-8 w-8" />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{v.type}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">{v.ref}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">{v.client}</h4>
                      <p className="text-sm font-medium text-slate-500 italic mt-0.5">{v.provider} • {format(new Date(v.date), 'MMM d, yyyy')}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="h-11 w-11 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100"><Download className="h-4 w-4" /></button>
                   <button className="h-11 w-11 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100"><Printer className="h-4 w-4" /></button>
                   <button className="h-11 w-11 rounded-xl bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100"><Send className="h-4 w-4" /></button>
                   <div className="h-8 w-px bg-slate-100 mx-2"></div>
                   <button className="h-11 px-5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">Manage</button>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  )
}
