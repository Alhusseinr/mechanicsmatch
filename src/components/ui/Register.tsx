"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

// Types
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  userType: "customer" | "mechanic";
  shopName?: string;
  businessLicense?: string;
  agreeToTerms: boolean;
}

// Register Component
export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "Rami",
    lastName: "Alhussein",
    email: "Ramialhussein98@gmail.com",
    password: "Hassan@123",
    confirmPassword: "Hassan@123",
    phone: "+1234567890",
    userType: "customer",
    shopName: "",
    businessLicense: "",
    agreeToTerms: true,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleInputChange = (
    field: keyof RegisterFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setAuthError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    // Basic validations
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Mechanic-specific validations
    if (formData.userType === "mechanic") {
      if (!formData.shopName?.trim()) {
        newErrors.shopName = "Shop name is required for mechanics";
      }
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In your Register.tsx component, update the handleSubmit function:

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      console.log("Starting registration...");

      // Step 1: Create auth user with email confirmation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // This is important for email confirmation
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: formData.userType,
            phone: formData.phone,
            shop_name: formData.shopName,
            business_license: formData.businessLicense,
          },
        },
      });

      console.log("Auth signup result:", { authData, authError });
      

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("User creation failed - no user returned");
      }

      console.log("Creating user profile...");
      
      const { error: profileError } = await supabase
        .schema("public")
        .from("users")
        .insert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          user_type: formData.userType,
          phone: formData.phone || null,
          is_verified: false,
        });

      console.log("Profile creation result:", profileError);

      // Check if email confirmation is needed
      if (
        !authData.session &&
        authData.user &&
        !authData.user.email_confirmed_at
      ) {
        console.log("Email confirmation required");

        // Show success message about email confirmation
        alert(
          "Registration successful! Please check your email and click the confirmation link to activate your account."
        );

        // Redirect to login with a message
        router.push(
          "/login?message=Please check your email for a confirmation link"
        );
        return;
      }

      // If we get here, user was created and confirmed (unlikely with email confirmation enabled)
      console.log("User created and confirmed immediately:", authData.user.id);

      if (profileError) {
        console.error("Profile creation failed:", profileError);
        // This is non-critical since the user can complete their profile later
      }

      // If mechanic, create shop profile
      if (formData.userType === "mechanic" && formData.shopName) {
        const { error: shopError } = await supabase.from("shops").insert({
          owner_id: authData.user.id,
          name: formData.shopName,
          description: "",
          address: "To be updated",
          city: "To be updated",
          state: "To be updated",
          zip_code: "00000",
          email: formData.email,
          business_license: formData.businessLicense || null,
          is_verified: false,
          is_active: true,
        });

        if (shopError) {
          console.error("Shop creation failed:", shopError);
        }
      }

      // Success - redirect to appropriate dashboard
      if (formData.userType === "mechanic") {
        router.push("/shop/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);

      // Handle specific error cases
      if (error.message?.includes("User already registered")) {
        setAuthError(
          "An account with this email already exists. Please sign in instead."
        );
      } else if (error.message?.includes("Password should be at least")) {
        setAuthError("Password must be at least 6 characters long.");
      } else if (error.message?.includes("Invalid email")) {
        setAuthError("Please enter a valid email address.");
      } else {
        setAuthError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInRedirect = () => {
    router.push("/login");
  };

  const handleTermsClick = () => {
    console.log("Terms clicked");
    // Open terms page or modal
  };

  const handlePrivacyClick = () => {
    console.log("Privacy clicked");
    // Open privacy page or modal
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error("Error with Google sign up:", error);
        setAuthError("Google sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Google sign up failed:", error);
      setAuthError("Google sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}

        {/* Register Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Show auth error */}
          {authError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Toggle */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 100 100"
                  className="mr-3"
                >
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
                <h2 className="text-3xl font-bold text-slate-900">
                  MechanicsMatch
                </h2>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    errors.firstName
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-white"
                  }`}
                  placeholder="John"
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                    errors.lastName
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-white"
                  }`}
                  placeholder="Smith"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 bg-white"
                }`}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 bg-white"
                }`}
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Mechanic-specific fields */}
            {formData.userType === "mechanic" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shop Name
                  </label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) =>
                      handleInputChange("shopName", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                      errors.shopName
                        ? "border-red-300 bg-red-50"
                        : "border-slate-200 bg-white"
                    }`}
                    placeholder="Elite Motor Works"
                    autoComplete="organization"
                  />
                  {errors.shopName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shopName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business License (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.businessLicense}
                    onChange={(e) =>
                      handleInputChange("businessLicense", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    placeholder="License number"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    This helps customers trust your services
                  </p>
                </div>
              </>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 pr-12 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-white"
                  }`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                          level <= passwordStrength
                            ? passwordStrength <= 2
                              ? "bg-red-400"
                              : passwordStrength <= 3
                              ? "bg-yellow-400"
                              : "bg-green-400"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Password strength:{" "}
                    {passwordStrength <= 2
                      ? "Weak"
                      : passwordStrength <= 3
                      ? "Medium"
                      : "Strong"}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 pr-12 ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-white"
                  }`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span className="text-sm text-slate-600">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={handleTermsClick}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={handlePrivacyClick}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Social Registration Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <button
                onClick={handleSignInRedirect}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
