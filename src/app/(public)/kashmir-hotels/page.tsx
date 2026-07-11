'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryModal from '@/components/public/InquiryModal';

const hotels = [
  { id: 1, name: "The Khyber Himalayan Resort", class: "5-Star", location: "Gulmarg", price: "24,500", image: "/images/hotel_khyber.jpg", rating: 5.0, description: "Kashmir's premium 5-star ski resort nestled in pristine Apharwat hills, boasting central heating, luxury spa, and a heated glass indoor pool." },
  { id: 2, name: "Taj Lake Palace Kashmir", class: "5-Star", location: "Srinagar", price: "28,000", image: "/images/hotel_taj.jpg", rating: 5.0, description: "A floating royal paradise carved on Dal Lake, offering ultra-luxurious suites, personal butler services, and unparalleled lake views." },
  { id: 3, name: "Radisson Blu Srinagar", class: "Luxury", location: "Srinagar", price: "14,500", image: "/images/hotel_radisson.jpg", rating: 4.8, description: "Modern luxury with authentic Kashmiri architecture. Perfect executive suites, multi-cuisine restaurants, and premier spa experiences." },
  { id: 4, name: "Pine N Peak Resort", class: "Luxury", location: "Pahalgam", price: "16,000", image: "/images/hotel_pinepeak.jpg", rating: 4.9, description: "Perched beautifully on Pahalgam hills, overlooking the roaring Lidder River. Warm wooden lounges, bonfires, and customized hospitality." },
  { id: 5, name: "Grand Mumtaz Resort", class: "Premium", location: "Pahalgam", price: "11,500", image: "/images/hotel_grandmumtaz.jpg", rating: 4.7, description: "Traditional comfort combined with modern amenities. Features pristine garden settings, Wazwan delicacies, and cozy wood fireplaces." },
  { id: 6, name: "Hotel Highlands Park", class: "Premium", location: "Gulmarg", price: "13,000", image: "/images/hotel_highlands.jpg", rating: 4.8, description: "A historic, iconic heritage resort in Gulmarg offering vintage lounge setups, stunning views of Mt. Apharwat, and local ski-guides." },
  { id: 7, name: "Kolahoi Green Heights", class: "Deluxe", location: "Gulmarg", price: "8,500", image: "/images/hotel_kolahoi.jpg", rating: 4.6, description: "Cozy rooms, centrally heated, located just minutes away from the Gondola boarding point. Ideal for couples and skiing families." },
  { id: 8, name: "Royal Palace Residency", class: "Deluxe", location: "Srinagar", price: "7,000", image: "/images/hotel_royalpalace.jpg", rating: 4.5, description: "A beautiful property in the heart of Srinagar, offering comfortable deluxe lodging, mountain views, and exceptional local service." }
];

export default function HotelsListing() {
  const [activeClass, setActiveClass] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | undefined>(undefined);

  const classes = ["All", "5-Star", "Luxury", "Premium", "Deluxe"];

  const filteredHotels = useMemo(() => {
    if (activeClass === "All") return hotels;
    return hotels.filter(h => h.class === activeClass);
  }, [activeClass]);

  const openInquiry = (hotelName: string) => {
    setSelectedHotel(`Hotel Stay: ${hotelName}`);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Lodgings</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-6">Our Selected Hotels</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">Handpicked elite hotels, heritage resorts, and premier mountain lodges vetted directly by Javid Farooq for unparalleled Kashmiri comfort.</p>
          <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {classes.map(cls => (
            <button
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`px-6 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all ${
                activeClass === cls ? 'bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy shadow-xl' : 'bg-slate-100 dark:bg-zinc-900 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Grid Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="wait">
            {filteredHotels.map(h => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={h.id}
                className="group bg-slate-50/50 dark:bg-zinc-900/30 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-brand-navy text-brand-gold px-3.5 py-1.5 rounded-xl text-[9px] font-display font-black uppercase tracking-widest shadow">
                    {h.class}
                  </span>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {h.location}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-display font-black bg-brand-navy text-brand-gold px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 text-brand-gold" fill="#D4AF37" stroke="none" /> {h.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors leading-tight">{h.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{h.description}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between font-sans">
                    <div>
                      <p className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-400 mb-0.5">Starting At</p>
                      <p className="text-lg font-serif font-black text-brand-navy dark:text-white">₹{h.price}<span className="text-xs text-slate-400 font-medium"> / night</span></p>
                    </div>
                    <button
                      onClick={() => openInquiry(h.name)}
                      className="bg-brand-navy text-white px-5 py-3 rounded-xl text-[10px] font-display font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                    >
                      Enquire Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageName={selectedHotel} />
    </div>
  );
}
