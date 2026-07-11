'use client';

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const blogs = [
  {
    title: "Gulmarg Snow Report: Fresh Winter Accumulations",
    tag: "Snow Updates",
    date: "November 24, 2024",
    author: "Javid Farooq",
    image: "/images/blog_tips.jpg",
    desc: "A massive western disturbance has triggered fresh, heavy snowfall across Apharwat Peaks in Gulmarg. Ski slopes are currently being packed by local departments. Learn complete road closures, winter tyre chains advisory, and Gondola ticket bookings here."
  },
  {
    title: "Is Gurez Valley accessible during winters?",
    tag: "Travel Information",
    date: "October 18, 2024",
    author: "Javid Farooq",
    image: "/images/blog_snow.jpg",
    desc: "Gurez Valley pass (Razdan Pass) typically closes during peak winter snowfalls (December to March). In this complete travel brief, learn how Bilu G Travels manages special winter permission permits and books helicopter flights to keep Gurez valley accessible for extreme explorers."
  },
  {
    title: "Srinagar Mughal Gardens Spring Bloom Guide",
    tag: "Travel Tips",
    date: "September 12, 2024",
    author: "Bilu G Team",
    image: "/images/blog_weather.jpg",
    desc: "Planning your spring family vacation to Srinagar? Read our direct local advice on optimal dates to explore the Tulip Gardens, Chashme Shahi, Shalimar Gardens, and Nishat Bagh when the spring blossoms are at their peak."
  },
  {
    title: "The Ultimate Guide to Kashmiri Wazwan Feasts",
    tag: "Kashmir Food",
    date: "August 04, 2024",
    author: "Javid Farooq",
    image: "/images/pkg_luxury.jpg",
    desc: "Wazwan is not just meals; it is a sacred culinary craft in Kashmir. Read Javid Farooq&apos;s personalized recommendations on authentic local chefs, the significance of the copper trami, and must-try dishes like Rista, Gushtaba, and Rogan Josh."
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Travel Intel</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-6">Himalayan Travel Diaries</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">Direct mountain advisories, snow updates, weather forecasts, food guides, and hidden valley trails written by local experts.</p>
          <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
        </div>

        {/* Blog layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((b, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={b.title}
              className="group flex flex-col justify-between bg-slate-50/50 dark:bg-zinc-900/30 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-zinc-800/80 p-8 hover:shadow-2xl transition-all"
            >
              <div className="space-y-6">
                <div className="relative h-64 rounded-[2rem] overflow-hidden border border-brand-gold/10">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-navy px-3.5 py-1.5 rounded-full text-[9px] font-display font-black uppercase tracking-widest shadow">
                    {b.tag}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>By {b.author}</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-serif font-black text-brand-navy dark:text-white leading-snug group-hover:text-brand-gold transition-colors">{b.title}</h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">{b.desc}</p>
              </div>

              <button
                onClick={() => alert(`Full article loading... In the meantime, you can reach out to Javid Farooq on WhatsApp +916006070550 for the latest details!`)}
                className="mt-8 text-[11px] font-display font-black uppercase tracking-widest text-brand-navy dark:text-slate-300 hover:text-brand-gold flex items-center gap-2 group/btn"
              >
                Read Full Advisory <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
