// src/components/ui/Search.tsx
"use client";

import { CustomSelect } from "./CustomSelect";
import { useState } from "react";
import { useRouter } from "next/navigation";

const serviceOptions = [
  { value: "all", label: "All services" },
  { value: "general", label: "General Repair" },
  { value: "performance", label: "Performance Tuning" },
  { value: "diagnostics", label: "Engine Diagnostics" },
  { value: "brake", label: "Brake Service" },
  { value: "oil", label: "Oil Change" },
  { value: "transmission", label: "Transmission" },
  { value: "suspension", label: "Suspension" },
  { value: "electrical", label: "Electrical" },
  { value: "ac", label: "A/C Service" },
  { value: "timing", label: "Timing Belt" },
  { value: "exhaust", label: "Exhaust System" },
];

interface SearchProps {
  onSearch?: (location: string, service: string) => void;
  className?: string;
}

export default function Search({ onSearch, className = "" }: SearchProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      alert("Please enter a location to search");
      return;
    }

    setIsSearching(true);

    try {
      // Build search parameters
      const searchParams = new URLSearchParams();

      if (searchLocation.trim()) {
        searchParams.set("location", searchLocation.trim());
      }

      if (selectedService && selectedService !== "all") {
        searchParams.set("service", selectedService);
      }

      // If onSearch prop is provided, use it (for custom handling)
      if (onSearch) {
        onSearch(searchLocation, selectedService);
      } else {
        // Navigate to search results page
        router.push(`/search?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickSearch = (service: string) => {
    setSelectedService(service.toLowerCase().replace(/\s+/g, ""));
    // Auto-trigger search if location is already filled
    if (searchLocation.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set("location", searchLocation.trim());
      searchParams.set("service", service.toLowerCase().replace(/\s+/g, ""));

      if (onSearch) {
        onSearch(searchLocation, service.toLowerCase().replace(/\s+/g, ""));
      } else {
        router.push(`/search?${searchParams.toString()}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`mt-10 w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch">
          {/* Location Input */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left lg:hidden">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city, state, or ZIP code"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-12 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 flex items-center"
              disabled={isSearching}
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
              disabled={isSearching}
            />
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0 flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchLocation.trim()}
              className="w-full lg:w-auto h-12 px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50 flex items-center justify-center cursor-pointer"
            >
              {isSearching ? (
                <>
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
                  Searching...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {[
          "Performance Tuning",
          "Oil Change",
          "Brake Service",
          "Diagnostics",
        ].map((service) => (
          <button
            key={service}
            onClick={() => handleQuickSearch(service)}
            disabled={isSearching}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 rounded-full transition-colors duration-200 cursor-pointer"
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
