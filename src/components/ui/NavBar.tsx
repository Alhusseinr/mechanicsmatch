"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListGarage = () => {
    console.log("List your garage clicked");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  // Check if user is on specific routes
  const isHomePage = pathname === "/";
  const isDashboardPage = pathname.includes("/dashboard");
  const isBookingPage = pathname.includes("/booking");
  const isProfilePage = pathname.includes("/profile");

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
                  ? "text-blue-600 border-b-2 border-blue-600"
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
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Book Service
                </button>
                <button
                  onClick={() => router.push("/search")}
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Find Shops
                </button>
                <button
                  onClick={() => {
                    if (user.user_type === "customer") {
                      router.push("/customer/profile");
                    }
                  }}
                  className={`font-medium transition-colors ${
                    isProfilePage
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  My Profile
                </button>
              </>
            )}

            {/* Mechanic-specific links */}
            {user.user_type === "mechanic" && (
              <>
                <button
                  onClick={() => router.push("/shop/bookings")}
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Bookings
                </button>
                <button
                  onClick={() => router.push("/shop/services")}
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => router.push("/shop/profile")}
                  className={`font-medium transition-colors ${
                    isProfilePage
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  Shop Profile
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
                className="w-5 h-5 text-slate-600"
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
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.first_name?.charAt(0) ||
                    user.email?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
                <span className="text-sm font-medium text-slate-900 max-w-32 truncate">
                  {user.first_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.email}
                </span>
                <ChevronDownIcon className={`w-4 h-4 text-slate-600 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-slate-900">
                      {user.first_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.email}
                    </p>
                    <p className="text-sm text-slate-500 capitalize">{user.user_type}</p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        if (user.user_type === "mechanic") {
                          router.push("/shop/dashboard");
                        } else {
                          router.push("/customer/dashboard");
                        }
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7"></path>
                      </svg>
                      <span>Dashboard</span>
                    </button>

                    {user.user_type === "customer" ? (
                      <>
                        <button
                          onClick={() => {
                            router.push("/customer/profile");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            router.push("/customer/bookings");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>My Bookings</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            router.push("/shop/profile");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12"></path>
                          </svg>
                          <span>Shop Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            router.push("/shop/analytics");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center space-x-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                          </svg>
                          <span>Analytics</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
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
