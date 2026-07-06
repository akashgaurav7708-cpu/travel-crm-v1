'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Hotel,
  Bus,
  Package,
  CalendarCheck,
  Map,
  BarChart3,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/hooks/useAuth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Customers', href: '/customers', icon: UserCircle },
  { name: 'Hotels', href: '/hotels', icon: Hotel },
  { name: 'Transport', href: '/transport', icon: Bus },
  { name: 'Tour Packages', href: '/packages', icon: Package },
  { name: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { name: 'Itinerary Builder', href: '/itinerary-builder', icon: Map },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { profile, isSuperAdmin } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-20 items-center px-6 border-b border-slate-800">
        <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
          Ex-Employee v0.2 <br/>
          <span className="text-xs font-medium text-blue-400">by Bilu G</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className={cn(
                'mr-3 h-5 w-5 flex-shrink-0',
                isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'
              )} />
              {item.name}
            </Link>
          );
        })}

        {isSuperAdmin && (
           <Link
             href="/super-admin"
             className={cn(
               'group flex items-center rounded-md px-3 py-2 text-sm font-black uppercase tracking-widest mt-6 border border-blue-900/50 transition-colors',
               pathname === '/super-admin'
                 ? 'bg-blue-600 text-white'
                 : 'text-blue-400 hover:bg-blue-900/30'
             )}
           >
             <ShieldAlert className="mr-3 h-5 w-5 flex-shrink-0" />
             Super Admin
           </Link>
        )}
      </nav>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs font-bold">{profile?.first_name?.[0] || 'U'}{profile?.last_name?.[0] || 'S'}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">{profile?.first_name} {profile?.last_name || 'User'}</p>
            <p className="truncate text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{profile?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
