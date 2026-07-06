import { createClient } from '../supabase';

const supabase = createClient();

interface Profile {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface Company {
  id: string;
  name: string;
  subdomain?: string;
  logo_url?: string;
}

export const companyService = {
  async getMyCompany() {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id, companies(*)')
      .single();

    if (profileError) throw profileError;
    return (profile as any).companies as Company;
  },

  async updateCompany(id: string, data: Partial<Company>) {
    const { data: updated, error } = await supabase
      .from('companies')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated as Company;
  }
};

export const profileService = {
  async getMyProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*, companies(*)')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data as (Profile & { companies: Company });
  }
};
