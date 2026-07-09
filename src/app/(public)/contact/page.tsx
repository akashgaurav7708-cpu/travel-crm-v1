'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Get in Touch</span>
            <h1 className="text-4xl md:text-7xl font-black text-brand-navy tracking-tighter mb-8">Let&apos;s Plan Your <br/><span className="text-brand-gold italic">Dream Trip</span></h1>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed">
              Have questions about our packages or want a customized itinerary? Our team of local experts is here to help you create the perfect Kashmir experience.
            </p>

            <div className="space-y-8">
              <ContactInfoItem
                icon={<Phone className="text-brand-gold" />}
                title="Call Us"
                detail="+91 60060 70550 / +91 78894 08220"
              />
              <ContactInfoItem
                icon={<Mail className="text-brand-gold" />}
                title="Email Us"
                detail="bilugtourtravels1121@gmail.com"
              />
              <ContactInfoItem
                icon={<MapPin className="text-brand-gold" />}
                title="Visit Us"
                detail="Srinagar, Jammu & Kashmir, India - 190001"
              />
              <ContactInfoItem
                icon={<MessageSquare className="text-brand-gold" />}
                title="WhatsApp"
                detail="Available 24/7 for support"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>

             <h2 className="text-2xl font-black text-brand-navy mb-8">Send an Inquiry</h2>
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                      <input type="text" placeholder="+91 00000 00000" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                   <input type="email" placeholder="john@example.com" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Travel Date</label>
                      <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Adults</label>
                      <select className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                         <option>1 Adult</option>
                         <option>2 Adults</option>
                         <option>3+ Adults</option>
                      </select>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Special Requirements</label>
                   <textarea rows={4} placeholder="Tell us more about your trip..." className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>
                </div>
                <button className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-navy transition-all shadow-xl flex items-center justify-center gap-3">
                   Send Inquiry <Send size={18} />
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, detail }: any) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
         {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</h4>
        <p className="text-lg font-black text-brand-navy">{detail}</p>
      </div>
    </div>
  );
}
