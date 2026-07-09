'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight, MessageCircle, Phone, Package } from 'lucide-react';
import InquiryModal from '@/components/public/InquiryModal';
import AITripPlanner from '@/components/public/AITripPlanner';
import Counter from '@/components/public/Counter';
import HeroCarousel from '@/components/public/HeroCarousel';
import FloatingDestinationCards from '@/components/public/FloatingDestinationCards';
import { formatCurrency } from '@/lib/utils/currency';
import JsonLd from '@/components/public/SEO/JsonLd';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const openInquiry = (pkgName?: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  const agencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Bilu G Travels Kashmir",
    "image": "https://bilugtravelskashmir.com/logo.png",
    "@id": "",
    "url": "https://bilugtravelskashmir.com",
    "telephone": "+916006070550",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Srinagar, Jammu & Kashmir",
      "addressLocality": "Srinagar",
      "postalCode": "190001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0837,
      "longitude": 74.7973
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <div className="relative">
      <JsonLd data={agencySchema} />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background Carousel */}
        <HeroCarousel />

        {/* Animated Floating Destination Cards */}
        <FloatingDestinationCards />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">
              Trusted Local Kashmir DMC
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold italic">Paradise</span> <br/>
              of Kashmir with Local Experts
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
              Premium Kashmir Tour Packages • Offbeat Kashmir • Luxury Hotels • Houseboats • Private Transport • Authentic Hospitality
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
               <button onClick={() => openInquiry()} className="h-16 px-10 rounded-full bg-brand-gold text-brand-navy font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center gap-2 group">
                 <Star className="w-5 h-5 fill-brand-navy" /> Book Your Tour
               </button>
               <Link href="/packages" className="h-16 px-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all flex items-center gap-2">
                 <Package className="w-5 h-5" /> Explore Packages
               </Link>
               <a href="https://wa.me/916006070550" target="_blank" rel="noopener noreferrer" className="h-16 w-16 rounded-full bg-brand-whatsapp text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                 <MessageCircle className="w-8 h-8" />
               </a>
               <a href="tel:+916006070550" className="h-16 w-16 rounded-full bg-brand-royalblue text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                 <Phone className="w-7 h-7" />
               </a>
            </div>

            {/* Luxury Search Widget */}
            <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-[3rem] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <div className="px-6 py-2 border-r border-white/10 text-left">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1.5"><MapPin size={12} /> Destination</p>
                <select className="bg-transparent text-white font-bold outline-none w-full appearance-none">
                  <option className="bg-brand-navy">Srinagar</option>
                  <option className="bg-brand-navy">Gulmarg</option>
                  <option className="bg-brand-navy">Pahalgam</option>
                  <option className="bg-brand-navy">Gurez Valley</option>
                </select>
              </div>
              <div className="px-6 py-2 border-r border-white/10 text-left">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Calendar size={12} /> Travel Date</p>
                <input type="date" className="bg-transparent text-white font-bold outline-none w-full [color-scheme:dark]" />
              </div>
              <div className="px-6 py-2 border-r border-white/10 text-left">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Users size={12} /> Travellers</p>
                <select className="bg-transparent text-white font-bold outline-none w-full appearance-none">
                  <option className="bg-brand-navy">1-2 Person</option>
                  <option className="bg-brand-navy">Family (4-6)</option>
                  <option className="bg-brand-navy">Group (10+)</option>
                </select>
              </div>
              <div className="px-6 py-2 border-r border-white/10 text-left">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Package size={12} /> Package Type</p>
                <select className="bg-transparent text-white font-bold outline-none w-full appearance-none">
                  <option className="bg-brand-navy">Luxury</option>
                  <option className="bg-brand-navy">Honeymoon</option>
                  <option className="bg-brand-navy">Offbeat</option>
                </select>
              </div>
              <div className="p-2">
                <button className="w-full bg-brand-gold text-brand-navy h-14 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2">
                  <Search size={18} /> Search Tours
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics */}
        <div className="absolute bottom-10 left-0 w-full z-10 px-4">
           <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/20 backdrop-blur-md rounded-[2.5rem] border border-white/5 py-4">
              <Counter end={10000} suffix="+" label="Happy Travellers" />
              <Counter end={500} suffix="+" label="Tour Packages" />
              <Counter end={4.9} label="Google Rating" />
              <Counter end={24} suffix="/7" label="Local Support" />
           </div>
        </div>
      </section>

      {/* AI Trip Planner Section */}
      <AITripPlanner />

      {/* Featured Packages */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Premium Selection</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter">Best Selling Packages</h2>
            </div>
            <Link href="/packages" className="group flex items-center gap-2 font-black text-brand-navy uppercase tracking-widest text-xs hover:text-brand-gold transition-colors">
              Explore All Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <PackageCard
              slug="4-nights-5-days-kashmir"
              image="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800"
              title="4 Nights 5 Days Kashmir"
              duration="4N/5D"
              price="13,999"
              rating="4.9"
              destinations={["Srinagar", "Gulmarg", "Pahalgam"]}
              onBook={() => openInquiry("4 Nights 5 Days Kashmir")}
            />
            <PackageCard
              slug="5-nights-6-days-kashmir"
              image="https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800"
              title="5 Nights 6 Days Kashmir"
              duration="5N/6D"
              price="16,999"
              rating="5.0"
              destinations={["Srinagar", "Dal Lake", "Sonamarg"]}
              onBook={() => openInquiry("5 Nights 6 Days Kashmir")}
            />
            <PackageCard
              slug="6-nights-7-days-kashmir"
              image="https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
              title="6 Nights 7 Days Kashmir"
              duration="6N/7D"
              price="19,999"
              rating="4.8"
              destinations={["Gulmarg", "Pahalgam", "Doodhpathri"]}
              onBook={() => openInquiry("6 Nights 7 Days Kashmir")}
            />
          </div>
        </div>
      </section>

      {/* Offbeat Kashmir */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald/10 blur-[120px] -mr-48 -mt-48 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 blur-[120px] -ml-48 -mb-48 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block italic">Hidden Gems of Kashmir</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Explore the Untouched</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Venture beyond the tourist trails to discover the true soul of Kashmir in its remote and beautiful valleys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OffbeatCard onExplore={() => openInquiry("Gurez Valley")} name="Gurez Valley" price="17,999" image="https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=500" />
            <OffbeatCard onExplore={() => openInquiry("Bangus Valley")} name="Bangus Valley" price="12,999" image="https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=500" />
            <OffbeatCard onExplore={() => openInquiry("Lolab Valley")} name="Lolab Valley" price="12,499" image="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=500" />
            <OffbeatCard onExplore={() => openInquiry("Warwan Valley")} name="Warwan Valley" price="26,999" image="https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=500" />
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tighter">What Our Guests Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard
              name="Rahul Sharma"
              text="Amazing experience with Bilu G Travels. The houseboat stay was the highlight of our trip. Everything was perfectly managed."
              image="https://i.pravatar.cc/150?u=rahul"
            />
            <ReviewCard
              name="Anjali Gupta"
              text="The offbeat tour to Gurez Valley was breathtaking. Our guide was very knowledgeable and the arrangements were top-notch."
              image="https://i.pravatar.cc/150?u=anjali"
            />
            <ReviewCard
              name="David Wilson"
              text="Professional service and authentic Kashmiri hospitality. Highly recommended for anyone visiting the valley for the first time."
              image="https://i.pravatar.cc/150?u=david"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Questions?</span>
            <h2 className="text-4xl font-black text-brand-navy tracking-tighter">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="What is the best time to visit Kashmir?"
              answer="Kashmir is a year-round destination. March to June is perfect for pleasant weather and gardens. December to February is ideal for snow lovers and skiing in Gulmarg."
            />
            <FAQItem
              question="Do I need a special permit for offbeat areas?"
              answer="Yes, areas like Gurez and Bangus require special permits. As your local DMC, we handle all permit formalities for our guests."
            />
            <FAQItem
              question="Are your packages customizable?"
              answer="Absolutely! We specialize in tailor-made itineraries. You can customize every aspect of your trip from hotel category to destinations."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-brand-gold transition-all group">
                 <div className="w-20 h-20 rounded-3xl bg-brand-navy flex items-center justify-center text-brand-gold mb-8 shadow-xl group-hover:-translate-y-2 transition-transform">
                    <ShieldCheck size={40} />
                 </div>
                 <h3 className="text-xl font-black text-brand-navy mb-4">Trusted Local DMC</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Direct from Kashmir locals. No middlemen, no hidden costs, just authentic hospitality.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-brand-gold transition-all group">
                 <div className="w-20 h-20 rounded-3xl bg-brand-navy flex items-center justify-center text-brand-gold mb-8 shadow-xl group-hover:-translate-y-2 transition-transform">
                    <Clock size={40} />
                 </div>
                 <h3 className="text-xl font-black text-brand-navy mb-4">24/7 Ground Support</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Our team is available round the clock in Kashmir to ensure your trip goes smoothly.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-brand-gold transition-all group">
                 <div className="w-20 h-20 rounded-3xl bg-brand-navy flex items-center justify-center text-brand-gold mb-8 shadow-xl group-hover:-translate-y-2 transition-transform">
                    <CheckCircle2 size={40} />
                 </div>
                 <h3 className="text-xl font-black text-brand-navy mb-4">Certified Luxury</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Top-rated hotels, premium vehicles, and the most experienced local guides.</p>
              </div>
           </div>
        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedPackage}
      />
    </div>
  );
}

function PackageCard({ slug, image, title, duration, price, rating, destinations, onBook }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
    >
      <Link href={`/packages/${slug}`} className="relative h-72 overflow-hidden block">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-lg z-10">
          {duration}
        </div>
        <div className="absolute top-6 right-6 bg-brand-gold text-brand-navy px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-10">
          -15% OFF
        </div>
        <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-brand-navy/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-black shadow-lg">
           <Star size={12} fill="#D4AF37" className="text-brand-gold" /> {rating} Rating
        </div>
      </Link>

      <div className="p-10 flex-1 flex flex-col">
        <div className="mb-6 flex-1">
          <Link href={`/packages/${slug}`}>
            <h3 className="text-2xl font-black text-brand-navy group-hover:text-brand-gold transition-colors mb-3 leading-tight">{title}</h3>
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {destinations.map((d: string) => (
              <span key={d} className="px-2 py-0.5 rounded bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-100">{d}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting At</p>
            <p className="text-3xl font-black text-brand-navy">{formatCurrency(price)}</p>
          </div>
          <div className="flex gap-2">
             <a
               href={`https://wa.me/916006070550?text=Hello Bilu G Travels Kashmir, I want to book the ${title} package.`}
               target="_blank"
               rel="noopener noreferrer"
               className="w-12 h-12 rounded-2xl bg-brand-whatsapp/10 text-brand-whatsapp flex items-center justify-center hover:bg-brand-whatsapp hover:text-white transition-all shadow-sm"
             >
                <MessageCircle size={20} />
             </a>
             <button
               onClick={onBook}
               className="h-12 px-6 rounded-2xl bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg"
             >
                Book Now
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OffbeatCard({ name, price, image, onExplore }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onExplore}
      className="relative h-[32rem] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/5"
    >
      <Image src={image} alt={name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500"></div>

      <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
         Starting {formatCurrency(price)}
      </div>

      <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
         <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.3em] mb-3 block italic">Hidden Gem</span>
         <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">{name}</h4>
         <p className="text-white/60 text-sm mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">Explore the untouched landscapes and authentic local culture of {name}.</p>
         <div className="flex items-center justify-between">
            <span className="text-brand-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
               Explore Now <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </span>
         </div>
      </div>
    </motion.div>
  );
}

function ReviewCard({ name, text, image }: any) {
  return (
    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all">
      <div className="flex items-center gap-1 text-brand-gold mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#D4AF37" />)}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&quot;{text}&quot;</p>
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <p className="text-sm font-black text-brand-navy">{name}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left"
      >
        <span className="font-black text-brand-navy">{question}</span>
        <ChevronRight className={`text-brand-gold transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <div className={`px-8 transition-all overflow-hidden ${isOpen ? 'pb-6 max-h-40' : 'max-h-0'}`}>
        <p className="text-slate-500 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
