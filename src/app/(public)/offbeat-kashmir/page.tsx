'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, MapPin, ArrowRight, Star, Clock } from 'lucide-react';
import InquiryModal from '@/components/public/InquiryModal';
import { formatCurrency } from '@/lib/utils/currency';

const offbeatDestinations = [
  {
    name: "Gurez Valley",
    price: "17,999",
    duration: "4N/5D",
    region: "Bandipora",
    bestSeason: "June - Sept",
    rating: "4.9",
    description: "The crown jewel of North Kashmir, known for its pristine beauty and the Habba Khatoon peak. A land where time stands still.",
    image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Bangus Valley",
    price: "12,999",
    duration: "3N/4D",
    region: "Kupwara",
    bestSeason: "May - Oct",
    rating: "4.8",
    description: "A vast high-altitude meadow in Kupwara district, offering untouched lush green landscapes and thousands of wildflowers.",
    image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Keran Valley",
    price: "11,999",
    duration: "3N/4D",
    region: "Kupwara (LOC)",
    bestSeason: "May - Sept",
    rating: "4.7",
    description: "Located right on the Line of Control, offering a unique perspective and stunning river views. Experience the Kishanganga river at its best.",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Lolab Valley",
    price: "12,499",
    duration: "3N/4D",
    region: "Kupwara",
    bestSeason: "April - Oct",
    rating: "4.8",
    description: "Known as the land of love and beauty, famous for its apple orchards, crystal clear springs, and the cave of Kalaroos.",
    image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Doodhpathri",
    price: "2,499",
    duration: "Day Trip",
    region: "Budgam",
    bestSeason: "Year Round",
    rating: "4.9",
    description: "The valley of milk, a beautiful meadow with a gushing river and pine forests. Perfect for a peaceful picnic and horse riding.",
    image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Yusmarg",
    price: "2,299",
    duration: "Day Trip",
    region: "Budgam",
    bestSeason: "Year Round",
    rating: "4.8",
    description: "Believe the Meadows! Yusmarg is a quiet meadow that is said to have been visited by Jesus. Perfect for trekking to Nilnag lake.",
    image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Warwan Valley",
    price: "26,999",
    duration: "6N/7D",
    region: "Kishtwar",
    bestSeason: "July - Sept",
    rating: "5.0",
    description: "One of the most remote and stunning valleys in Kashmir, perfect for trekking enthusiasts and those seeking total isolation.",
    image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chatpal",
    price: "12,999",
    duration: "2N/3D",
    region: "Anantnag",
    bestSeason: "April - Oct",
    rating: "4.7",
    description: "A hidden gem in South Kashmir with no mobile connectivity, offering a true digital detox in the lap of nature.",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Aharbal",
    price: "2,499",
    duration: "Day Trip",
    region: "Kulgam",
    bestSeason: "Year Round",
    rating: "4.8",
    description: "The Niagara Falls of Kashmir. A stunning waterfall located in the Kulgam district, perfect for a day excursion.",
    image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tosamaidan",
    price: "13,999",
    duration: "2N/3D",
    region: "Budgam",
    bestSeason: "May - Sept",
    rating: "4.9",
    description: "A vast meadow in Budgam district, recently opened for tourism. Known for its historical significance and sprawling landscapes.",
    image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
  },
];

export default function OffbeatKashmir() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<string | undefined>(undefined);

  const openInquiry = (name: string) => {
    setSelectedDest(name);
    setIsModalOpen(true);
  };

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

        <div className="grid grid-cols-1 gap-24">
           {offbeatDestinations.map((dest, index) => (
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               key={dest.name}
               className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
             >
               <div className="flex-1 w-full relative group">
                 <div className="aspect-[4/3] md:aspect-[16/9] relative rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-6 bg-brand-gold text-brand-navy p-6 rounded-[2.5rem] shadow-2xl border-4 border-white z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Starting At</p>
                    <p className="text-3xl font-black">{formatCurrency(dest.price)}</p>
                 </div>
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Star size={14} className="text-brand-gold fill-brand-gold" />
                    <span className="text-xs font-black text-brand-navy">{dest.rating}</span>
                 </div>
               </div>

               <div className="flex-1 space-y-6">
                 <div className="flex items-center gap-3 text-brand-gold">
                   <Compass size={24} className="animate-pulse" />
                   <span className="text-xs font-black uppercase tracking-[0.2em]">Offbeat Expedition</span>
                   <div className="h-px bg-brand-gold/30 flex-1 ml-4 hidden lg:block"></div>
                 </div>

                 <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tight">{dest.name}</h2>
                    <div className="flex items-center gap-4">
                       <span className="text-brand-gold font-bold text-sm flex items-center gap-1.5">
                          <MapPin size={16} /> {dest.region}
                       </span>
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                       <span className="text-slate-400 font-bold text-sm flex items-center gap-1.5">
                          <Clock size={16} /> {dest.duration}
                       </span>
                    </div>
                 </div>

                 <p className="text-slate-500 text-lg leading-relaxed">{dest.description}</p>

                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Best Season to Visit</p>
                       <p className="text-brand-navy font-black">{dest.bestSeason}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Transport</p>
                       <p className="text-brand-navy font-black">Private 4x4 / Sedan</p>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-4 pt-4">
                    <button
                       onClick={() => openInquiry(dest.name)}
                       className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-navy transition-all shadow-xl hover:shadow-brand-gold/20 flex items-center gap-3 group"
                    >
                      Book Expedition <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="bg-white border-2 border-slate-100 text-brand-navy px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-brand-navy transition-all">
                       View Details
                    </button>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Info Box */}
        <div className="mt-32 bg-brand-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
           <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Need a Custom Offbeat Itinerary?</h3>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
                 Tell us your preferences and we will curate a unique journey through the hidden valleys of Kashmir just for you.
              </p>
              <button
                 onClick={() => openInquiry("Custom Offbeat")}
                 className="bg-brand-gold text-brand-navy px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl"
              >
                 Talk to our local expert
              </button>
           </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedDest}
      />
    </div>
  );
}
