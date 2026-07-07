-- Ex-Employee v0.2 by Bilu G - Commercial SaaS Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SaaS Plans
CREATE TABLE saas_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- Free Trial, Basic, Professional, Enterprise
    price_monthly NUMERIC(15, 2) NOT NULL,
    max_users INTEGER,
    max_leads INTEGER,
    max_bookings INTEGER,
    features JSONB, -- list of enabled modules
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Companies (Tenants)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE,
    custom_domain TEXT UNIQUE,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#2563EB',
    address TEXT,
    email TEXT,
    phone TEXT,
    gst_number TEXT,
    currency TEXT DEFAULT 'USD',
    timezone TEXT DEFAULT 'UTC',
    status TEXT DEFAULT 'active', -- active, suspended, trial
    plan_id UUID REFERENCES saas_plans(id),
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    smtp_settings JSONB,
    whatsapp_settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Profiles & RBAC
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'company_admin',
    'sales_manager',
    'sales_executive',
    'operations',
    'accounts',
    'support'
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    role user_role DEFAULT 'sales_executive',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    priority TEXT NOT NULL DEFAULT 'Medium',
    source TEXT,
    destination TEXT,
    budget NUMERIC(15, 2),
    travel_date DATE,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    passport_number TEXT,
    passport_expiry DATE,
    pan_number TEXT,
    gst_number TEXT,
    nationality TEXT,
    date_of_birth DATE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    address_line1 TEXT,
    city TEXT,
    country TEXT,
    total_bookings INTEGER DEFAULT 0,
    total_spent NUMERIC(15, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Hotels
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    location TEXT,
    address TEXT,
    google_maps_url TEXT,
    description TEXT,
    amenities TEXT[],
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    base_price NUMERIC(15, 2),
    capacity_adults INTEGER,
    capacity_children INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Transport
CREATE TABLE transport_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES transport_providers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT,
    capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Tour Packages
CREATE TABLE tour_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    duration_days INTEGER,
    duration_nights INTEGER,
    base_price NUMERIC(15, 2),
    destinations TEXT[],
    inclusions TEXT[],
    exclusions TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    package_id UUID REFERENCES tour_packages(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'Confirmed',
    start_date DATE,
    end_date DATE,
    total_amount NUMERIC(15, 2),
    balance_amount NUMERIC(15, 2),
    payment_status TEXT DEFAULT 'Pending',
    travelers_count INTEGER DEFAULT 1,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Itineraries
CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itinerary_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itinerary_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_id UUID REFERENCES itinerary_days(id) ON DELETE CASCADE,
    time_start TIME,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    activity_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security (RLS) policies

ALTER TABLE saas_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Plans" ON saas_plans FOR SELECT USING (true);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Companies" ON companies USING (
    id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Profiles" ON profiles USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Leads" ON leads USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Customers" ON customers USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Hotels" ON hotels USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Packages" ON tour_packages USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation Bookings" ON bookings USING (
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()) OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'super_admin'
);

-- Seed Data
INSERT INTO saas_plans (name, price_monthly, max_users, max_leads, max_bookings)
VALUES
('Free Trial', 0, 2, 50, 10),
('Basic', 49, 5, 500, 100),
('Professional', 149, 20, 5000, 1000),
('Enterprise', 499, 100, 100000, 100000);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    is_first_user BOOLEAN;
BEGIN
    -- Check if this is the first user in the system
    SELECT NOT EXISTS (SELECT 1 FROM public.profiles) INTO is_first_user;

    IF is_first_user THEN
        INSERT INTO public.profiles (id, first_name, last_name, role, is_active)
        VALUES (new.id, 'Super', 'Admin', 'super_admin', true);
    ELSE
        INSERT INTO public.profiles (id, first_name, last_name, role, is_active)
        VALUES (new.id, '', '', 'sales_executive', true);
    END IF;

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Provision Initial Super Admin (if not exists)
-- This assumes auth.users already has the user, which we can't do via SQL for auth schema directly in some environments,
-- but we can ensure the profile exists and is correctly typed.
DO $$
BEGIN
    -- This block is for documentation/initialization reference.
    -- In a live environment, the user would be created via auth.signUp()
    -- and the handle_new_user() trigger would handle the profile.
END $$;
