'use client';

import React, { useState } from 'react';
import { ShieldCheck, Users, Briefcase, Star, Sparkles, MapPin, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import InquiryModal from '@/components/public/InquiryModal';

const vehicles = [
  {
    name: "Toyota Innova Crysta",
    type: "Premium SUV",
    capacity: "7 Guests",
    luggage: "4 Bags",
    rate: "₹4,500/day",
    image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600",
    desc: "The absolute standard of comfort in Kashmir. Features central heating, ample legroom, heavy shock-absorbers, premium interior bucket seats, and highly experienced mountain drivers. Recommended for family holidays and long valley transfers."
  },
  {
    name: "Premium SUV (Fortuner/Pajero)",
    type: "Luxury SUV",
    capacity: "6 Guests",
    luggage: "3 Bags",
    rate: "₹6,500/day",
    image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600",
    desc: "Rugged and heavily fortified luxury SUVs. Fitted with custom shock controllers, all-wheel drive, premium audio setups, and leather cabins. Perfect for high-altitude border valleys such as Gurez, Keran, and Bangus."
  },
  {
    name: "Force Urbania Luxury Edition",
    type: "Super Luxury Mini Bus",
    capacity: "12-17 Guests",
    luggage: "10 Bags",
    rate: "₹9,500/day",
    image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600",
    desc: "The pinnacle of executive group travel. Styled with individual recliner bucket seats, panoramic window screens, private LED displays, high-speed Wi-Fi, localized AC vents, and massive overhead luggage capacity. Recommended for large families and retreats."
  },
  {
    name: "Premium Sedan (Dezire/Etios)",
    type: "Standard Comfort",
    capacity: "4 Guests",
    luggage: "2 Bags",
    rate: "₹3,200/day",
    image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600",
    desc: "A highly reliable, economic, and extremely cozy daily commuter sedan. Includes a robust AC/heater system, clean premium upholstery, and professional drivers. Perfect for airport pickups and Srinagar local sightseeing."
  },
  {
    name: "Luxury Mercedes-Benz / BMW Lounge",
    type: "Ultra-Luxury Sedan",
    capacity: "4 Guests",
    luggage: "3 Bags",
    rate: "₹25,000/day",
    image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600",
    desc: "A high-end VIP sedan lounge designed for wedding shoots, corporate VIP delegates, and luxury couples. Boasts a panoramic sunroof, separate zone temperature controls, massaging seats, and VIP protocols."
  }
];

export default function TransportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFleet, setSelectedHb] = useState<string | undefined>(undefined);

  const openInquiry = (vName: string) => {
    setSelectedHb(`Fleet Enquiry: ${vName}`);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Fleet</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-6">Private Transport Fleet</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">Travel across Himalayan valleys in absolute safety, warmth, and premium comfort. All fleets are sanitised, heavily heated, and driven by licensed local experts.</p>
          <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
        </div>

        {/* Listings Layout */}
        <div className="space-y-16">
          {vehicles.map((vh, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={vh.name}
              className={`flex flex-col lg:flex-row gap-12 items-center bg-slate-50/50 dark:bg-zinc-900/30 p-8 rounded-[3.5rem] border border-slate-100 dark:border-zinc-800 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full h-[360px] rounded-[2.5rem] overflow-hidden border border-brand-gold/15 relative shadow-xl shrink-0">
                <img src={vh.image} alt={vh.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-6 left-6 bg-brand-navy text-brand-gold px-4 py-2 text-[10px] font-display font-black uppercase tracking-widest rounded-xl shadow">
                  {vh.type}
                </span>
              </div>

              {/* Specs */}
              <div className="lg:w-1/2 w-full space-y-6">
                <span className="text-brand-gold text-[10px] font-display font-black uppercase tracking-[0.2em] flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" /> High-End Private Transporter
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-navy dark:text-white leading-tight">{vh.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{vh.desc}</p>

                {/* Tech specifications */}
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100 dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{vh.capacity} Capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{vh.luggage} luggage capacity</span>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-400 mb-0.5">Fixed Rate</p>
                    <p className="text-xl font-serif font-black text-brand-navy dark:text-white">{vh.rate}<span className="text-xs text-slate-400 font-medium"> / day</span></p>
                  </div>
                  <button
                    onClick={() => openInquiry(vh.name)}
                    className="bg-brand-navy text-white px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg"
                  >
                    Enquire Taxi Booking
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageName={selectedFleet} />
    </div>
  );
}
