// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
      }

      if (data.session) {
        // Fetch user profile to determine redirect
        const { data: profile, error: profileError } = await supabase
          .from('user')
          .select('user_type')
          .eq('id', data.session.user.id)
          .single()

        if (profileError || !profile) {
          console.error('Error fetching user profile:', profileError)
          return NextResponse.redirect(`${origin}/`)
        }

        // Redirect based on user type
        if (profile.user_type === 'mechanic') {
          return NextResponse.redirect(`${origin}/shop/dashboard`)
        } else {
          return NextResponse.redirect(`${origin}/customer/dashboard`)
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
    }
  }

  // Default redirect if no code or session
  return NextResponse.redirect(origin)
}