"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="MechanicsMatch Logo"
                width={100}
                height={100}
                className="mr-3"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#mechanics"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                Find Mechanics
              </a>
              <button
                onClick={handleListGarage}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                List Your Shop
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleSignIn}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </>
  );
}
