// NEW (Pages Router)
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next/dist/types'

// For client-side use (components, pages)
export const createClient = () => createPagesBrowserClient()

// For server-side use (getServerSideProps, API routes)
export const createServerClient = (ctx: GetServerSidePropsContext) =>
  createPagesServerClient(ctx)