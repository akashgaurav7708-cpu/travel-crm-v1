import { createClient } from '../supabase';
import { Lead, Customer, Hotel, TourPackage, Booking } from '@/types/crm';

const supabase = createClient();

// Helper to get current profile including company_id and role
const getMyProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return profile;
};

// --- Leads Service ---
export const leadsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*, assigned_to(first_name, last_name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as (Lead & { assigned_to?: { first_name: string, last_name: string } })[];
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Lead;
  },
  async create(lead: Partial<Lead>) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('leads').insert([{
      ...lead,
      company_id: profile?.company_id,
      assigned_to: lead.assigned_to || profile?.id
    }]).select();
    if (error) throw error;
    return data[0] as Lead;
  },
  async update(id: string, lead: Partial<Lead>) {
    const { data, error } = await supabase.from('leads').update(lead).eq('id', id).select();
    if (error) throw error;
    return data[0] as Lead;
  },
  async delete(id: string) {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- Customers Service ---
export const customersService = {
  async getAll() {
    const { data, error } = await supabase.from('customers').select('*').order('last_name', { ascending: true });
    if (error) throw error;
    return data as Customer[];
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('customers').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Customer;
  },
  async create(customer: Partial<Customer>) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('customers').insert([{ ...customer, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0] as Customer;
  },
  async update(id: string, customer: Partial<Customer>) {
    const { data, error } = await supabase.from('customers').update(customer).eq('id', id).select();
    if (error) throw error;
    return data[0] as Customer;
  },
  async delete(id: string) {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- Accommodations Service ---
export const accommodationsService = {
  async getAll() {
    const { data, error } = await supabase.from('accommodations').select('*').order('name', { ascending: true });
    if (error) throw error;
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('accommodations').select('*, accommodation_room_types(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('accommodations').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, payload: any) {
    const { data, error } = await supabase.from('accommodations').update(payload).eq('id', id).select();
    if (error) throw error;
    return data[0];
  },
  async delete(id: string) {
    const { error } = await supabase.from('accommodations').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- Fleet Service ---
export const fleetService = {
  async getAll() {
    const { data, error } = await supabase.from('transport_providers').select('*').order('name', { ascending: true });
    if (error) throw error;
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('transport_providers').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('transport_providers').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, payload: any) {
    const { data, error } = await supabase.from('transport_providers').update(payload).eq('id', id).select();
    if (error) throw error;
    return data[0];
  },
  async getDrivers() {
    const { data, error } = await supabase.from('drivers').select('*').order('name', { ascending: true });
    if (error) throw error;
    return data;
  },
  async getVehicles() {
    const { data, error } = await supabase.from('vehicles').select('*').order('name', { ascending: true });
    if (error) throw error;
    return data;
  },
  async createDriver(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('drivers').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  },
  async createVehicle(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('vehicles').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  }
};

// --- Finance Service ---
export const financeService = {
  async getInvoices() {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, bookings(customers(first_name, last_name))')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async createInvoice(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('invoices').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  },
  async recordPayment(payload: any) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('payments').insert([{ ...payload, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0];
  }
};

// --- Tour Packages Service ---
export const packagesService = {
  async getAll() {
    const { data, error } = await supabase.from('tour_packages').select('*').order('name', { ascending: true });
    if (error) throw error;
    return data as TourPackage[];
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('tour_packages').select('*').eq('id', id).single();
    if (error) throw error;
    return data as TourPackage;
  },
  async create(pkg: Partial<TourPackage>) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('tour_packages').insert([{ ...pkg, company_id: profile?.company_id }]).select();
    if (error) throw error;
    return data[0] as TourPackage;
  },
  async update(id: string, pkg: Partial<TourPackage>) {
    const { data, error } = await supabase.from('tour_packages').update(pkg).eq('id', id).select();
    if (error) throw error;
    return data[0] as TourPackage;
  },
  async delete(id: string) {
    const { error } = await supabase.from('tour_packages').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- Bookings Service ---
export const bookingsService = {
  async getAll() {
    const { data, error } = await supabase.from('bookings').select('*, customers(first_name, last_name, email), tour_packages(name)').order('created_at', { ascending: false });
    if (error) throw error;
    return data as any[];
  },
  async getById(id: string) {
    const { data, error } = await supabase.from('bookings').select('*, customers(*), tour_packages(*), itineraries(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(booking: Partial<Booking>) {
    const profile = await getMyProfile();
    const { data, error } = await supabase.from('bookings').insert([{
      ...booking,
      company_id: profile?.company_id,
      created_by: profile?.id
    }]).select();
    if (error) throw error;
    return data[0] as Booking;
  },
  async update(id: string, booking: Partial<Booking>) {
    const { data, error } = await supabase.from('bookings').update(booking).eq('id', id).select();
    if (error) throw error;
    return data[0] as Booking;
  },
  async delete(id: string) {
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- Itinerary Service ---
export const itineraryService = {
  async getByBooking(bookingId: string) {
    const { data, error } = await supabase.from('itineraries').select('*, itinerary_days(*, itinerary_activities(*))').eq('booking_id', bookingId).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },
  async create(itinerary: any) {
    const { data, error } = await supabase.from('itineraries').insert([itinerary]).select();
    if (error) throw error;
    return data[0];
  },
  async addDay(day: any) {
    const { data, error } = await supabase.from('itinerary_days').insert([day]).select();
    if (error) throw error;
    return data[0];
  },
  async addActivity(activity: any) {
    const { data, error } = await supabase.from('itinerary_activities').insert([activity]).select();
    if (error) throw error;
    return data[0];
  },
  async removeActivity(id: string) {
    const { error } = await supabase.from('itinerary_activities').delete().eq('id', id);
    if (error) throw error;
  }
};
