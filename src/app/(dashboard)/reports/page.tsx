'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter,
  DollarSign,
  FileText,
  Loader2,
  Table,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { bookingsService } from '@/lib/services/index';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({
    revenue: 0,
    avgBooking: 0,
    bookingsCount: 0,
    growth: '+12.5%',
    invoices: [] as any[],
  });

  useEffect(() => {
    async function loadReports() {
      try {
        const bookings = await bookingsService.getAll();
        const totalRev = bookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);

        setReportData({
          revenue: totalRev,
          avgBooking: bookings.length > 0 ? totalRev / bookings.length : 0,
          bookingsCount: bookings.length,
          growth: '+14.2%',
          invoices: bookings.map((b: any) => ({
             id: b.id,
             customer: `${b.customers?.first_name} ${b.customers?.last_name}`,
             date: b.created_at,
             amount: b.total_amount,
             status: b.payment_status
          }))
        });
      } catch (error) {
        console.error('Reports load error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Financial Intelligence</h2>
          <p className="text-slate-500 font-bold">Comprehensive analytics, invoicing tracking, and SaaS revenue reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-5 rounded-xl border bg-white text-sm font-black uppercase tracking-widest text-slate-700 flex items-center shadow-sm hover:bg-slate-50 transition-all">
            <Filter className="mr-2 h-4 w-4" /> Filter Period
          </button>
          <button className="h-11 px-5 rounded-xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest flex items-center shadow-xl hover:bg-blue-600 transition-all active:scale-95">
            <Download className="mr-2 h-4 w-4" /> Export Financials
          </button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ReportCard title="Total Network Revenue" value={`₹${reportData.revenue.toLocaleString()}`} change={reportData.growth} trend="up" />
        <ReportCard title="Gross Profit (Est.)" value={`₹${(reportData.revenue * 0.15).toLocaleString(undefined, {maximumFractionDigits: 0})}`} change="+4.2%" trend="up" />
        <ReportCard title="Total Reservations" value={reportData.bookingsCount.toString()} change="+8.1%" trend="up" />
        <ReportCard title="Outstanding Balances" value="₹12,450" change="-1.4%" trend="down" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Invoice Ledger */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border shadow-sm overflow-hidden flex flex-col">
           <div className="px-8 py-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Transaction Ledger</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                 <Clock className="h-3 w-3 mr-1" /> Real-time Update
              </span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                 <thead className="bg-slate-50 text-slate-500 font-black border-b text-[10px] uppercase tracking-widest">
                    <tr>
                       <th className="px-8 py-4">Transaction ID</th>
                       <th className="px-8 py-4">Client Entity</th>
                       <th className="px-8 py-4">Issue Date</th>
                       <th className="px-8 py-4 text-right">Amount</th>
                       <th className="px-8 py-4">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {reportData.invoices.map((inv) => (
                       <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-4 font-black text-blue-600">#{inv.id.substring(0, 8).toUpperCase()}</td>
                          <td className="px-8 py-4 font-bold text-slate-900">{inv.customer}</td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{format(new Date(inv.date), 'MMM d, yyyy')}</td>
                          <td className="px-8 py-4 text-right font-black text-slate-900">${inv.amount?.toLocaleString()}</td>
                          <td className="px-8 py-4">
                             <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-tighter border ${
                                inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' :
                                inv.status === 'Partial' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                'bg-red-50 text-red-700 border-red-100'
                             }`}>
                                {inv.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-6 bg-slate-50/50 border-t mt-auto text-center">
              <button className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Load Complete Ledger</button>
           </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <PieChart className="h-32 w-32" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-6 relative z-10 text-center">Vertical Distribution</h4>
              <div className="space-y-6 relative z-10">
                 <DistributionItem label="International Tours" percent={65} color="blue" />
                 <DistributionItem label="Domestic Packages" percent={25} color="green" />
                 <DistributionItem label="MICE & Corporate" percent={10} color="purple" />
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border p-8 shadow-sm">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 text-center">Performance Targets</h4>
              <div className="flex flex-col items-center py-4">
                 <div className="relative h-32 w-32 flex items-center justify-center">
                    <svg className="h-full w-full transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * 0.2} className="text-blue-600" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-2xl font-black text-slate-900">80%</span>
                       <span className="text-[8px] font-black text-slate-400 uppercase">Quarter Goal</span>
                    </div>
                 </div>
                 <p className="mt-8 text-center text-xs font-bold text-slate-500 leading-relaxed italic">
                    "You are currently pacing <span className="text-blue-600">8% ahead</span> of last quarter's conversion metrics."
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, value, change, trend }: any) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
        </div>
      </div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
      <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
         <div className={`h-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'} transition-all`} style={{ width: '70%' }}></div>
      </div>
    </div>
  );
}

function DistributionItem({ label, percent, color }: any) {
   const colors: any = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500'
   };
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
            <span className="opacity-70">{label}</span>
            <span>{percent}%</span>
         </div>
         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${colors[color]} rounded-full`} style={{ width: `${percent}%` }}></div>
         </div>
      </div>
   );
}
