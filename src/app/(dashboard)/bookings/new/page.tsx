'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, Calendar, User, Package, CreditCard, Clock, Info, ShieldCheck, MapPin, Calculator, IndianRupee } from 'lucide-react';
import { bookingsService, customersService, packagesService } from '@/lib/services/index';
import { Customer, TourPackage } from '@/types/crm';
import { format, addDays } from 'date-fns';

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);

  const [formData, setFormData] = useState({
    customer_id: '',
    package_id: '',
    status: 'Confirmed' as any,
    payment_status: 'Pending' as any,
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    total_amount: 0,
    advance_amount: 0,
    balance_amount: 0,
    travelers_count: 1,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [customersData, packagesData] = await Promise.all([
          customersService.getAll(),
          packagesService.getAll()
        ]);
        setCustomers(customersData as any);
        setPackages(packagesData as any);

        if (id) {
          const booking = await bookingsService.getById(id);
          if (booking) {
            setFormData({
              customer_id: booking.customer_id || '',
              package_id: booking.package_id || '',
              status: booking.status || 'Confirmed',
              payment_status: booking.payment_status || 'Pending',
              start_date: booking.start_date || '',
              end_date: booking.end_date || '',
              total_amount: Number(booking.total_amount) || 0,
              advance_amount: Number(booking.advance_amount) || 0,
              balance_amount: Number(booking.balance_amount) || 0,
              travelers_count: booking.travelers_count || 1,
            });
          }
        }
      } catch (error) {
        console.error('Failed to load form data:', error);
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    const balance = formData.total_amount - formData.advance_amount;
    setFormData(prev => ({ ...prev, balance_amount: balance }));
  }, [formData.total_amount, formData.advance_amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await bookingsService.update(id as string, formData);
      } else {
        await bookingsService.create(formData);
      }
      router.push('/bookings');
      router.refresh();
    } catch (error: any) {
      console.error('Failed to save booking:', error);
      alert(`Error saving reservation: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    setLoading(true);
    try {
      await bookingsService.delete(id as string);
      router.push('/bookings');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (pkgId: string, count: number) => {
    const pkg = packages.find(p => p.id === pkgId);
    if (pkg) {
      const total = pkg.base_price * count;
      setFormData(prev => ({ ...prev, total_amount: total }));
    }
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Modify Trip Reservation' : 'Create Trip Reservation'}
          </h2>
          <p className="text-slate-500 font-medium">Record trip details, calculate costs, and manage client payments.</p>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditing ? 'Update Booking' : 'Confirm Reservation'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <User className="h-4 w-4" />
              Party & Package
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Customer *</label>
                <select
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.customer_id}
                  onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                >
                  <option value="">-- Choose Customer --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tour Package</label>
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={formData.package_id}
                  onChange={(e) => {
                    const pkgId = e.target.value;
                    setFormData({ ...formData, package_id: pkgId });
                    calculateTotal(pkgId, formData.travelers_count);
                  }}
                >
                  <option value="">-- Custom Trip (No Package) --</option>
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.base_price}/person)</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
               <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                   <Calendar className="h-3 w-3 mr-1" /> Start Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                   <Calendar className="h-3 w-3 mr-1" /> End Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                   <User className="h-3 w-3 mr-1" /> Pax Count
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.travelers_count}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setFormData({ ...formData, travelers_count: count });
                    calculateTotal(formData.package_id, count);
                  }}
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Calculator className="h-4 w-4" />
              Trip Costing & Payments
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Total Quotation (₹) *</label>
                <div className="relative">
                   <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input
                    type="number"
                    required
                    className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-3 text-lg font-black outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.total_amount}
                    onChange={(e) => {
                       const total = parseFloat(e.target.value) || 0;
                       setFormData({ ...formData, total_amount: total });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Advance Paid (₹)</label>
                <div className="relative">
                   <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input
                    type="number"
                    className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-3 text-lg font-black outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.advance_amount}
                    onChange={(e) => {
                       const adv = parseFloat(e.target.value) || 0;
                       setFormData({ ...formData, advance_amount: adv });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Balance Due (₹)</label>
                <div className="relative">
                   <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <input
                    disabled
                    type="number"
                    className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-3 text-lg font-black bg-slate-50 text-slate-500"
                    value={formData.balance_amount}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              Reservation Control
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Booking Status</label>
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending Approval</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Payment Status</label>
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                value={formData.payment_status}
                onChange={(e) => setFormData({ ...formData, payment_status: e.target.value as any })}
              >
                <option value="Pending">Awaiting Payment</option>
                <option value="Partial">Partially Paid</option>
                <option value="Paid">Fully Paid</option>
              </select>
            </div>
          </section>

          <div className="rounded-xl bg-slate-900 p-6 text-white space-y-4">
             <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Info className="h-3 w-3" /> Booking Insight
             </div>
             <p className="text-sm leading-relaxed opacity-80 font-medium">
                Once confirmed, an automated itinerary will be generated in draft mode. You can share the client portal link immediately.
             </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <BookingForm />
    </Suspense>
  );
}
