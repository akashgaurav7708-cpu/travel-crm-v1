'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageCircle, Globe, Sun, Moon, CircleDollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('INR');
  const [isDark, setIsDark] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with localStorage for persistency
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') || 'EN';
      const storedCurrency = localStorage.getItem('currency') || 'INR';
      const storedDark = localStorage.getItem('darkMode') === 'true';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(storedLang);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrency(storedCurrency);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(storedDark);
      if (storedDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(nextDark));
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLang = e.target.value;
    setLang(nextLang);
    localStorage.setItem('language', nextLang);
    window.dispatchEvent(new Event('languageChanged'));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCurrency = e.target.value;
    setCurrency(nextCurrency);
    localStorage.setItem('currency', nextCurrency);
    window.dispatchEvent(new Event('currencyChanged'));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/tour-packages' },
    { name: 'Hotels', href: '/kashmir-hotels' },
    { name: 'Houseboats', href: '/houseboats' },
    { name: 'Transport', href: '/kashmir-transport' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-100 dark:border-zinc-800' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className={`text-xl md:text-2xl font-serif font-black tracking-wide transition-colors ${scrolled || !isHome ? 'text-brand-navy dark:text-white' : 'text-white'}`}>
              BILU G TRAVELS
            </span>
            <span className="text-[9px] font-display font-bold tracking-[0.25em] text-brand-gold">
              KASHMIR DMC & LUXURY HOTELS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-display font-bold tracking-wider uppercase transition-all hover:text-brand-gold hover:scale-105 ${
                    isActive ? 'text-brand-gold border-b-2 border-brand-gold pb-1' : (scrolled || !isHome ? 'text-brand-navy dark:text-slate-200' : 'text-slate-100')
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100/10 backdrop-blur-sm border border-slate-200/20 dark:border-zinc-800 rounded-full px-3 py-1 text-xs font-bold">
              <Globe className={`w-3.5 h-3.5 ${scrolled || !isHome ? 'text-brand-navy dark:text-slate-300' : 'text-white'}`} />
              <select
                value={lang}
                onChange={handleLangChange}
                className="bg-transparent outline-none cursor-pointer font-bold text-slate-800 dark:text-slate-100 text-xs py-0.5 border-none"
                style={{ colorScheme: isDark ? 'dark' : 'light' }}
              >
                <option value="EN" className="text-zinc-900 bg-white">EN</option>
                <option value="HI" className="text-zinc-900 bg-white">HI</option>
                <option value="AR" className="text-zinc-900 bg-white">AR</option>
                <option value="ES" className="text-zinc-900 bg-white">ES</option>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100/10 backdrop-blur-sm border border-slate-200/20 dark:border-zinc-800 rounded-full px-3 py-1 text-xs font-bold">
              <CircleDollarSign className={`w-3.5 h-3.5 ${scrolled || !isHome ? 'text-brand-navy dark:text-slate-300' : 'text-white'}`} />
              <select
                value={currency}
                onChange={handleCurrencyChange}
                className="bg-transparent outline-none cursor-pointer font-bold text-slate-800 dark:text-slate-100 text-xs py-0.5 border-none"
                style={{ colorScheme: isDark ? 'dark' : 'light' }}
              >
                <option value="INR" className="text-zinc-900 bg-white">INR (₹)</option>
                <option value="USD" className="text-zinc-900 bg-white">USD ($)</option>
                <option value="EUR" className="text-zinc-900 bg-white">EUR (€)</option>
                <option value="AED" className="text-zinc-900 bg-white">AED (د.إ)</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${scrolled || !isHome ? 'text-brand-navy dark:text-white' : 'text-white'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Premium CTA */}
            <Link
              href="https://wa.me/916006070550"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-brand-emerald to-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-display font-black tracking-widest uppercase shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </Link>
          </div>

          {/* Mobile controls (hamburger, lang, currency, dark) */}
          <div className="xl:hidden flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-full ${scrolled || !isHome ? 'text-brand-navy dark:text-white' : 'text-white'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-full ${scrolled || !isHome ? 'text-brand-navy dark:text-white' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-sm font-display font-bold tracking-wider uppercase text-brand-navy dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                {/* Language Mobile */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 rounded-full px-3 py-1 text-xs">
                  <Globe className="w-3.5 h-3.5 text-brand-navy dark:text-slate-300" />
                  <select
                    value={lang}
                    onChange={handleLangChange}
                    className="bg-transparent outline-none cursor-pointer font-bold text-slate-800 dark:text-slate-100 text-xs"
                  >
                    <option value="EN" className="text-zinc-900 bg-white">English</option>
                    <option value="HI" className="text-zinc-900 bg-white">हिन्दी</option>
                    <option value="AR" className="text-zinc-900 bg-white">العربية</option>
                    <option value="ES" className="text-zinc-900 bg-white">Español</option>
                  </select>
                </div>

                {/* Currency Mobile */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 rounded-full px-3 py-1 text-xs">
                  <CircleDollarSign className="w-3.5 h-3.5 text-brand-navy dark:text-slate-300" />
                  <select
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="bg-transparent outline-none cursor-pointer font-bold text-slate-800 dark:text-slate-100 text-xs"
                  >
                    <option value="INR" className="text-zinc-900 bg-white">INR (₹)</option>
                    <option value="USD" className="text-zinc-900 bg-white">USD ($)</option>
                    <option value="EUR" className="text-zinc-900 bg-white">EUR (€)</option>
                    <option value="AED" className="text-zinc-900 bg-white">AED (د.إ)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <Link
                  href="tel:+916006070550"
                  className="flex items-center justify-center gap-2 bg-brand-navy text-white py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  <Phone size={14} /> Call Now
                </Link>
                <Link
                  href="https://wa.me/916006070550"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-brand-emerald text-white py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  <MessageCircle size={14} /> WhatsApp
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
