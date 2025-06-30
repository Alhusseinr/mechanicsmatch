"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useRouter } from "next/navigation";
import TrustPilotReviews from "@/components/ui/TrustPilotReviews";
import AboutUs from "@/components/ui/AboutUs";
import NavBar from "@/components/ui/NavBar";
import HowItWorks from "@/components/ui/HowItWork";
import TrustedMechanicsList from "@/components/ui/TrustedMechanicsList";

const serviceOptions = [
  { value: "all", label: "All services" },
  { value: "general", label: "General Repair" },
  { value: "performance", label: "Performance Tuning" },
  { value: "diagnostics", label: "Engine Diagnostics" },
  { value: "brake", label: "Brake Service" },
  { value: "oil", label: "Oil Change" },
  { value: "transmission", label: "Transmission" },
];

export default function MechanicsMatch() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Searching for:", { searchLocation, selectedService });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative isolate px-4 pt-14 sm:px-6 lg:px-8">
          {/* Background decoration - top */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          {/* Main content */}
          <div className="mx-auto max-w-4xl py-20 sm:py-32 lg:py-40">
            <div className="hero-text-container">
              {/* Heading */}
              <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight sm:leading-tight lg:leading-tight mb-0">
                Find Trusted Mechanics
                <br className="hidden sm:inline" /> Near You
              </h1>

              {/* Subheading */}
              <p className="text-center mt-6 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto text-balance px-4 sm:px-0">
                Built for performance shops, tuners and general repair. Connect
                with verified professionals in your area.
              </p>

              {/* Search Section */}
              <div className="mt-10 w-full max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-4">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch">
                    {/* Location Input */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-left lg:hidden">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Search by city or zip"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full h-12 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 flex items-center"
                      />
                    </div>

                    {/* Service Select */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-left lg:hidden">
                        Service Type
                      </label>
                      <CustomSelect
                        options={serviceOptions}
                        value={selectedService}
                        onChange={setSelectedService}
                        placeholder="Select a service"
                        className="w-full h-12"
                      />
                    </div>

                    {/* Search Button */}
                    <div className="flex-shrink-0 flex items-end">
                      <button
                        onClick={handleSearch}
                        className="w-full lg:w-auto h-12 px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50 flex items-center justify-center cursor-pointer"
                      >
                        Search
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional: Popular Services Quick Links */}
              <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  "Performance Tuning",
                  "Oil Change",
                  "Brake Service",
                  "Diagnostics",
                ].map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Background decoration - bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* <TrustedMechanicsList /> */}

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
