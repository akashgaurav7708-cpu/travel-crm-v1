'use client';

import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Smartphone,
  Mail,
  Palette,
  CreditCard,
  CheckCircle2,
  Save,
  Loader2
} from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('General');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('SaaS Configuration Updated Successfully!');
    }, 1500);
  };

  const tabs = [
    { name: 'General', icon: Settings },
    { name: 'Branding', icon: Palette },
    { name: 'Communication', icon: Mail },
    { name: 'Billing & GST', icon: CreditCard },
    { name: 'Integrations', icon: Smartphone },
    { name: 'Team', icon: User },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 text-white leading-tight">
             Ex-Employee v0.2 <span className="text-blue-500">Global Settings</span>
          </h2>
          <p className="text-slate-500 font-bold">Configure agency identity, SaaS multitenancy, and document branding by Bilu G.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="h-12 px-8 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center disabled:opacity-50"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Deploy Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.name
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'bg-white text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-100'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b">
              <h3 className="text-xl font-black text-slate-900">{activeTab} Configuration</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage global preferences for this tenant entity.</p>
            </div>

            <div className="p-10 space-y-8">
              {activeTab === 'General' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup label="Agency Name" value="Ex-Employee Travel v0.2" />
                  <InputGroup label="Entity ID" value="SaaS-TENANT-8492" disabled />
                  <InputGroup label="Primary Domain" value="portal.ex-employee.travel" />
                  <InputGroup label="Support Email" value="ops@ex-employee.travel" />
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Headquarters Address</label>
                    <textarea className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" rows={3}>102 Innovation Drive, Silicon Valley, CA 94043</textarea>
                  </div>
                </div>
              )}

              {activeTab === 'Branding' && (
                <div className="space-y-8">
                   <div className="flex items-center gap-10">
                      <div className="h-24 w-24 rounded-3xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                         <Palette className="h-8 w-8 mb-1" />
                         <span className="text-[8px] font-black uppercase">Logo</span>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-sm font-black text-slate-900">Upload Agency Asset</h4>
                         <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-xs">Asset will be used on all generated PDFs, Vouchers, and Client Portals.</p>
                         <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Choose File (SVG/PNG)</button>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputGroup label="Primary Brand Color" value="#2563EB" />
                      <InputGroup label="Secondary Color" value="#0F172A" />
                   </div>
                </div>
              )}

              {activeTab === 'Communication' && (
                <div className="space-y-8">
                   <div className="bg-blue-50/50 rounded-3xl p-6 flex gap-4 items-start">
                      <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                         <h4 className="text-sm font-black text-slate-900">SMTP Verification Success</h4>
                         <p className="text-xs font-medium text-slate-500 mt-1">Transaction emails are being delivered via your custom SMTP server.</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputGroup label="SMTP Host" value="smtp.postmarkapp.com" />
                      <InputGroup label="SMTP Port" value="587" />
                      <InputGroup label="Sender Identity" value="Booking Team <no-reply@agency.com>" />
                      <InputGroup label="WhatsApp Integration" value="+1 (555) 000-0000" />
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex items-center justify-between">
             <div className="flex gap-6 items-center">
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                   <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                   <h4 className="text-lg font-black tracking-tight">Security & Compliance</h4>
                   <p className="text-sm font-medium text-slate-400">All tenant data is isolated via Row Level Security (RLS).</p>
                </div>
             </div>
             <button className="px-6 py-3 rounded-xl bg-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5">
                Audit Log Access
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, value, disabled = false }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{label}</label>
      <input
        disabled={disabled}
        type="text"
        className={`w-full rounded-2xl border border-slate-100 px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all ${disabled ? 'bg-slate-50 text-slate-400' : 'bg-slate-50/50 text-slate-900'}`}
        defaultValue={value}
      />
    </div>
  );
}
