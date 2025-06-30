"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useRouter } from "next/navigation";
import TrustPilotReviews from "@/components/ui/TrustPilotReviews";
import AboutUs from "@/components/ui/AboutUs";
import NavBar from "@/components/ui/NavBar";
import HowItWorks from "@/components/ui/HowItWorks";
import TrustedMechanicsList from "@/components/ui/TrustedMechanicsList";
import FadeIn from "@/components/ui/FadeIn";
import Hero from "@/components/ui/Hero";



export default function MechanicsMatch() {
  
  const router = useRouter();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <Hero />

      <HowItWorks />

      {/* not yet until we have shops onboarded */}
      {/* <TrustedMechanicsList /> */}

      <AboutUs />

      {/* Footer */}
      <footer className="text-slate-600 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo and Copyright */}
            <div className="flex items-center mb-4 md:mb-0">
              <div>
                <p className="text-slate-500 text-sm">
                  SecureNode LLC &copy; 2025 All rights reserved.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a
                href="https://twitter.com/mechanicsmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="https://facebook.com/mechanicsmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-700 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/mechanicsmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-pink-600 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zm4.624 11.988c0 2.552-2.075 4.626-4.624 4.626s-4.624-2.074-4.624-4.626c0-2.552 2.075-4.626 4.624-4.626s4.624 2.074 4.624 4.626zm-1.404-5.025c-.132 0-.239-.107-.239-.239V5.125c0-.132.107-.239.239-.239h1.599c.132 0 .239.107.239.239v1.599c0 .132-.107.239-.239.239h-1.599zm3.407 4.774h-1.599c-.132 0-.239-.107-.239-.239V9.899c0-.132.107-.239.239-.239h1.599c.132 0 .239.107.239.239v1.599c0 .132-.107.239-.239.239zM12.017 9.362c1.432 0 2.594 1.162 2.594 2.594s-1.162 2.594-2.594 2.594-2.594-1.162-2.594-2.594 1.162-2.594 2.594-2.594z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/mechanicsmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-700 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://youtube.com/@mechanicsmatch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-600 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
