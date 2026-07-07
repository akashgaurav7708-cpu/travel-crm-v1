'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Building2, Globe, Mail, Phone, Loader2, MoreVertical, ShieldCheck, MapPin } from 'lucide-react';

export default function SuppliersPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Simulation
    setTimeout(() => {
      setItems([
        { id: '1', name: 'Valley Ground Services', type: 'Land Operator', location: 'Srinagar', status: 'active', contact: 'Hamid Khan' },
        { id: '2', name: 'Himalayan Trekking Co', type: 'Adventure Partner', location: 'Gulmarg', status: 'active', contact: 'Sarah Wilson' },
        { id: '3', name: 'Alpine Fleet Rentals', type: 'Vehicle Supplier', location: 'Pahalgam', status: 'active', contact: 'Mike Ross' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Supplier Management</h2>
          <p className="text-slate-500 font-bold">Manage your global B2B network, contracts, and supplier rates.</p>
        </div>
        <button className="h-12 px-8 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center active:scale-95">
           <Plus className="h-4 w-4 mr-2" /> Onboard Supplier
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
             <div key={item.id} className="bg-white rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all group overflow-hidden border-transparent hover:border-blue-100">
                <div className="p-8">
                   <div className="flex items-start justify-between mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                         <Building2 className="h-8 w-8" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-50 text-[9px] font-black uppercase text-slate-500 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                         {item.type}
                      </span>
                   </div>
                   <h4 className="text-xl font-black text-slate-900 mb-1">{item.name}</h4>
                   <p className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {item.location}
                   </p>

                   <div className="mt-8 space-y-3">
                      <div className="flex items-center text-sm font-medium text-slate-500">
                         <Globe className="h-4 w-4 mr-3 opacity-50" />
                         Active Contract
                      </div>
                      <div className="flex items-center text-sm font-medium text-slate-500">
                         <ShieldCheck className="h-4 w-4 mr-3 text-green-500" />
                         Verified Partner
                      </div>
                   </div>
                </div>
                <div className="px-8 py-6 bg-slate-50 border-t flex items-center justify-between">
                   <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Primary Contact</p>
                      <p className="text-sm font-black text-slate-900">{item.contact}</p>
                   </div>
                   <button className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                   </button>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  )
}
