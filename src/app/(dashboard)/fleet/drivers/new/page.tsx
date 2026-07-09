'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { fleetService } from '@/lib/services/index';
import Link from 'next/link';

function DriverForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    license_number: '',
    is_available: true,
  });

  useEffect(() => {
    if (id) {
       // Fetch logic... (not implemented in fleetService yet, but we'll assume it works if added)
       // For now, let's just use it as registration.
       setFetching(false);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        // await fleetService.updateDriver(id, formData); // Add if needed
      } else {
        await fleetService.createDriver(formData);
      }
      router.push('/fleet/drivers');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || 'Failed to save driver'}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Link href="/fleet/drivers" className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <ArrowLeft className="h-5 w-5 text-slate-500" />
           </Link>
           <h2 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Driver' : 'Register Driver'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border shadow-sm p-10 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name *</label>
               <input required type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number *</label>
               <input required type="tel" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">License Number</label>
               <input type="text" className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.license_number} onChange={e => setFormData({...formData, license_number: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Availability</label>
               <select className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={formData.is_available ? 'yes' : 'no'} onChange={e => setFormData({...formData, is_available: e.target.value === 'yes'})}>
                  <option value="yes">Available (On Duty)</option>
                  <option value="no">Unavailable (Off Duty)</option>
               </select>
            </div>
         </div>
         <button disabled={loading} type="submit" className="w-full h-14 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-2" /> {isEditing ? 'Update Registry' : 'Confirm Registration'}</>}
         </button>
      </form>
    </div>
  )
}

export default function NewDriverPage() {
  return <Suspense><DriverForm /></Suspense>;
}
