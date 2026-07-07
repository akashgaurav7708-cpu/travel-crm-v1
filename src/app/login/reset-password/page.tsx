'use client';

import { createClient } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Loader2, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
             <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Create New Password</h1>
          <p className="mt-2 text-slate-500 font-medium text-sm">Secure your account with a strong password.</p>
        </div>

        {success ? (
           <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
              <p className="text-green-800 font-bold">Password Updated!</p>
              <p className="text-green-600 text-xs">Redirecting to login in a few seconds...</p>
           </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">New Password</label>
              <input
                required
                type="password"
                className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-500 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Set New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
