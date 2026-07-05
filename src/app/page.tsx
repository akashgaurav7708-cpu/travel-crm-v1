'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Calendar,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { leadsService, bookingsService, customersService } from '@/lib/services';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [leads, bookings] = await Promise.all([
          leadsService.getAll(),
          bookingsService.getAll(),
        ]);

        const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed');
        const revenue = confirmedBookings.reduce((sum: number, b: any) => sum + (b.total_price || 0), 0);

        setStats({
          totalLeads: leads.length,
          activeBookings: bookings.filter((b: any) => b.status !== 'cancelled').length,
          monthlyRevenue: revenue,
          conversionRate: leads.length > 0 ? Math.round((confirmedBookings.length / leads.length) * 100) : 0,
        });

        setRecentLeads(leads.slice(0, 5));
      } catch (error) {
        console.error('Dashboard data load error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ex-Employee v0.2 Dashboard</h2>
        <p className="text-slate-500">Welcome back! Manage your travel business by Bilu G.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value={stats.totalLeads.toString()} icon={<Users />} trend="+12.5%" />
        <StatCard title="Active Bookings" value={stats.activeBookings.toString()} icon={<Briefcase />} trend="+5.2%" />
        <StatCard title="Monthly Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={<TrendingUp />} trend="+18.1%" />
        <StatCard title="Conversion Rate" value={`${stats.conversionRate}%`} icon={<TrendingUp />} trend="+2.4%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Leads */}
        <div className="col-span-1 rounded-xl border bg-white shadow-sm lg:col-span-4">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="font-bold text-slate-900">Recent Leads</h3>
            <Link href="/leads" className="text-sm font-medium text-blue-600 hover:underline">View all</Link>
          </div>
          <div className="p-0">
            {recentLeads.length > 0 ? (
              <ul className="divide-y">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {lead.first_name?.[0]}{lead.last_name?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{lead.first_name} {lead.last_name}</p>
                        <p className="text-xs text-slate-500">{lead.destination}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700 uppercase">
                        {lead.status}
                      </span>
                      <p className="mt-1 text-[10px] text-slate-400">Recently</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-slate-500">No leads yet.</div>
            )}
          </div>
        </div>

        {/* Upcoming Tasks/Reminders */}
        <div className="col-span-1 rounded-xl border bg-white shadow-sm lg:col-span-3">
          <div className="border-b px-6 py-4">
            <h3 className="font-bold text-slate-900">Notifications</h3>
          </div>
          <div className="space-y-4 p-6">
            <NotificationItem
              icon={<Calendar className="h-4 w-4 text-blue-600" />}
              title="Welcome to v0.2"
              desc="Explore the new itinerary builder"
              time="Now"
            />
            <NotificationItem
              icon={<Clock className="h-4 w-4 text-orange-600" />}
              title="System Ready"
              desc="Supabase integration active"
              time="1h ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-slate-50 p-2 text-slate-600">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
        </div>
        <span className="text-xs font-bold text-green-600 flex items-center">
          {trend}
          <TrendingUp className="ml-1 h-3 w-3" />
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}

function NotificationItem({ icon, title, desc, time }: { icon: React.ReactNode, title: string, desc: string, time: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 rounded-full bg-slate-50 p-2">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
