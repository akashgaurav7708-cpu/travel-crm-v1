'use client';

import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const supabase = createClient();
  const router = useRouter();
  const { profile } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-10">
      <div className="flex w-full max-w-md items-center rounded-2xl bg-slate-50 border border-slate-100 px-4 py-2.5 text-slate-500 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-50">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Global search leads, bookings, or entities..."
          className="ml-3 w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative rounded-xl p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-100"></div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 leading-none">{profile?.first_name} {profile?.last_name || 'Ex-Employee User'}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{profile?.role?.replace('_', ' ')}</p>
           </div>
           <button
             onClick={handleSignOut}
             className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
           >
             <LogOut className="h-4 w-4" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
