import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // URL checking
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isSignUpPage = request.nextUrl.pathname.startsWith('/signup');
  const isAuthPage = isLoginPage || isSignUpPage;

  // Redirect authenticated users from login/signup to Dashboard
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect CRM routes: if not logged in and not on auth page, redirect to login
  if (!user && !isAuthPage) {
    // Development fallback if env vars missing
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
        return response;
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based protection for Super Admin panel
  if (user && request.nextUrl.pathname.startsWith('/super-admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'super_admin') {
          return NextResponse.redirect(new URL('/', request.url));
      }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
