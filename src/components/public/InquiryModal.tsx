'use client';

import React, { useState } from 'react';
import { X, Send, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { leadsService } from '@/lib/services/crm';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

const InquiryModal = ({ isOpen, onClose, packageName }: InquiryModalProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    destination: 'Srinagar',
    adults: '2 Adults',
    children: '0',
    hotel: 'Deluxe (3 Star)',
    budget: '',
    requirements: ''
  });

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = `Hello Bilu G Travels Kashmir, I want to book a Kashmir Tour Package${packageName ? ': ' + packageName : ''}.

Name: ${formData.name}
Phone: ${formData.phone}
Travel Date: ${formData.date}
Destination: ${formData.destination}
Adults: ${formData.adults}

Please share complete details.`;
    window.open(`https://wa.me/916006070550?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadsService.create({
        first_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferred_package: packageName || formData.destination,
        source: 'Website',
        notes: `Adults: ${formData.adults}, Children: ${formData.children}, Hotel: ${formData.hotel}, Budget: ${formData.budget}, Requirements: ${formData.requirements}, Date: ${formData.date}`
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Inquiry error:", error);
      alert("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
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
            {submitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-brand-navy">Thank You!</h2>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Your inquiry has been received. Our Kashmir expert will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                   <span className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-2 block">Quick Inquiry</span>
                   <h2 className="text-3xl font-black text-brand-navy tracking-tight">Get a Free Quote</h2>
                   {packageName && <p className="text-brand-gold font-bold text-sm mt-1">Interested in: {packageName}</p>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="text" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                    <input required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} type="text" onFocus={(e) => e.target.type = 'date'} placeholder="Travel Date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                      <option>Srinagar</option>
                      <option>Gulmarg</option>
                      <option>Pahalgam</option>
                      <option>Offbeat Valley</option>
                    </select>
                    <select value={formData.adults} onChange={e => setFormData({...formData, adults: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3+ Adults</option>
                    </select>
                    <select value={formData.children} onChange={e => setFormData({...formData, children: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                      <option value="0">0 Children</option>
                      <option value="1">1 Child</option>
                      <option value="2+">2+ Children</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select value={formData.hotel} onChange={e => setFormData({...formData, hotel: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold appearance-none">
                      <option>Budget</option>
                      <option>Deluxe (3 Star)</option>
                      <option>Luxury (4 Star)</option>
                      <option>Premium (5 Star)</option>
                    </select>
                    <input value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} type="text" placeholder="Your Budget (Optional)" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} rows={3} placeholder="Special Requirements..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                     <button
                       type="button"
                       onClick={handleWhatsApp}
                       className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-3"
                     >
                       <MessageCircle size={18} /> WhatsApp Us
                     </button>
                     <button
                       type="submit"
                       disabled={loading}
                       className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                     >
                       {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Inquiry</>}
                     </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InquiryModal;
