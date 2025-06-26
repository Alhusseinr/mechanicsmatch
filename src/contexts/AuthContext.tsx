'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

// Custom user type that includes data from public.users
interface CustomUser extends User {
  user_type?: 'customer' | 'mechanic';
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_verified?: boolean;
}

type AuthContextType = {
  user: CustomUser | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  login: (email: string, password: string) => Promise<any | null>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  login: async () => null,
  refreshUserProfile: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    // Function to fetch user profile from public.users
    const fetchUserProfile = async (authUser: User): Promise<CustomUser | null> => {
        try {
            const { data: profile, error } = await supabase
                .from('users')
                .select('user_type, first_name, last_name, phone, is_verified')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return authUser; // Return basic auth user if profile fetch fails
            }

            // Merge auth.users data with public.users data
            return {
                ...authUser,
                user_type: profile.user_type,
                first_name: profile.first_name,
                last_name: profile.last_name,
                phone: profile.phone,
                is_verified: profile.is_verified
            };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return authUser; // Return basic auth user if error occurs
        }
    };

    // Function to refresh user profile (useful after profile updates)
    const refreshUserProfile = async () => {
        if (session?.user) {
            const updatedUser = await fetchUserProfile(session.user);
            setUser(updatedUser);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            
            if (session?.user) {
                const userWithProfile = await fetchUserProfile(session.user);
                setUser(userWithProfile);
            } else {
                setUser(null);
            }
            
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            
            if (session?.user) {
                const userWithProfile = await fetchUserProfile(session.user);
                setUser(userWithProfile);
                
                // Handle redirects based on auth state and user type
                if (event === 'SIGNED_IN' && userWithProfile?.user_type) {
                    if (userWithProfile.user_type === 'mechanic') {
                        router.push('/shop/dashboard');
                    } else {
                        router.push('/customer/dashboard');
                    }
                }
            } else {
                setUser(null);
                if (event === 'SIGNED_OUT') {
                    router.push('/login');
                }
            }
            
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const login = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            }); 

            if (error && error.message.includes("Email not confirmed")) {
                console.warn('Email not confirmed:', error);
                throw error;
            }

            // The user profile will be fetched automatically by the auth state change listener
            return data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Sign out error:', error);
                throw error;
            }
            setUser(null);
            setSession(null);
            router.push('/login');
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            session, 
            loading, 
            signOut, 
            login, 
            refreshUserProfile 
        }}>
            {children}
        </AuthContext.Provider>
    );
}