'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", title: "Dal Lake, Srinagar", category: "Srinagar" },
  { url: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", title: "Gulmarg Gondola", category: "Gulmarg" },
  { url: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", title: "Pahalgam Valley", category: "Pahalgam" },
  { url: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", title: "Sonamarg Glaciers", category: "Sonamarg" },
  { url: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800", title: "Luxury Houseboat", category: "Houseboats" },
  { url: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800", title: "Tulip Garden", category: "Srinagar" },
  { url: "https://images.unsplash.com/photo-1591143899161-591970228303?auto=format&fit=crop&q=80&w=800", title: "Aru Valley", category: "Pahalgam" },
  { url: "https://images.unsplash.com/photo-1610303657388-349f7ba30438?auto=format&fit=crop&q=80&w=800", title: "Betab Valley", category: "Pahalgam" },
  { url: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", title: "Yusmarg Meadows", category: "Yusmarg" },
  { url: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&q=80&w=800", title: "Srinagar at Night", category: "Srinagar" },
  { url: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", title: "Doodhpathri", category: "Doodhpathri" },
  { url: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", title: "Gurez Valley", category: "Gurez" },
];

const categories = ["All", "Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Houseboats", "Yusmarg", "Doodhpathri", "Gurez"];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const showNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const showPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Visual Journey</span>
          <h1 className="text-4xl md:text-7xl font-black text-brand-navy tracking-tighter mb-8">Kashmir in Frames</h1>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            A glimpse into the stunning landscapes, vibrant culture, and serene beauty of the Kashmir valley through our lens.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-brand-gold text-brand-navy shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
             >
                {cat}
             </button>
           ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredImages.map((img, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              key={img.url}
              onClick={() => openLightbox(i)}
              className="relative group overflow-hidden rounded-[2.5rem] shadow-xl cursor-pointer break-inside-avoid border border-slate-50 bg-slate-100"
            >
              <Image
                src={img.url}
                alt={img.title}
                width={800}
                height={1000}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                 <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                       <span className="w-4 h-[1px] bg-brand-gold"></span> {img.category}
                    </p>
                    <h3 className="text-xl font-black text-white flex items-center justify-between">
                       {img.title}
                       <ZoomIn size={20} className="text-white/50" />
                    </h3>
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
             <button
               onClick={closeLightbox}
               className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
             >
                <X size={32} />
             </button>

             <button
               onClick={showPrev}
               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 p-4 rounded-full"
             >
                <ChevronLeft size={32} />
             </button>

             <button
               onClick={showNext}
               className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 p-4 rounded-full"
             >
                <ChevronRight size={32} />
             </button>

             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]"
             >
                <Image
                  src={filteredImages[selectedImage].url}
                  alt={filteredImages[selectedImage].title}
                  fill
                  className="object-contain"
                />
                <div className="absolute -bottom-16 left-0 w-full text-center">
                   <p className="text-brand-gold font-black uppercase tracking-widest text-xs mb-1">{filteredImages[selectedImage].category}</p>
                   <h3 className="text-white text-2xl font-black">{filteredImages[selectedImage].title}</h3>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
