'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  login: (email: string, password: string) => Promise<any | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  login: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const fetchUser = async (userId: string | undefined) => {
        if (!userId) {
            setUser(null);
            return;
        }

        try {
            const { data, error } = await supabase
                .schema('public')
                .from('users')
                .select('*')
                .eq('id', userId)
                .maybeSingle();
            if (error || !data) {
                setUser(null);
                if (error) console.error('Error fetching user:', error);
            } else {
                setUser(data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            fetchUser(session?.user?.id || undefined);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            fetchUser(session?.user?.id || undefined);
            setLoading(false);

            if (event === 'SIGNED_IN') {
                router.push('/shop-dashboard');
                router.refresh();
            } else if (event === 'SIGNED_OUT') {
                router.push('/login');
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        }); 

        if (error) {
            console.error('Login error:', error);
            return null;
        }

        setUser(data.user);
        setSession(data.session);
        setLoading(false);

        console.log('Logged successfully:', data);

        return data;
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        console.log('Signed out successfully');
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut, login }}>
            {children}
        </AuthContext.Provider>
    );
}