export type LeadStatus = 'New' | 'In Progress' | 'Qualified' | 'Lost' | 'Converted';
export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  source: string;
  destination?: string;
  budget?: number;
  priority: Priority;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  passportNumber?: string;
  nationality?: string;
  dateOfBirth?: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  starRating: number;
  contactEmail?: string;
  contactPhone?: string;
  amenities: string[];
  basePrice: number;
}

export interface Transport {
  id: string;
  type: 'Flight' | 'Train' | 'Bus' | 'Car' | 'Ferry';
  provider: string;
  description: string;
  basePrice: number;
}

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  durationNights: number;
  basePrice: number;
  includedServices: string[];
  excludedServices: string[];
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  packageId?: string;
  status: BookingStatus;
  totalPrice: number;
  startDate: string;
  endDate: string;
  travelersCount: number;
  createdAt: string;
}

export interface ItineraryActivity {
  id: string;
  day: number;
  time?: string;
  title: string;
  description: string;
  location?: string;
  type: 'Sightseeing' | 'Activity' | 'Meal' | 'Transport' | 'Rest';
}

export interface Itinerary {
  id: string;
  bookingId: string;
  title: string;
  activities: ItineraryActivity[];
  createdAt: string;
}
