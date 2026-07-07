'use client';

import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  company_id: string | null;
  first_name: string;
  last_name: string;
  role: 'super_admin' | 'company_admin' | 'sales_manager' | 'sales_executive' | 'operations' | 'accounts' | 'support';
  avatar_url: string | null;
}

export function useAuth() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(profileData as Profile);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData as Profile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return {
    user,
    profile,
    loading,
    isSuperAdmin: profile?.role === 'super_admin',
    isAdmin: profile?.role === 'company_admin' || profile?.role === 'super_admin',
  };
}
