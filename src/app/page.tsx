'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Calendar,
  Loader2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Package,
  Hotel,
  Activity,
  Plus,
  ChevronRight,
  Bell,
  Sparkles,
  MapPin
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
        const revenue = confirmedBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);
        const pending = bookings.filter((b: any) => b.payment_status !== 'Paid').length;

        setStats({
          totalLeads: leads.length,
          activeBookings: bookings.filter((b: any) => b.status !== 'Cancelled').length,
          monthlyRevenue: revenue,
          conversionRate: leads.length > 0 ? Math.round((confirmedBookings.length / leads.length) * 100) : 0,
          pendingPayments: pending,
          upcomingTours: bookings.filter((b: any) => new Date(b.start_date) > new Date()).length,
          todayBookings: bookings.filter((b: any) => new Date(b.created_at).toDateString() === new Date().toDateString()).length,
          todayRevenue: bookings.filter((b: any) => new Date(b.created_at).toDateString() === new Date().toDateString()).reduce((sum: number, b: any) => sum + b.total_amount, 0),
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
        <div className="text-center space-y-4">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
           <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Loading Executive Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Performance v0.2</span>
           </div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">Executive Overview</h2>
           <p className="text-slate-500 font-bold">Welcome back! Manage your travel empire by Bilu G.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="h-12 w-12 rounded-2xl border bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
              <Bell className="h-5 w-5" />
           </button>
           <Link href="/bookings/new" className="h-12 px-6 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95">
              <Plus className="h-4 w-4 mr-2" /> New Reservation
           </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" value={`$${stats.todayRevenue.toLocaleString()}`} icon={<DollarSign />} trend="+12%" positive={true} color="blue" />
        <StatCard title="Total Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={<TrendingUp />} trend="+18%" positive={true} color="green" />
        <StatCard title="Booking Conversion" value={`${stats.conversionRate}%`} icon={<Target />} trend="+2.4%" positive={true} color="purple" />
        <StatCard title="Pending Payments" value={stats.pendingPayments.toString()} icon={<Clock />} trend="-4%" positive={false} color="orange" />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="col-span-1 rounded-3xl border bg-white shadow-sm lg:col-span-4 p-8 flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-black text-slate-900">Revenue Growth</h3>
                 <p className="text-sm font-medium text-slate-400 italic">Net earnings across all travel companies</p>
              </div>
              <select className="px-4 py-2 border rounded-xl text-xs font-black uppercase bg-slate-50 outline-none">
                 <option>Last 7 Days</option>
                 <option>Last 30 Days</option>
                 <option>Last Quarter</option>
              </select>
           </div>
           <div className="flex-1 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
              <Activity className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-xs font-black uppercase tracking-widest">Interactive Performance Chart</p>
              <p className="text-[10px] font-bold mt-1 opacity-50">(Integration with Recharts / Chart.js)</p>
           </div>
        </div>

        <div className="col-span-1 rounded-3xl border bg-slate-900 shadow-2xl lg:col-span-3 p-8 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="h-32 w-32" />
           </div>
           <h3 className="text-xl font-black mb-6 relative z-10">Intelligent Insights</h3>
           <div className="space-y-6 relative z-10">
              <InsightItem
                icon={<Package className="h-5 w-5 text-blue-400" />}
                title="Top Seller"
                desc="Maldives Summer Special is leading with 42% of sales."
              />
              <InsightItem
                icon={<Hotel className="h-5 w-5 text-green-400" />}
                title="Occupancy Alert"
                desc="Grand Plaza Resort has 95% occupancy for next week."
              />
              <InsightItem
                icon={<Target className="h-5 w-5 text-orange-400" />}
                title="Lead Pipeline"
                desc="15 new high-priority leads waiting for assignment."
              />
           </div>
           <button className="w-full mt-10 py-4 rounded-2xl bg-blue-600 text-sm font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
              Run Audit Report
           </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b">
            <h3 className="text-lg font-black text-slate-900">Global Pipeline</h3>
            <Link href="/leads" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center">
               Full CRM <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-8 py-4 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {lead.first_name[0]}{lead.last_name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{lead.first_name} {lead.last_name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                            <MapPin className="h-2.5 w-2.5 mr-1" /> {lead.destination || 'Global'}
                         </span>
                         <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${lead.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                            {lead.priority}
                         </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">${lead.budget?.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Estimated Budget</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 italic font-medium">No active leads found in the SaaS network.</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border bg-white shadow-sm p-8">
           <h3 className="text-lg font-black text-slate-900 mb-6">Operations Hub</h3>
           <div className="grid grid-cols-2 gap-4">
              <QuickAction label="Hotels" desc="Manage Inventory" href="/hotels" color="blue" />
              <QuickAction label="Packages" desc="Create Tours" href="/packages" color="green" />
              <QuickAction label="Invoices" desc="Finance Engine" href="/reports" color="purple" />
              <QuickAction label="Builder" desc="AI Itineraries" href="/itinerary-builder" color="orange" />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, positive, color }: any) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700`}>
         {React.cloneElement(icon as any, { className: 'h-24 w-24' })}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className={`rounded-2xl bg-${color}-50 p-3 text-${color}-600 group-hover:bg-${color}-600 group-hover:text-white transition-all`}>
          {React.cloneElement(icon as any, { className: 'h-6 w-6' })}
        </div>
        <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {trend}
          {positive ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
        </div>
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function InsightItem({ icon, title, desc }: any) {
   return (
      <div className="flex gap-4">
         <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center">
            {icon}
         </div>
         <div>
            <p className="text-sm font-black text-white">{title}</p>
            <p className="text-xs font-medium text-slate-400 leading-relaxed mt-1">{desc}</p>
         </div>
      </div>
   )
}

function QuickAction({ label, desc, href, color }: any) {
   return (
      <Link href={href} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all group">
         <p className={`text-xs font-black uppercase tracking-widest text-${color}-600 mb-1`}>{label}</p>
         <p className="text-sm font-black text-slate-900 flex items-center group-hover:text-blue-600">
            {desc} <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
         </p>
      </Link>
   )
}
