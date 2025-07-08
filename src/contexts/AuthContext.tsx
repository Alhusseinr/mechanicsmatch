"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

// Custom user type that includes data from public.users
interface CustomUser extends User {
  user_type?: "customer" | "mechanic";
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_verified?: boolean;
  cars?: Car[];
  appointments?: Booking[];
}

interface Car {
  id: string;
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate: string;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  shop_name: string;
  customer_id: string;
  shop_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  payment_status: "pending" | "paid" | "refunded";
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  problem_description?: string;
  special_instructions?: string;
  estimated_cost?: number;
  final_cost?: number;
  notes?: string;
}

type AuthContextType = {
  user: CustomUser | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<any | null>;
  refreshUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  login: async () => null,
  refreshUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Function to fetch user profile from public.users
  const fetchUserProfile = async (
    authUser: User
  ): Promise<CustomUser | null> => {
    try {
      // Only fetch essential profile data initially
      const { data: profile, error } = await supabase
        .from("users")
        .select("user_type, first_name, last_name, phone, is_verified")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return authUser; // Return basic auth user if profile fetch fails
      }

      console.log("Fetched user profile:", profile);

      // Return basic profile without heavy data fetching for faster auth
      return {
        ...authUser,
        user_type: profile.user_type,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        is_verified: profile.is_verified,
        cars: [], // Load separately when needed
        appointments: [], // Load separately when needed
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
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
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        setSession(session);
        
        if (session?.user) {
          const userWithProfile = await fetchUserProfile(session.user);
          if (mounted) {
            setUser(userWithProfile);
          }
        } else {
          if (mounted) {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setUser(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("🔍 Auth state changed:", _event);
      console.log("🔍 New session:", !!session);

      if (!mounted) return;

      setSession(session);

      if (session?.user) {
        try {
          const userWithProfile = await fetchUserProfile(session.user);
          if (mounted) {
            setUser(userWithProfile);

            if (_event === "SIGNED_IN" && userWithProfile?.user_type) {
              if (userWithProfile.user_type === "mechanic") {
                router.push("/shop/dashboard");
              } else {
                router.push("/customer/dashboard");
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user profile on auth change:", error);
          if (mounted) {
            setUser(null);
          }
        }
      } else {
        if (mounted) {
          setUser(null);
        }
        
        if (_event === "SIGNED_OUT") {
          router.push("/login");
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error && error.message.includes("Email not confirmed")) {
        console.warn("Email not confirmed:", error);
        throw error;
      }

      // The user profile will be fetched automatically by the auth state change listener
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log("🔍 Signing out...");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      setUser(null);
      setSession(null);
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut,
        login,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
