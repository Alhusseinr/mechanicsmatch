"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const { user, session, loading, signOut } = useAuth();

  const handleListGarage = () => {
    console.log("List your garage clicked");
  };

  const handleViewProfile = (mechanicId: number) => {
    console.log("View profile for mechanic:", mechanicId);
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  // Check if user is on specific routes
  const isHomePage = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isDashboardPage = pathname.includes("/dashboard");
  const isCustomerDashboard = pathname.includes("/customer");
  const isMechanicDashboard = pathname.includes("/shop");
  const isBookingPage = pathname.includes("/booking");
  const isProfilePage = pathname.includes("/profile");

  // Don't show navbar on certain pages
  if (isAuthPage) {
    return null; // Hide navbar completely on login/register pages
  }

  if (isCustomerDashboard) {
    return null; // Hide navbar on customer dashboard
  }

  if (isMechanicDashboard) {
    return null; // Hide navbar on customer dashboard
  }

  // Different navbar content based on route and auth state
  const getNavContent = () => {
    // If user is authenticated
    if (session && user) {
      return (
        <>
          {/* Authenticated Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Dashboard link based on user type */}
            <button
              onClick={() => {
                if (user.user_type === "mechanic") {
                  router.push("/shop/dashboard");
                } else {
                  router.push("/customer/dashboard");
                }
              }}
              className={`font-medium transition-colors ${
                isDashboardPage
                  ? "text-slate-900 border-b-2 border-slate-900"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Dashboard
            </button>

            {/* Customer-specific links */}
            {user.user_type === "customer" && (
              <>
                <button
                  onClick={() => router.push("/booking")}
                  className={`font-medium transition-colors ${
                    isBookingPage
                      ? "text-slate-900 border-b-2 border-slate-900"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Book Service
                </button>
                <a
                  href="#mechanics"
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Find Mechanics
                </a>
              </>
            )}

            {/* Mechanic-specific links */}
            {user.user_type === "mechanic" && (
              <>
                <button
                  onClick={() => router.push("/shop/profile")}
                  className={`font-medium transition-colors ${
                    isProfilePage
                      ? "text-slate-900 border-b-2 border-slate-900"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Shop Profile
                </button>
                <button
                  onClick={() => console.log("Manage bookings")}
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Bookings
                </button>
              </>
            )}

            {/* Common authenticated links */}
            {!isHomePage && (
              <button
                onClick={() => router.push("/")}
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Home
              </button>
            )}
          </div>

          {/* Authenticated User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Avatar/Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {user.first_name?.charAt(0) ||
                  user.email?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
              <span className="text-sm font-medium text-slate-900">
                {user.first_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.email}
              </span>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </>
      );
    }

    // If user is not authenticated (public navigation)
    return (
      <>
        {/* Public Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              <a
                href="#how-it-works"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#mechanics"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Find Mechanics
              </a>
            </>
          ) : (
            <button
              onClick={() => router.push("/")}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              Home
            </button>
          )}

          <button
            onClick={handleListGarage}
            className="text-slate-700 hover:text-slate-900 font-medium transition-colors cursor-pointer"
          >
            List Your Shop
          </button>
        </div>

        {/* Public Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleSignIn}
            className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <img
                src="/logo.png"
                alt="MechanicsMatch Logo"
                width={100}
                height={100}
                className="mr-3"
              />
            </div>

            {/* Dynamic Navigation Content */}
            {getNavContent()}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Route indicator for development (remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded text-center">
              Current route: {pathname} | User type:{" "}
              {user?.user_type || "Not authenticated"}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        session={session}
        signOut={signOut}
        pathname={pathname}
      />
    </>
  );
}
