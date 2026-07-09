'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InquiryModal from '@/components/public/InquiryModal';

const packages = [
  { id: 1, name: "4 Nights 5 Days Kashmir", price: "13,999", duration: "4N/5D", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", rating: 4.9, tags: ["Family", "Budget"] },
  { id: 2, name: "5 Nights 6 Days Kashmir", price: "16,999", duration: "5N/6D", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", rating: 5.0, tags: ["Luxury", "Honeymoon"] },
  { id: 3, name: "6 Nights 7 Days Kashmir", price: "19,999", duration: "6N/7D", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", rating: 4.8, tags: ["Adventure", "Group Tour"] },
  { id: 4, name: "Honeymoon Special Package", price: "18,999", duration: "5N/6D", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", rating: 4.9, tags: ["Honeymoon", "Luxury"] },
  { id: 5, name: "Luxury Kashmir Experience", price: "34,999", duration: "7N/8D", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", rating: 5.0, tags: ["Luxury", "Family"] },
  { id: 6, name: "Gurez Valley Expedition", price: "17,999", duration: "4N/5D", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", rating: 4.7, tags: ["Offbeat", "Adventure"] },
];

export default function PackagesListing() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const tags = ["All", "Family", "Honeymoon", "Luxury", "Adventure", "Offbeat", "Group Tour"];

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesTag = activeTag === "All" || pkg.tags.includes(activeTag);
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchTerm]);

  const openInquiry = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Handpicked for you</span>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter mb-6">Explore Our Packages</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">Discover the magic of Kashmir with our carefully curated tour packages designed for every type of traveler.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTag === tag ? 'bg-brand-navy text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-slate-50 border rounded-[1.5rem] px-6 py-3.5 w-full lg:w-96 group focus-within:border-brand-gold transition-colors">
            <Search size={18} className="text-slate-400 group-focus-within:text-brand-gold" />
            <input
              type="text"
              placeholder="Search by name or category..."
              className="bg-transparent text-sm font-bold outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")}><X size={16} className="text-slate-400" /></button>}
          </div>
        </div>

        {/* Listing Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredPackages.map(pkg => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={pkg.id}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-navy">
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-brand-navy group-hover:text-brand-gold transition-colors">{pkg.name}</h3>
                      <div className="flex items-center gap-1 bg-brand-navy text-brand-gold px-2 py-0.5 rounded-lg text-[10px] font-black">
                        <Star size={10} fill="#D4AF37" /> {pkg.rating}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {pkg.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting At</p>
                        <p className="text-2xl font-black text-brand-navy">₹${pkg.price}</p>
                      </div>
                      <button
                        onClick={() => openInquiry(pkg.name)}
                        className="bg-brand-navy text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] group-hover:bg-brand-gold group-hover:text-brand-navy transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-brand-navy mb-2">No Packages Found</h3>
             <p className="text-slate-400 font-medium">Try adjusting your filters or search term.</p>
             <button
               onClick={() => { setActiveTag("All"); setSearchTerm(""); }}
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
