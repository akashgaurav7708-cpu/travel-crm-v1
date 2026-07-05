import { supabase } from './supabase';
import { Lead, Customer, Hotel, Transport, TourPackage, Booking, Itinerary, ItineraryActivity } from '@/types/crm';

// --- Leads Service ---
export const leadsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, lead: Partial<Lead>) {
    const { data, error } = await supabase
      .from('leads')
      .update(lead)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
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
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'totalBookings' | 'totalSpent'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, customer: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
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
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(hotel: Omit<Hotel, 'id'>) {
    const { data, error } = await supabase
      .from('hotels')
      .insert([hotel])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, hotel: Partial<Hotel>) {
    const { data, error } = await supabase
      .from('hotels')
      .update(hotel)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
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
      .from('transport')
      .select('*')
      .order('provider', { ascending: true });
    if (error) throw error;
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('transport')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(transport: Omit<Transport, 'id'>) {
    const { data, error } = await supabase
      .from('transport')
      .insert([transport])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, transport: Partial<Transport>) {
    const { data, error } = await supabase
      .from('transport')
      .update(transport)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },
  async delete(id: string) {
    const { error } = await supabase
      .from('transport')
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
    return data;
  },
  async getById(id: string) {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async create(pkg: Omit<TourPackage, 'id'>) {
    const { data, error } = await supabase
      .from('tour_packages')
      .insert([pkg])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, pkg: Partial<TourPackage>) {
    const { data, error } = await supabase
      .from('tour_packages')
      .update(pkg)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
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
      .select('*, customers(first_name, last_name), tour_packages(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
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
  async create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();
    if (error) throw error;
    return data[0];
  },
  async update(id: string, booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
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
      .select('*, itinerary_activities(*)')
      .eq('booking_id', bookingId)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  },
  async create(itinerary: Omit<Itinerary, 'id'>) {
    const { data, error } = await supabase
      .from('itineraries')
      .insert([itinerary])
      .select();
    if (error) throw error;
    return data[0];
  },
  async addActivity(activity: Omit<ItineraryActivity, 'id'>) {
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
