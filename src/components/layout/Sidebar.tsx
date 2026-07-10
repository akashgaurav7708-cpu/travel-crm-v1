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
  ShieldAlert,
  Anchor,
  UserCheck,
  CreditCard,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  Calculator,
  MessageSquare,
  Image as ImageIcon,
  Building,
  Briefcase,
  History,
  Bell,
  Wallet
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/hooks/useAuth';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarGroup = ({ title, items, pathname }: { title: string, items: any[], pathname: string }) => (
  <div className="space-y-1 mb-6">
    <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{title}</h3>
    {items.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'group flex items-center rounded-lg px-3 py-2 text-xs font-bold transition-all',
            isActive
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          )}
        >
          <item.icon className={cn(
            'mr-3 h-4 w-4 flex-shrink-0',
            isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
          )} />
          {item.name}
        </Link>
      );
    })}
  </div>
);

const Sidebar = () => {
  const pathname = usePathname();
  const { profile, isSuperAdmin } = useAuth();

  const groups = [
    {
      title: 'Analytics',
      items: [
        { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Reports & P&L', href: '/reports', icon: BarChart3 },
      ]
    },
    {
      title: 'Sales & CRM',
      items: [
        { name: 'Leads Pipeline', href: '/leads', icon: Users },
        { name: 'Customer 360', href: '/customers', icon: UserCircle },
        { name: 'Follow-up Reminders', href: '/crm/reminders', icon: Bell },
      ]
    },
    {
      title: 'Inventory',
      items: [
        { name: 'Hotels & Rooms', href: '/hotels', icon: Hotel },
        { name: 'Houseboat Fleet', href: '/inventory/houseboats', icon: Anchor },
        { name: 'Vehicles', href: '/fleet/vehicles', icon: Bus },
        { name: 'Drivers', href: '/fleet/drivers', icon: UserCheck },
        { name: 'Suppliers', href: '/inventory/suppliers', icon: Building },
      ]
    },
    {
      title: 'Operations',
      items: [
        { name: 'Tour Packages', href: '/packages', icon: Package },
        { name: 'Active Bookings', href: '/bookings', icon: CalendarCheck },
        { name: 'Travel Calendar', href: '/operations/calendar', icon: Calendar },
        { name: 'Timeline Tracker', href: '/operations/timeline', icon: History },
      ]
    },
    {
      title: 'Design & AI',
      items: [
        { name: 'Itinerary Builder', href: '/itinerary-builder', icon: Map },
        { name: 'AI Generator', href: '/ai-tools', icon: Sparkles },
        { name: 'Cost Calculator', href: '/ai-tools/calculator', icon: Calculator },
        { name: 'Web CMS Portal', href: '/dashboard/cms', icon: Settings },
      ]
    },
    {
      title: 'Finance & Docs',
      items: [
        { name: 'Invoices & GST', href: '/finance/invoices', icon: Wallet },
        { name: 'Payments', href: '/finance/payments', icon: CreditCard },
        { name: 'Vouchers', href: '/finance/vouchers', icon: FileText },
        { name: 'Document Manager', href: '/documents', icon: Layers },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Staff Management', href: '/settings/team', icon: Briefcase },
        { name: 'App Settings', href: '/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white overflow-y-auto no-scrollbar">
      <div className="flex h-20 items-center px-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
        <h1 className="text-base font-black tracking-tight text-white leading-tight">
          Ex-Employee v0.2 <br/>
          <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">by Bilu G</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        {groups.map((group) => (
          <SidebarGroup key={group.title} title={group.title} items={group.items} pathname={pathname} />
        ))}

        {isSuperAdmin && (
           <Link
             href="/super-admin"
             className={cn(
               'group flex items-center rounded-xl px-3 py-3 text-xs font-black uppercase tracking-widest mt-8 border border-blue-900/50 bg-blue-600/10 transition-all hover:bg-blue-600 hover:text-white',
               pathname === '/super-admin' && 'bg-blue-600 text-white shadow-xl shadow-blue-900/40'
             )}
           >
             <ShieldAlert className="mr-3 h-4 w-4 flex-shrink-0" />
             Super Admin
           </Link>
        )}
      </nav>

      <div className="border-t border-slate-800 p-6 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg">
            {profile?.first_name?.[0] || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-black text-white">{profile?.first_name} {profile?.last_name || 'User'}</p>
            <p className="truncate text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{profile?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
