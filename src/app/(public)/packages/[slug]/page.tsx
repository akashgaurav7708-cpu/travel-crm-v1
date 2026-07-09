'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Clock, MapPin, CheckCircle2, Phone, MessageCircle, ArrowLeft, Share2, Hotel, Utensils, Car, XCircle, ChevronDown } from 'lucide-react';
import { packages } from '@/lib/data/packages';
import InquiryModal from '@/components/public/InquiryModal';
import { formatCurrency } from '@/lib/utils/currency';
import JsonLd from '@/components/public/SEO/JsonLd';

export default function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pkg = packages.find(p => p.slug === slug);

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg?.name,
    "description": pkg?.description,
    "image": pkg?.image,
    "offers": {
      "@type": "Offer",
      "price": pkg?.price.replace(/,/g, ''),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": pkg?.rating,
      "reviewCount": "120"
    }
  };

  if (!pkg) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-black text-brand-navy mb-4">Package Not Found</h2>
        <p className="text-slate-500 mb-8">The package you are looking for does not exist or has been moved.</p>
        <Link href="/packages" className="text-brand-gold font-black uppercase tracking-widest text-sm hover:underline">
          Back to all packages
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-white">
      <JsonLd data={packageSchema} />
      {/* Navigation & Actions Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
         <button onClick={() => router.back()} className="flex items-center gap-2 text-brand-navy font-black uppercase tracking-widest text-[10px] hover:text-brand-gold transition-colors">
            <ArrowLeft size={16} /> Go Back
         </button>
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-brand-navy font-black uppercase tracking-widest text-[10px] hover:text-brand-gold transition-colors">
               <Share2 size={16} /> Share
            </button>
         </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 h-[400px] md:h-[600px] gap-2 px-2">
         <div className="md:col-span-2 relative overflow-hidden rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none">
            <Image src={pkg.images[0]} alt={pkg.name} fill className="object-cover" priority />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2">
            <div className="relative overflow-hidden">
               <Image src={pkg.images[1]} alt={pkg.name} fill className="object-cover" />
            </div>
            <div className="relative overflow-hidden">
               <Image src={pkg.images[2]} alt={pkg.name} fill className="object-cover" />
            </div>
         </div>
         <div className="relative overflow-hidden rounded-b-[2rem] md:rounded-r-[2rem] md:rounded-bl-none hidden md:block">
            <Image src={pkg.images[0]} alt={pkg.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <button className="bg-white text-brand-navy px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">View All Photos</button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-10">
               <div className="flex items-center gap-4 mb-4">
                  <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-gold/20">{pkg.duration}</span>
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(pkg.rating) ? "#D4AF37" : "none"} className={i < Math.floor(pkg.rating) ? "" : "text-brand-gold"} />
                    ))}
                    <span className="text-slate-900 text-xs font-bold ml-1">({pkg.rating}/5 Rating)</span>
                  </div>
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight mb-6">{pkg.name}</h1>
               <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-gold" /> {pkg.destinations.join(", ")}</span>
                  <span className="flex items-center gap-2"><Clock size={18} className="text-brand-gold" /> Best Season: {pkg.bestSeason}</span>
               </div>
            </div>

            <div className="prose prose-slate max-w-none mb-16">
               <h3 className="text-2xl font-black text-brand-navy mb-4">About This Package</h3>
               <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-brand-gold pl-6">{pkg.description}</p>
            </div>

            <div className="mb-16">
               <h3 className="text-2xl font-black text-brand-navy mb-8">Trip Itinerary</h3>
               <div className="space-y-8">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-8 group">
                       <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                             {day.day}
                          </div>
                          <div className="w-0.5 flex-grow bg-slate-100 my-2"></div>
                       </div>
                       <div className="pb-8">
                          <h4 className="text-xl font-black text-brand-navy mb-2">Day {day.day}: {day.title}</h4>
                          <p className="text-slate-500 leading-relaxed">{day.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
               <div className="bg-emerald-50/50 rounded-[2.5rem] p-10 border border-emerald-100">
                  <h3 className="text-2xl font-black text-brand-navy mb-8 flex items-center gap-3">
                     <CheckCircle2 className="text-brand-emerald" /> Inclusions
                  </h3>
                  <div className="space-y-4">
                     {pkg.inclusions.map((item) => (
                       <div key={item} className="flex items-start gap-3 text-slate-600 font-bold text-sm">
                          <CheckCircle2 size={16} className="text-brand-emerald mt-0.5 shrink-0" /> {item}
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-red-50/50 rounded-[2.5rem] p-10 border border-red-100">
                  <h3 className="text-2xl font-black text-brand-navy mb-8 flex items-center gap-3">
                     <XCircle className="text-red-500" /> Exclusions
                  </h3>
                  <div className="space-y-4">
                     {pkg.exclusions.map((item) => (
                       <div key={item} className="flex items-start gap-3 text-slate-600 font-bold text-sm">
                          <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" /> {item}
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <Hotel className="text-brand-gold mb-3" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Accommodation</p>
                  <p className="text-sm font-black text-brand-navy">{pkg.hotelCategory}</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <Utensils className="text-brand-gold mb-3" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Meals Plan</p>
                  <p className="text-sm font-black text-brand-navy">{pkg.meals}</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <Car className="text-brand-gold mb-3" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Transportation</p>
                  <p className="text-sm font-black text-brand-navy">{pkg.transportation}</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <MapPin className="text-brand-gold mb-3" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Pickup/Drop</p>
                  <p className="text-sm font-black text-brand-navy">Srinagar Airport</p>
               </div>
            </div>

            {/* FAQs */}
            <div className="mb-16">
               <h3 className="text-2xl font-black text-brand-navy mb-8">Frequently Asked Questions</h3>
               <div className="space-y-4">
                  {pkg.faqs.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 bg-white rounded-[2.5rem] border shadow-2xl p-8 md:p-10">
                <div className="mb-8">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Package Cost</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-brand-navy">{formatCurrency(pkg.price)}</span>
                      <span className="text-sm text-slate-400 font-medium">/ per person</span>
                   </div>
                   <p className="text-[10px] font-black text-brand-emerald uppercase tracking-widest mt-2">Inclusive of all taxes</p>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Travel Date</p>
                      <p className="text-sm font-black text-brand-navy">Select Date</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Travelers</p>
                      <p className="text-sm font-black text-brand-navy">2 Adults, 0 Children</p>
                   </div>
                </div>

                <div className="space-y-3">
                   <button
                     onClick={() => setIsModalOpen(true)}
                     className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-navy/90 transition-all shadow-xl"
                   >
                      Book This Package
                   </button>
                   <a
                     href="tel:+916006070550"
                     className="w-full border-2 border-brand-navy text-brand-navy py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                   >
                      <Phone size={16} /> Call Expert
                   </a>
                   <a
                     href={`https://wa.me/916006070550?text=Hello Bilu G Travels Kashmir, I want to book the ${pkg.name} package. Please share details.`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2"
                   >
                      <MessageCircle size={16} /> WhatsApp Us
                   </a>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                   <div className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 size={16} />
                      <p className="text-[10px] font-bold">100% Secure Payment Guarantee</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={pkg.name}
      />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left"
      >
        <span className="font-black text-brand-navy text-sm">{question}</span>
        <ChevronDown className={`text-brand-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </button>
      <div className={`px-8 transition-all duration-300 overflow-hidden ${isOpen ? 'pb-6 max-h-40' : 'max-h-0'}`}>
        <p className="text-slate-500 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
