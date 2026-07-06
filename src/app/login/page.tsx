'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    // Only set origin on client
    setOrigin(window.location.origin);

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
          <h1 className="text-3xl font-bold text-slate-900">Ex-Employee v0.2</h1>
          <p className="mt-2 text-slate-500">Sign in to your travel agency portal</p>
          <p className="mt-1 text-xs text-blue-600 font-medium">by Bilu G</p>
        </div>

        {origin && (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={['google', 'github']}
            redirectTo={`${origin}/auth/callback`}
          />
        )}
      </div>
    </div>
  );
}
