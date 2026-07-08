'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-black tracking-tighter">BILU G TRAVELS</span>
              <span className="text-xs font-bold tracking-[0.3em] text-brand-gold">KASHMIR DMC</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Your trusted local destination management company in Kashmir. We specialize in luxury tours, offbeat explorations, and authentic experiences in the valley of paradise.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Globe size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/tour-packages" className="hover:text-white transition-colors">Kashmir Packages</Link></li>
              <li><Link href="/offbeat-kashmir" className="hover:text-white transition-colors">Offbeat Kashmir</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+91 60060 70550<br/>+91 78894 08220</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>bilugtourtravels1121@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>Srinagar, Jammu & Kashmir,<br/>India - 190001</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-gold">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe to get special offers and travel updates.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <Send size={14} className="text-brand-navy" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Bilu G Travels Kashmir. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
