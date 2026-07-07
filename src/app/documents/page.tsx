'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Layers, Loader2, Download, Trash2, File, FileText, Image as ImageIcon, Eye } from 'lucide-react';

export default function DocumentManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation
    setTimeout(() => {
      setItems([
        { id: '1', name: 'Alice_Passport_Main.pdf', size: '1.2 MB', type: 'PDF', category: 'Passport', date: '2024-05-10' },
        { id: '2', name: 'Group_Flight_Tickets.pdf', size: '4.5 MB', type: 'PDF', category: 'Ticket', date: '2024-05-12' },
        { id: '3', name: 'Hotel_Voucher_Kashmir.png', size: '840 KB', type: 'PNG', category: 'Voucher', date: '2024-05-15' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Document Repository</h2>
          <p className="text-slate-500 font-bold">Secure storage for Passports, Visas, Tickets, and Vouchers.</p>
        </div>
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all flex items-center">
           <Plus className="h-4 w-4 mr-2" /> Upload Asset
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search repository by filename or category..." className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(doc => (
             <div key={doc.id} className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                   <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {doc.type === 'PDF' ? <FileText className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                   </div>
                   <div className="flex gap-1">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-all"><Eye className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-all"><Download className="h-4 w-4" /></button>
                   </div>
                </div>
                <h4 className="font-bold text-slate-900 truncate mb-1">{doc.name}</h4>
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{doc.category}</span>
                   <span className="text-[10px] font-black uppercase text-slate-400">{doc.size}</span>
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Uploaded {doc.date}</p>
                   <button className="p-2 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"><Trash2 className="h-4 w-4" /></button>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  )
}
