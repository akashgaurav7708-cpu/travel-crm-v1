'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, Building2, MapPin, Star, Mail, Phone, Globe, DollarSign, Image as ImageIcon, Plus, ShieldCheck } from 'lucide-react';
import { accommodationsService } from '@/lib/services/index';

function HotelForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: '',
    star_rating: 5,
    location: '',
    address: '',
    google_maps_url: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    amenities: [] as string[],
  });

  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    if (id) {
      async function fetchHotel() {
        try {
          const data = await accommodationsService.getById(id as string);
          if (data) {
            setFormData({
              name: data.name || '',
              star_rating: data.star_rating || 5,
              location: data.location || '',
              address: data.address || '',
              google_maps_url: data.google_maps_url || '',
              description: data.description || '',
              contact_email: data.contact_email || '',
              contact_phone: data.contact_phone || '',
              amenities: data.amenities || [],
            });
          }
        } catch (error) {
          console.error('Failed to fetch hotel:', error);
        } finally {
          setFetching(false);
        }
      }
      fetchHotel();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await accommodationsService.update(id as string, formData);
      } else {
        await accommodationsService.create(formData);
      }
      router.push('/hotels');
      router.refresh();
    } catch (error) {
      console.error('Failed to save hotel:', error);
      alert('Error saving hotel details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    setLoading(true);
    try {
      await accommodationsService.delete(id as string);
      router.push('/hotels');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete hotel:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity] });
      setNewAmenity('');
    }
  };

  if (fetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? 'Update Hotel Details' : 'Add Hotel to Inventory'}
          </h2>
          <p className="text-slate-500 font-medium">Manage hotel properties, pricing tiers, and direct contact details.</p>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-500 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditing ? 'Update Hotel' : 'Register Hotel'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              General Information
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Hotel Name *</label>
              <input
                required
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Grand Plaza Resort"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, star_rating: s })}
                      className={`p-2 rounded-lg transition-all ${formData.star_rating >= s ? 'text-yellow-400 bg-yellow-50' : 'text-slate-300 bg-slate-50'}`}
                    >
                      <Star className={`h-5 w-5 ${formData.star_rating >= s ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location (City/Region)</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Male, Maldives"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Address</label>
              <textarea
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Globe className="h-3 w-3 mr-1" /> Google Maps URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://maps.google.com/..."
                value={formData.google_maps_url}
                onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              Description & Media
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">About the Hotel</label>
              <textarea
                rows={6}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the hotel facilities, surroundings, and USPs..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Phone className="h-4 w-4" />
              Direct Contacts
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Reservations Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Direct Phone</label>
              <input
                type="tel"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              Amenities
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((a) => (
                <span key={a} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {a}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, amenities: formData.amenities.filter(x => x !== a) })}
                    className="ml-1.5 text-slate-400 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Free WiFi"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              />
              <button
                type="button"
                onClick={addAmenity}
                className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}

import { FileText } from 'lucide-react';

export default function NewHotelPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <HotelForm />
    </Suspense>
  );
}
