'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-24 pb-12 border-t border-brand-gold/15 font-sans relative overflow-hidden">
      {/* Visual luxury accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-wide text-white">BILU G TRAVELS</span>
              <span className="text-xs font-display font-bold tracking-[0.3em] text-brand-gold">KASHMIR DMC</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              An ultra-premium Destination Management Company and Luxury Lodging Partner in Kashmir. Experience deep-rooted hospitality, bespoke Himalayan excursions, and high-end services crafted by local experts.
            </p>
            <div className="flex space-x-3 pt-2">
              <Link href="https://instagram.com" target="_blank" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" target="_blank" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" target="_blank" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
              <Link href="https://wa.me/916006070550" target="_blank" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all">
                <MessageCircle size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-display font-bold uppercase tracking-widest text-brand-gold">Bespoke Journeys</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-brand-gold transition-colors font-medium">Home Portal</Link></li>
              <li><Link href="/tour-packages" className="hover:text-brand-gold transition-colors font-medium">Luxury Packages</Link></li>
              <li><Link href="/hotels" className="hover:text-brand-gold transition-colors font-medium">Premium Hotels</Link></li>
              <li><Link href="/houseboats" className="hover:text-brand-gold transition-colors font-medium">Dal Lake Houseboats</Link></li>
              <li><Link href="/transport" className="hover:text-brand-gold transition-colors font-medium">Private Fleet & Cars</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-6">
            <h4 className="text-sm font-display font-bold uppercase tracking-widest text-brand-gold">HQ Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-white">+91 60060 70550</span>
                  <span className="text-xs text-slate-500 font-medium">Javid Farooq (Owner)</span>
                  <span className="font-bold text-white mt-1">+91 78894 08220</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="break-all text-white font-medium">bilugtourtravels1121@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Srinagar, Jammu & Kashmir,<br/>India - 190001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-6">
            <h4 className="text-sm font-display font-bold uppercase tracking-widest text-brand-gold">Newsletter Subscriptions</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Subscribe to get exclusive access to offbeat kashmir itineraries, seasonal travel reports, and snow updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors shadow-lg">
                <Send size={14} className="text-brand-navy" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-emerald font-bold animate-pulse">Thank you! You are now subscribed to the luxury newsletter.</p>
            )}
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Bilu G Travels Kashmir. All Rights Reserved. Crafted with local expertise.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
