'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, X, Loader2, Trash2, User, Mail, Phone, MapPin, Globe, CreditCard, ShieldCheck, FileText, Home } from 'lucide-react';
import { customersService } from '@/lib/services/index';

function CustomerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    passport_number: '',
    passport_expiry: '',
    pan_number: '',
    gst_number: '',
    nationality: '',
    date_of_birth: '',
    address_line1: '',
    city: '',
    country: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
  });

  useEffect(() => {
    if (id) {
      async function fetchCustomer() {
        try {
          const data = await customersService.getById(id as string);
          if (data) {
            setFormData({
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              email: data.email || '',
              phone: data.phone || '',
              passport_number: data.passport_number || '',
              passport_expiry: data.passport_expiry || '',
              pan_number: data.pan_number || '',
              gst_number: data.gst_number || '',
              nationality: data.nationality || '',
              date_of_birth: data.date_of_birth || '',
              address_line1: data.address_line1 || '',
              city: data.city || '',
              country: data.country || '',
              emergency_contact_name: data.emergency_contact_name || '',
              emergency_contact_phone: data.emergency_contact_phone || '',
            });
          }
        } catch (error) {
          console.error('Failed to fetch customer:', error);
        } finally {
          setFetching(false);
        }
      }
      fetchCustomer();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await customersService.update(id as string, formData);
      } else {
        await customersService.create(formData);
      }
      router.push('/customers');
      router.refresh();
    } catch (error: any) {
      console.error('Failed to save customer:', error);
      alert(`Error saving customer profile: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
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
            {isEditing ? 'Edit Customer Profile' : 'Register New Customer'}
          </h2>
          <p className="text-slate-500 font-medium">Complete CRM profile with documentation and travel details.</p>
        </div>
        <div className="flex gap-2">
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
            {isEditing ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <User className="h-4 w-4" />
              Identity & Contact
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">First Name *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Name *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Documentation */}
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              Travel Documentation
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Passport Number</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.passport_number}
                  onChange={(e) => setFormData({ ...formData, passport_number: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Passport Expiry</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.passport_expiry}
                  onChange={(e) => setFormData({ ...formData, passport_expiry: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">PAN Number (India)</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.pan_number}
                  onChange={(e) => setFormData({ ...formData, pan_number: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">GST Number</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.gst_number}
                  onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Home className="h-4 w-4" />
              Billing Address
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Address Line 1</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address_line1}
                onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">City</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Country</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Globe className="h-4 w-4" />
              Demographics
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nationality</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date of Birth</label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              Emergency Contact
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contact Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.emergency_contact_name}
                onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contact Phone</label>
              <input
                type="tel"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.emergency_contact_phone}
                onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
              />
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}

export default function NewCustomerPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <CustomerForm />
    </Suspense>
  );
}
