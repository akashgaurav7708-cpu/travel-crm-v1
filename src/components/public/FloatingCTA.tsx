'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, FileText, ArrowUp, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryModal from './InquiryModal';

export default function FloatingCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    { sender: 'agent', text: 'Welcome to Bilu G Travels Kashmir! I am Javid Farooq. How can I help you customize your dream Kashmir luxury tour today?' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: question },
      { sender: 'agent', text: answer }
    ]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 font-sans">
        {/* Back To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white dark:bg-zinc-900 text-brand-navy dark:text-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100 dark:border-zinc-800 hover:bg-brand-gold hover:text-brand-navy dark:hover:text-brand-navy transition-all"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Live Chat Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-navy text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-display font-bold text-xs uppercase tracking-wider border border-brand-gold/20"
        >
          <Sparkles size={16} className="text-brand-gold animate-pulse" />
          <span>Live AI Assistant</span>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/916006070550"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-emerald text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-display font-bold text-xs uppercase tracking-wider"
        >
          <MessageCircle size={16} />
          <span>WhatsApp Us</span>
        </motion.a>

        {/* Direct Call Now Button */}
        <motion.a
          href="tel:+916006070550"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#222222] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-display font-bold text-xs uppercase tracking-wider border border-zinc-700"
        >
          <Phone size={16} />
          <span>Call Now</span>
        </motion.a>

        {/* Rapid Enquiry Button */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-gold text-brand-navy px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-display font-black text-xs uppercase tracking-wider"
        >
          <FileText size={16} />
          <span>Bespoke Booking</span>
        </motion.button>
      </div>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[340px] md:w-[380px] h-[500px] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-brand-navy text-white p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold">
                  JF
                </div>
                <div>
                  <p className="text-sm font-display font-black">Javid Farooq</p>
                  <p className="text-[10px] text-slate-300 font-medium">Bilu G Travels Owner & DMC Lead</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-300 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-zinc-900/50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[1.2rem] px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-gold text-brand-navy font-bold rounded-tr-none'
                      : 'bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-800 dark:text-slate-200 font-medium rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts Options */}
            <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Suggested Inquiries:</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                <button
                  onClick={() => handleQuickQuestion(
                    "Is there snow in Gulmarg right now?",
                    "Yes, Gulmarg currently has beautiful snow accumulations, perfect for skiing and snowboarding. Dec-Feb offers deep snow. Let us design your winter snow package!"
                  )}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  ❄️ Gulmarg Snow Update
                </button>
                <button
                  onClick={() => handleQuickQuestion(
                    "What luxury houseboats do you have?",
                    "We own and partner with Ultra-Luxury and Signature 5-Star houseboats on Dal Lake and Nigeen Lake, offering premium wood-carved rooms, hot water, and authentic Kashmiri dinner. Starting ₹4,500/night."
                  )}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  ⛵ Houseboat Stay Info
                </button>
                <button
                  onClick={() => handleQuickQuestion(
                    "How to book a customized tour?",
                    "Simply tell me your travel dates and traveler count! Click 'Bespoke Booking' or 'WhatsApp Us' and we will craft a free customized itinerary with quotation within 30 minutes!"
                  )}
                  className="px-2.5 py-1.5 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  🗺️ Custom Booking Process
                </button>
              </div>
            </div>

            {/* Direct Send WhatsApp */}
            <div className="p-4 bg-slate-100/50 dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 flex gap-2">
              <Link
                href="https://wa.me/916006070550"
                target="_blank"
                className="w-full bg-brand-emerald text-white py-2.5 rounded-xl text-center text-xs font-display font-black tracking-widest uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} /> Discuss on WhatsApp
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
