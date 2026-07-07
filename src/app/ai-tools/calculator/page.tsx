'use client';

import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Loader2, DollarSign, PieChart, TrendingUp, Info, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CostCalculatorPage() {
  const [items, setItems] = useState([
    { id: '1', name: 'Luxury Hotel (Srinagar)', price: 450, qty: 3, category: 'Hotel' },
    { id: '2', name: 'SUV Transport (6 Days)', price: 120, qty: 6, category: 'Transport' },
    { id: '3', name: 'Sightseeing Pass', price: 25, qty: 4, category: 'Activities' },
  ]);

  const [loading, setLoading] = useState(false);

  const totalBase = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gst = totalBase * 0.05;
  const markup = totalBase * 0.15;
  const grandTotal = totalBase + gst + markup;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">Enterprise Costing Engine</h2>
           <p className="text-slate-500 font-bold text-sm">Precision AI-driven cost calculator with automated GST and markups.</p>
        </div>
        <button className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center">
           <Plus className="h-4 w-4 mr-2" /> Add Cost Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b flex items-center justify-between bg-slate-50/50">
                 <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Inventory Costing</h3>
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">Live Calculation</span>
              </div>
              <div className="divide-y divide-slate-50">
                 {items.map(item => (
                    <div key={item.id} className="p-8 hover:bg-slate-50/30 transition-all group">
                       <div className="flex items-center justify-between">
                          <div className="flex gap-6">
                             <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <DollarSign className="h-6 w-6" />
                             </div>
                             <div>
                                <h4 className="font-black text-slate-900">{item.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.category} • ${item.price} per unit</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="text-right">
                                <p className="text-sm font-black text-slate-900">${(item.price * item.qty).toLocaleString()}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Qty: {item.qty}</p>
                             </div>
                             <button className="p-2 rounded-lg text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                <Trash2 className="h-4 w-4" />
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator className="h-32 w-32" /></div>
              <h3 className="text-xl font-black mb-8 relative z-10">Financial Breakdown</h3>

              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Base Inventory</span>
                    <span className="text-white">${totalBase.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>GST (5%)</span>
                    <span className="text-white">${gst.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-6">
                    <span>Agency Markup (15%)</span>
                    <span className="text-blue-400">${markup.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Total Quote</span>
                    <span className="text-4xl font-black text-white tracking-tighter">${grandTotal.toLocaleString()}</span>
                 </div>
              </div>

              <button className="w-full mt-12 h-14 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all flex items-center justify-center">
                 Generate Quotation <ChevronRight className="ml-2 h-4 w-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
