'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, MapPin, Calendar, Users, DollarSign, Bot, Globe, ArrowRight } from 'lucide-react';

export default function AIGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulation for Enterprise AI
    setTimeout(() => {
      setResult({
        title: "Kashmir: The Alpine Luxury Escape",
        summary: "A meticulously crafted 7-day journey through the heart of the Himalayas, optimized for high-end families seeking cultural immersion and unparalleled comfort.",
        highlights: ["Private Shikara Dinner", "Pahalgam Helicopter Tour", "Gulmarg Igloo Dining"],
        cost_analysis: {
          base: 1250,
          markup: "15%",
          total: 1437.50
        }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest">Enterprise AI</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v0.2 Intelligence Engine</span>
           </div>
           <h2 className="text-4xl font-black tracking-tight text-slate-900">AI Concierge & Generator</h2>
           <p className="text-slate-500 font-bold">Instantly generate itineraries, tour packages, and cost analysis using Bilu G AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Bot className="h-32 w-32" />
              </div>
              <h3 className="text-xl font-black mb-6 relative z-10">Generate Strategy</h3>
              <div className="space-y-6 relative z-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">Context / Destination</label>
                    <input
                      type="text"
                      placeholder="e.g. 7 Days Luxury Trip to Kashmir"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Tone</p>
                       <p className="text-xs font-bold">Premium</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Language</p>
                       <p className="text-xs font-bold">English (UK)</p>
                    </div>
                 </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full mt-10 h-14 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                 {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Sparkles className="h-5 w-5 mr-2" /> Ignite Generator</>}
              </button>
           </div>
        </div>

        <div className="lg:col-span-2">
           {result ? (
              <div className="bg-white rounded-[3rem] border-2 border-blue-50 shadow-2xl p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <div className="flex items-start justify-between">
                    <div className="space-y-4 max-w-lg">
                       <h3 className="text-3xl font-black text-slate-900 leading-tight">{result.title}</h3>
                       <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-blue-100 pl-6">{result.summary}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated LTV</p>
                       <p className="text-3xl font-black text-green-600">${result.cost_analysis.total}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.highlights.map((h: string) => (
                       <div key={h} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-blue-600 hover:text-white transition-all cursor-default">
                          <MapPin className="h-5 w-5 mb-4 text-blue-500 group-hover:text-white" />
                          <p className="text-xs font-black uppercase tracking-widest">{h}</p>
                       </div>
                    ))}
                 </div>

                 <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex gap-4">
                       <button className="px-6 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Publish as Package</button>
                       <button className="px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Save as Draft</button>
                    </div>
                    <button className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center hover:underline">
                       Detailed Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                 </div>
              </div>
           ) : (
              <div className="h-full min-h-[400px] rounded-[3rem] border-4 border-dashed border-slate-50 flex flex-col items-center justify-center text-center p-12">
                 <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                    <Sparkles className="h-10 w-10 text-slate-200" />
                 </div>
                 <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.2em]">Ready for Generation</h3>
                 <p className="mt-4 text-slate-300 font-bold max-w-sm">Enter a destination and duration to let the AI build your next commercial masterpiece.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  )
}
