import React from 'react';
import { Settings, User, Bell, Shield, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ex-Employee v0.2 Settings</h2>
        <p className="text-slate-500">Configure your application and agency preferences by Bilu G.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
            <Settings className="h-4 w-4" /> General
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            <User className="h-4 w-4" /> Team Members
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            <Shield className="h-4 w-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
            <Database className="h-4 w-4" /> Data & Export
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-bold text-slate-900">Agency Profile</h3>
              <p className="text-xs text-slate-500">This information will appear on quotes and itineraries.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Agency Name</label>
                  <input type="text" defaultValue="Ex-Employee Agency" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Business Email</label>
                  <input type="email" defaultValue="hello@ex-employee.com" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Website</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 bg-slate-50 text-slate-500 text-sm">https://</span>
                    <input type="text" defaultValue="www.ex-employee.com" className="w-full rounded-r-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Office Address</label>
                <textarea rows={2} defaultValue="456 Innovation Ave, Tech City, TC 98765" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-400" />
              <h3 className="font-bold text-slate-900">Localization</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Primary Currency</label>
                  <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none bg-white">
                    <option defaultValue="USD">USD - US Dollar ($)</option>
                    <option>EUR - Euro (€)</option>
                    <option>GBP - British Pound (£)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Timezone</label>
                  <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none bg-white">
                    <option defaultValue="UTC-5">(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) London</option>
                    <option>(GMT+08:00) Singapore</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
