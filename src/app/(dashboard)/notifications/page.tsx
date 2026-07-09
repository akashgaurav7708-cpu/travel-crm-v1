'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Clock, Info, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Simulation
    setTimeout(() => {
      setNotifications([
        { id: '1', title: 'New Lead Assigned', message: 'You have been assigned a new lead: John Doe for Kashmir Luxury Package.', type: 'info', time: new Date() },
        { id: '2', title: 'Payment Received', message: 'Payment of ₹50,000 received for Booking #B12345.', type: 'success', time: new Date(Date.now() - 3600000) },
        { id: '3', title: 'Upcoming Travel', message: 'Wilson family starting their tour tomorrow. Verify vehicle and driver status.', type: 'warning', time: new Date(Date.now() - 7200000) },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-orange-50';
      case 'error': return 'bg-red-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">System Notifications</h2>
        <p className="text-slate-500 font-bold">Stay updated with live booking activities and system alerts.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(n => (
            <div key={n.id} className="bg-white rounded-2xl border shadow-sm p-6 flex gap-6 hover:shadow-md transition-all">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${getBg(n.type)}`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-black text-slate-900">{n.title}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {format(n.time, 'h:mm a')}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
