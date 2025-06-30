import { CustomSelect } from "./CustomSelect";
import { useState } from "react";

const serviceOptions = [
  { value: "all", label: "All services" },
  { value: "general", label: "General Repair" },
  { value: "performance", label: "Performance Tuning" },
  { value: "diagnostics", label: "Engine Diagnostics" },
  { value: "brake", label: "Brake Service" },
  { value: "oil", label: "Oil Change" },
  { value: "transmission", label: "Transmission" },
];

export default function Search() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { searchLocation, selectedService });
  };

  return (
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
  );
}
