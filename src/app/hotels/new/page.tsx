'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, X, Loader2 } from 'lucide-react';
import { hotelsService } from '@/lib/services';

export default function NewHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    star_rating: '5',
    contact_email: '',
    contact_phone: '',
    base_price: '',
    amenities: ['Spa', 'Swimming Pool', 'Free WiFi']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await hotelsService.create({
        ...formData,
        star_rating: parseInt(formData.star_rating),
        base_price: parseFloat(formData.base_price) || 0
      } as any);
      router.push('/hotels');
    } catch (error) {
      console.error(error);
      alert('Failed to save hotel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/hotels" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Add New Hotel</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/hotels" className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Hotel
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 border-b pb-2">Hotel Details</h3>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Hotel Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Grand Luxury Resort"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Location / City</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Male, Maldives"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Star Rating</label>
              <select
                name="star_rating"
                value={formData.star_rating}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Contact Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="reservations@hotel.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Contact Phone</label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (000) 000-0000"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 border-b pb-2">Amenities & Pricing</h3>
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700">Available Amenities</label>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((item, index) => (
                <div key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-sm text-slate-600">
                  {item}
                  <button type="button" onClick={() => removeAmenity(index)} className="text-slate-400 hover:text-slate-600">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-blue-400 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                <Plus className="h-3 w-3" /> Add More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Base Price per Night ($)</label>
              <input
                type="number"
                name="base_price"
                required
                value={formData.base_price}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="250"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
