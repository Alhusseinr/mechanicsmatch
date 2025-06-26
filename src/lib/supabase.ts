// src/lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createMiddlewareClient as createSupabaseMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

// For client-side use (components, pages) - App Router compatible
export function createClient() {
  return createClientComponentClient()
}

// For middleware
export function createMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createSupabaseMiddlewareClient({ req, res })
}