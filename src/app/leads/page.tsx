'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Loader2 } from 'lucide-react';
import { leadsService } from '@/lib/services';
import { Lead } from '@/types/crm';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await leadsService.getAll();
        setLeads(data as unknown as Lead[]);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch leads. Showing mock data for demonstration.');
        // Fallback to mock data if supabase fails
        setLeads([
          { id: '1', firstName: 'James', lastName: 'Wilson', email: 'james.w@example.com', destination: 'Maldives', budget: 5000, status: 'In Progress', priority: 'High', createdAt: '2024-05-10' } as any
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Leads</h2>
          <p className="text-slate-500">Manage and track your potential customers.</p>
        </div>
        <Link
          href="/leads/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email or destination..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </button>
          <select className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 transition-colors">
            <option>All Statuses</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-slate-500 text-sm">Loading leads...</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name & Email</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{lead.first_name || lead.firstName} {lead.last_name || lead.lastName}</div>
                      <div className="text-slate-500 text-xs">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.destination || 'N/A'}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">${lead.budget?.toLocaleString() || '0'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${
                        lead.priority === 'High' ? 'text-red-600' :
                        lead.priority === 'Medium' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">
                      No leads found. Click "Add Lead" to create your first one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
