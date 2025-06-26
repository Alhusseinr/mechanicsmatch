// src/hooks/useUserProfile.ts
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';

interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  user_type?: 'customer' | 'mechanic';
}

export function useUserProfile() {
  const { user, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const updateProfile = useCallback(async (updates: UserProfileUpdate) => {
    if (!user) {
      setError('No user logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        setError(error.message);
        return false;
      }

      // Refresh the user profile in the auth context
      await refreshUserProfile();
      return true;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, supabase, refreshUserProfile]);

  const createProfile = useCallback(async (profileData: UserProfileUpdate & {
    email: string;
    first_name: string;
    last_name: string;
    user_type: 'customer' | 'mechanic';
  }) => {
    if (!user) {
      setError('No user logged in');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: profileData.email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          user_type: profileData.user_type,
          phone: profileData.phone,
          is_verified: false
        });

      if (error) {
        console.error('Error creating profile:', error);
        setError(error.message);
        return false;
      }

      // Refresh the user profile in the auth context
      await refreshUserProfile();
      return true;
    } catch (err: any) {
      console.error('Error creating profile:', err);
      setError(err.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, supabase, refreshUserProfile]);

  return {
    user,
    updateProfile,
    createProfile,
    loading,
    error,
    setError
  };
}