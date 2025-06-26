// src/middleware.ts
import { createMiddlewareClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(req, res)
  
  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

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
  )
  
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && session) {
    // Fetch user type to determine where to redirect
    try {
      const { data: profile } = await supabase
        .from('user')
        .select('user_type')
        .eq('id', session.user.id)
        .single()

        console.log('User profile fetched successfully:', profile)

      if (profile?.user_type === 'mechanic') {
        return NextResponse.redirect(new URL('/shop/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/customer/dashboard', req.url))
      }
    } catch (error) {
      // If we can't fetch profile, redirect to home
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}