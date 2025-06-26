'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: 'customer' | 'mechanic'
  fallbackPath?: string
}

export function ProtectedRoute({ 
  children, 
  requiredUserType,
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
    const { user, session, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            // No session, redirect to login
            if (!session || !user) {
                router.push(fallbackPath)
                return
            }

            // If user type is required, check it
            if (requiredUserType && user.user_type !== requiredUserType) {
                // Redirect to appropriate dashboard based on actual user type
                if (user.user_type === 'mechanic') {
                    router.push('/shop/dashboard')
                } else if (user.user_type === 'customer') {
                    router.push('/customer/dashboard')
                } else {
                    // User doesn't have a user_type set, redirect to profile completion
                    router.push('/complete-profile')
                }
            }
        }
    }, [loading, session, user, router, requiredUserType, fallbackPath])

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </div>
                </div>
            </div>
        )
    }

    // Don't render children if not authenticated
    if (!session || !user) {
        return null
    }

    // Don't render if user type doesn't match requirement
    if (requiredUserType && user.user_type !== requiredUserType) {
        return null
    }

    return <>{children}</>
}