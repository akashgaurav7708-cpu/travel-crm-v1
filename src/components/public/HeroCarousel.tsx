'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { url: 'https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=100&w=1920', alt: 'Dal Lake Srinagar' },
  { url: 'https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=100&w=1920', alt: 'Gulmarg Gondola' },
  { url: 'https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=100&w=1920', alt: 'Sonamarg Meadows' },
  { url: 'https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=100&w=1920', alt: 'Pahalgam Valley' },
  { url: 'https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=100&w=1920', alt: 'Tulip Garden' },
  { url: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=100&w=1920', alt: 'Gurez Valley' },
  { url: 'https://images.unsplash.com/photo-1591143899161-591970228303?auto=format&fit=crop&q=100&w=1920', alt: 'Doodhpathri' },
  { url: 'https://images.unsplash.com/photo-1610303657388-349f7ba30438?auto=format&fit=crop&q=100&w=1920', alt: 'Yusmarg' },
  { url: 'https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=100&w=1920', alt: 'Bangus Valley' },
  { url: 'https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=100&w=1920', alt: 'Keran Valley' },
  { url: 'https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=100&w=1920', alt: 'Lolab Valley' },
  { url: 'https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=100&w=1920', alt: 'Warwan Valley' },
  { url: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&q=100&w=1920', alt: 'Houseboats' }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(slideNext, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slideNext, isPaused]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) slidePrev();
            else if (info.offset.x < -100) slideNext();
          }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Luxury Overlay with specific colors requested */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.75) 100%)'
            }}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
         <button
           onClick={(e) => { e.stopPropagation(); slidePrev(); }}
           className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-brand-gold hover:text-brand-navy transition-all pointer-events-auto shadow-2xl"
           aria-label="Previous Slide"
         >
            <ChevronLeft size={24} />
         </button>
         <button
           onClick={(e) => { e.stopPropagation(); slideNext(); }}
           className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-brand-gold hover:text-brand-navy transition-all pointer-events-auto shadow-2xl"
           aria-label="Next Slide"
         >
            <ChevronRight size={24} />
         </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-3 z-20">
         {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
         ))}
      </div>
    </div>
  );
}
