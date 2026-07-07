'use client';

import React, { useEffect, useState } from 'react';
import {
  Users, Briefcase, TrendingUp, Clock, Calendar, Loader2, DollarSign, ArrowUpRight, ArrowDownRight, Target, Package, Hotel, Activity, Plus, ChevronRight, Bell, Sparkles, MapPin, MousePointer2, CreditCard, ShieldCheck, Car, Anchor, FileText
} from 'lucide-react';
import Link from 'next/link';
import { leadsService, bookingsService } from '@/lib/services/index';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
    pendingPayments: 0,
    upcomingTours: 0,
    todayBookings: 0,
    todayRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [leads, bookings] = await Promise.all([
          leadsService.getAll(),
          bookingsService.getAll(),
        ]);

        const confirmedBookings = bookings.filter((b: any) => b.status === 'Confirmed');
        const revenue = confirmedBookings.reduce((sum: number, b: any) => sum + (Number(b.total_amount) || 0), 0);
        const pending = bookings.filter((b: any) => b.payment_status !== 'Paid').length;

        setStats({
          totalLeads: leads.length,
          activeBookings: bookings.filter((b: any) => b.status !== 'Cancelled').length,
          monthlyRevenue: revenue,
          conversionRate: leads.length > 0 ? Math.round((confirmedBookings.length / leads.length) * 100) : 0,
          pendingPayments: pending,
          upcomingTours: bookings.filter((b: any) => new Date(b.start_date) > new Date()).length,
          todayBookings: bookings.filter((b: any) => new Date(b.created_at).toDateString() === new Date().toDateString()).length,
          todayRevenue: bookings.filter((b: any) => new Date(b.created_at).toDateString() === new Date().toDateString()).reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0),
        });

        setRecentLeads(leads.slice(0, 5));
      } catch (error) {
        console.error('Dashboard data load error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Activity className="h-64 w-64" /></div>
        <div className="relative z-10">
           <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-green-50 animate-pulse"></span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Enterprise Core v0.2</span>
           </div>
           <h2 className="text-4xl font-black tracking-tight leading-tight">Executive Intelligence</h2>
           <p className="text-slate-400 font-bold mt-2">Platform Control Center • Bilu G Travels Network</p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <Link href="/bookings/new" className="h-14 px-8 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all active:scale-95 flex items-center">
              <Plus className="h-5 w-5 mr-2" /> Rapid Booking
           </Link>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Today's Revenue" value={`$${stats.todayRevenue.toLocaleString()}`} trend="+12.4%" color="blue" icon={<DollarSign />} />
        <MetricCard title="Total Platform Rev" value={`$${stats.monthlyRevenue.toLocaleString()}`} trend="+8.1%" color="green" icon={<TrendingUp />} />
        <MetricCard title="Active Reservations" value={stats.activeBookings.toString()} trend="+2.4%" color="purple" icon={<Briefcase />} />
        <MetricCard title="Awaiting Payment" value={stats.pendingPayments.toString()} trend="-1.5%" color="orange" icon={<CreditCard />} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
         {/* Live Operations */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
               <div className="px-10 py-8 border-b flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Live Global Pipeline</h3>
                  <Link href="/leads" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Full CRM Access</Link>
               </div>
               <div className="divide-y divide-slate-50">
                  {recentLeads.map(lead => (
                     <div key={lead.id} className="px-10 py-6 hover:bg-slate-50/50 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                           <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                              {lead.first_name[0]}
                           </div>
                           <div>
                              <p className="text-lg font-black text-slate-900">{lead.first_name} {lead.last_name}</p>
                              <div className="flex items-center gap-3 mt-1">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" /> {lead.destination || 'Global'}
                                 </span>
                                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${lead.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                                    {lead.priority}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <button className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                           <ChevronRight className="h-5 w-5" />
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            {/* Operational Quick Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-[2rem] border p-8 flex items-center justify-between group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                     <div className="h-16 w-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                        <Car className="h-8 w-8" />
                     </div>
                     <div>
                        <p className="text-2xl font-black text-slate-900">12</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Vehicles on Route</p>
                     </div>
                  </div>
                  <Link href="/fleet/vehicles" className="text-slate-300 hover:text-orange-600 transition-all"><ChevronRight className="h-6 w-6" /></Link>
               </div>
               <div className="bg-white rounded-[2rem] border p-8 flex items-center justify-between group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                     <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Anchor className="h-8 w-8" />
                     </div>
                     <div>
                        <p className="text-2xl font-black text-slate-900">5</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Houseboats</p>
                     </div>
                  </div>
                  <Link href="/inventory/houseboats" className="text-slate-300 hover:text-blue-600 transition-all"><ChevronRight className="h-6 w-6" /></Link>
               </div>
            </div>
         </div>

         {/* Right Sidebar Widgets */}
         <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles className="h-32 w-32" /></div>
               <h3 className="text-xl font-black mb-6 flex items-center">AI Insights <Sparkles className="h-4 w-4 ml-2 text-blue-400" /></h3>
               <div className="space-y-6">
                  <InsightItem title="Upsell Opportunity" desc="Recommend private houseboat for Wilson Group for $120 markup." />
                  <InsightItem title="Inventory Alert" desc="Gulmarg Grand is 98% booked for peak season (Dec 15-25)." />
                  <InsightItem title="Revenue Pulse" desc="Conversion rate is up 4.2% since implementing AI Costing." />
               </div>
               <button className="w-full mt-10 py-4 rounded-2xl bg-blue-600 text-xs font-black uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-900/40">Audit Strategy</button>
            </div>

            <div className="bg-white rounded-[2.5rem] border shadow-sm p-8">
               <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest">Platform Status</h3>
               <div className="space-y-4">
                  <StatusRow label="Supabase Sync" status="Operational" active />
                  <StatusRow label="AI Engine v0.2" status="Standby" active />
                  <StatusRow label="Multi-tenant RLS" status="Locked" active />
                  <StatusRow label="PDF Engine" status="Ready" active />
               </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl group hover:scale-[1.02] transition-all duration-500">
               <h3 className="text-lg font-black mb-4">Operations Summary</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold border-b border-white/10 pb-3">
                     <span className="opacity-70 flex items-center"><Calendar className="h-3.5 w-3.5 mr-2" /> Arrivals Today</span>
                     <span className="font-black">8</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold border-b border-white/10 pb-3">
                     <span className="opacity-70 flex items-center"><Car className="h-3.5 w-3.5 mr-2" /> Duty Drivers</span>
                     <span className="font-black">15</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold border-b border-white/10 pb-3">
                     <span className="opacity-70 flex items-center"><FileText className="h-3.5 w-3.5 mr-2" /> Pending Invoices</span>
                     <span className="font-black">4</span>
                  </div>
               </div>
               <Link href="/operations/calendar" className="w-full mt-6 py-3 rounded-xl bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center">Open Operational Calendar</Link>
            </div>
         </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, color, icon }: any) {
   const colors: any = {
      blue: 'bg-blue-600 shadow-blue-100',
      green: 'bg-emerald-600 shadow-emerald-100',
      purple: 'bg-purple-600 shadow-purple-100',
      orange: 'bg-orange-600 shadow-orange-100'
   };
   return (
      <div className="bg-white rounded-[2rem] border shadow-sm p-8 flex flex-col hover:shadow-xl transition-all group">
         <div className="flex items-center justify-between mb-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${colors[color]}`}>
               {React.cloneElement(icon, { className: 'h-6 w-6' })}
            </div>
            <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">{trend}</span>
         </div>
         <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{title}</p>
         <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
      </div>
   )
}

function InsightItem({ title, desc }: any) {
   return (
      <div className="space-y-1.5 border-l-2 border-blue-500/20 pl-4 py-1">
         <p className="text-sm font-black text-white leading-tight">{title}</p>
         <p className="text-[11px] font-medium text-slate-400 leading-relaxed italic">{desc}</p>
      </div>
   )
}

function StatusRow({ label, status, active }: any) {
   return (
      <div className="flex justify-between items-center py-2">
         <span className="text-xs font-bold text-slate-400">{label}</span>
         <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-slate-300'}`}></span>
            <span className="text-[10px] font-black uppercase text-slate-900 tracking-tighter">{status}</span>
         </div>
      </div>
   )
}
