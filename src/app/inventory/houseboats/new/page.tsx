'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Anchor, Star, MapPin, ArrowLeft } from 'lucide-react';
import { accommodationsService } from '@/lib/services/index';
import Link from 'next/link';

function HouseboatForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    type: 'houseboat',
    star_rating: 4,
    location: '',
    address: '',
    description: '',
    amenities: ['Upper Deck', 'Private Cook', 'On-board Dining'],
  });

  useEffect(() => {
    if (id) {
       // Fetch logic...
       setFetching(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await accommodationsService.create(formData);
      router.push('/inventory/houseboats');
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/inventory/houseboats" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
           </Link>
           <h2 className="text-2xl font-black text-slate-900">{isEditing ? 'Modify Houseboat Vessel' : 'Register New Houseboat'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border shadow-sm p-10 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vessel Name *</label>
               <input required type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Royal Jasmine Houseboat" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Location *</label>
               <input required type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Dal Lake, Srinagar" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Star Rating</label>
               <select className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={formData.star_rating} onChange={e => setFormData({...formData, star_rating: parseInt(e.target.value)})}>
                  <option value={3}>3 Star (Standard)</option>
                  <option value={4}>4 Star (Deluxe)</option>
                  <option value={5}>5 Star (Premium Luxury)</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vessel Category</label>
               <input disabled type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold outline-none text-slate-400" value="Private Houseboat" />
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">About Vessel</label>
            <textarea rows={4} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
         </div>
         <button disabled={loading} type="submit" className="w-full h-14 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-2" /> Publish to Inventory</>}
         </button>
      </form>
    </div>
  )
}

export default function NewHouseboatPage() {
  return <Suspense><HouseboatForm /></Suspense>;
}
