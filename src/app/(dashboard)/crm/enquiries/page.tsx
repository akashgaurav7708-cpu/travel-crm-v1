'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Clock, MoreVertical, Loader2, MessageSquare } from 'lucide-react';
import { leadsService } from '@/lib/services/crm';
import { Lead } from '@/types/crm';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const allLeads = await leadsService.getAll();
      setEnquiries(allLeads.filter(l => l.source === 'Website'));
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Web Enquiries</h1>
          <p className="text-sm text-slate-500 font-medium">Manage leads from your website and AI planner</p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-xs font-black uppercase tracking-widest">Loading Enquiries...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enquiries.map((enq) => (
              <div key={enq.id} className="bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all group">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0">
                      {enq.first_name?.[0] || 'U'}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 flex items-center gap-2">
                          {enq.first_name} {enq.last_name}
                          <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-blue-50 text-blue-600">
                            {enq.status}
                          </span>
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-1">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest"><Phone size={12} className="text-blue-500" /> {enq.phone}</span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest"><Mail size={12} className="text-blue-500" /> {enq.email}</span>
                      </div>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-center w-full md:w-auto">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Requested Package</p>
                    <p className="text-xs font-black text-slate-900">{enq.preferred_package || 'Custom Inquiry'}</p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4 w-full md:w-auto justify-between">
                    <div className="text-right mr-6">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1 justify-end">
                        <Clock size={10} /> {new Date(enq.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="h-10 px-4 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                          View Details
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all">
                          <MoreVertical size={16} />
                      </button>
                    </div>
                </div>
              </div>
          ))}
          {enquiries.length === 0 && (
             <div className="py-20 text-center border-2 border-dashed rounded-[3rem] border-slate-100 bg-slate-50/30">
                <MessageSquare className="mx-auto mb-4 text-slate-200" size={48} />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No enquiries found</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
