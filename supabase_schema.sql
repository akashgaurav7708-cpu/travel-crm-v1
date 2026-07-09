-- Ex-Employee v0.2 by Bilu G - Enterprise Commercial SaaS Database Schema

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
    features JSONB,
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
    currency TEXT DEFAULT 'INR',
    timezone TEXT DEFAULT 'UTC',
    status TEXT DEFAULT 'active',
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

-- 6. Accommodations (Hotels/Houseboats)
CREATE TYPE accommodation_type AS ENUM ('hotel', 'houseboat', 'resort', 'villa');

CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type accommodation_type DEFAULT 'hotel',
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

CREATE TABLE accommodation_room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    accommodation_id UUID REFERENCES accommodations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    base_price NUMERIC(15, 2),
    capacity_adults INTEGER,
    capacity_children INTEGER,
    meal_plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Fleet Management
CREATE TABLE transport_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES transport_providers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT,
    license_number TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES transport_providers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    type TEXT,
    registration_number TEXT,
    capacity INTEGER,
    is_active BOOLEAN DEFAULT true,
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

-- 9. Bookings & Reservations
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    package_id UUID REFERENCES tour_packages(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'Confirmed', -- Lead, Quotation, Confirmed, Completed, Closed
    start_date DATE,
    end_date DATE,
    total_amount NUMERIC(15, 2),
    advance_amount NUMERIC(15, 2) DEFAULT 0,
    balance_amount NUMERIC(15, 2),
    payment_status TEXT DEFAULT 'Pending', -- Pending, Partial, Paid
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
    accommodation_id UUID REFERENCES accommodations(id),
    vehicle_id UUID REFERENCES vehicles(id),
    driver_id UUID REFERENCES drivers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Financials
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    subtotal NUMERIC(15, 2),
    gst_amount NUMERIC(15, 2),
    total_amount NUMERIC(15, 2),
    status TEXT DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    amount NUMERIC(15, 2) NOT NULL,
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method TEXT,
    transaction_id TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Documents & Media
CREATE TABLE document_repository (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    category TEXT, -- Passport, Visa, Ticket, Voucher
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Audit & Operations
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security (RLS) Configuration

-- Helper functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION get_auth_role()
RETURNS user_role AS $$
    SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_auth_company()
RETURNS UUID AS $$
    SELECT company_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Multi-tenant isolation for all major tables
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables
             WHERE table_schema = 'public'
             AND table_name NOT IN ('saas_plans', 'profiles', 'companies', 'audit_logs')
    LOOP
        EXECUTE 'ALTER TABLE ' || t || ' ENABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP POLICY IF EXISTS ' || t || '_tenant_isolation ON ' || t;
        EXECUTE 'CREATE POLICY ' || t || '_tenant_isolation ON ' || t || ' USING (company_id = get_auth_company() OR get_auth_role() = ''super_admin'')';
    END LOOP;
END $$;

-- Enable RLS for Profiles and Companies separately
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profile_access ON profiles;
CREATE POLICY profile_access ON profiles USING (id = auth.uid() OR company_id = get_auth_company() OR get_auth_role() = 'super_admin');

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS company_access ON companies;
CREATE POLICY company_access ON companies USING (id = get_auth_company() OR get_auth_role() = 'super_admin');

-- v0.2 Automated User Onboarding Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name, role, is_active)
    VALUES (new.id, '', '', CASE WHEN (SELECT count(*) FROM public.profiles) = 0 THEN 'super_admin' ELSE 'sales_executive' END, true);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed Core Data
INSERT INTO saas_plans (name, price_monthly, max_users, max_leads, max_bookings)
VALUES
('Free Trial', 0, 2, 50, 10),
('Basic', 49, 5, 500, 100),
('Professional', 149, 20, 5000, 1000),
('Enterprise', 499, 100, 100000, 100000);
