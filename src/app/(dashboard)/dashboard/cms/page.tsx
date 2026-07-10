'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings, Package, Hotel, Anchor, Car, Edit3, Plus, Trash, Check, Download,
  TrendingUp, FileText, Globe, Save, HelpCircle, Users, CheckCircle, Clock, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CMSDashboard() {
  const [activeTab, setActiveTab] = useState('General');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. General Settings State
  const [general, setGeneral] = useState({
    companyName: 'Bilu G Travels Kashmir',
    owner: 'Javid Farooq',
    phone: '+91 6006070550',
    altPhone: '+91 7889408220',
    email: 'bilugtourtravels1121@gmail.com',
    hqAddress: 'Srinagar, Jammu & Kashmir, India - 190001'
  });

  // 2. Packages State
  const [packages, setPackages] = useState([
    { id: 1, name: "4 Nights 5 Days Kashmir", price: "13,999", duration: "4N/5D", location: "Srinagar, Gulmarg, Pahalgam" },
    { id: 2, name: "5 Nights 6 Days Kashmir", price: "16,999", duration: "5N/6D", location: "Srinagar, Gulmarg, Pahalgam, Houseboat" },
    { id: 3, name: "6 Nights 7 Days Kashmir", price: "19,999", duration: "6N/7D", location: "Sonmarg, Gulmarg, Pahalgam, Srinagar" }
  ]);
  const [newPkg, setNewPkg] = useState({ name: '', price: '', duration: '', location: '' });

  // 3. Hotels State
  const [hotels, setHotels] = useState([
    { id: 1, name: "The Khyber Himalayan Resort", class: "5-Star", location: "Gulmarg", price: "24,500" },
    { id: 2, name: "Taj Lake Palace Kashmir", class: "5-Star", location: "Srinagar", price: "28,000" },
    { id: 3, name: "Radisson Blu Srinagar", class: "Luxury", location: "Srinagar", price: "14,500" }
  ]);
  const [newHotel, setNewHotel] = useState({ name: '', class: 'Luxury', location: '', price: '' });

  // 4. Houseboats State
  const [houseboats, setHouseboats] = useState([
    { id: 1, name: "Royal Palace Group of Houseboats", lake: "Dal Lake Front", price: "8,500" },
    { id: 2, name: "Kashmir Heritage Floating Resort", lake: "Nigeen Lake", price: "11,500" }
  ]);
  const [newHb, setNewHb] = useState({ name: '', lake: 'Dal Lake Front', price: '' });

  // 5. Vehicles State
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Toyota Innova Crysta", type: "Premium SUV", rate: "₹4,500/day" },
    { id: 2, name: "Force Urbania Luxury Edition", type: "Super Luxury Mini Bus", rate: "₹9,500/day" }
  ]);
  const [newVehicle, setNewVehicle] = useState({ name: '', type: '', rate: '' });

  // 6. Testimonials State
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: "Pradeep Kulkarni", location: "Mumbai", rating: 5, text: "Outstanding hospitality by Javid. The Innova Crysta was super clean and comfortable!" },
    { id: 2, name: "Sweta & Rohan", location: "Pune", rating: 5, text: "Houseboat stay was magical. Candlelight dinner arrangements was excellent." }
  ]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', location: '', rating: 5, text: '' });

  // 7. Enquiries / Leads State
  const [enquiries, setEnquiries] = useState([
    { id: 'LD-1021', name: "Amit Sharma", phone: "+91 9876543210", email: "amit@gmail.com", dest: "Gulmarg Special", date: "2024-12-15", guests: 2, status: "Pending" },
    { id: 'LD-1022', name: "Siddharth Roy", phone: "+91 8887776655", email: "sid@yahoo.com", dest: "Classic 6D Tour", date: "2024-12-28", guests: 4, status: "Confirmed" },
    { id: 'LD-1023', name: "Elena Rostova", phone: "+44 7911 123456", email: "elena@hotmail.com", dest: "Bespoke Houseboat", date: "2025-01-05", guests: 1, status: "Completed" }
  ]);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSaveGeneral = () => {
    // Persist to local storage to simulate live edit save
    localStorage.setItem('cms_general', JSON.stringify(general));
    showToast('General CMS parameters updated successfully! Changes are live.');
  };

  // Add handlers
  const handleAddPackage = () => {
    if (!newPkg.name || !newPkg.price) return;
    setPackages([...packages, { ...newPkg, id: Date.now() }]);
    setNewPkg({ name: '', price: '', duration: '', location: '' });
    showToast('New tour package injected into public directory!');
  };

  const handleAddHotel = () => {
    if (!newHotel.name || !newHotel.price) return;
    setHotels([...hotels, { ...newHotel, id: Date.now() }]);
    setNewHotel({ name: '', class: 'Luxury', location: '', price: '' });
    showToast('New hotel card published to listing page!');
  };

  const handleAddHb = () => {
    if (!newHb.name || !newHb.price) return;
    setHouseboats([...houseboats, { ...newHb, id: Date.now() }]);
    setNewHb({ name: '', lake: 'Dal Lake Front', price: '' });
    showToast('New Dal Lake Houseboat published to listing!');
  };

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.rate) return;
    setVehicles([...vehicles, { ...newVehicle, id: Date.now() }]);
    setNewVehicle({ name: '', type: '', rate: '' });
    showToast('Fleet vehicle specifications updated!');
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text) return;
    setTestimonials([...testimonials, { ...newTestimonial, id: Date.now() }]);
    setNewTestimonial({ name: '', location: '', rating: 5, text: '' });
    showToast('Client review published to public testimonials carousel!');
  };

  // Status handler for leads
  const handleStatusChange = (id: string, nextStatus: string) => {
    setEnquiries(enquiries.map(eq => eq.id === id ? { ...eq, status: nextStatus } : eq));
    showToast(`Lead ${id} marked as ${nextStatus}!`);
  };

  // EXPORT LEADS TO EXCEL (CSV Format)
  const handleExportCSV = () => {
    try {
      const headers = ['Enquiry ID', 'Guest Name', 'Phone', 'Email', 'Selected Destination', 'Travel Date', 'Guests Count', 'Status'];
      const rows = enquiries.map(e => [
        e.id,
        `"${e.name}"`,
        `"${e.phone}"`,
        `"${e.email}"`,
        `"${e.dest}"`,
        e.date,
        e.guests,
        e.status
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BiluG_Travels_Leads_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Enquiry data successfully exported to Excel (CSV)!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 pb-16 pt-6 font-sans">

      {/* Toast Alert */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm"
          >
            <CheckCircle className="w-5 h-5 text-white animate-pulse" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Settings className="h-64 w-64" /></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Live Web CMS Panel</span>
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight leading-tight text-white">Public Website Editor</h2>
          <p className="text-slate-400 font-bold mt-2">No-Code Content Management • Bilu G Travels Kashmir</p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={handleExportCSV}
            className="h-14 px-8 rounded-2xl bg-brand-gold text-brand-navy text-xs font-black uppercase tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-2"
          >
            <Download className="h-4.5 w-4.5" /> Export Leads to Excel
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[2rem] p-6 space-y-1.5 shadow-sm h-fit">
          {[
            { id: 'General', label: 'Company Info', icon: <Settings className="w-4 h-4" /> },
            { id: 'Packages', label: 'Tour Packages', icon: <Package className="w-4 h-4" /> },
            { id: 'Hotels', label: 'Hotels Listing', icon: <Hotel className="w-4 h-4" /> },
            { id: 'Houseboats', label: 'Houseboats', icon: <Anchor className="w-4 h-4" /> },
            { id: 'Vehicles', label: 'Transport Fleet', icon: <Car className="w-4 h-4" /> },
            { id: 'Testimonials', label: 'Testimonials', icon: <Users className="w-4 h-4" /> },
            { id: 'Leads', label: 'Leads & Enquiries', icon: <FileText className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-brand-navy dark:hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Workspace Panels */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm min-h-[500px]">

          {/* TAB 1: General Info */}
          {activeTab === 'General' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">HQ Contact Details</h3>
                <p className="text-slate-400 text-xs font-bold">Edit information shown in header, footer, and contact sections instantly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</label>
                  <input
                    type="text"
                    value={general.companyName}
                    onChange={(e) => setGeneral({ ...general, companyName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Owner Name</label>
                  <input
                    type="text"
                    value={general.owner}
                    onChange={(e) => setGeneral({ ...general, owner: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">HQ Phone Hotline</label>
                  <input
                    type="text"
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Alternate Phone</label>
                  <input
                    type="text"
                    value={general.altPhone}
                    onChange={(e) => setGeneral({ ...general, altPhone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">HQ Email Address</label>
                  <input
                    type="email"
                    value={general.email}
                    onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Physical Headquarters Address</label>
                  <textarea
                    rows={3}
                    value={general.hqAddress}
                    onChange={(e) => setGeneral({ ...general, hqAddress: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl px-4 py-3.5 text-xs font-bold outline-none resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveGeneral}
                className="w-full h-14 bg-brand-navy text-white rounded-xl font-display font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Save className="w-4.5 h-4.5" /> Commit General Settings
              </button>
            </div>
          )}

          {/* TAB 2: Tour Packages CMS */}
          {activeTab === 'Packages' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Manage Tour Packages</h3>
                <p className="text-slate-400 text-xs font-bold">Incorporate new itineraries, adjust starting price rates, and manage catalogs.</p>
              </div>

              {/* Add New Package Form */}
              <div className="bg-slate-50 dark:bg-zinc-800/40 p-6 rounded-2xl border dark:border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest leading-none">Add New Package Card</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Package Name"
                    value={newPkg.name}
                    onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Starting Price (e.g. 14,999)"
                    value={newPkg.price}
                    onChange={(e) => setNewPkg({ ...newPkg, price: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5N / 6D)"
                    value={newPkg.duration}
                    onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Destinations Covered (comma separated)"
                    value={newPkg.location}
                    onChange={(e) => setNewPkg({ ...newPkg, location: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                </div>
                <button
                  onClick={handleAddPackage}
                  className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy py-3.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
                >
                  Publish Package Card
                </button>
              </div>

              {/* Active List */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Current Active Packages</p>
                <div className="divide-y dark:divide-zinc-800">
                  {packages.map(p => (
                    <div key={p.id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{p.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{p.duration} • Starting: ₹{p.price}</p>
                      </div>
                      <button onClick={() => { setPackages(packages.filter(x => x.id !== p.id)); showToast('Package deleted!'); }} className="text-red-500 hover:text-red-600 text-xs font-bold">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Hotels CMS */}
          {activeTab === 'Hotels' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Manage Hotels</h3>
                <p className="text-slate-400 text-xs font-bold">Inject, edit, or filter selected hotel assets showcased in public directory.</p>
              </div>

              {/* Add form */}
              <div className="bg-slate-50 dark:bg-zinc-800/40 p-6 rounded-2xl border dark:border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest leading-none">Add New Hotel Asset</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Hotel Name"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Starting Nightly Rate"
                    value={newHotel.price}
                    onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Srinagar / Gulmarg)"
                    value={newHotel.location}
                    onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <select
                    value={newHotel.class}
                    onChange={(e) => setNewHotel({ ...newHotel, class: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  >
                    <option value="5-Star">5-Star Luxury</option>
                    <option value="Luxury">4-Star Luxury</option>
                    <option value="Premium">3-Star Premium</option>
                    <option value="Deluxe">Comfort Deluxe</option>
                  </select>
                </div>
                <button
                  onClick={handleAddHotel}
                  className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy py-3.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
                >
                  Publish Hotel Listing
                </button>
              </div>

              {/* Active List */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Current Active Hotels</p>
                <div className="divide-y dark:divide-zinc-800">
                  {hotels.map(h => (
                    <div key={h.id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{h.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{h.location} • {h.class} • ₹{h.price}/night</p>
                      </div>
                      <button onClick={() => { setHotels(hotels.filter(x => x.id !== h.id)); showToast('Hotel deleted!'); }} className="text-red-500 hover:text-red-600 text-xs font-bold">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Houseboats CMS */}
          {activeTab === 'Houseboats' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Manage Houseboats</h3>
                <p className="text-slate-400 text-xs font-bold">Publish wooden-carved houseboats stays, update pricing and lake coordinates.</p>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-800/40 p-6 rounded-2xl border dark:border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest leading-none">Register New Houseboat</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Houseboat Name"
                    value={newHb.name}
                    onChange={(e) => setNewHb({ ...newHb, name: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Nightly Price (e.g. 7,500)"
                    value={newHb.price}
                    onChange={(e) => setNewHb({ ...newHb, price: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <select
                    value={newHb.lake}
                    onChange={(e) => setNewHb({ ...newHb, lake: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none md:col-span-2"
                  >
                    <option value="Dal Lake Front">Dal Lake Front</option>
                    <option value="Dal Lake Golden Meadow">Dal Lake Golden Meadow</option>
                    <option value="Nigeen Lake">Nigeen Lake</option>
                  </select>
                </div>
                <button
                  onClick={handleAddHb}
                  className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy py-3.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
                >
                  Publish Houseboat Listing
                </button>
              </div>

              {/* Active List */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Current Registered Houseboats</p>
                <div className="divide-y dark:divide-zinc-800">
                  {houseboats.map(hb => (
                    <div key={hb.id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{hb.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{hb.lake} • Starting: ₹{hb.price}/night</p>
                      </div>
                      <button onClick={() => { setHouseboats(houseboats.filter(x => x.id !== hb.id)); showToast('Houseboat deleted!'); }} className="text-red-500 hover:text-red-600 text-xs font-bold">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Vehicles CMS */}
          {activeTab === 'Vehicles' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Manage Private Fleet</h3>
                <p className="text-slate-400 text-xs font-bold">Update daily rental prices and specifications of private taxi and SUV cars.</p>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-800/40 p-6 rounded-2xl border dark:border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest leading-none">Add New Fleet Vehicle</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Vehicle Name (e.g. Toyota Innova Crysta)"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Daily Rate (e.g. ₹5,000/day)"
                    value={newVehicle.rate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, rate: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Type (e.g. Luxury SUV / Mini Bus)"
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none md:col-span-2"
                  />
                </div>
                <button
                  onClick={handleAddVehicle}
                  className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy py-3.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
                >
                  Commit Vehicle to Fleet
                </button>
              </div>

              {/* Active List */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Active Fleet Assets</p>
                <div className="divide-y dark:divide-zinc-800">
                  {vehicles.map(v => (
                    <div key={v.id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{v.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{v.type} • Daily Rate: {v.rate}</p>
                      </div>
                      <button onClick={() => { setVehicles(vehicles.filter(x => x.id !== v.id)); showToast('Vehicle deleted!'); }} className="text-red-500 hover:text-red-600 text-xs font-bold">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Testimonials CMS */}
          {activeTab === 'Testimonials' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Guest Testimonials</h3>
                <p className="text-slate-400 text-xs font-bold">Review, remove, or append 5-star customer ratings showcased on the home page.</p>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-800/40 p-6 rounded-2xl border dark:border-zinc-800 space-y-4">
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest leading-none">Register New Testimonial</p>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Guest Name"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Guest Origin (e.g. Pune / Mumbai)"
                    value={newTestimonial.location}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Review Comment Text..."
                    value={newTestimonial.text}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                    className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl p-3.5 text-xs font-bold outline-none col-span-2 resize-none"
                  />
                </div>
                <button
                  onClick={handleAddTestimonial}
                  className="w-full bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy py-3.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all"
                >
                  Publish Guest Testimonial
                </button>
              </div>

              {/* Active list */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Current Showcased Testimonials</p>
                <div className="divide-y dark:divide-zinc-800">
                  {testimonials.map(t => (
                    <div key={t.id} className="py-4 flex flex-col gap-1.5 md:flex-row md:items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{t.name} ({t.location})</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">"{t.text}"</p>
                      </div>
                      <button onClick={() => { setTestimonials(testimonials.filter(x => x.id !== t.id)); showToast('Review deleted!'); }} className="text-red-500 hover:text-red-600 text-xs font-bold self-end md:self-center">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: Leads & Enquiries */}
          {activeTab === 'Leads' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-2">Live Leads & Enquiries</h3>
                  <p className="text-slate-400 text-xs font-bold">Review incoming customized luxury tour inquiries submitted by web guests.</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy border px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" /> Excel Export
                </button>
              </div>

              {/* Inquiries List Cards */}
              <div className="space-y-4 pt-4">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-6 bg-slate-50 dark:bg-zinc-800/40 border dark:border-zinc-800 rounded-[1.8rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider">{enq.id}</span>
                        <span className={`text-[9px] font-display font-black px-2 py-0.5 rounded uppercase ${
                          enq.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          enq.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 dark:text-slate-100">{enq.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        📞 {enq.phone} • ✉️ {enq.email}
                      </p>
                      <p className="text-xs text-brand-navy dark:text-slate-300 font-bold">
                        ✈️ {enq.dest} • 📅 {enq.date} • 👥 {enq.guests} Guests
                      </p>
                    </div>

                    {/* Status change actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Confirmed')}
                        className="px-3.5 py-2 bg-white dark:bg-zinc-800 border dark:border-zinc-700 hover:border-green-600 text-[10px] font-bold uppercase rounded-lg text-slate-500 hover:text-green-600 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Completed')}
                        className="px-3.5 py-2 bg-white dark:bg-zinc-800 border dark:border-zinc-700 hover:border-blue-600 text-[10px] font-bold uppercase rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(enq.id, 'Cancelled')}
                        className="px-3.5 py-2 bg-white dark:bg-zinc-800 border dark:border-zinc-700 hover:border-red-600 text-[10px] font-bold uppercase rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
