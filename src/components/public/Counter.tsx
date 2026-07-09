'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

const Counter = ({ end, label, suffix = '' }: CounterProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-black text-brand-gold mb-1"
      >
        {end.toLocaleString()}{suffix}
      </motion.div>
      <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
};

export default Counter;
