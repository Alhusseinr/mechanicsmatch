"use client";

import { useState } from "react";

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

export default function TrustedMechanicsList() {
  const [mechanics, setMechanics] = useState(mockMechanics);

  const handleViewProfile = (mechanicId: number) => {
    console.log("View profile for mechanic:", mechanicId);
  };

  return (
    <section id="mechanics" className="py-16 bg-slate-50">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12"
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
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12"
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
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white py-3 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
