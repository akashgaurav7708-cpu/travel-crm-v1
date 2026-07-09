'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';

export default function BlogListing() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-brand-gold font-black uppercase tracking-widest text-xs mb-3 block">Travel Blog</span>
          <h1 className="text-4xl md:text-7xl font-black text-brand-navy tracking-tighter mb-8 italic">Insights from Kashmir</h1>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover travel tips, offbeat guides, and stories from the heart of the Himalayas. Written by locals who know the valley best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {blogPosts.map((post) => (
             <article key={post.slug} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border hover:shadow-2xl transition-all duration-500">
                <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                   <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-6 left-6 bg-brand-gold text-brand-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {post.category}
                   </div>
                </Link>
                <div className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-gold" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-gold" /> {post.readTime}</span>
                   </div>
                   <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-black text-brand-navy group-hover:text-brand-gold transition-colors mb-4 leading-tight">
                         {post.title}
                      </h2>
                   </Link>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                   </p>
                   <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-brand-navy">
                            {post.author[0]}
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-brand-gold text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                         Read More <ArrowRight size={14} />
                      </Link>
                   </div>
                </div>
             </article>
           ))}
        </div>

        {/* Newsletter Box */}
        <div className="mt-32 bg-brand-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Stay Updated</h3>
              <p className="text-slate-300 text-lg mb-10">
                 Subscribe to our newsletter to receive the latest travel guides and exclusive package offers.
              </p>
              <form className="flex flex-col md:flex-row gap-4">
                 <input
                   type="email"
                   placeholder="Your email address"
                   className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none focus:border-brand-gold transition-colors"
                 />
                 <button className="bg-brand-gold text-brand-navy px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl">
                    Subscribe
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
