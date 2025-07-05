'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ProfileFormData } from '@/lib/types';

export default function CompleteProfilePage() {
  const { user, session, loading: authLoading } = useAuth();
  const { createProfile, updateProfile, loading, error, setError } = useUserProfile();
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: '',
    last_name: '',
    phone: '',
    user_type: 'customer'
  });
  
  const [formErrors, setFormErrors] = useState<Partial<ProfileFormData>>({});

  // Check if user already has a complete profile
  useEffect(() => {
    if (!authLoading && user) {
      if (user.user_type && user.first_name && user.last_name) {
        // User already has a complete profile, redirect to appropriate dashboard
        if (user.user_type === 'mechanic') {
          router.push('/shop/dashboard');
        } else {
          router.push('/customer/dashboard');
        }
      } else if (user.first_name) {
        // Pre-fill form with existing data
        setFormData({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone: user.phone || '',
          user_type: user.user_type || 'customer'
        });
      }
    }
  }, [user, authLoading, router]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login');
    }
  }, [session, authLoading, router]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;

    try {
      const profileData = {
        ...formData,
        email: user.email!
      };

      // Check if user exists in public.users
      const isUpdate = user.user_type || user.first_name;
      
      const success = isUpdate 
        ? await updateProfile(formData)
        : await createProfile(profileData);

      if (success) {
        // Redirect based on user type
        if (formData.user_type === 'mechanic') {
          router.push('/shop/dashboard');
        } else {
          router.push('/customer/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Profile save failed:', err);
      setError(err.message || 'Failed to save profile');
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <svg width="60" height="60" viewBox="0 0 100 100" className="mr-3">
              <path 
                d="M20 15 L20 35 L15 40 L15 50 L20 55 L20 75 L30 85 L40 75 L40 70 L35 65 L35 45 L40 40 L40 35 L30 25 Z" 
                fill="#1e40af" 
              />
              <path 
                d="M80 15 L80 35 L85 40 L85 50 L80 55 L80 75 L70 85 L60 75 L60 70 L65 65 L65 45 L60 40 L60 35 L70 25 Z" 
                fill="#ea580c" 
              />
              <rect x="42" y="42" width="16" height="16" fill="#1e40af" />
              <rect x="45" y="45" width="10" height="10" fill="#ea580c" />
            </svg>
            <h2 className="text-3xl font-bold text-slate-900">MechanicsMatch</h2>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Complete Your Profile</h3>
          <p className="text-slate-600">Tell us a bit about yourself to get started</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Show error */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('user_type', 'customer')}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.user_type === 'customer'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium">Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('user_type', 'mechanic')}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.user_type === 'mechanic'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-sm font-medium">Mechanic</span>
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    formErrors.first_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
                  }`}
                  placeholder="John"
                  autoComplete="given-name"
                />
                {formErrors.first_name && <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    formErrors.last_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
                  }`}
                  placeholder="Smith"
                  autoComplete="family-name"
                />
                {formErrors.last_name && <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                  formErrors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
                }`}
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
            </div>

            {/* Email Display */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-slate-500"
              />
              <p className="mt-1 text-xs text-slate-500">Email cannot be changed</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                'Complete Profile'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Profile Information</h4>
                <p className="text-sm text-blue-800">
                  {formData.user_type === 'mechanic' 
                    ? 'As a mechanic, you\'ll be able to receive bookings, manage your shop profile, and connect with customers.'
                    : 'As a customer, you\'ll be able to find mechanics, book services, and manage your vehicle information.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}