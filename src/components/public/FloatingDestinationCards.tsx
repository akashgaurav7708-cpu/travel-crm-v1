'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';

const destinations = [
  { name: 'Gulmarg', price: '4,499', rating: '4.9', image: 'https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=300', x: '8%', y: '20%' },
  { name: 'Dal Lake', price: '2,999', rating: '5.0', image: 'https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=300', x: '78%', y: '15%' },
  { name: 'Gurez Valley', price: '12,999', rating: '4.8', image: 'https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=300', x: '12%', y: '60%' },
  { name: 'Bangus Valley', price: '9,999', rating: '4.7', image: 'https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=300', x: '82%', y: '65%' },
];

export default function FloatingDestinationCards() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {destinations.map((dest, index) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -50 : 50 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: [0, -15, 0]
          }}
          transition={{
            opacity: { duration: 1, delay: 1.5 + (index * 0.3) },
            scale: { duration: 1, delay: 1.5 + (index * 0.3) },
            x: { duration: 1, delay: 1.5 + (index * 0.3) },
            y: {
               duration: 5 + index,
               repeat: Infinity,
               ease: "easeInOut"
            }
          }}
          style={{ left: dest.x, top: dest.y }}
          className="absolute w-44 md:w-52 bg-white/10 backdrop-blur-2xl border border-white/20 p-3 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] hidden lg:block"
        >
          <div className="relative h-28 rounded-2xl overflow-hidden mb-3">
             <Image src={dest.image} alt={dest.name} fill className="object-cover" />
             <div className="absolute top-2 right-2 bg-brand-navy/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                <Star size={8} className="text-brand-gold fill-brand-gold" />
                <span className="text-[8px] font-black text-white">{dest.rating}</span>
             </div>
          </div>
          <div className="px-1">
            <h4 className="text-white font-black text-[11px] mb-1 flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin size={10} className="text-brand-gold" /> {dest.name}
            </h4>
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Starting</p>
              <p className="text-brand-gold font-black text-[10px]">{formatCurrency(dest.price)}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
