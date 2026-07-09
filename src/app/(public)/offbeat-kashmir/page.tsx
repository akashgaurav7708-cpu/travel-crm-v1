'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, ArrowRight } from 'lucide-react';

const offbeatDestinations = [
  { name: "Gurez Valley", price: "17,999", description: "The crown jewel of North Kashmir, known for its pristine beauty and the Habba Khatoon peak.", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800" },
  { name: "Bangus Valley", price: "12,999", description: "A vast high-altitude meadow in Kupwara district, offering untouched lush green landscapes.", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800" },
  { name: "Keran Valley", price: "11,999", description: "Located right on the Line of Control, offering a unique perspective and stunning river views.", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800" },
  { name: "Lolab Valley", price: "12,499", description: "Known as the land of love and beauty, famous for its apple orchards and crystal clear springs.", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800" },
  { name: "Doodhpathri", price: "2,499", description: "The valley of milk, a beautiful meadow with a gushing river and pine forests.", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800" },
  { name: "Warwan Valley", price: "26,999", description: "One of the most remote and stunning valleys in Kashmir, perfect for trekking enthusiasts.", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800" },
];

export default function OffbeatKashmir() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Off the Beaten Path</span>
          <h1 className="text-4xl md:text-7xl font-black text-brand-navy tracking-tighter mb-8 italic">Hidden Gems of Kashmir</h1>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the untouched beauty of Kashmir. We take you to destinations that remain hidden from the average tourist, offering true tranquility and raw natural beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-20">
           {offbeatDestinations.map((dest, index) => (
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               key={dest.name}
               className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
             >
               <div className="flex-1 w-full relative">
                 <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 bg-brand-gold text-brand-navy p-6 rounded-[2rem] shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Starting At</p>
                    <p className="text-2xl font-black">${dest.price}</p>
                 </div>
               </div>
               <div className="flex-1 space-y-6">
                 <div className="flex items-center gap-3 text-brand-gold">
                   <Compass size={24} />
                   <span className="text-xs font-black uppercase tracking-[0.2em]">Offbeat Expedition</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight">{dest.name}</h2>
                 <p className="text-slate-500 text-lg leading-relaxed">{dest.description}</p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                       <MapPin size={18} className="text-brand-gold" /> Kupwara Region
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                       <Compass size={18} className="text-brand-gold" /> Best: May - Sept
                    </div>
                 </div>
                 <button className="bg-brand-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-navy transition-all shadow-xl flex items-center gap-3">
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
