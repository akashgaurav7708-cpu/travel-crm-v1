'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, User, Clock, Loader2, Plus, Info, CheckCircle2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { bookingsService } from '@/lib/services/index';

export default function TravelCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
       try {
          const data = await bookingsService.getAll();
          setBookings(data);
       } catch (err) {
          console.error(err);
       } finally {
          setLoading(false);
       }
    }
    load();
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Operations Control Center</h2>
          <p className="text-slate-500 font-bold">Real-time visibility of arrivals, departures, and tour schedules.</p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-3 rounded-xl border bg-white hover:bg-slate-50 transition-all shadow-sm"><ChevronLeft className="h-5 w-5" /></button>
           <div className="px-6 py-2.5 rounded-xl border bg-white font-black text-sm uppercase tracking-widest min-w-[200px] text-center shadow-sm">
              {format(currentDate, 'MMMM yyyy')}
           </div>
           <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-3 rounded-xl border bg-white hover:bg-slate-50 transition-all shadow-sm"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border shadow-2xl overflow-hidden p-10">
         {loading ? (
            <div className="flex flex-col items-center justify-center p-24">
               <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
         ) : (
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-[2rem] overflow-hidden shadow-inner">
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="bg-slate-50 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                     {day}
                  </div>
               ))}
               {days.map((day) => {
                  const dayBookings = bookings.filter(b => isSameDay(new Date(b.start_date), day));
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div key={day.toString()} className={`bg-white min-h-[160px] p-5 group transition-all cursor-pointer ${isToday ? 'bg-blue-50/20' : 'hover:bg-slate-50'}`}>
                       <p className={`text-sm font-black mb-4 ${isToday ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-900'}`}>
                          {format(day, 'd')}
                       </p>
                       <div className="space-y-2">
                          {dayBookings.map(booking => (
                             <div key={booking.id} className="p-2.5 rounded-xl bg-white border shadow-sm text-[9px] font-black text-slate-700 truncate border-l-4 border-l-blue-600 uppercase tracking-tighter">
                                Arrival: {booking.customers?.last_name}
                             </div>
                          ))}
                       </div>
                    </div>
                  )
               })}
            </div>
         )}
      </div>
    </div>
  )
}
