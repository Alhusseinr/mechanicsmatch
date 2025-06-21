'use client'

import { useState } from 'react';

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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Specialized in performance tuning and general repairs.",
    rating: 4.8,
    location: "Downtown",
    specialties: ["Performance", "Tuning"],
    verified: true
  },
  {
    id: 2,
    name: "Elite Motor Works",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Expert diagnostics and engine rebuilds.",
    rating: 4.9,
    location: "Midtown",
    specialties: ["Diagnostics", "Engine"],
    verified: true
  },
  {
    id: 3,
    name: "Precision Auto Care",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quality service for all vehicle types.",
    rating: 4.7,
    location: "Westside",
    specialties: ["General Repair", "Maintenance"],
    verified: false
  },
  {
    id: 4,
    name: "Metro Garage Solutions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fast and reliable automotive services.",
    rating: 4.6,
    location: "Eastside",
    specialties: ["Quick Service", "Repairs"],
    verified: true
  },
  {
    id: 5,
    name: "Turbo Tech Mechanics",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Performance specialists and tuning experts.",
    rating: 4.8,
    location: "Uptown",
    specialties: ["Performance", "Turbo"],
    verified: true
  },
  {
    id: 6,
    name: "Reliable Auto Repair",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Honest pricing and quality workmanship.",
    rating: 4.5,
    location: "Southside",
    specialties: ["General Repair", "Honest Pricing"],
    verified: false
  }
];

export default function MechanicsMatch() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('All services');
  const [mechanics, setMechanics] = useState(mockMechanics);

  const handleSearch = () => {
    console.log('Searching for:', { searchLocation, selectedService });
  };

  const handleListGarage = () => {
    console.log('List your garage clicked');
  };

  const handleViewProfile = (mechanicId: number) => {
    console.log('View profile for mechanic:', mechanicId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center group">
              <svg width="60" height="60" viewBox="0 0 100 100" className="mr-4 drop-shadow-sm group-hover:scale-105 transition-transform duration-200">
                <path 
                  d="M20 15 L20 35 L15 40 L15 50 L20 55 L20 75 L30 85 L40 75 L40 70 L35 65 L35 45 L40 40 L40 35 L30 25 Z" 
                  fill="#1e40af" 
                />
                <path 
                  d="M80 15 L80 35 L85 40 L85 50 L80 55 L80 75 L70 85 L60 75 L60 70 L65 65 L65 45 L60 40 L60 35 L70 25 Z" 
                  fill="#ea580c" 
                />
                <rect x="42" y="42" width="16" height="16" fill="#1e40af" />
                <rect x="45" y="45" width="10" height="10" fill="#ea580c" />
              </svg>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                MechanicsMatch
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-bounce delay-500"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Find <span className="text-blue-400">Trusted</span> Mechanics
            <br />
            <span className="text-orange-400">Near You</span>
          </h2>
          <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Built for performance shops, tuners and general repair. Connect with verified professionals in your area.
          </p>
          <button
            onClick={handleListGarage}
            className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 font-semibold text-lg border-0 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center justify-center">
              List Your Garage
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-end justify-center">
              <div className="flex-1 max-w-xs">
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Search by city or zip"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-slate-400"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
                <div className="relative">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer pr-10"
                  >
                    <option>All services</option>
                    <option>General Repair</option>
                    <option>Performance Tuning</option>
                    <option>Engine Diagnostics</option>
                    <option>Brake Service</option>
                    <option>Oil Change</option>
                    <option>Transmission</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanics Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Trusted Local Mechanics
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Browse through our carefully vetted network of professional mechanics and automotive specialists.
            </p>
          </div>
          
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {mechanics.slice(0, 3).map((mechanic) => (
              <div key={mechanic.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10"></div>
                  <div className="relative text-slate-400 group-hover:text-slate-500 transition-colors duration-200">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  {mechanic.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">{mechanic.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {mechanic.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {mechanic.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-slate-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
              <div key={mechanic.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10"></div>
                  <div className="relative text-slate-400 group-hover:text-slate-500 transition-colors duration-200">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  {mechanic.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">{mechanic.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {mechanic.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {mechanic.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-slate-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <footer className="bg-slate-900/90 backdrop-blur-sm text-white py-12 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <svg width="40" height="40" viewBox="0 0 100 100" className="mr-3 opacity-80">
                <path 
                  d="M20 15 L20 35 L15 40 L15 50 L20 55 L20 75 L30 85 L40 75 L40 70 L35 65 L35 45 L40 40 L40 35 L30 25 Z" 
                  fill="#3b82f6" 
                />
                <path 
                  d="M80 15 L80 35 L85 40 L85 50 L80 55 L80 75 L70 85 L60 75 L60 70 L65 65 L65 45 L60 40 L60 35 L70 25 Z" 
                  fill="#ea580c" 
                />
                <rect x="42" y="42" width="16" height="16" fill="#3b82f6" />
                <rect x="45" y="45" width="10" height="10" fill="#ea580c" />
              </svg>
              <span className="text-xl font-bold">MechanicsMatch</span>
            </div>
            <p className="text-slate-400">&copy; 2025 MechanicsMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}