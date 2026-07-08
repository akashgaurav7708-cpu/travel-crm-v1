'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, FileText, Loader2, MoreVertical, CheckCircle2, AlertCircle, DollarSign, Download } from 'lucide-react';
import { financeService } from '@/lib/services/index';
import { format } from 'date-fns';

export default function InvoicesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await financeService.getInvoices();
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Billing & Invoices</h2>
          <p className="text-slate-500 font-medium text-sm">Manage tax invoices, proforma quotes, and customer collections.</p>
        </div>
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center active:scale-95">
           <Plus className="h-4 w-4 mr-2" /> Create Invoice
        </button>
      </div>

      {loading ? (
         <div className="flex flex-col items-center justify-center p-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Financial Records...</p>
         </div>
      ) : items.length > 0 ? (
         <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-black border-b text-[10px] uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-5">Invoice #</th>
                        <th className="px-8 py-5">Client</th>
                        <th className="px-8 py-5 text-right">Base Amount</th>
                        <th className="px-8 py-5 text-right">GST (5%)</th>
                        <th className="px-8 py-5 text-right">Total Payable</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {items.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-5 font-black text-blue-600">{inv.invoice_number}</td>
                           <td className="px-8 py-5 font-bold text-slate-900">{inv.bookings?.customers?.first_name} {inv.bookings?.customers?.last_name}</td>
                           <td className="px-8 py-5 text-right font-medium text-slate-500">${inv.subtotal?.toLocaleString()}</td>
                           <td className="px-8 py-5 text-right font-medium text-slate-500">${inv.gst_amount?.toLocaleString()}</td>
                           <td className="px-8 py-5 text-right font-black text-slate-900">${inv.total_amount?.toLocaleString()}</td>
                           <td className="px-8 py-5">
                              <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-tighter border ${
                                 inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                              }`}>
                                 {inv.status}
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <div className="flex justify-end gap-2">
                                 <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-blue-600"><Download className="h-4 w-4" /></button>
                                 <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400"><MoreVertical className="h-4 w-4" /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      ) : (
         <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white">
            <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No invoices generated yet.</p>
         </div>
      )}
    </div>
  )
}
