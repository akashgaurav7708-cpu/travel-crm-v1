'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { customersService } from '@/lib/services';
import { Customer } from '@/types/crm';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await customersService.getAll();
        setCustomers(data);
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
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Customers</h2>
          <p className="text-slate-500">View and manage your customer database.</p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Customer
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Export CSV</button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    {customer.first_name[0]}{customer.last_name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{customer.first_name} {customer.last_name}</h3>
                    <p className="text-xs text-slate-500">ID: CUST-{customer.id.substring(0, 8)}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-blue-600 text-sm font-medium">
                  <Link href={`/customers/new?id=${customer.id}`}>Edit</Link>
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="mr-3 h-4 w-4 text-slate-400" />
                  {customer.email}
                </div>
                {customer.phone && (
                  <div className="flex items-center text-sm text-slate-600">
                    <Phone className="mr-3 h-4 w-4 text-slate-400" />
                    {customer.phone}
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="mr-3 h-4 w-4 text-slate-400" />
                    {customer.address}
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bookings</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{customer.total_bookings || 0}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Spent</p>
                  <p className="mt-1 text-lg font-bold text-blue-600">${customer.total_spent?.toLocaleString() || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-slate-500">No customers found.</p>
        </div>
      )}
    </div>
  );
}
