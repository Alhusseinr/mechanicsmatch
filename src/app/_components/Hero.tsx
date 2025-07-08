// src/app/_components/Hero.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Search from "../../components/ui/Search";

export default function Hero() {
  const router = useRouter();

  const handleSearch = (location: string, service: string) => {
    // Build search parameters
    const searchParams = new URLSearchParams();
    
    if (location.trim()) {
      searchParams.set('location', location.trim());
    }
    
    if (service && service !== 'all') {
      searchParams.set('service', service);
    }

    // Navigate to search results
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <section className="relative bg-white">
      <div className="relative px-4 pt-8 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="mx-auto max-w-4xl py-12 lg:py-16">
          <div className="text-center">
            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6">
              Find Trusted Mechanics
              <br className="hidden sm:inline" /> Near You
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Connect with verified automotive professionals in your area. Professional service for performance shops, tuners, and general repair.
            </p>

            {/* Search Section */}
            <div className="mt-10">
              <Search onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}