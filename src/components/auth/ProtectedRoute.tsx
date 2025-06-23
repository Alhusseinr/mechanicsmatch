'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return null // or a loading spinner, or redirect
    }

    return <>{children}</>
}