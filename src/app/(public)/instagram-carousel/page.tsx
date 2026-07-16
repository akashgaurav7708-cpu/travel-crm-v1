'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Sparkles, RefreshCw, Eye, Grid, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, FileImage, Sliders, Check, Layout, Edit3
} from 'lucide-react';

// We will load html2canvas dynamically to avoid Server-Side Rendering issues
let html2canvas: any = null;
if (typeof window !== 'undefined') {
  import('html2canvas').then((m) => {
    html2canvas = m.default;
  });
}

interface SlideData {
  id: number;
  badge: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  meansForYouTitle?: string;
  meansForYou: string[];
  ctaText?: string;
  image: string;
}

const defaultSlides: SlideData[] = [
  {
    id: 1,
    badge: "BILU G TRAVELS KASHMIR",
    title: "TRAVEL WITH CLARITY",
    subtitle: "No Hidden Costs. On Any Kashmir Trip.",
    bullets: [
      "Every rupee is explained before you book.",
      "No hidden charges.",
      "No surprise costs.",
      "Only transparent travel."
    ],
    image: "/images/booking_bg.jpg"
  },
  {
    id: 2,
    badge: "PROMISE 01",
    title: "The Price You See Is The Price You Pay",
    subtitle: "The quotation we send is your final quotation.",
    bullets: [
      "No convenience fees.",
      "No hidden service charges.",
      "No last-minute add-ons."
    ],
    meansForYouTitle: "WHAT THIS MEANS FOR YOU",
    meansForYou: [
      "No surprises at checkout",
      "Final quotation = Final payment",
      "Transparent pricing"
    ],
    image: "/images/houseboat_slider_1.jpg"
  },
  {
    id: 3,
    badge: "PROMISE 02",
    title: "Every Inclusion Confirmed Before You Book",
    subtitle: "Everything is confirmed before payment.",
    bullets: [
      "Hotels.",
      "Meals.",
      "Houseboat.",
      "Private Cab.",
      "Airport Transfers.",
      "Sightseeing."
    ],
    meansForYouTitle: "WHAT THIS MEANS FOR YOU",
    meansForYou: [
      "Hotel confirmed",
      "Cab confirmed",
      "Meals confirmed",
      "Transfers confirmed"
    ],
    image: "/images/hotel_taj.jpg"
  },
  {
    id: 4,
    badge: "PROMISE 03",
    title: "Nothing Sprung On You Mid-Trip",
    bullets: [
      "No hidden taxi charges.",
      "No compulsory activities.",
      "No surprise entry fees.",
      "No forced upgrades."
    ],
    meansForYouTitle: "WHAT THIS MEANS FOR YOU",
    meansForYou: [
      "No hidden charges",
      "No pressure upselling",
      "Peaceful holiday"
    ],
    image: "/images/dest_gulmarg.jpg"
  },
  {
    id: 5,
    badge: "PROMISE 04",
    title: "Transparent From Day One",
    subtitle: "Receive your complete package before payment.",
    bullets: [
      "Day-wise itinerary.",
      "Hotel details.",
      "Vehicle details.",
      "Complete inclusions.",
      "Complete exclusions.",
      "Everything shared in writing."
    ],
    meansForYouTitle: "WHAT THIS MEANS FOR YOU",
    meansForYou: [
      "Complete itinerary",
      "Transparent costing",
      "Everything documented"
    ],
    image: "/images/houseboat_slider_2.jpg"
  },
  {
    id: 6,
    badge: "OUR PROMISE",
    title: "This Is Transparent Travel.",
    subtitle: "Every Kashmir trip includes:",
    bullets: [
      "Upfront pricing",
      "Transparent quotation",
      "Verified hotels",
      "Private transportation",
      "24×7 Local Support",
      "Complete itinerary before payment"
    ],
    meansForYouTitle: "CTA",
    meansForYou: [
      "DM \"TRANSPARENT\"",
      "Get your complete Kashmir quotation before paying a single rupee."
    ],
    image: "/images/dest_srinagar.jpg"
  }
];

export default function InstagramCarouselPage() {
  const [slides, setSlides] = useState<SlideData[]>(defaultSlides);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'preview' | 'grid'>('preview');
  const [exporting, setExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');

  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // References for rendering 1080x1350 canvas blocks
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides]);

  const handleReset = () => {
    if (confirm("Are you sure you want to restore default editorial copywriting?")) {
      setSlides(JSON.parse(JSON.stringify(defaultSlides)));
    }
  };

  const updateSlideField = (index: number, key: keyof SlideData, value: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [key]: value };
    setSlides(updated);
  };

  const handleExportSingle = async (index: number) => {
    if (!html2canvas) {
      alert("Export library is loading. Please try again in a moment.");
      return;
    }

    try {
      setExporting(true);
      setExportProgress(`Generating High-Res Slide ${index + 1}...`);

      const element = slideRefs.current[index];
      if (!element) throw new Error("Slide target not found");

      // Temporarily reveal full high-res container to avoid responsive rendering distortions
      const originalStyle = element.getAttribute('style');
      element.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 1080px; height: 1350px; z-index: 9999; transform: none; visibility: visible;');

      const canvas = await html2canvas(element, {
        width: 1080,
        height: 1350,
        scale: 2, // Double scale for ultra-sharp retina export
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0B2740'
      });

      if (originalStyle) {
        element.setAttribute('style', originalStyle);
      } else {
        element.removeAttribute('style');
      }

      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = image;
      link.download = `BiluG_Kashmir_Instagram_Slide_${index + 1}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExporting(false);
      setExportProgress('');
    } catch (err) {
      console.error(err);
      alert("Failed to export slide. Please check console log.");
      setExporting(false);
      setExportProgress('');
    }
  };

  const handleExportAll = async () => {
    if (!html2canvas) {
      alert("Export library is loading. Please try again in a moment.");
      return;
    }

    try {
      setExporting(true);
      for (let i = 0; i < slides.length; i++) {
        setExportProgress(`Generating Slide ${i + 1} of ${slides.length}...`);

        const element = slideRefs.current[i];
        if (!element) continue;

        const originalStyle = element.getAttribute('style');
        element.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 1080px; height: 1350px; z-index: 9999; transform: none; visibility: visible;');

        const canvas = await html2canvas(element, {
          width: 1080,
          height: 1350,
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0B2740'
        });

        if (originalStyle) {
          element.setAttribute('style', originalStyle);
        } else {
          element.removeAttribute('style');
        }

        const image = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.href = image;
        link.download = `BiluG_Kashmir_Instagram_Slide_${i + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Little delay between downloads to prevent browser throttling
        await new Promise((r) => setTimeout(r, 800));
      }
      setExporting(false);
      setExportProgress('');
    } catch (err) {
      console.error(err);
      alert("Failed to export all slides. Check console.");
      setExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className="pt-28 pb-20 bg-slate-900 text-white min-h-screen relative font-sans selection:bg-amber-500 selection:text-slate-950">

      {/* BACKGROUND GRAPHIC */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-900 to-slate-950 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* EDITORIAL HEADER */}
        <div className="border-b border-white/10 pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[#C9A44C] text-[10px] font-display font-black uppercase tracking-[0.3em] block mb-2">
              👑 Editorial Brand Strategy Tool
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white mb-2">
              Instagram Carousel Builder
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-light">
              Positioning <strong className="text-white font-medium">Bilu G Travels Kashmir</strong> as the absolute gold standard of transparency. Edit copy in real-time, preview slides at exact 4:5 ratios, and export high-res 1080×1350px graphics.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'preview' ? 'grid' : 'preview')}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              {viewMode === 'preview' ? <Grid className="w-4 h-4 text-[#C9A44C]" /> : <Eye className="w-4 h-4 text-[#C9A44C]" />}
              {viewMode === 'preview' ? 'Grid View' : 'Single Preview'}
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-5 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isEditing
                  ? 'bg-[#C9A44C] text-slate-950 border-[#C9A44C]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? 'Finish Copy' : 'Customize Copy'}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs flex items-center justify-center text-slate-300"
              title="Reset defaults"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleExportAll}
              disabled={exporting}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-display font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" /> Export All (1-6)
            </button>
          </div>
        </div>

        {/* EXPORT PROGRESS NOTIFICATION */}
        {exporting && (
          <div className="fixed bottom-8 right-8 z-[200] bg-slate-950 border-2 border-[#C9A44C] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#C9A44C] animate-spin" />
            <span className="text-sm font-bold text-white tracking-wide">{exportProgress}</span>
          </div>
        )}

        {/* LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT: EDIT PANEL (Visible when isEditing = true) */}
          {isEditing && (
            <div className="lg:col-span-4 bg-slate-950/80 backdrop-blur border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C9A44C]" />
                  <h3 className="font-serif font-bold text-lg text-[#C9A44C]">Customize Slide {activeSlideIndex + 1}</h3>
                </div>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-slate-400">Live Sync</span>
              </div>

              {/* Selector for edit */}
              <div className="grid grid-cols-6 gap-1">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlideIndex(i)}
                    className={`h-8 rounded text-xs font-bold transition-all ${
                      activeSlideIndex === i
                        ? 'bg-[#C9A44C] text-slate-950'
                        : 'bg-white/5 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              {/* Edit inputs for active slide */}
              <div className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Header Badge</label>
                  <input
                    type="text"
                    value={slides[activeSlideIndex].badge}
                    onChange={(e) => updateSlideField(activeSlideIndex, 'badge', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Main Heading</label>
                  <textarea
                    rows={2}
                    value={slides[activeSlideIndex].title}
                    onChange={(e) => updateSlideField(activeSlideIndex, 'title', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C] resize-none"
                  />
                </div>

                {slides[activeSlideIndex].subtitle !== undefined && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Sub-heading</label>
                    <input
                      type="text"
                      value={slides[activeSlideIndex].subtitle || ''}
                      onChange={(e) => updateSlideField(activeSlideIndex, 'subtitle', e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Bullet Points (Comma separated)</label>
                  <textarea
                    rows={3}
                    value={slides[activeSlideIndex].bullets.join(', ')}
                    onChange={(e) => updateSlideField(activeSlideIndex, 'bullets', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C] resize-none"
                  />
                </div>

                {slides[activeSlideIndex].meansForYouTitle !== undefined && (
                  <>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Highlights Box Label</label>
                      <input
                        type="text"
                        value={slides[activeSlideIndex].meansForYouTitle || ''}
                        onChange={(e) => updateSlideField(activeSlideIndex, 'meansForYouTitle', e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Highlights Checklist (Comma separated)</label>
                      <textarea
                        rows={3}
                        value={slides[activeSlideIndex].meansForYou.join(', ')}
                        onChange={(e) => updateSlideField(activeSlideIndex, 'meansForYou', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C] resize-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Background Image URL</label>
                  <select
                    value={slides[activeSlideIndex].image}
                    onChange={(e) => updateSlideField(activeSlideIndex, 'image', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#C9A44C]"
                  >
                    <option value="/images/booking_bg.jpg">Dal Lake Sunrise (/images/booking_bg.jpg)</option>
                    <option value="/images/houseboat_slider_1.jpg">Dal Lake Shikaras (/images/houseboat_slider_1.jpg)</option>
                    <option value="/images/hotel_taj.jpg">Luxury Hotel Overlook (/images/hotel_taj.jpg)</option>
                    <option value="/images/dest_gulmarg.jpg">Gulmarg Mountains (/images/dest_gulmarg.jpg)</option>
                    <option value="/images/houseboat_slider_2.jpg">Premium Houseboat Interior (/images/houseboat_slider_2.jpg)</option>
                    <option value="/images/dest_srinagar.jpg">Pristine Srinagar Vibe (/images/dest_srinagar.jpg)</option>
                    <option value="/images/dest_pahalgam.jpg">Lidder River Pahalgam (/images/dest_pahalgam.jpg)</option>
                    <option value="/images/dest_sonmarg.jpg">Glacial Sonamarg (/images/dest_sonmarg.jpg)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: RENDER CONTAINER */}
          <div className={`${isEditing ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-8 flex flex-col items-center`}>

            {/* 1. SINGLE PREVIEW MODE */}
            {viewMode === 'preview' && (
              <div className="w-full max-w-lg flex flex-col items-center">
                {/* Navigation Controls */}
                <div className="w-full flex justify-between items-center mb-4">
                  <div className="flex gap-1.5 items-center">
                    {slides.map((s, idx) => (
                      <span
                        key={s.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          activeSlideIndex === idx ? 'w-8 bg-[#C9A44C]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSlideIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-300" />
                    </button>
                    <button
                      onClick={() => setActiveSlideIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* THE ACTUAL INSTAGRAM SLIDE CONTAINER (RENDERS EXACT 1080x1350 INTERNALLY BUT SCALED ON WEB PAGE) */}
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0B2740] select-none">
                  <div
                    ref={(el) => { slideRefs.current[activeSlideIndex] = el; }}
                    className="w-full h-full flex flex-col justify-between p-12 md:p-14 text-white relative"
                    style={{
                      backgroundImage: `url('${slides[activeSlideIndex].image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* BACKDROP BLUR/GRADIENT TO MAKE TEXT LEGIBLE AND LUXURIOUS */}
                    <div className="absolute inset-0 bg-[#0B2740]/80 mix-blend-multiply z-0" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B2740]/90 via-[#0B2740]/45 to-[#0B2740]/95 z-0" />

                    {/* CONTENT CONTAINER FOR ABSOLUTE POSITIONING OF TEXT LAYER */}
                    <div className="relative z-10 flex flex-col justify-between h-full">

                      {/* SLIDE HEADER */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3">
                          {/* Styled Brand Logo / Accent */}
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A44C]/35 to-[#C9A44C]/10 border border-[#C9A44C]/40 flex items-center justify-center shadow-lg">
                            <span className="text-white font-serif font-black text-sm">B</span>
                          </div>
                          <div>
                            <p className="text-[#C9A44C] text-[10px] font-display font-black uppercase tracking-[0.25em] leading-none mb-1">
                              {slides[activeSlideIndex].badge}
                            </p>
                            <p className="text-slate-300 text-[8px] font-display font-bold uppercase tracking-widest leading-none">
                              Kashmir Local DMC
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 font-display font-black text-xs">
                            0{activeSlideIndex + 1} <span className="text-slate-700">/</span> 0{slides.length}
                          </span>
                        </div>
                      </div>

                      {/* SLIDE CONTENT AREA (EDITORIAL STYLE) */}
                      <div className="my-auto py-8 space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-serif font-black leading-[1.15] text-white tracking-wide max-w-lg">
                          {slides[activeSlideIndex].title}
                        </h2>

                        {slides[activeSlideIndex].subtitle && (
                          <p className="text-[#C9A44C] text-sm md:text-base font-medium leading-relaxed max-w-md font-sans">
                            {slides[activeSlideIndex].subtitle}
                          </p>
                        )}

                        {/* Bullets List */}
                        <div className="space-y-3.5 pt-2 max-w-md">
                          {slides[activeSlideIndex].bullets.filter(Boolean).map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-3">
                              <span className="text-[#C9A44C] font-serif text-sm leading-none mt-0.5">•</span>
                              <span className="text-slate-200 text-xs md:text-sm font-light leading-relaxed">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Promise / Highlights Checklist Box */}
                        {slides[activeSlideIndex].meansForYouTitle && (
                          <div className="mt-8 bg-[#0B2740]/60 border border-[#C9A44C]/25 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
                            <p className="text-[#C9A44C] text-[9px] font-display font-black uppercase tracking-[0.25em] mb-3">
                              {slides[activeSlideIndex].meansForYouTitle}
                            </p>
                            <div className="grid grid-cols-1 gap-2.5">
                              {slides[activeSlideIndex].meansForYou.filter(Boolean).map((item, mIdx) => (
                                <div key={mIdx} className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded-full bg-[#C9A44C]/15 border border-[#C9A44C]/40 flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 text-[#C9A44C]" strokeWidth={3} />
                                  </div>
                                  <span className="text-slate-100 text-xs font-semibold">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SLIDE FOOTER */}
                      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-400 text-[8px] md:text-[9px] font-display font-bold uppercase tracking-[0.15em]">
                        <div className="space-y-1">
                          <p className="text-[#C9A44C] font-black">Bilu G Travels Kashmir</p>
                          <p className="flex items-center gap-1 leading-none text-slate-500">
                            <MapPin className="w-3 h-3 text-[#C9A44C]/60" /> Srinagar, Kashmir
                          </p>
                        </div>
                        <div className="space-y-1 text-slate-500 text-left md:text-right">
                          <p className="flex items-center md:justify-end gap-1 leading-none">
                            <Phone className="w-3 h-3 text-[#C9A44C]/60" /> 7889408220 | 6006070550
                          </p>
                          <p className="flex items-center md:justify-end gap-1 leading-none">
                            <Mail className="w-3 h-3 text-[#C9A44C]/60" /> bilugtourtravels1121@gmail.com
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Individual Slide Download Button */}
                <button
                  onClick={() => handleExportSingle(activeSlideIndex)}
                  className="mt-6 w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileImage className="w-4 h-4 text-[#C9A44C]" />
                  Download Slide {activeSlideIndex + 1} (JPEG)
                </button>
              </div>
            )}

            {/* 2. GRID PREVIEW MODE */}
            {viewMode === 'grid' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {slides.map((slide, sIdx) => (
                  <div key={slide.id} className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 block">
                      Slide 0{sIdx + 1}
                    </span>

                    {/* RENDER TARGET AT FULL SPECIFIED SIZE (SCALED FOR DISPLAY) */}
                    <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-lg bg-[#0B2740] select-none scale-90 md:scale-100 origin-top transition-all">
                      <div
                        ref={(el) => { slideRefs.current[sIdx] = el; }}
                        className="w-full h-full flex flex-col justify-between p-10 text-white relative"
                        style={{
                          backgroundImage: `url('${slide.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute inset-0 bg-[#0B2740]/80 mix-blend-multiply z-0" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2740]/90 via-[#0B2740]/45 to-[#0B2740]/95 z-0" />

                        <div className="relative z-10 flex flex-col justify-between h-full">

                          {/* Slide Header */}
                          <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A44C]/35 to-[#C9A44C]/10 border border-[#C9A44C]/40 flex items-center justify-center">
                                <span className="text-white font-serif font-black text-xs">B</span>
                              </div>
                              <div>
                                <p className="text-[#C9A44C] text-[8px] font-display font-black uppercase tracking-[0.25em] leading-none mb-1">
                                  {slide.badge}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-500 font-display font-black text-[10px]">
                                0{sIdx + 1} <span className="text-slate-700">/</span> 0{slides.length}
                              </span>
                            </div>
                          </div>

                          {/* Slide Content */}
                          <div className="my-auto py-4 space-y-4">
                            <h2 className="text-lg md:text-xl font-serif font-black leading-snug text-white tracking-wide">
                              {slide.title}
                            </h2>

                            {slide.subtitle && (
                              <p className="text-[#C9A44C] text-[10px] leading-relaxed max-w-md font-sans">
                                {slide.subtitle}
                              </p>
                            )}

                            {/* Bullets */}
                            <div className="space-y-1.5 pt-1">
                              {slide.bullets.filter(Boolean).map((bullet, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-2">
                                  <span className="text-[#C9A44C] text-[10px]">•</span>
                                  <span className="text-slate-300 text-[10px] font-light leading-relaxed">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Promise Checklist */}
                            {slide.meansForYouTitle && (
                              <div className="mt-4 bg-[#0B2740]/60 border border-[#C9A44C]/25 rounded-xl p-3.5">
                                <p className="text-[#C9A44C] text-[8px] font-display font-black uppercase tracking-widest mb-2">
                                  {slide.meansForYouTitle}
                                </p>
                                <div className="space-y-1">
                                  {slide.meansForYou.filter(Boolean).map((item, mIdx) => (
                                    <div key={mIdx} className="flex items-center gap-2">
                                      <Check className="w-2.5 h-2.5 text-[#C9A44C]" strokeWidth={3} />
                                      <span className="text-slate-100 text-[10px] font-semibold">
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Slide Footer */}
                          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-slate-400 text-[7px] font-display font-bold uppercase tracking-wider">
                            <div>
                              <p className="text-[#C9A44C] font-black">Bilu G Travels Kashmir</p>
                              <p className="text-slate-500">📍 Srinagar, Kashmir</p>
                            </div>
                            <div className="text-right text-slate-500">
                              <p>📞 7889408220</p>
                              <p>📧 bilugtourtravels...</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleExportSingle(sIdx)}
                      className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C9A44C]" /> Download JPEG
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
