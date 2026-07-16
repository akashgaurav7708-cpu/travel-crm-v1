import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // URL checking
  const isLoginPage = pathname.startsWith('/login');
  const isSignUpPage = pathname.startsWith('/signup');
  const isAuthPage = isLoginPage || isSignUpPage;

  // Public routes (Website)
  const publicRoutes = [
    '/',
    '/tour-packages',
    '/offbeat-kashmir',
    '/gallery',
    '/contact',
    '/about',
    '/about-us',
    '/blog',
    '/houseboats',
    '/kashmir-hotels',
    '/kashmir-transport',
    '/hotels-houseboats',
    '/instagram-carousel',
  ];

  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith('/tour-packages/')
  );

  // Use a simple next() for public routes if Supabase is not configured
  // This allows the public website to work even without a database connection in dev/test
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    if (isPublicRoute || isAuthPage) {
        return NextResponse.next();
    }
    // For protected routes, redirect to login which is also public-access above
    return NextResponse.redirect(new URL('/login', request.url));
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
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

  // Redirect authenticated users from login/signup to Dashboard
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect Dashboard routes: if not logged in and not a public route, redirect to login
  if (!user && !isPublicRoute && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based protection for Super Admin panel
  if (user && pathname.startsWith('/super-admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'super_admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
      }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth|api).*)',
  ],
};
