'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, DollarSign, Calculator, FileText, ArrowLeft } from 'lucide-react';
import { financeService, bookingsService } from '@/lib/services/index';
import Link from 'next/link';

function InvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!bookingId);
  const [bookings, setBookings] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    booking_id: bookingId || '',
    invoice_number: `INV-${Date.now().toString().slice(-6)}`,
    due_date: '',
    subtotal: 0,
    gst_amount: 0,
    total_amount: 0,
    status: 'Draft',
  });

  useEffect(() => {
    async function load() {
       try {
          const data = await bookingsService.getAll();
          setBookings(data);

          if (bookingId) {
             const booking = data.find((b: any) => b.id === bookingId);
             if (booking) {
                const sub = Number(booking.total_amount) || 0;
                const gst = sub * 0.05;
                setFormData(prev => ({
                   ...prev,
                   subtotal: sub,
                   gst_amount: gst,
                   total_amount: sub + gst
                }));
             }
          }
       } catch (err) {
          console.error(err);
       } finally {
          setFetching(false);
       }
    }
    load();
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await financeService.createInvoice(formData);
      router.push('/finance/invoices');
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/finance/invoices" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
           </Link>
           <h2 className="text-2xl font-black text-slate-900">Generate GST Invoice</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] border shadow-sm p-10 space-y-8">
               <div className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                     <FileText className="h-4 w-4" /> Billing Reference
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Booking *</label>
                     <select required className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={formData.booking_id} onChange={e => setFormData({...formData, booking_id: e.target.value})}>
                        <option value="">-- Choose Active Reservation --</option>
                        {bookings.map(b => (
                           <option key={b.id} value={b.id}>#{b.id.slice(0,8)} - {b.customers?.first_name} {b.customers?.last_name}</option>
                        ))}
                     </select>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice Number</label>
                        <input disabled type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold outline-none text-slate-400" value={formData.invoice_number} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date</label>
                        <input required type="date" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator className="h-32 w-32" /></div>
               <h3 className="text-xl font-black mb-8 relative z-10">Total Summary</h3>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span className="text-white">${formData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-6">
                     <span>GST (5%)</span>
                     <span className="text-blue-400">${formData.gst_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                     <span className="text-sm font-black uppercase tracking-widest text-slate-400">Grand Total</span>
                     <span className="text-3xl font-black text-white">${formData.total_amount.toLocaleString()}</span>
                  </div>
               </div>
               <button disabled={loading} type="submit" className="w-full mt-10 h-14 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Issue Invoice'}
               </button>
            </div>
         </div>
      </form>
    </div>
  )
}

export default function NewInvoicePage() {
  return <Suspense><InvoiceForm /></Suspense>;
}
