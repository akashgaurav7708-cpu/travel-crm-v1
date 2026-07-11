'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, ArrowRight } from 'lucide-react';

const offbeatDestinations = [
  { name: "Gurez Valley", price: "17,999", description: "The crown jewel of North Kashmir, known for its pristine beauty and the Habba Khatoon peak.", image: "/images/dest_gurez.jpg" },
  { name: "Bangus Valley", price: "12,999", description: "A vast high-altitude meadow in Kupwara district, offering untouched lush green landscapes.", image: "/images/dest_bangus.jpg" },
  { name: "Lolab Valley", price: "12,499", description: "Known as the land of love and beauty, famous for its apple orchards and crystal clear springs.", image: "/images/dest_lolab.jpg" },
  { name: "Keran Valley", price: "11,999", description: "Located right on the Line of Control, offering a unique perspective and stunning river views.", image: "/images/dest_keran.jpg" },
  { name: "Machil", price: "14,500", description: "A pristine meadow pass on the borders, surrounded by dense pine forests and cold water springs.", image: "/images/pkg_4n5d.jpg" },
  { name: "Karnah", price: "15,000", description: "A remote, breathtaking valley nestled in Kupwara mountains, accessible through the high Sadhna Pass.", image: "/images/pkg_5n6d.jpg" },
  { name: "Warwan Valley", price: "26,999", description: "One of the most remote and stunning valleys in Kashmir, perfect for trekking enthusiasts.", image: "/images/pkg_6n7d.jpg" },
  { name: "Tosamaidan", price: "13,500", description: "The king of meadows, offering sprawling lush pasturelands nestled in Budgam's mountains.", image: "/images/pkg_luxury.jpg" },
  { name: "Daksum", price: "10,500", description: "A highly tranquil coniferous forest retreat in Anantnag with pure mountain stream trout streams.", image: "/images/blog_tips.jpg" },
  { name: "Chatpal", price: "11,200", description: "An untouched, secret slice of heaven located deep in South Kashmir, offering absolute quiet.", image: "/images/blog_weather.jpg" },
  { name: "Kishtwar", price: "18,500", description: "Known for spectacular mountain gorges, high-altitude saffron farms, and deep wilderness cliffs.", image: "/images/dest_doodhpathri.jpg" },
  { name: "Dawar", price: "16,800", description: "The central log-cabin capital of Gurez, retaining rich Dard-Shin cultural heritage.", image: "/images/dest_yusmarg.jpg" },
  { name: "Tulail Valley", price: "19,200", description: "A remote, breathtaking sub-valley of Gurez filled with wild flowers and cascading rivers.", image: "/images/dest_aharbal.jpg" }
];

export default function OffbeatKashmir() {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Off the Beaten Path</span>
          <h1 className="text-4xl md:text-7xl font-serif font-black text-brand-navy dark:text-white tracking-tighter mb-8">Hidden Gems of Kashmir</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-sans">
            Experience the untouched beauty of Kashmir. We take you to destinations that remain hidden from the average tourist, offering true tranquility and raw natural beauty.
          </p>
          <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-20">
           {offbeatDestinations.map((dest, index) => (
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               key={dest.name}
               className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center bg-slate-50/40 dark:bg-zinc-900/20 p-8 rounded-[3rem] border dark:border-zinc-800`}
             >
               <div className="flex-1 w-full relative">
                 <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 bg-brand-gold text-brand-navy p-6 rounded-[2rem] shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Starting At</p>
                    <p className="text-2xl font-serif font-black">₹{dest.price}</p>
                 </div>
               </div>
               <div className="flex-1 space-y-6">
                 <div className="flex items-center gap-3 text-brand-gold">
                   <Compass size={24} />
                   <span className="text-xs font-black uppercase tracking-[0.2em]">Offbeat Expedition</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-tight">{dest.name}</h2>
                 <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-sans">{dest.description}</p>
                 <div className="flex flex-wrap gap-4 pt-4 font-sans">
                    <div className="flex items-center gap-2 text-brand-navy dark:text-slate-300 font-bold text-sm">
                       <MapPin size={18} className="text-brand-gold" /> Kupwara Region
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy dark:text-slate-300 font-bold text-sm">
                       <Compass size={18} className="text-brand-gold" /> Best: May - Sept
                    </div>
                 </div>
                 <button className="bg-brand-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-navy transition-all shadow-xl flex items-center gap-3 border dark:border-zinc-800">
                   Explore {dest.name} <ArrowRight size={18} />
                 </button>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
