'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, FileText, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import InquiryModal from './InquiryModal';

const FloatingCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-white text-brand-navy rounded-full shadow-2xl flex items-center justify-center border border-slate-100 md:hidden"
        >
          <ArrowUp size={20} />
        </motion.button>

        <motion.a
          href="https://wa.me/916006070550"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-emerald text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm"
        >
          <MessageCircle size={20} />
          <span className="hidden md:inline">WhatsApp Us</span>
        </motion.a>

        <motion.a
          href="tel:+916006070550"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-navy text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm"
        >
          <Phone size={20} />
          <span className="hidden md:inline">Call Now</span>
        </motion.a>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-gold text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm"
        >
          <FileText size={20} />
          <span className="hidden md:inline">Get Free Quote</span>
        </motion.button>
      </div>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingCTA;
