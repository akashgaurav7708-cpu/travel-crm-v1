'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Calendar, User, MapPin, Loader2, IndianRupee, Filter, MoreVertical, CreditCard, ExternalLink, ArrowUpRight, Share2, Mail, MessageSquare } from 'lucide-react';
import { bookingsService } from '@/lib/services/index';
import { pdfGenerator } from '@/lib/pdf/generator';
import { format } from 'date-fns';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await bookingsService.getAll();
        setBookings(data as any);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      case 'Completed': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600';
      case 'Partial': return 'text-orange-500';
      case 'Pending': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const shareOnWhatsApp = (booking: any) => {
    const message = `Hello ${booking.customers?.first_name}, here are your booking details for ${booking.tour_packages?.name || 'your trip'}. Total: ₹${booking.total_amount}. Dates: ${booking.start_date} to ${booking.end_date}. Status: ${booking.status}`;
    const url = `https://wa.me/${booking.customers?.phone?.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const sendEmail = (booking: any) => {
    const subject = `Booking Confirmation - #${booking.id.substring(0, 8).toUpperCase()}`;
    const body = `Dear ${booking.customers?.first_name},\n\nYour booking for ${booking.tour_packages?.name || 'your trip'} is ${booking.status}.\n\nTotal Amount: ₹${booking.total_amount}\nDates: ${booking.start_date} to ${booking.end_date}\n\nThank you for choosing us!`;
    window.location.href = `mailto:${booking.customers?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const filteredBookings = bookings.filter(b =>
    `${b.customers?.first_name} ${b.customers?.last_name} ${b.tour_packages?.name || ''} ${b.id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Reservations & Bookings</h2>
          <p className="text-slate-500 font-medium">Monitor active tours, payment collections, and travel schedules.</p>
        </div>
        <Link
          href="/bookings/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Booking
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings by ID, customer or trip name..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold">Synchronizing reservation engine...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50/50 text-slate-500 font-bold border-b text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-5">Booking Ref</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Trip Details</th>
                  <th className="px-6 py-5">Schedule</th>
                  <th className="px-6 py-5">Financials</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group relative">
                    <td className="px-6 py-5">
                      <div className="font-black text-blue-600 flex items-center">
                        <span className="opacity-30 mr-1">#</span>
                        {booking.id.substring(0, 8).toUpperCase()}
                      </div>
                      <span className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter border ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-black group-hover:bg-blue-100 transition-colors">
                          {booking.customers?.first_name?.[0]}{booking.customers?.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{booking.customers?.first_name} {booking.customers?.last_name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{booking.customers?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{booking.tour_packages?.name || 'Custom Trip'}</div>
                      <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase mt-1">
                         <User className="h-3 w-3 mr-1" /> {booking.travelers_count} Travelers
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="text-slate-900 font-bold flex items-center">
                          <Calendar className="h-3 w-3 mr-1.5 text-blue-500" />
                          {format(new Date(booking.start_date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                           Ends {format(new Date(booking.end_date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="text-slate-900 font-black flex items-center text-base">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {booking.total_amount?.toLocaleString()}
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-widest flex items-center ${getPaymentStyle(booking.payment_status)}`}>
                          <CreditCard className="h-3 w-3 mr-1" />
                          {booking.payment_status}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/itinerary-builder?bookingId=${booking.id}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center"
                        >
                           Builder <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Link>
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenu(activeMenu === booking.id ? null : booking.id)}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {activeMenu === booking.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border shadow-xl z-50 py-2">
                              <button onClick={() => { pdfGenerator.generateQuotation(booking); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center">
                                <ExternalLink className="h-3 w-3 mr-2" /> Download Quote
                              </button>
                              <button onClick={() => { shareOnWhatsApp(booking); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-green-600 hover:bg-green-50 flex items-center">
                                <MessageSquare className="h-3 w-3 mr-2" /> WhatsApp
                              </button>
                              <button onClick={() => { sendEmail(booking); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 flex items-center">
                                <Mail className="h-3 w-3 mr-2" /> Email
                              </button>
                              <button onClick={() => { pdfGenerator.generateVoucher(booking); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 flex items-center">
                                <CreditCard className="h-3 w-3 mr-2" /> Download Voucher
                              </button>
                              <Link href={`/bookings/new?id=${booking.id}`} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center border-t">
                                Edit Reservation
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed p-20 text-center bg-white">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
            <CreditCard className="h-10 w-10" />
          </div>
          <p className="text-slate-500 font-bold text-lg">No active reservations.</p>
          <Link
            href="/bookings/new"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            Create First Booking
          </Link>
        </div>
      )}
    </div>
  );
}
