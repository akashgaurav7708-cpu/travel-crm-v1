'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { fleetService } from '@/lib/services/index';
import Link from 'next/link';

function VehicleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Sedan',
    registration_number: '',
    capacity: 4,
    is_active: true,
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
      if (isEditing) {
        // await fleetService.updateVehicle(id, formData);
      } else {
        await fleetService.createVehicle(formData);
      }
      router.push('/fleet/vehicles');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Failed to save vehicle'}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/fleet/vehicles" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
           </Link>
           <h2 className="text-2xl font-black text-slate-900">{isEditing ? 'Modify Fleet Asset' : 'Add New Vehicle'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border shadow-sm p-10 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Model Name *</label>
               <input required type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Toyota Innova Crysta" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registration Number *</label>
               <input required type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" placeholder="JK 01 X 0000" value={formData.registration_number} onChange={e => setFormData({...formData, registration_number: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vehicle Type</label>
               <select className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="Sedan">Sedan (Dzire/Etios)</option>
                  <option value="SUV">SUV (Innova/Ertiga)</option>
                  <option value="Traveller">Tempo Traveller</option>
                  <option value="Bus">Luxury Coach</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pax Capacity</label>
               <input required type="number" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} />
            </div>
         </div>
         <button disabled={loading} type="submit" className="w-full h-14 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center justify-center">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-2" /> Publish to Fleet</>}
         </button>
      </form>
    </div>
  )
}

export default function NewVehiclePage() {
  return <Suspense><VehicleForm /></Suspense>;
}
