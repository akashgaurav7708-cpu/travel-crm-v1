'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, MessageCircle, ChevronRight, Hash, List, HelpCircle } from 'lucide-react';
import { blogPosts } from '@/lib/data/blog';
import JsonLd from '@/components/public/SEO/JsonLd';

export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-black text-brand-navy mb-4">Post Not Found</h2>
        <p className="text-slate-500 mb-8">The article you are looking for does not exist.</p>
        <Link href="/blog" className="text-brand-gold font-black uppercase tracking-widest text-sm hover:underline">
          Back to all articles
        </Link>
      </div>
    );
  }

  // Simple Table of Contents extraction
  const toc = post.content
    .split('\n')
    .filter(line => line.startsWith('###'))
    .map(line => line.replace('###', '').trim());

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Bilu G Travels Kashmir",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bilugtravelskashmir.com/logo.png"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need a special permit to visit Gurez?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Gurez requires special permits from the Indian Army. As your DMC, we handle all these formalities for you."
        }
      },
      {
        "@type": "Question",
        "name": "Is internet available in offbeat Kashmir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many offbeat areas have limited or no connectivity. Areas like Chatpal offer a perfect digital detox experience."
        }
      }
    ]
  };

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
         <button onClick={() => router.back()} className="flex items-center gap-2 text-brand-navy font-black uppercase tracking-widest text-[10px] mb-12 hover:text-brand-gold transition-colors">
            <ArrowLeft size={16} /> Go Back
         </button>

         <div className="flex items-center gap-4 mb-8">
            <span className="bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-gold/20">
               {post.category}
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-gold" /> {post.date}</span>
               <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-gold" /> {post.readTime}</span>
            </div>
         </div>

         <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tight mb-8 leading-[1.1]">
            {post.title}
         </h1>

         <div className="flex items-center justify-between py-8 border-y border-slate-100">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center font-black shadow-lg">
                  {post.author[0]}
               </div>
               <div>
                  <p className="text-xs font-black text-brand-navy uppercase tracking-widest">{post.author}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kashmir Travel Expert</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 hidden sm:block">Share:</span>
               <button className="w-10 h-10 rounded-xl bg-brand-royalblue text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Share2 size={16} />
               </button>
               <button className="w-10 h-10 rounded-xl bg-brand-whatsapp text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle size={16} />
               </button>
            </div>
         </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="relative h-[400px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden">
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-lg font-black text-brand-navy mb-6 flex items-center gap-3">
                     <List size={20} className="text-brand-gold" /> Table of Contents
                  </h4>
                  <ul className="space-y-4">
                     {toc.map((item, i) => (
                        <li key={i}>
                           <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-bold text-slate-500 hover:text-brand-gold flex items-center gap-2">
                              <ChevronRight size={14} /> {item}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Article Content */}
            <div className="lg:col-span-8">
               <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-brand-navy prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-brand-navy prose-a:text-brand-gold prose-img:rounded-[2rem]">
                  {post.content.split('\n').map((para, i) => {
                    if (para.startsWith('###')) {
                      const heading = para.replace('###', '').trim();
                      return <h3 key={i} id={heading.toLowerCase().replace(/\s+/g, '-')} className="text-2xl mt-12 mb-6">{heading}</h3>;
                    }
                    if (para.trim() === '') return null;
                    return <p key={i} className="mb-6">{para}</p>;
                  })}
               </div>

               {/* Post Tags */}
               <div className="mt-16 pt-12 border-t flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500"><Hash size={12} className="text-brand-gold" /> Kashmir</span>
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500"><Hash size={12} className="text-brand-gold" /> Travel Tips</span>
                  <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500"><Hash size={12} className="text-brand-gold" /> Local DMC</span>
               </div>

               {/* FAQ Section */}
               <div className="mt-20 bg-brand-navy rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-black mb-10 flex items-center gap-4">
                        <HelpCircle size={32} className="text-brand-gold" /> Frequently Asked Questions
                     </h3>
                     <div className="space-y-6">
                        {[
                           { q: "Do I need a special permit to visit Gurez?", a: "Yes, Gurez requires special permits from the Indian Army. As your DMC, we handle all these formalities for you." },
                           { q: "Is internet available in offbeat Kashmir?", a: "Many offbeat areas have limited or no connectivity. Areas like Chatpal offer a perfect digital detox experience." }
                        ].map((faq, i) => (
                           <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                              <p className="font-black text-brand-gold mb-2">Q: {faq.q}</p>
                              <p className="text-slate-300 text-sm leading-relaxed">{faq.a}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
               {/* Table of Contents - Desktop */}
               <div className="hidden lg:block sticky top-32">
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                     <h4 className="text-xl font-black text-brand-navy mb-8 flex items-center gap-3">
                        <List size={24} className="text-brand-gold" /> Table of Contents
                     </h4>
                     <ul className="space-y-6">
                        {toc.map((item, i) => (
                           <li key={i}>
                              <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-black text-slate-400 hover:text-brand-navy flex items-center gap-2 group transition-colors">
                                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-brand-gold transition-colors"></div> {item}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Related Articles */}
                  <div className="mt-12">
                     <h4 className="text-xl font-black text-brand-navy mb-8">Related Articles</h4>
                     <div className="space-y-8">
                        {relatedPosts.map(post => (
                           <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                              <div className="relative h-48 rounded-3xl overflow-hidden mb-4 shadow-lg">
                                 <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                              </div>
                              <h5 className="font-black text-brand-navy leading-tight group-hover:text-brand-gold transition-colors">{post.title}</h5>
                           </Link>
                        ))}
                     </div>
                  </div>

                  {/* CTA Box */}
                  <div className="mt-12 bg-brand-gold p-10 rounded-[3rem] text-brand-navy shadow-xl">
                     <h4 className="text-2xl font-black mb-4">Planning a Trip?</h4>
                     <p className="font-bold text-sm mb-8 opacity-80">Let our local experts curate the perfect Kashmir itinerary for you.</p>
                     <Link href="/packages" className="block w-full bg-brand-navy text-white text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all">
                        Explore Packages
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
