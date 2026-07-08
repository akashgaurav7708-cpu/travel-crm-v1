'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Loader2, Calendar, DollarSign, MapPin, Tag, Mail } from 'lucide-react';
import { leadsService } from '@/lib/services/index';
import { Lead } from '@/types/crm';
import { format } from 'date-fns';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await leadsService.getAll();
        setLeads(data as any);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = `${lead.first_name} ${lead.last_name} ${lead.destination} ${lead.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Interested': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'In Progress': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Qualified': return 'bg-green-50 text-green-700 border-green-100';
      case 'Lost': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Leads Management</h2>
          <p className="text-slate-500 font-medium">Track and convert potential travel inquiries into customers.</p>
        </div>
        <Link
          href="/leads/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Capture New Lead
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, destination or email..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-50 border rounded-lg px-2">
            <Filter className="h-4 w-4 text-slate-400 ml-2" />
            <select
              className="bg-transparent px-2 py-2 text-sm font-medium text-slate-700 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Interested">Interested</option>
              <option value="In Progress">In Progress</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              <p className="text-slate-500 font-bold">Synchronizing leads database...</p>
            </div>
          ) : filteredLeads.length > 0 ? (
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50/50 text-slate-500 font-bold border-b text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-5">Lead Information</th>
                  <th className="px-6 py-5">Travel Plan</th>
                  <th className="px-6 py-5">Status & Priority</th>
                  <th className="px-6 py-5">Assigned To</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                          {lead.first_name[0]}{lead.last_name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{lead.first_name} {lead.last_name}</div>
                          <div className="text-slate-400 text-xs flex items-center mt-0.5">
                            <Mail className="h-3 w-3 mr-1" /> {lead.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center text-slate-700 font-semibold">
                          <MapPin className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                          {lead.destination || 'Flexible'}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-slate-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {lead.travel_date ? format(new Date(lead.travel_date), 'MMM yyyy') : 'TBD'}
                          </span>
                          <span className="text-[11px] text-blue-600 font-bold flex items-center bg-blue-50 px-1.5 py-0.5 rounded">
                            <DollarSign className="h-3 w-3" />
                            {lead.budget?.toLocaleString() || 'Flexible'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black border uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        <div className={`text-[10px] font-black uppercase flex items-center tracking-widest ${getPriorityColor(lead.priority)}`}>
                          <Tag className="h-3 w-3 mr-1" />
                          {lead.priority} Priority
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-slate-600 text-xs font-medium">
                        {(lead as any).assigned_to ? `${(lead as any).assigned_to.first_name} ${(lead as any).assigned_to.last_name}` : 'Unassigned'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 italic">
                        Created {format(new Date(lead.created_at), 'MMM d, h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/leads/new?id=${lead.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-block"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center p-24 text-center">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">No leads found matching your criteria.</p>
              <button
                onClick={() => {setSearchTerm(''); setFilterStatus('All');}}
                className="mt-2 text-blue-600 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
