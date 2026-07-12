'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  Activity,
  Plus,
  Search,
  MoreVertical,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Globe,
  Settings,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    // Simulation for Super Admin
    setTimeout(() => {
       setCompanies([
          { id: '1', name: 'Global Voyages Ltd', subdomain: 'global', plan: 'Enterprise', users: 42, status: 'active', revenue: 12500, created: '2024-01-10' },
          { id: '2', name: 'Alps Escapes', subdomain: 'alps', plan: 'Professional', users: 15, status: 'active', revenue: 4800, created: '2024-02-15' },
          { id: '3', name: 'Desert Nomads', subdomain: 'desert', plan: 'Basic', users: 4, status: 'suspended', revenue: 590, created: '2024-03-22' },
          { id: '4', name: 'Tropical Trails', subdomain: 'tropics', plan: 'Free', users: 2, status: 'trial', revenue: 0, created: '2024-05-01' },
       ]);
       setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
     return (
        <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
           <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
              <p className="text-blue-500 font-black uppercase tracking-widest text-xs">Authenticating SaaS Authority...</p>
           </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-400 p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/40">Super Admin</span>
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Platform Version v0.2</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">System Infrastructure</h1>
              <p className="font-bold text-slate-500 mt-1">Real-time control over the SaaS network by Bilu G.</p>
           </div>
           <div className="flex items-center gap-4">
              <button className="h-14 px-8 rounded-2xl bg-white text-slate-900 text-sm font-black uppercase tracking-widest shadow-2xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 flex items-center">
                 <Plus className="h-5 w-5 mr-2" /> Onboard Company
              </button>
           </div>
        </div>

        {/* Global Network Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
           <StatCard title="Active Tenants" value="124" trend="+8.2%" icon={<Building2 />} />
           <StatCard title="SaaS Revenue" value="₹42,850" trend="+12.4%" icon={<TrendingUp />} />
           <StatCard title="Network Load" value="24.8%" trend="Healthy" icon={<Activity />} />
           <StatCard title="System Health" value="99.9%" trend="Stable" icon={<ShieldCheck />} />
        </div>

        {/* Main Workspace */}
        <div className="grid gap-8 lg:grid-cols-3">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/50 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
                 <div className="px-10 py-8 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">Tenant Directory</h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                       <input
                         type="text"
                         placeholder="Search companies..."
                         className="bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-bold outline-none focus:border-blue-500"
                       />
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                       <thead className="bg-slate-950/50 text-slate-600 font-black text-[10px] uppercase tracking-widest border-b border-slate-800">
                          <tr>
                             <th className="px-10 py-5">Company Entity</th>
                             <th className="px-10 py-5">Subscription</th>
                             <th className="px-10 py-5">Usage</th>
                             <th className="px-10 py-5">Revenue</th>
                             <th className="px-10 py-5 text-right">Access</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800/50">
                          {companies.map(c => (
                             <tr key={c.id} className="hover:bg-blue-600/5 transition-colors group">
                                <td className="px-10 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500 font-black group-hover:bg-blue-500 group-hover:text-white transition-all">
                                         {c.name[0]}
                                      </div>
                                      <div>
                                         <p className="font-black text-white">{c.name}</p>
                                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-0.5">{c.subdomain}.travelos.bilug.travel</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-10 py-6">
                                   <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-tighter border ${
                                      c.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                      c.status === 'suspended' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                   }`}>
                                      {c.plan} • {c.status}
                                   </span>
                                </td>
                                <td className="px-10 py-6">
                                   <div className="text-white font-black">{c.users} Users</div>
                                   <div className="w-24 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                      <div className="h-full bg-blue-500" style={{ width: `${(c.users/100)*100}%` }}></div>
                                   </div>
                                </td>
                                <td className="px-10 py-6">
                                   <div className="text-white font-black">${c.revenue.toLocaleString()}</div>
                                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">LTV Earnings</p>
                                </td>
                                <td className="px-10 py-6 text-right">
                                   <button className="p-2 rounded-lg bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700 transition-all">
                                      <MoreVertical className="h-4 w-4" />
                                   </button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <Globe className="h-40 w-40" />
                 </div>
                 <h3 className="text-2xl font-black mb-6 relative z-10">Network Intelligence</h3>
                 <div className="space-y-6 relative z-10">
                    <NetworkInsight label="Global Requests" value="1.2M" />
                    <NetworkInsight label="Avg Latency" value="42ms" />
                    <NetworkInsight label="Error Rate" value="0.01%" />
                 </div>
                 <button className="w-full mt-10 py-4 rounded-2xl bg-white text-blue-600 text-sm font-black uppercase tracking-widest shadow-xl">
                    View AWS Metrics
                 </button>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl">
                 <h3 className="text-lg font-black text-white mb-6">Plan Distribution</h3>
                 <div className="space-y-6">
                    <PlanBar label="Enterprise" percent={15} color="blue" />
                    <PlanBar label="Professional" percent={45} color="green" />
                    <PlanBar label="Basic" percent={30} color="purple" />
                    <PlanBar label="Free Trial" percent={10} color="orange" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: any) {
   return (
      <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 hover:border-blue-500/50 transition-all group">
         <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-slate-800 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
               {React.cloneElement(icon, { className: 'h-6 w-6' })}
            </div>
            <span className="text-[10px] font-black uppercase text-green-500 tracking-widest flex items-center bg-green-500/10 px-2 py-1 rounded-lg">
               {trend} <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
         </div>
         <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-1">{title}</p>
         <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
      </div>
   )
}

function NetworkInsight({ label, value }: any) {
   return (
      <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
         <span className="text-xs font-black uppercase tracking-widest opacity-70">{label}</span>
         <span className="text-xl font-black">{value}</span>
      </div>
   )
}

function PlanBar({ label, percent, color }: any) {
   const colors: any = {
      blue: 'bg-blue-500',
      green: 'bg-emerald-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
   };
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
            <span className="text-slate-500">{label}</span>
            <span className="text-white">{percent}%</span>
         </div>
         <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${colors[color]} rounded-full`} style={{ width: `${percent}%` }}></div>
         </div>
      </div>
   )
}
