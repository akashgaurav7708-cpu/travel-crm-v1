'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  MapPin,
  Clock,
  Utensils,
  Camera,
  Hotel,
  Bus,
  Save,
  Loader2,
  Trash2,
  Calendar,
  Sparkles,
  ChevronRight,
  GripVertical,
  Share2,
  Download,
  Copy,
  History,
  CloudSun,
  Backpack,
  Map as MapIcon,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';
import { itineraryService, bookingsService } from '@/lib/services/index';

function ItineraryBuilderContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [activeDay, setActiveDay] = useState(1);
  const [aiGenerating, setAiGenerating] = useState(false);

  const [newActivity, setNewActivity] = useState({
    day_number: 1,
    start_time: '09:00',
    activity_name: '',
    location: '',
    type: 'sightseeing',
    description: ''
  });

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
            // In the new schema, days are separate
            const flattenedActivities: any[] = [];
            itineraryData.itinerary_days?.forEach((day: any) => {
               day.itinerary_activities?.forEach((act: any) => {
                  flattenedActivities.push({ ...act, day_number: day.day_number });
               });
            });
            setActivities(flattenedActivities);
          } else {
            // Creation logic...
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
    setAiGenerating(true);
    // Simulate AI Generation
    await new Promise(r => setTimeout(r, 2500));
    setAiGenerating(false);
    alert('AI Itinerary has been generated based on booking preferences!');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
           <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Initializing v0.2 AI Engine...</p>
        </div>
      </div>
    );
  }

  if (!bookingId) {
    return (
      <div className="max-w-4xl mx-auto mt-20">
         <div className="rounded-3xl border-2 border-dashed p-20 text-center bg-white shadow-2xl shadow-blue-50">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 mb-8 transform -rotate-6">
               <Calendar className="h-12 w-12" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight">Itinerary Workspace</h3>
            <p className="mt-4 text-slate-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
               Select an active booking to launch the high-fidelity itinerary builder and AI assistant.
            </p>
            <div className="mt-10">
               <button
                  onClick={() => window.location.href = '/bookings'}
                  className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black text-white shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex items-center mx-auto"
               >
                  Go to Bookings <ChevronRight className="ml-2 h-4 w-4" />
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">Builder Mode</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                 <History className="h-3 w-3 mr-1" /> V2.0.4 Auto-saved
              </span>
           </div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900">
             {(booking as any)?.tour_packages?.name || 'Custom Exploration'}
           </h2>
           <p className="text-slate-500 font-bold flex items-center mt-1">
             Customer: <span className="text-slate-900 ml-1">{(booking as any)?.customers?.first_name} {(booking as any)?.customers?.last_name}</span>
             <span className="mx-3 opacity-20">|</span>
             Ref: <span className="text-blue-600 ml-1">#{bookingId.substring(0, 8).toUpperCase()}</span>
           </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all flex items-center shadow-sm">
             <Share2 className="mr-2 h-4 w-4" /> Share
          </button>
          <button className="rounded-xl border bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all flex items-center shadow-sm">
             <Download className="mr-2 h-4 w-4" /> PDF
          </button>
          <button
             onClick={generateAiItinerary}
             disabled={aiGenerating}
             className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 hover:bg-blue-500 transition-all flex items-center disabled:opacity-50"
          >
             {aiGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
             AI Optimize
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Navigation & Days */}
        <div className="w-20 flex flex-col gap-3 py-2">
           {[1, 2, 3, 4, 5, 6, 7].map(d => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${activeDay === d ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white text-slate-400 hover:bg-slate-50 border shadow-sm'}`}
              >
                 <span className="text-[10px] font-black uppercase">Day</span>
                 <span className="text-xl font-black">{d}</span>
              </button>
           ))}
           <button className="w-full aspect-square rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center border-2 border-dashed border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all">
              <Plus className="h-6 w-6" />
           </button>
        </div>

        {/* Workspace */}
        <div className="flex-1 bg-white rounded-[2rem] border shadow-xl shadow-slate-100 flex flex-col overflow-hidden">
           <div className="px-8 py-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h3 className="text-xl font-black text-slate-900">Day {activeDay}: Arrival & City Discovery</h3>
                 <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-tighter flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> All Confirmed
                 </span>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 text-slate-400">
                    <CloudSun className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-widest">24°C Sunny</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-400">
                    <Backpack className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-widest">Walk 2.4km</span>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Activity Cards Placeholder */}
              <div className="relative pl-12 space-y-8">
                 {/* Timeline Line */}
                 <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-slate-100 rounded-full"></div>

                 <ActivityItem
                    time="09:00 AM"
                    title="Airport Pick-up & Transfer"
                    type="transport"
                    location="Main Airport Terminal 3"
                    desc="Private luxury sedan waiting at exit gate with client name board."
                 />
                 <ActivityItem
                    time="11:30 AM"
                    title="Check-in at Grand Plaza Resort"
                    type="hotel"
                    location="Grand Plaza, Sea View Wing"
                    desc="Priority early check-in arranged. Welcome drinks on arrival."
                 />
                 <ActivityItem
                    time="01:30 PM"
                    title="Seafood Lunch at The Marina"
                    type="meal"
                    location="Marina Bay Wharf"
                    desc="Pre-booked table with ocean view. Set menu included."
                 />
                 <ActivityItem
                    time="03:30 PM"
                    title="Old City Walking Tour"
                    type="sightseeing"
                    location="Historic District Central"
                    desc="Guided tour with professional English speaking guide."
                 />
              </div>

              <button className="w-full py-6 border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 font-bold text-sm flex items-center justify-center hover:bg-slate-50 hover:border-blue-100 hover:text-blue-500 transition-all group">
                 <Plus className="h-5 w-5 mr-2 group-hover:scale-125 transition-transform" /> Add Activity to Timeline
              </button>
           </div>
        </div>

        {/* Side Panel: Tools */}
        <div className="w-80 space-y-6 overflow-y-auto pr-2 pb-4">
           <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl shadow-blue-100">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">
                 <Sparkles className="h-3 w-3" /> AI Itinerary Assistant
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-80">
                 "I noticed Day 3 is very packed. Would you like me to move the museum visit to the morning of Day 4 to optimize travel time?"
              </p>
              <div className="mt-6 flex flex-col gap-2">
                 <button className="w-full py-2.5 rounded-xl bg-blue-600 text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Yes, Optimize</button>
                 <button className="w-full py-2.5 rounded-xl bg-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">Keep Current</button>
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Inventory Quick-Add</h4>
              <div className="space-y-3">
                 <InventoryItem title="City Bus Shuttle" provider="Transport" price="15" />
                 <InventoryItem title="Riverside Diner" provider="Dining" price="45" />
                 <InventoryItem title="Museum Ticket" provider="Tickets" price="20" />
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border p-6 shadow-sm">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">Map View</h4>
              <div className="aspect-square bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                 <MapIcon className="h-10 w-10 mb-2 opacity-50" />
                 <span className="text-[10px] font-bold">Interactive Route Map</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ time, title, type, location, desc }: any) {
   const getIcon = () => {
      switch(type) {
         case 'transport': return <Bus className="h-4 w-4" />;
         case 'hotel': return <Hotel className="h-4 w-4" />;
         case 'meal': return <Utensils className="h-4 w-4" />;
         default: return <Camera className="h-4 w-4" />;
      }
   }
   return (
      <div className="group relative flex items-start gap-6">
         <div className="absolute -left-[37px] top-0 h-12 w-12 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 group-hover:border-blue-50 transition-all z-10">
            {getIcon()}
         </div>
         <div className="flex-1 bg-slate-50/50 rounded-3xl p-6 border border-transparent group-hover:border-blue-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-blue-50 transition-all">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-400 bg-white px-2 py-1 rounded-lg border shadow-sm flex items-center">
                     <Clock className="h-3 w-3 mr-1.5" /> {time}
                  </span>
                  <h4 className="font-black text-slate-900">{title}</h4>
               </div>
               <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"><Copy className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  <div className="p-2 text-slate-300 cursor-grab"><GripVertical className="h-4 w-4" /></div>
               </div>
            </div>
            <div className="flex items-center text-[11px] font-bold text-blue-600 mb-3">
               <MapPin className="h-3.5 w-3.5 mr-1" /> {location}
            </div>
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{desc}</p>
         </div>
      </div>
   );
}

function InventoryItem({ title, provider, price }: any) {
   return (
      <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
         <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600">
               <Plus className="h-4 w-4" />
            </div>
            <div>
               <p className="text-xs font-black text-slate-900">{title}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{provider}</p>
            </div>
         </div>
         <span className="text-xs font-black text-slate-900">${price}</span>
      </div>
   );
}

export default function ItineraryBuilderPage() {
  return (
    <Suspense fallback={
       <div className="flex h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
       </div>
    }>
      <ItineraryBuilderContent />
    </Suspense>
  );
}
