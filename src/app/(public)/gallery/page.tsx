'use client';

import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { url: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", title: "Dal Lake, Srinagar" },
  { url: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", title: "Gulmarg Gondola" },
  { url: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", title: "Pahalgam Valley" },
  { url: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", title: "Sonamarg Glaciers" },
  { url: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800", title: "Luxury Houseboat" },
  { url: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", title: "Tulip Garden" },
  { url: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", title: "Aru Valley" },
  { url: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", title: "Betab Valley" },
  { url: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", title: "Yusmarg Meadows" },
];

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Visual Journey</span>
          <h1 className="text-4xl md:text-7xl font-black text-brand-navy tracking-tighter mb-8">Kashmir in Frames</h1>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            A glimpse into the stunning landscapes, vibrant culture, and serene beauty of the Kashmir valley through our lens.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="relative group overflow-hidden rounded-[2rem] shadow-xl cursor-pointer"
            >
              <img src={img.url} alt={img.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                 <p className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Destination</p>
                 <h3 className="text-xl font-black text-white">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
