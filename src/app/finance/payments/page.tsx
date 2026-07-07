'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, DollarSign, Loader2, ArrowUpRight, ArrowDownRight, CreditCard, Calendar, Filter, User, MoreVertical, Wallet, CheckCircle2, Clock } from 'lucide-react';
import { financeService } from '@/lib/services/index';
import { format } from 'date-fns';

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
     // Simulation for Enterprise Payment Tracking
     setTimeout(() => {
        setItems([
           { id: '1', client: 'Alice Johnson', amount: 1500, type: 'Advance', method: 'Bank Transfer', status: 'verified', date: '2024-06-10' },
           { id: '2', client: 'Bob Smith', amount: 450, type: 'Balance', method: 'Credit Card', status: 'pending', date: '2024-06-12' },
           { id: '3', client: 'Sarah Connor', amount: 2200, type: 'Full Payment', method: 'UPI', status: 'verified', date: '2024-06-14' },
        ]);
        setLoading(false);
     }, 800);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Payment Collection</h2>
          <p className="text-slate-500 font-bold">Track advances, balances, and real-time cash flow across all bookings.</p>
        </div>
        <button className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center">
           <Plus className="h-4 w-4 mr-2" /> Record Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <MetricCard title="Total Collected" value="$42,500" trend="+12.5%" color="green" />
         <MetricCard title="Pending Balances" value="$8,940" trend="+2.4%" color="orange" />
         <MetricCard title="Refunds Processed" value="$1,200" trend="-1.5%" color="blue" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
           <div className="px-8 py-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Transaction History</h3>
              <div className="flex gap-2">
                 <button className="p-2 rounded-lg bg-slate-50 text-slate-400"><Filter className="h-4 w-4" /></button>
                 <button className="p-2 rounded-lg bg-slate-50 text-slate-400"><Search className="h-4 w-4" /></button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                 <thead className="bg-slate-50 text-slate-500 font-black border-b text-[10px] uppercase tracking-widest">
                    <tr>
                       <th className="px-8 py-4">Transaction Details</th>
                       <th className="px-8 py-4">Method</th>
                       <th className="px-8 py-4">Date</th>
                       <th className="px-8 py-4 text-right">Amount</th>
                       <th className="px-8 py-4">Status</th>
                       <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {items.map(p => (
                       <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                   <Wallet className="h-5 w-5" />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900">{p.client}</p>
                                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{p.type}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-slate-600 font-medium">{p.method}</td>
                          <td className="px-8 py-5 text-slate-500 font-medium">{format(new Date(p.date), 'MMM d, yyyy')}</td>
                          <td className="px-8 py-5 text-right font-black text-slate-900">${p.amount.toLocaleString()}</td>
                          <td className="px-8 py-5">
                             <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-tighter border ${
                                p.status === 'verified' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                             }`}>
                                {p.status === 'verified' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                {p.status}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <button className="p-2 rounded-lg text-slate-300 hover:text-blue-600 transition-all"><MoreVertical className="h-4 w-4" /></button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ title, value, trend, color }: any) {
   const colors: any = {
      green: 'text-green-600 bg-green-50',
      orange: 'text-orange-600 bg-orange-50',
      blue: 'text-blue-600 bg-blue-50'
   };
   return (
      <div className="bg-white rounded-3xl border shadow-sm p-8 flex flex-col group hover:shadow-xl transition-all">
         <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{title}</p>
            <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${colors[color]}`}>{trend}</span>
         </div>
         <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
      </div>
   )
}
