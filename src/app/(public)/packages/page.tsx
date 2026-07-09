'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star, X, MapPin, Hotel, Utensils, Car, MessageCircle, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryModal from '@/components/public/InquiryModal';
import { packages } from '@/lib/data/packages';
import { formatCurrency } from '@/lib/utils/currency';

export default function PackagesListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [activeTag, setActiveTag] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [duration, setDuration] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const tags = ["All", "Family", "Honeymoon", "Luxury", "Adventure", "Offbeat", "Group Tour"];
  const durations = ["All", "Day Trip", "3-4 Days", "5-6 Days", "7+ Days"];
  const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating"];

  const filteredPackages = useMemo(() => {
    const result = packages.filter(pkg => {
      // Search term
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           pkg.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tag
      const matchesTag = activeTag === "All" || pkg.tags.includes(activeTag);

      // Price
      const price = parseInt(pkg.price.replace(/,/g, ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      // Duration
      let matchesDuration = true;
      if (duration !== "All") {
        if (duration === "Day Trip") matchesDuration = pkg.duration.includes("Day Trip");
        else if (duration === "3-4 Days") matchesDuration = pkg.duration.includes("3N") || pkg.duration.includes("4N");
        else if (duration === "5-6 Days") matchesDuration = pkg.duration.includes("5N") || pkg.duration.includes("6N");
        else if (duration === "7+ Days") matchesDuration = pkg.duration.includes("7N") || pkg.duration.includes("8N") || pkg.duration.includes("10N");
      }

      return matchesSearch && matchesTag && matchesPrice && matchesDuration;
    });

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')));
    } else if (sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, activeTag, priceRange, duration, sortBy]);

  const openInquiry = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Handpicked for you</span>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter mb-6">Kashmir Tour Packages</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">Discover the magic of Kashmir with our carefully curated tour packages designed for every type of traveler.</p>
        </div>

        {/* Search & Main Actions */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
           <div className="flex-1 flex items-center gap-4 bg-white border rounded-[1.5rem] px-6 py-4 group focus-within:border-brand-gold transition-all shadow-sm">
              <Search size={20} className="text-slate-400 group-focus-within:text-brand-gold" />
              <input
                type="text"
                placeholder="Search destinations (e.g. Gulmarg, Pahalgam, Gurez)..."
                className="bg-transparent text-sm font-bold outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <button onClick={() => setSearchTerm("")}><X size={16} className="text-slate-400" /></button>}
           </div>
           <div className="flex gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-sm ${showFilters ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy border hover:bg-slate-50'}`}
              >
                 <SlidersHorizontal size={16} /> Filters
              </button>
              <div className="relative">
                 <select
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="appearance-none bg-white border px-8 py-4 pr-12 rounded-2xl font-black uppercase tracking-widest text-[10px] text-brand-navy shadow-sm outline-none cursor-pointer focus:border-brand-gold transition-all"
                 >
                    {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                 </select>
                 <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* Expandable Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white border rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Category Filter */}
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Travel Style
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => setActiveTag(tag)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTag === tag ? 'bg-brand-gold text-brand-navy' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border'}`}
                            >
                               {tag}
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Duration
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {durations.map(d => (
                            <button
                              key={d}
                              onClick={() => setDuration(d)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${duration === d ? 'bg-brand-gold text-brand-navy' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border'}`}
                            >
                               {d}
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span> Budget Range
                       </h4>
                       <div className="space-y-6">
                          <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full accent-brand-gold"
                          />
                          <div className="flex justify-between items-center text-sm font-black text-brand-navy">
                             <span>{formatCurrency(0)}</span>
                             <span className="bg-brand-navy text-brand-gold px-4 py-1 rounded-lg">Up to {formatCurrency(priceRange[1])}</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="mt-12 pt-8 border-t flex justify-end gap-4">
                    <button
                      onClick={() => { setActiveTag("All"); setDuration("All"); setPriceRange([0, 50000]); setSearchTerm(""); }}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-navy"
                    >
                       Reset All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="bg-brand-navy text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                       Apply Filters
                    </button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listing Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredPackages.map(pkg => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={pkg.id}
                  className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <Link href={`/packages/${pkg.slug}`} className="relative h-72 overflow-hidden block">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-lg z-10">
                      {pkg.duration}
                    </div>
                    <div className="absolute top-6 right-6 bg-brand-gold text-brand-navy px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-10">
                      -15% OFF
                    </div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-brand-navy/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-black shadow-lg">
                       <Star size={12} fill="#D4AF37" className="text-brand-gold" /> {pkg.rating} Rating
                    </div>
                  </Link>

                  <div className="p-10 flex-1 flex flex-col">
                    <div className="mb-6 flex-1">
                      <Link href={`/packages/${pkg.slug}`}>
                        <h3 className="text-2xl font-black text-brand-navy group-hover:text-brand-gold transition-colors mb-3 leading-tight">{pkg.name}</h3>
                      </Link>
                      <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-4">{pkg.shortDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 py-6 border-y border-slate-50">
                       <div className="flex items-center gap-2 text-slate-500">
                          <MapPin size={14} className="text-brand-gold shrink-0" />
                          <span className="text-[11px] font-bold uppercase tracking-tight truncate">{pkg.destinations[0]}, {pkg.destinations[1]}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500">
                          <Hotel size={14} className="text-brand-gold shrink-0" />
                          <span className="text-[11px] font-bold uppercase tracking-tight truncate">{pkg.hotelCategory}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500">
                          <Utensils size={14} className="text-brand-gold shrink-0" />
                          <span className="text-[11px] font-bold uppercase tracking-tight truncate">{pkg.meals}</span>
                       </div>
                       <div className="flex items-center gap-2 text-slate-500">
                          <Car size={14} className="text-brand-gold shrink-0" />
                          <span className="text-[11px] font-bold uppercase tracking-tight truncate">{pkg.transportation}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting At</p>
                        <p className="text-3xl font-black text-brand-navy">{formatCurrency(pkg.price)}</p>
                      </div>
                      <div className="flex gap-2">
                         <a
                           href={`https://wa.me/916006070550?text=Hello Bilu G Travels Kashmir, I want to book the ${pkg.name} package.`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-12 h-12 rounded-2xl bg-brand-whatsapp/10 text-brand-whatsapp flex items-center justify-center hover:bg-brand-whatsapp hover:text-white transition-all shadow-sm"
                         >
                            <MessageCircle size={20} />
                         </a>
                         <button
                           onClick={() => openInquiry(pkg.name)}
                           className="h-12 px-6 rounded-2xl bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg"
                         >
                            Book Now
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
             <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-brand-navy mb-2">No Packages Found</h3>
             <p className="text-slate-400 font-medium">Try adjusting your filters or search term.</p>
             <button
               onClick={() => { setActiveTag("All"); setDuration("All"); setPriceRange([0, 50000]); setSearchTerm(""); }}
               className="mt-8 text-brand-gold font-black uppercase tracking-widest text-xs hover:underline"
             >
                Reset All Filters
             </button>
          </div>
        )}
      </div>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageName={selectedPackage} />
    </div>
  );
}
