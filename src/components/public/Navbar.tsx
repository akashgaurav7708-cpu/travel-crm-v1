'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Kashmir Packages', href: '/tour-packages' },
    { name: 'Offbeat Kashmir', href: '/offbeat-kashmir' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <span className={`text-xl font-black tracking-tighter ${scrolled || !isHome ? 'text-brand-navy' : 'text-white'}`}>BILU G TRAVELS</span>
            <span className={`text-[10px] font-bold tracking-[0.2em] ${scrolled || !isHome ? 'text-brand-gold' : 'text-brand-gold'}`}>KASHMIR DMC</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-colors hover:text-brand-gold ${scrolled || !isHome ? 'text-brand-navy' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/916006070550"
              className="bg-brand-emerald text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled || !isHome ? 'text-brand-navy' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-bold text-brand-navy hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="tel:+916006070550"
                  className="flex items-center justify-center gap-2 bg-brand-navy text-white py-3 rounded-xl font-bold"
                >
                  <Phone size={18} /> Call Now
                </Link>
                <Link
                  href="https://wa.me/916006070550"
                  className="flex items-center justify-center gap-2 bg-brand-emerald text-white py-3 rounded-xl font-bold"
                >
                  <MessageCircle size={18} /> WhatsApp
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
