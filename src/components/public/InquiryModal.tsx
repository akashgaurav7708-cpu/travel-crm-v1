'use client';

import React from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

const InquiryModal = ({ isOpen, onClose, packageName }: InquiryModalProps) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = `Hello Bilu G Travels Kashmir, I want to book a Kashmir Tour Package${packageName ? ': ' + packageName : ''}. Please share complete details.`;
    window.open(`https://wa.me/916006070550?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
               <span className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-2 block">Quick Inquiry</span>
               <h2 className="text-3xl font-black text-brand-navy tracking-tight">Get a Free Quote</h2>
               {packageName && <p className="text-brand-gold font-bold text-sm mt-1">Interested in: {packageName}</p>}
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                <input type="text" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                <input type="text" onFocus={(e) => e.target.type = 'date'} placeholder="Travel Date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                  <option>Destination</option>
                  <option>Srinagar</option>
                  <option>Gulmarg</option>
                  <option>Pahalgam</option>
                  <option>Offbeat Valley</option>
                </select>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                  <option>Adults</option>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3+ Adults</option>
                </select>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                  <option>Children</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2+</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                  <option>Hotel Category</option>
                  <option>Budget</option>
                  <option>Deluxe (3 Star)</option>
                  <option>Luxury (4 Star)</option>
                  <option>Premium (5 Star)</option>
                </select>
                <input type="text" placeholder="Your Budget (Optional)" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <textarea rows={3} placeholder="Special Requirements..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <button
                   type="button"
                   onClick={handleWhatsApp}
                   className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-3"
                 >
                   <MessageCircle size={18} /> Send on WhatsApp
                 </button>
                 <button
                   type="button"
                   className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-3 shadow-xl"
                 >
                   <Send size={18} /> Send Inquiry
                 </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryModal;
