"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/components/ui/CustomSelect";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

interface Mechanic {
  id: number;
  name: string;
  description: string;
  rating: number;
  location: string;
  specialties: string[];
  verified: boolean;
}

const mockMechanics: Mechanic[] = [
  {
    id: 1,
    name: "Auto Pro Services",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Specialized in performance tuning and general repairs.",
    rating: 4.8,
    location: "Downtown",
    specialties: ["Performance", "Tuning"],
    verified: true,
  },
  {
    id: 2,
    name: "Elite Motor Works",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Expert diagnostics and engine rebuilds.",
    rating: 4.9,
    location: "Midtown",
    specialties: ["Diagnostics", "Engine"],
    verified: true,
  },
  {
    id: 3,
    name: "Precision Auto Care",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quality service for all vehicle types.",
    rating: 4.7,
    location: "Westside",
    specialties: ["General Repair", "Maintenance"],
    verified: false,
  },
  {
    id: 4,
    name: "Metro Garage Solutions",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fast and reliable automotive services.",
    rating: 4.6,
    location: "Eastside",
    specialties: ["Quick Service", "Repairs"],
    verified: true,
  },
  {
    id: 5,
    name: "Turbo Tech Mechanics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Performance specialists and tuning experts.",
    rating: 4.8,
    location: "Uptown",
    specialties: ["Performance", "Turbo"],
    verified: true,
  },
  {
    id: 6,
    name: "Reliable Auto Repair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Honest pricing and quality workmanship.",
    rating: 4.5,
    location: "Southside",
    specialties: ["General Repair", "Honest Pricing"],
    verified: false,
  },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [mechanics, setMechanics] = useState(mockMechanics);

  const handleSearch = () => {
    console.log("Searching for:", { searchLocation, selectedService });
  };

  const handleListGarage = () => {
    console.log("List your garage clicked");
  };

  const handleViewProfile = (mechanicId: number) => {
    console.log("View profile for mechanic:", mechanicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-grey">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">MechanicsMatch</span>
                <img
                  alt="MechanicsMatch Logo"
                  src="/logo.png"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

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
            <div className="text-center">
              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Find Trusted Mechanics Near You
              </h1>

              {/* Subheading */}
              <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg lg:text-xl max-w-2xl mx-auto">
                Built for performance shops, tuners and general repair. Connect
                with verified professionals in your area.
              </p>

              {/* Search Section */}
              <div className="mt-10 w-full max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-end">
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
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
                        className="w-full"
                      />
                    </div>

                    {/* Search Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={handleSearch}
                        className="w-full lg:w-auto px-6 lg:px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      >
                        <span className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 mr-2 lg:mr-0 lg:hidden"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          Search
                        </span>
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
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
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
      </div>

      {/* Mechanics Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Trusted Local Mechanics
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Browse through our carefully vetted network of professional
              mechanics and automotive specialists.
            </p>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {mechanics.slice(0, 3).map((mechanic) => (
              <div
                key={mechanic.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10"></div>
                  <div className="relative text-slate-400 group-hover:text-slate-500 transition-colors duration-200">
                    <svg
                      className="w-20 h-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {mechanic.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {mechanic.name}
                    </h4>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">
                        {mechanic.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {mechanic.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {mechanic.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-slate-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">{mechanic.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewProfile(mechanic.id)}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mechanics.slice(3, 6).map((mechanic) => (
              <div
                key={mechanic.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10"></div>
                  <div className="relative text-slate-400 group-hover:text-slate-500 transition-colors duration-200">
                    <svg
                      className="w-20 h-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  {mechanic.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {mechanic.name}
                    </h4>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">
                        {mechanic.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {mechanic.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {mechanic.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-slate-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">{mechanic.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewProfile(mechanic.id)}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
