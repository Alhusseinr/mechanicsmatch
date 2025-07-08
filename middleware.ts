// src/middleware.ts
import { createMiddlewareClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(req, res)

  // Add debug logging
  console.log('🔍 Middleware - Path:', req.nextUrl.pathname)
  
  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('🔍 Middleware - Has session:', !!session)
  console.log('🔍 Middleware - User ID:', session?.user?.id)

  // Protected routes that require authentication
  const protectedRoutes = [
    '/shop/dashboard',
    '/shop/profile',
    '/customer/dashboard', 
    '/customer/profile',
    '/booking'
  ]

  // Public routes that should redirect if authenticated
  const authRoutes = ['/login', '/register']

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  ) && req.nextUrl.pathname !== '/'
  
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && session) {
    console.log("🔍 User is authenticated on auth route, redirecting to home");
    // Simply redirect to home and let the AuthContext handle the proper redirect
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}