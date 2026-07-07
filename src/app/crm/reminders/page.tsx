'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Calendar, Clock, CheckCircle2, MoreVertical, Loader2, Plus, User, Phone, Mail } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

export default function RemindersPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Simulation
    setTimeout(() => {
      setItems([
        { id: '1', client: 'John Wilson', task: 'Follow up on Maldives Quote', date: new Date(), priority: 'High', status: 'pending' },
        { id: '2', client: 'Sarah Connor', task: 'Send Hotel Voucher', date: addDays(new Date(), 1), priority: 'Medium', status: 'pending' },
        { id: '3', client: 'Mike Ross', task: 'Confirm Payment Receipt', date: addDays(new Date(), -1), priority: 'High', status: 'overdue' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">CRM Intelligence</h2>
          <p className="text-slate-500 font-bold">Smart follow-up reminders and customer relationship automation.</p>
        </div>
        <button className="h-12 px-6 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all flex items-center">
           <Plus className="h-4 w-4 mr-2" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            {loading ? (
               <div className="flex flex-col items-center justify-center p-24">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
               </div>
            ) : (
               <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b flex items-center justify-between">
                     <h3 className="text-lg font-black text-slate-900">Priority Timeline</h3>
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">3 Tasks Today</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                     {items.map(item => (
                        <div key={item.id} className="p-8 hover:bg-slate-50/50 transition-all group">
                           <div className="flex items-start justify-between">
                              <div className="flex gap-6">
                                 <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all ${
                                    item.status === 'overdue' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                 }`}>
                                    {item.status === 'overdue' ? '!' : <Clock className="h-5 w-5" />}
                                 </div>
                                 <div>
                                    <h4 className="text-lg font-black text-slate-900">{item.task}</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                       <span className="text-xs font-bold text-slate-400 flex items-center">
                                          <User className="h-3 w-3 mr-1" /> {item.client}
                                       </span>
                                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">|</span>
                                       <span className="text-xs font-bold text-blue-500 flex items-center">
                                          <Calendar className="h-3 w-3 mr-1" /> {format(item.date, 'MMM d, h:mm a')}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                                    item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                 }`}>
                                    {item.priority}
                                 </span>
                                 <button className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 transition-all">
                                    <CheckCircle2 className="h-5 w-5" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
               <h3 className="text-xl font-black mb-6">AI Insights</h3>
               <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 italic text-sm font-medium text-slate-300">
                     "Alice Johnson's birthday is in 3 days. Send a personalized tour discount to increase LTV."
                  </div>
                  <button className="w-full py-3 rounded-xl bg-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Generate Birthday Email</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
