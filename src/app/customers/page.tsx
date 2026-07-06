'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Mail, Phone, MapPin, Loader2, FileText, ExternalLink, Calendar, User } from 'lucide-react';
import { customersService } from '@/lib/services/index';
import { Customer } from '@/types/crm';
import { format } from 'date-fns';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await customersService.getAll();
        setCustomers(data as any);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Customer Database</h2>
          <p className="text-slate-500 font-medium">Manage your verified customer profiles and travel documentation.</p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Customer
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone or passport..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2.5 border rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center">
          <FileText className="h-4 w-4 mr-2" /> Export CSV
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold">Accessing customer records...</p>
        </div>
      ) : filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/customers/new?id=${customer.id}`} className="text-blue-600 hover:text-blue-700">
                   <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-3">
                  {customer.first_name[0]}{customer.last_name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{customer.first_name} {customer.last_name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    Member since {format(new Date(customer.created_at), 'MMM yyyy')}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center text-sm text-slate-600 font-medium">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  {customer.email || 'No email provided'}
                </div>
                <div className="flex items-center text-sm text-slate-600 font-medium">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                    <Phone className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  {customer.phone || 'No phone provided'}
                </div>
                {customer.passport_number && (
                  <div className="flex items-center text-sm text-slate-600 font-medium">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                      <FileText className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    Passport: <span className="ml-1.5 font-bold text-slate-900">{customer.passport_number}</span>
                  </div>
                )}
                {customer.city && (
                  <div className="flex items-center text-sm text-slate-600 font-medium">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    {customer.city}, {customer.country}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Bookings</span>
                    <span className="text-lg font-black text-slate-900">{(customer as any).total_bookings || 0}</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Net Revenue</span>
                    <span className="text-lg font-black text-green-600">${((customer as any).total_spent || 0).toLocaleString()}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed p-20 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-slate-200" />
          </div>
          <p className="text-slate-500 font-bold text-lg">Your customer database is empty.</p>
          <p className="text-slate-400 text-sm mt-1">Start building your relationship base by adding your first customer.</p>
          <Link
            href="/customers/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            Add First Customer
          </Link>
        </div>
      )}
    </div>
  );
}
