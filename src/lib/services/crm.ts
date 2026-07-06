import { createClient } from '../supabase';
import { Lead, Customer, Hotel, Transport, TourPackage, Booking } from '@/types/crm';

const supabase = createClient();

// Helper to get company_id
const getCompanyId = async () => {
  const { data: profile } = await supabase.from('profiles').select('company_id').single();
  return (profile as { company_id: string })?.company_id;
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
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Lead;
  },
  async create(lead: Partial<Lead>) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('leads')
      .insert([{ ...lead, company_id }])
      .select();
    if (error) throw error;
    return data[0] as Lead;
  },
  async update(id: string, lead: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update(lead)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0] as Lead;
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Customers Service ---
export const customersService = {
  async getAll() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('last_name', { ascending: true });
    if (error) throw error;
    return data as Customer[];
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Customer;
  },
  async create(customer: Partial<Customer>) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('customers')
      .insert([{ ...customer, company_id }])
      .select();
    if (error) throw error;
    return data[0] as Customer;
  },
  async update(id: string, customer: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0] as Customer;
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Hotels Service ---
export const hotelsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data as Hotel[];
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Hotel;
  },
  async create(hotel: Partial<Hotel>) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('hotels')
      .insert([{ ...hotel, company_id }])
      .select();
    if (error) throw error;
    return data[0] as Hotel;
  },
  async update(id: string, hotel: Partial<Hotel>) {
    const { data, error } = await supabase
      .from('hotels')
      .update(hotel)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0] as Hotel;
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Transport Service ---
export const transportService = {
  async getAll() {
    const { data, error } = await supabase
      .from('transport_providers')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data as any[];
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('transport_providers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(transport: any) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('transport_providers')
      .insert([{ ...transport, company_id }])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, transport: any) {
    const { data, error } = await supabase
      .from('transport_providers')
      .update(transport)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('transport_providers')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Tour Packages Service ---
export const packagesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return data as TourPackage[];
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as TourPackage;
  },
  async create(pkg: Partial<TourPackage>) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('tour_packages')
      .insert([{ ...pkg, company_id }])
      .select();
    if (error) throw error;
    return data[0] as TourPackage;
  },
  async update(id: string, pkg: Partial<TourPackage>) {
    const { data, error } = await supabase
      .from('tour_packages')
      .update(pkg)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0] as TourPackage;
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('tour_packages')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Bookings Service ---
export const bookingsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, customers(first_name, last_name, email), tour_packages(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as any[];
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, customers(*), tour_packages(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(booking: Partial<Booking>) {
    const company_id = await getCompanyId();
    const { data, error } = await supabase
      .from('bookings')
      .insert([{ ...booking, company_id }])
      .select();
    if (error) throw error;
    return data[0] as Booking;
  },
  async update(id: string, booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0] as Booking;
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// --- Itinerary Service ---
export const itineraryService = {
  async getByBooking(bookingId: string) {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*, itinerary_days(*, itinerary_activities(*))')
      .eq('booking_id', bookingId)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },
  async create(itinerary: any) {
    const { data, error } = await supabase
      .from('itineraries')
      .insert([itinerary])
      .select();
    if (error) throw error;
    return data[0];
  },
  async addDay(day: any) {
    const { data, error } = await supabase
      .from('itinerary_days')
      .insert([day])
      .select();
    if (error) throw error;
    return data[0];
  },
  async addActivity(activity: any) {
    const { data, error } = await supabase
      .from('itinerary_activities')
      .insert([activity])
      .select();
    if (error) throw error;
    return data[0];
  },
  async removeActivity(id: string) {
    const { error } = await supabase
      .from('itinerary_activities')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
