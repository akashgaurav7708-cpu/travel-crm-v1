export interface Lead {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  status: 'New' | 'Interested' | 'In Progress' | 'Qualified' | 'Lost';
  priority: 'Low' | 'Medium' | 'High';
  source?: string;
  destination?: string;
  budget?: number;
  travel_date?: string;
  assigned_to?: string;
  notes?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  passport_number?: string;
  passport_expiry?: string;
  pan_number?: string;
  gst_number?: string;
  address_line1?: string;
  city?: string;
  country?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: string;
}

export interface Hotel {
  id: string;
  company_id: string;
  name: string;
  star_rating: number;
  location?: string;
  address?: string;
  google_maps_url?: string;
  description?: string;
  amenities: string[];
  contact_email?: string;
  contact_phone?: string;
  images?: string[];
  room_types?: HotelRoomType[];
}

export interface HotelRoomType {
  id: string;
  hotel_id: string;
  name: string;
  base_price: number;
  capacity_adults: number;
  capacity_children: number;
}

export interface TourPackage {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  duration_days: number;
  duration_nights: number;
  base_price: number;
  destinations: string[];
  inclusions: string[];
  exclusions: string[];
  images?: string[];
}

export interface Booking {
  id: string;
  company_id: string;
  customer_id: string;
  package_id?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  payment_status: 'Pending' | 'Partial' | 'Paid';
  start_date: string;
  end_date: string;
  total_amount: number;
  balance_amount: number;
  created_at: string;
}
