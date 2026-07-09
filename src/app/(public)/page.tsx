'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import InquiryModal from '@/components/public/InquiryModal';
import AITripPlanner from '@/components/public/AITripPlanner';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const openInquiry = (pkgName?: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=2000"
            alt="Kashmir Dal Lake"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-widest">
              Welcome to the Paradise on Earth
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
              Experience Kashmir <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">Like Never Before</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Your Trusted Local Kashmir DMC providing premium tour packages, luxury houseboats, and offbeat explorations with authentic hospitality.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-6 gap-3 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
                <MapPin className="text-brand-gold w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Destination</p>
                  <input type="text" placeholder="Where to go?" className="bg-transparent text-white font-bold outline-none placeholder:text-slate-400 w-full" />
                </div>
              </div>
              <div className="flex-1 flex items-center px-6 gap-3 border-b md:border-b-0 md:border-r border-white/10 py-3 md:py-0">
                <Calendar className="text-brand-gold w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Travel Date</p>
                  <input type="text" placeholder="Add date" className="bg-transparent text-white font-bold outline-none placeholder:text-slate-400 w-full" />
                </div>
              </div>
              <div className="flex-1 flex items-center px-6 gap-3 py-3 md:py-0">
                <Users className="text-brand-gold w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Travelers</p>
                  <input type="text" placeholder="Add guests" className="bg-transparent text-white font-bold outline-none placeholder:text-slate-400 w-full" />
                </div>
              </div>
              <button
                onClick={() => openInquiry()}
                className="bg-brand-gold text-brand-navy h-14 px-10 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
              >
                Search
              </button>
            </div>
          </motion.div>
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
            <Link href="/tour-packages" className="group flex items-center gap-2 font-black text-brand-navy uppercase tracking-widest text-xs hover:text-brand-gold transition-colors">
              Explore All Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <PackageCard
              image="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800"
              title="Classic Kashmir Valley"
              duration="5 Days / 4 Nights"
              price="13,999"
              rating="4.9"
              destinations={["Srinagar", "Gulmarg", "Pahalgam"]}
              onBook={() => openInquiry("Classic Kashmir Valley")}
            />
            <PackageCard
              image="https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800"
              title="Luxury Houseboat Retreat"
              duration="6 Days / 5 Nights"
              price="16,999"
              rating="5.0"
              destinations={["Srinagar", "Dal Lake", "Sonamarg"]}
              onBook={() => openInquiry("Luxury Houseboat Retreat")}
            />
            <PackageCard
              image="https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800"
              title="Kashmir Winter Special"
              duration="7 Days / 6 Nights"
              price="19,999"
              rating="4.8"
              destinations={["Gulmarg", "Pahalgam", "Doodhpathri"]}
              onBook={() => openInquiry("Kashmir Winter Special")}
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

function PackageCard({ image, title, duration, price, rating, destinations, onBook }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border hover:shadow-2xl transition-all group"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-sm">
           {duration}
        </div>
        <div className="absolute top-4 right-4 bg-brand-gold text-brand-navy px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
           -20% OFF
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-brand-navy leading-tight">{title}</h3>
          <div className="flex items-center gap-1 bg-brand-navy text-brand-gold px-2 py-0.5 rounded-lg text-[10px] font-black">
            <Star size={10} fill="#D4AF37" /> {rating}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {destinations.map((d: string) => (
            <span key={d} className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">{d}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Per Person</p>
            <p className="text-2xl font-black text-brand-navy">${price}</p>
          </div>
          <button
            onClick={onBook}
            className="h-12 px-6 rounded-2xl bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
          >
             Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function OffbeatCard({ name, price, image, onExplore }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onExplore}
      className="relative h-96 rounded-[2rem] overflow-hidden group cursor-pointer"
    >
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
         <span className="text-brand-gold font-black text-[10px] uppercase tracking-widest mb-2 block">Offbeat Destination</span>
         <h4 className="text-2xl font-black text-white mb-2">{name}</h4>
         <div className="flex items-center justify-between">
            <p className="text-white/80 font-bold">Starting ${price}</p>
            <ArrowRight size={18} className="text-brand-gold group-hover:translate-x-2 transition-transform" />
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
      <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{text}"</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover" />
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
