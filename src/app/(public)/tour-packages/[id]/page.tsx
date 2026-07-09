'use client';

import React from 'react';
import { Star, Clock, MapPin, CheckCircle2, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PackageDetail() {
  // In a real app, we would fetch data based on the ID
  const pkg = {
    name: "Classic Kashmir Valley",
    duration: "5 Days / 4 Nights",
    price: "13,999",
    images: [
      "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Experience the quintessential charm of Kashmir with our Classic Valley tour. From the serene Dal Lake to the snow-capped peaks of Gulmarg, this package covers all the must-visit highlights with luxury and comfort.",
    inclusions: ["4 Nights Accommodation", "Daily Breakfast & Dinner", "Airport Transfers", "Private Sightseeing Car", "Shikara Ride", "All Tolls & Taxes"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake", desc: "Welcome to Srinagar. Upon arrival, transfer to your houseboat. Enjoy a romantic Shikara ride in the evening." },
      { day: 2, title: "Srinagar to Gulmarg", desc: "Full day excursion to Gulmarg. Experience the world's highest Gondola ride and enjoy snow activities." },
      { day: 3, title: "Gulmarg to Pahalgam", desc: "Drive to Pahalgam, the Valley of Shepherds. Visit saffron fields and the ancient Avantipura ruins en route." },
      { day: 4, title: "Pahalgam Exploration", desc: "Visit Aru Valley, Betaab Valley, and Chandanwari. Return to Srinagar in the evening." },
      { day: 5, title: "Departure", desc: "Transfer to Srinagar airport for your flight back home with beautiful memories." }
    ]
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      {/* Photo Gallery Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 h-[600px] gap-2 px-2">
         <div className="md:col-span-2 relative overflow-hidden rounded-l-[2rem]">
            <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
         </div>
         <div className="grid grid-rows-2 gap-2">
            <div className="relative overflow-hidden">
               <img src={pkg.images[1]} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden">
               <img src={pkg.images[2]} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
         </div>
         <div className="relative overflow-hidden rounded-r-[2rem] hidden md:block">
            <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <button className="bg-white text-brand-navy px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">View All Photos</button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-10">
               <div className="flex items-center gap-4 mb-4">
                  <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-gold/20">{pkg.duration}</span>
                  <div className="flex items-center gap-1 text-brand-gold">
                    <Star size={14} fill="#D4AF37" />
                    <Star size={14} fill="#D4AF37" />
                    <Star size={14} fill="#D4AF37" />
                    <Star size={14} fill="#D4AF37" />
                    <Star size={14} fill="#D4AF37" />
                    <span className="text-slate-900 text-xs font-bold ml-1">(4.9/5 Rating)</span>
                  </div>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight mb-6">{pkg.name}</h1>
               <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-gold" /> Srinagar, Gulmarg, Pahalgam</span>
                  <span className="flex items-center gap-2"><Clock size={18} className="text-brand-gold" /> Best Season: All Year</span>
               </div>
            </div>

            <div className="prose prose-slate max-w-none mb-16">
               <h3 className="text-2xl font-black text-brand-navy mb-4">About This Package</h3>
               <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-brand-gold pl-6">{pkg.description}</p>
            </div>

            <div className="mb-16">
               <h3 className="text-2xl font-black text-brand-navy mb-8">Trip Itinerary</h3>
               <div className="space-y-8">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-8 group">
                       <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                             {day.day}
                          </div>
                          <div className="w-0.5 flex-grow bg-slate-100 my-2"></div>
                       </div>
                       <div className="pb-8">
                          <h4 className="text-xl font-black text-brand-navy mb-2">Day {day.day}: {day.title}</h4>
                          <p className="text-slate-500 leading-relaxed">{day.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-50 rounded-[2.5rem] p-10 border">
               <h3 className="text-2xl font-black text-brand-navy mb-8">What's Included</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.inclusions.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-600 font-bold">
                       <CheckCircle2 size={18} className="text-brand-emerald" /> {item}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 bg-white rounded-[2.5rem] border shadow-2xl p-8 md:p-10">
                <div className="mb-8">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Package Cost</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-brand-navy">${pkg.price}</span>
                      <span className="text-sm text-slate-400 font-medium">/ per person</span>
                   </div>
                   <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest mt-2">Inclusive of all taxes</p>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Travel Date</p>
                      <p className="text-sm font-black text-brand-navy">Select Date</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Travelers</p>
                      <p className="text-sm font-black text-brand-navy">2 Adults, 0 Children</p>
                   </div>
                </div>

                <div className="space-y-3">
                   <button className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-navy/90 transition-all shadow-xl">
                      Book This Package
                   </button>
                   <button className="w-full border-2 border-brand-navy text-brand-navy py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                      <Phone size={16} /> Call Expert
                   </button>
                   <button className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2">
                      <MessageCircle size={16} /> WhatsApp Us
                   </button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                   <div className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 size={16} />
                      <p className="text-[10px] font-bold">100% Secure Payment Guarantee</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
