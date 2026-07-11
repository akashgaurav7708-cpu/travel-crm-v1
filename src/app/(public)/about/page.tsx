'use client';

import React from 'react';
import { ShieldCheck, Compass, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Who We Are</span>
          <h1 className="text-4xl md:text-7xl font-serif font-black tracking-tight mb-6">About Bilu G Travels</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the core ethos, high-end hospitality standards, and local Himalayan heritage behind Kashmir&apos;s most trusted Destination Management Company (DMC).
          </p>
          <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
        </div>

        {/* Detailed Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden h-[450px] shadow-2xl border border-brand-gold/15"
          >
            <img src="/images/about_us.jpg" alt="Kashmir Dal Lake Home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
          </motion.div>

          <div className="space-y-6">
            <span className="text-brand-gold text-xs font-display font-black uppercase tracking-widest">A Personal Message</span>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-brand-navy dark:text-white leading-tight">Welcome from Javid Farooq</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              &quot;As a native Kashmiri, travel is not just a commercial business to us; it is a sacred extension of local hospitality. For over a decade, we have hosted honeymooners, large multi-generational families, trek adventurers, and high-level corporate delegates. We own premier houseboats on Dal Lake and manage a private luxury transport fleet directly, ensuring that no middle-commissions are charged to our guests. Everything is designed around absolute luxury, safety, and authentic Himalayan beauty.&quot;
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold"></span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Owner & Local DMC Director: Javid Farooq</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold"></span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Headquarters: Srinagar, Jammu & Kashmir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Core Values */}
        <div className="bg-slate-50/50 dark:bg-zinc-900/30 p-12 md:p-16 rounded-[3.5rem] border border-slate-100 dark:border-zinc-800/80">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-2 block">Our Pillars</span>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-navy dark:text-white">The Bilu G Core Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold mx-auto shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-navy dark:text-white">Guaranteed Ground Safety</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Kashmir is incredibly warm, peaceful, and welcoming. We provide 24/7 ground crew tracking, vetted direct hotels, and fully secure routes.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold mx-auto shadow-lg">
                <Compass className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-navy dark:text-white">Local Mountain Expertise</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                By booking directly with local experts, you avoid middle travel agency commissions, getting authentic recommendations and permissions.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-brand-gold mx-auto shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-navy dark:text-white">Bespoke Personal Care</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                From heated bedroom blankets, romantic flower setups, special baby food arrangements, to wheelchair accessibility, we design everything around you.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
