'use client';

import React, { useState } from 'react';
import { Star, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import InquiryModal from '@/components/public/InquiryModal';

const houseboats = [
  {
    name: "Royal Palace Group of Houseboats",
    lake: "Dal Lake Front",
    price: "8,500",
    image: "/images/houseboat_slider_1.jpg",
    rating: "5.0",
    rooms: "Luxury 3/4 Bedroom Suite",
    desc: "Our signature flagship houseboat docked on Dal Lake's premium front rows. Crafted completely with aged cedar logs, this heritage floating villa boasts intricate hand-carved ceilings, authentic Kashmiri rugs, separate royal dining chambers, and custom shikara shuttle bridges."
  },
  {
    name: "Kashmir Heritage Floating Resort",
    lake: "Nigeen Lake",
    price: "11,500",
    image: "/images/houseboat_slider_2.jpg",
    rating: "4.9",
    rooms: "Premium Suite Rooms",
    desc: "Docked in the tranquil, peaceful waters of Nigeen Lake, this houseboat is perfect for high-end travelers and honeymooners seeking serene solace. Features pristine private wood decks overlooking snowy peaks, luxury bathroom fixtures, and gourmet Kashmiri chefs."
  },
  {
    name: "Signature Woodcraft Houseboat",
    lake: "Dal Lake Golden Meadow",
    price: "6,000",
    image: "/images/about_us.jpg",
    rating: "4.8",
    rooms: "Royal Honeymoon Suite",
    desc: "A boutique, heavily cozy houseboat themed around romantic traditional retreats. Includes flower bed setups, candlelight dinners, heated cedar rooms, hot water, and a complimentary Shikara evening ride across the floating vegetable market."
  }
];

export default function HouseboatsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHb, setSelectedHb] = useState<string | undefined>(undefined);

  const openInquiry = (hbName: string) => {
    setSelectedHb(`Houseboat Booking: ${hbName}`);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Floating Paradises</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-6">Signature Dal Lake Houseboats</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed font-sans">Experience a royal floating stay carved with centuries-old cedar woodcraft. Direct heritage properties owned and operated by Javid Farooq's local family.</p>
          <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
        </div>

        {/* Listings Layout */}
        <div className="space-y-16">
          {houseboats.map((hb, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={hb.name}
              className={`flex flex-col lg:flex-row gap-12 items-center bg-slate-50/50 dark:bg-zinc-900/30 p-8 rounded-[3.5rem] border border-slate-100 dark:border-zinc-800 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full h-[380px] rounded-[2.5rem] overflow-hidden border border-brand-gold/15 relative shadow-xl shrink-0">
                <img src={hb.image} alt={hb.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-6 left-6 bg-brand-navy text-brand-gold px-4 py-2 text-[10px] font-display font-black uppercase tracking-widest rounded-xl shadow">
                  {hb.lake}
                </span>
              </div>

              {/* Specs */}
              <div className="lg:w-1/2 w-full space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-brand-gold text-[10px] font-display font-black uppercase tracking-[0.2em] flex items-center gap-1 font-bold">
                    <Waves className="w-3.5 h-3.5" /> Traditional Floating Villa
                  </span>
                  <span className="flex items-center gap-1 bg-brand-navy text-brand-gold px-3 py-1 rounded-xl text-xs font-display font-black">
                    <Star className="w-3.5 h-3.5" fill="#D4AF37" stroke="none" /> {hb.rating}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-navy dark:text-white leading-tight">{hb.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans">{hb.desc}</p>
                <div className="flex gap-4 items-center pt-2">
                  <span className="text-xs bg-slate-100 dark:bg-zinc-800 border dark:border-zinc-700 px-3.5 py-1.5 text-slate-500 dark:text-slate-300 font-bold uppercase rounded-lg font-sans">
                    {hb.rooms}
                  </span>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between font-sans">
                  <div>
                    <p className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-400 mb-0.5">Starting At</p>
                    <p className="text-xl font-serif font-black text-brand-navy dark:text-white">₹{hb.price}<span className="text-xs text-slate-400 font-medium"> / night</span></p>
                  </div>
                  <button
                    onClick={() => openInquiry(hb.name)}
                    className="bg-brand-navy text-white px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg"
                  >
                    Request Reservation
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageName={selectedHb} />
    </div>
  );
}
