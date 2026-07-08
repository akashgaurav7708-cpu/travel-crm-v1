'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AITripPlanner = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const generateTrip = () => {
    setLoading(true);
    // Simulate AI Generation
    setTimeout(() => {
      setItinerary({
        title: "Your Personalized 6-Day Luxury Kashmir Escape",
        days: [
          { day: 1, activity: "Arrival in Srinagar, Luxury Houseboat Check-in & Sunset Shikara Ride." },
          { day: 2, activity: "Gulmarg Highlands: Private Gondola Experience & Skiing Session." },
          { day: 3, activity: "Scenic Drive to Pahalgam, Riverside Picnic & Aru Valley Visit." },
          { day: 4, activity: "Hidden Gem: Doodhpathri Meadows & Local Shepherd Village Tour." },
          { day: 5, activity: "Old City Srinagar Heritage Walk & Mughal Gardens Exploration." },
          { day: 6, activity: "Souvenir Shopping at Floating Market & Airport Drop." }
        ]
      });
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-navy/[0.02] skew-x-12 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand-navy/5 text-brand-navy text-[10px] font-black uppercase tracking-widest border border-brand-navy/10">
              <Sparkles size={14} className="text-brand-gold" /> Powered by Bilu G Intelligence
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tighter mb-8">
              AI-Powered <br/><span className="text-brand-gold italic">Kashmir Planner</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-xl">
              Tell us your preferences and let our local-trained AI curate the perfect Kashmir itinerary for you in seconds.
            </p>

            <div className="space-y-4">
               {[
                 "Personalized based on your interests",
                 "Optimized travel routes for maximum comfort",
                 "Includes hidden gems and local favorites",
                 "Get a direct quote for your custom plan"
               ].map(item => (
                 <div key={item} className="flex items-center gap-3 text-brand-navy font-bold text-sm">
                    <CheckCircle2 size={18} className="text-brand-emerald" /> {item}
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[3rem] shadow-2xl border p-8 md:p-12 relative overflow-hidden">
               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                       <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Month of Travel</label>
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold">
                                   <option>January</option>
                                   <option>April</option>
                                   <option>June</option>
                                   <option>October</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</label>
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-gold">
                                   <option>3-5 Days</option>
                                   <option>6-8 Days</option>
                                   <option>9+ Days</option>
                                </select>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">What do you love most?</label>
                             <div className="grid grid-cols-2 gap-2">
                                {["Snow & Mountains", "Lakes & Gardens", "Adventure", "Offbeat & Peace"].map(tag => (
                                   <button key={tag} className="px-4 py-3 rounded-xl border text-xs font-bold hover:bg-brand-navy hover:text-white transition-all">{tag}</button>
                                ))}
                             </div>
                          </div>
                       </div>
                       <button
                         onClick={() => setStep(2)}
                         className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                       >
                         Next Step <ArrowRight size={18} />
                       </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                       <div className="space-y-6 text-center">
                          <h4 className="text-xl font-black text-brand-navy">Who are you traveling with?</h4>
                          <div className="grid grid-cols-2 gap-4">
                             {["Solo", "Couple", "Family", "Friends"].map(cat => (
                                <button key={cat} className="p-6 rounded-3xl border flex flex-col items-center gap-3 hover:border-brand-gold transition-all group">
                                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white">
                                      <Users size={20} />
                                   </div>
                                   <span className="font-bold text-sm">{cat}</span>
                                </button>
                             ))}
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setStep(1)} className="w-1/3 border py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Back</button>
                          <button
                            onClick={generateTrip}
                            className="flex-1 bg-brand-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl"
                          >
                            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} className="text-brand-gold" /> Generate Plan</>}
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {step === 3 && itinerary && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8"
                    >
                       <div className="bg-brand-navy p-6 rounded-[2rem] text-white">
                          <h4 className="font-black text-lg leading-tight mb-2">{itinerary.title}</h4>
                          <p className="text-[10px] font-black uppercase text-brand-gold tracking-[0.2em]">Crafted by Bilu G AI</p>
                       </div>

                       <div className="space-y-4 max-h-80 overflow-y-auto pr-2 no-scrollbar">
                          {itinerary.days.map((d: any) => (
                             <div key={d.day} className="flex gap-4 border-l-2 border-slate-100 pl-4 py-1">
                                <span className="font-black text-brand-gold text-sm shrink-0">D{d.day}</span>
                                <p className="text-sm font-medium text-slate-600 leading-relaxed">{d.activity}</p>
                             </div>
                          ))}
                       </div>

                       <button className="w-full bg-brand-gold text-brand-navy py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
                          Get Cost for This Plan
                       </button>
                       <button onClick={() => setStep(1)} className="w-full text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-navy">Start Over</button>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITripPlanner;
