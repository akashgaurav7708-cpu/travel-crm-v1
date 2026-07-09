'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Bus, Hotel, Utensils, Camera, Save, Loader2, Calendar, Sparkles, ChevronRight, Share2, Download, CheckCircle2, Clock, MapPin, Mail, MessageSquare
} from 'lucide-react';
import { itineraryService, bookingsService } from '@/lib/services/index';
import { aiService } from '@/lib/ai/engine';
import { pdfGenerator } from '@/lib/pdf/generator';

function ItineraryBuilderContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [activeDay, setActiveDay] = useState(1);
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    if (bookingId) {
      async function loadData() {
        try {
          const [bookingData, itineraryData] = await Promise.all([
            bookingsService.getById(bookingId as string),
            itineraryService.getByBooking(bookingId as string)
          ]);

          setBooking(bookingData);
          if (itineraryData) {
            setItinerary(itineraryData);
            const flattened: any[] = [];
            itineraryData.itinerary_days?.forEach((day: any) => {
               day.itinerary_activities?.forEach((act: any) => {
                  flattened.push({ ...act, day_number: day.day_number });
               });
            });
            setActivities(flattened);
          }
        } catch (error) {
          console.error('Failed to load itinerary:', error);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const generateAiItinerary = async () => {
    if (!booking) return;
    setAiGenerating(true);
    try {
       const prompt = {
          destination: booking.tour_packages?.name || 'Kashmir',
          budget: booking.total_amount,
          days: 7
       };
       const result = await aiService.generateItinerary(prompt);
       alert(`AI Assistant: Successfully designed "${result.title}"`);
    } catch (err) {
       console.error(err);
    } finally {
       setAiGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
     await pdfGenerator.generateDocument('itinerary-workspace', `Itinerary_${bookingId?.substring(0,8)}`);
  };

  const shareOnWhatsApp = () => {
    if (!booking) return;
    const message = `Hi ${booking.customers?.first_name}, here is your itinerary for ${booking.tour_packages?.name || 'Kashmir'}. You can view it here: ${window.location.href}`;
    window.open(`https://wa.me/${booking.customers?.phone?.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const sendEmail = () => {
    if (!booking) return;
    const subject = `Your Itinerary: ${booking.tour_packages?.name || 'Kashmir'}`;
    const body = `Hi ${booking.customers?.first_name},\n\nPlease find your trip itinerary below:\n\n${window.location.href}`;
    window.location.href = `mailto:${booking.customers?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!bookingId) {
    return (
      <div className="max-w-4xl mx-auto mt-20">
         <div className="rounded-[3rem] border-2 border-dashed p-20 text-center bg-white shadow-2xl shadow-blue-50">
            <Calendar className="h-16 w-12 text-blue-600 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-slate-900">Itinerary Workspace</h3>
            <p className="mt-4 text-slate-500 font-medium text-lg max-w-md mx-auto">Select a booking to launch the high-fidelity AI assistant.</p>
            <button onClick={() => window.location.href = '/bookings'} className="mt-10 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black text-white hover:bg-blue-600 transition-all flex items-center mx-auto">
               Go to Bookings <ChevronRight className="ml-2 h-4 w-4" />
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">
             {booking?.tour_packages?.name || 'Custom Exploration'}
           </h2>
           <p className="text-slate-500 font-bold flex items-center mt-1 uppercase text-[10px] tracking-widest">
             Ref: <span className="text-blue-600 ml-1">#{bookingId.substring(0, 8).toUpperCase()}</span>
             <span className="mx-3 opacity-20">|</span>
             Draft Version V2.0.4
           </p>
        </div>
        <div className="flex gap-2">
          <button onClick={shareOnWhatsApp} className="rounded-xl border bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-green-600 hover:bg-green-50 transition-all flex items-center shadow-sm">
             <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
          </button>
          <button onClick={sendEmail} className="rounded-xl border bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-all flex items-center shadow-sm">
             <Mail className="mr-2 h-4 w-4" /> Email
          </button>
          <button onClick={handleDownloadPdf} className="rounded-xl border bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all flex items-center shadow-sm">
             <Download className="mr-2 h-4 w-4" /> Export PDF
          </button>
          <button onClick={generateAiItinerary} disabled={aiGenerating} className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center disabled:opacity-50">
             {aiGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
             AI Optimize
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-20 flex flex-col gap-3 py-2">
           {[1, 2, 3, 4, 5, 6, 7].map(d => (
              <button key={d} onClick={() => setActiveDay(d)} className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${activeDay === d ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white text-slate-400 hover:bg-slate-50 border shadow-sm'}`}>
                 <span className="text-[10px] font-black uppercase">Day</span>
                 <span className="text-xl font-black">{d}</span>
              </button>
           ))}
        </div>

        <div id="itinerary-workspace" className="flex-1 bg-white rounded-[2rem] border shadow-xl shadow-slate-100 flex flex-col overflow-hidden">
           <div className="px-10 py-8 border-b flex items-center justify-between text-slate-900">
              <div className="flex items-center gap-4">
                 <h3 className="text-2xl font-black">Day {activeDay}: City Arrival & Discovery</h3>
                 <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-tighter flex items-center border border-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> All Reservations Confirmed
                 </span>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-10">
              <div className="relative pl-12 space-y-10">
                 <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>
                 <ActivityItem time="09:00 AM" title="Airport Pick-up & Transfer" type="transport" location="Terminal 3 Gate 4" desc="Luxury private vehicle with English speaking driver." />
                 <ActivityItem time="01:30 PM" title="Welcome Lunch" type="meal" location="Kashmiri Wazwan Specialist" desc="Authentic local cuisine experience." />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ time, title, type, location, desc }: any) {
   const icons: any = { transport: Bus, hotel: Hotel, meal: Utensils, default: Camera };
   const Icon = icons[type] || icons.default;
   return (
      <div className="group relative flex items-start gap-8">
         <div className="absolute -left-[37px] top-0 h-12 w-12 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center text-blue-600 shadow-sm transition-all z-10 group-hover:bg-blue-600 group-hover:text-white">
            <Icon className="h-4 w-4" />
         </div>
         <div className="flex-1 bg-slate-50/50 rounded-3xl p-8 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
               <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-lg border shadow-sm flex items-center tracking-widest"><Clock className="h-3 w-3 mr-2" /> {time}</span>
               <h4 className="font-black text-slate-900 text-lg">{title}</h4>
            </div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center"><MapPin className="h-3 w-3 mr-1" /> {location}</p>
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4">{desc}</p>
         </div>
      </div>
   );
}

export default function ItineraryBuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>}>
      <ItineraryBuilderContent />
    </Suspense>
  );
}
