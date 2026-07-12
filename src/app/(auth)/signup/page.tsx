'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session) {
        router.push('/');
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 text-brand-navy">TravelOS</h1>
          <p className="mt-2 text-slate-500 font-medium">Create Agency Account</p>
          <p className="mt-1 text-xs text-blue-600 font-black uppercase tracking-widest">by Bilu G</p>
        </div>

        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{
              theme: ThemeSupa,
              variables: {
                  default: {
                      colors: {
                          brand: '#2563EB',
                          brandAccent: '#1D4ED8',
                      }
                  }
              }
          }}
          theme="light"
          providers={[]}
          showLinks={true}
        />

        <div className="mt-8 text-center text-xs text-slate-400 font-medium">
           Register your travel agency to start managing trips.
        </div>
      </div>
    </div>
  );
}
