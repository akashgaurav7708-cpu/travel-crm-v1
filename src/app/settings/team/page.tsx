'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  MoreVertical,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TeamManagement() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
     // Simulation
     setTimeout(() => {
        setMembers([
           { id: '1', name: 'John Doe', email: 'john@agency.com', role: 'Company Admin', status: 'active', joined: '2024-01-10' },
           { id: '2', name: 'Sarah Smith', email: 'sarah@agency.com', role: 'Sales Manager', status: 'active', joined: '2024-02-15' },
           { id: '3', name: 'Mike Wilson', email: 'mike@agency.com', role: 'Sales Executive', status: 'active', joined: '2024-03-22' },
           { id: '4', name: 'Anna Brown', email: 'anna@agency.com', role: 'Operations', status: 'inactive', joined: '2024-05-01' },
        ]);
        setLoading(false);
     }, 800);
  }, []);

  if (loading) {
     return (
        <div className="flex h-screen items-center justify-center">
           <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
     )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
           <Link href="/settings" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
           </Link>
           <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Team Governance</h2>
              <p className="text-slate-500 font-bold">Manage agency employees, set RBAC permissions, and monitor access.</p>
           </div>
        </div>
        <button className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center">
           <UserPlus className="h-4 w-4 mr-2" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Team List */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
               <div className="px-8 py-6 border-b flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-lg font-black text-slate-900">Active Directory</h3>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                     {members.filter(m => m.status === 'active').length} Members Online
                  </span>
               </div>
               <div className="divide-y divide-slate-50">
                  {members.map(member => (
                     <div key={member.id} className="p-8 hover:bg-slate-50/50 transition-all group">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-6">
                              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-black group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                                 {member.name[0]}
                              </div>
                              <div>
                                 <h4 className="text-lg font-black text-slate-900">{member.name}</h4>
                                 <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-bold text-slate-400 flex items-center">
                                       <Mail className="h-3 w-3 mr-1" /> {member.email}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-slate-200"></span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${member.status === 'active' ? 'text-green-600' : 'text-red-400'}`}>
                                       {member.status}
                                    </span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="text-right">
                                 <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{member.role}</p>
                                 <p className="text-[10px] font-bold text-slate-400 mt-1 italic">Joined {format(new Date(member.joined), 'MMM yyyy')}</p>
                              </div>
                              <button className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:shadow-md transition-all">
                                 <MoreVertical className="h-4 w-4" />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Role Definitions */}
         <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
               <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-black">RBAC Matrix</h3>
               </div>
               <div className="space-y-6">
                  <RoleItem title="Administrator" desc="Full platform access, billing control, and team oversight." />
                  <RoleItem title="Sales Manager" desc="Lead management, booking overrides, and report access." />
                  <RoleItem title="Operations" desc="Inventory management, itinerary building, and logistics." />
                  <RoleItem title="Accounts" desc="Invoicing, payment verification, and financial ledger." />
               </div>
            </div>

            <div className="bg-blue-50 rounded-[2rem] p-8 border border-blue-100 flex flex-col items-center text-center">
               <Lock className="h-10 w-10 text-blue-600 mb-4 opacity-50" />
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Security Audit</h4>
               <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  All employee actions are recorded in the system audit logs for compliance and transparency.
               </p>
               <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Download Security Log</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function RoleItem({ title, desc }: any) {
   return (
      <div className="space-y-1.5 border-l-2 border-white/10 pl-4 py-1 hover:border-blue-400 transition-colors cursor-help group">
         <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{title}</p>
         <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{desc}</p>
      </div>
   )
}
