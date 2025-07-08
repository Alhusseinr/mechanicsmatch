// src/app/search/page.tsx - Enhanced Debug Version
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Shop } from "@/lib/types";

// Enhanced mock data with more shops for testing
const mockShops: Shop[] = [
  {
    id: "1",
    owner_id: "user1",
    name: "Elite Motor Works",
    description: "Specializing in high-performance vehicles and European imports. ASE certified technicians with over 15 years of experience.",
    address: "1234 Automotive Blvd",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90210",
    phone: "(555) 123-4567",
    email: "info@elitemotorworks.com",
    website_url: "https://elitemotorworks.com",
    specialties: ["Performance Tuning", "Engine Diagnostics", "European Imports", "BMW", "Mercedes"],
    certifications: ["ASE Certified", "BMW Specialist"],
    is_verified: true,
    is_active: true,
    rating_average: 4.9,
    total_reviews: 127,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "2",
    owner_id: "user2",
    name: "AutoCare Plus",
    description: "Your trusted neighborhood auto repair shop. Quality service at affordable prices with honest mechanics.",
    address: "5678 Main Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90217",
    phone: "(555) 987-6543",
    email: "contact@autocareplus.com",
    specialties: ["General Repair", "Oil Change", "Brake Service", "Maintenance"],
    certifications: ["ASE Certified"],
    is_verified: true,
    is_active: true,
    rating_average: 4.7,
    total_reviews: 89,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "3",
    owner_id: "user3",
    name: "TurboTech Specialists",
    description: "Performance tuning and turbo specialists. Custom builds and modifications for racing enthusiasts.",
    address: "9876 Speed Lane",
    city: "Beverly Hills", 
    state: "CA",
    zip_code: "90212",
    phone: "(555) 456-7890",
    email: "info@turbotech.com",
    specialties: ["Performance Tuning", "Turbo Systems", "Custom Builds", "Racing"],
    certifications: ["Performance Tuning Certified"],
    is_verified: true,
    is_active: true,
    rating_average: 4.8,
    total_reviews: 64,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "4",
    owner_id: "user4",
    name: "Quick Lube Express",
    description: "Fast and reliable oil change service. While you wait convenience with certified technicians.",
    address: "321 Fast Lane",
    city: "Santa Monica",
    state: "CA",
    zip_code: "90217",
    phone: "(555) 321-0987",
    email: "service@quicklube.com",
    specialties: ["Oil Change", "Filter Replacement", "Quick Service", "Maintenance"],
    certifications: ["Certified Technicians"],
    is_verified: false,
    is_active: true,
    rating_average: 4.5,
    total_reviews: 156,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "5",
    owner_id: "user5",
    name: "Brake Masters",
    description: "Brake specialists with over 20 years of experience. Safety is our priority with expert technicians.",
    address: "654 Safety Drive",
    city: "Pasadena",
    state: "CA",
    zip_code: "90214",
    phone: "(555) 654-3210",
    email: "info@brakemasters.com",
    specialties: ["Brake Service", "Suspension", "Safety Inspections", "Rotors", "Pads"],
    certifications: ["Brake Specialist Certified", "ASE Certified"],
    is_verified: true,
    is_active: true,
    rating_average: 4.6,
    total_reviews: 203,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "6",
    owner_id: "user6",
    name: "Diagnostic Pro",
    description: "Advanced diagnostic services using the latest technology and equipment for complex automotive issues.",
    address: "987 Tech Boulevard",
    city: "Burbank",
    state: "CA",
    zip_code: "90215",
    phone: "(555) 987-1234",
    email: "contact@diagnosticpro.com",
    specialties: ["Engine Diagnostics", "Electrical", "Computer Systems", "Scan Tools"],
    certifications: ["Diagnostic Specialist", "ASE Master Technician"],
    is_verified: true,
    is_active: true,
    rating_average: 4.8,
    total_reviews: 91,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "7",
    owner_id: "user7",
    name: "All-Star Auto Repair",
    description: "Complete automotive services from routine maintenance to major repairs. Family owned since 1985.",
    address: "111 Repair Road",
    city: "Glendale",
    state: "CA",
    zip_code: "90216",
    phone: "(555) 111-2222",
    email: "info@allstarauto.com",
    specialties: ["General Repair", "Transmission", "Engine Repair", "A/C Service"],
    certifications: ["ASE Certified", "Family Business"],
    is_verified: true,
    is_active: true,
    rating_average: 4.4,
    total_reviews: 245,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: "8",
    owner_id: "user8",
    name: "Express Oil & Lube",
    description: "Quick oil changes and basic maintenance. Get in and out fast with quality service.",
    address: "222 Speed Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90217",
    phone: "(555) 222-3333",
    email: "service@expressoil.com",
    specialties: ["Oil Change", "Quick Service", "Filter Change", "Fluid Top-off"],
    certifications: ["Quick Service Certified"],
    is_verified: false,
    is_active: true,
    rating_average: 4.2,
    total_reviews: 189,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  }
];

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [filters, setFilters] = useState({
    location: "",
    service: "",
    sortBy: "rating",
  });

  useEffect(() => {
    const location = searchParams.get("location") || "";
    const service = searchParams.get("service") || "";
    
    console.log("🔍 Search Parameters:", { location, service });
    
    setFilters({
      location,
      service,
      sortBy: "rating",
    });

    // Enhanced filtering logic with debug info
    setTimeout(() => {
      let filteredShops = [...mockShops];
      let debugSteps: any[] = [];

      debugSteps.push({
        step: "Initial",
        count: filteredShops.length,
        shops: filteredShops.map(s => s.name)
      });

      // Location filtering with more flexible matching
      if (location) {
        const locationLower = location.toLowerCase();
        filteredShops = filteredShops.filter((shop) => {
          const cityMatch = shop.city.toLowerCase().includes(locationLower);
          const stateMatch = shop.state.toLowerCase().includes(locationLower);
          const zipMatch = shop.zip_code.includes(location);
          const addressMatch = shop.address.toLowerCase().includes(locationLower);
          
          return cityMatch || stateMatch || zipMatch || addressMatch;
        });
        
        debugSteps.push({
          step: "After Location Filter",
          location: location,
          count: filteredShops.length,
          shops: filteredShops.map(s => `${s.name} (${s.city}, ${s.state})`)
        });
      }

      // Service filtering with more flexible matching
      if (service && service !== "all") {
        const serviceLower = service.toLowerCase();
        filteredShops = filteredShops.filter((shop) => {
          const specialtyMatch = shop.specialties?.some((specialty) =>
            specialty.toLowerCase().includes(serviceLower) ||
            serviceLower.includes(specialty.toLowerCase())
          );
          
          // Additional service mapping for better matching
          const serviceMap: Record<string, string[]> = {
            'oil': ['oil change', 'quick service', 'maintenance'],
            'brake': ['brake service', 'brakes', 'safety'],
            'performance': ['performance tuning', 'turbo', 'racing', 'custom'],
            'diagnostics': ['diagnostic', 'engine diagnostic', 'computer', 'electrical'],
            'general': ['general repair', 'maintenance', 'automotive']
          };
          
          const mappedServices = serviceMap[serviceLower] || [serviceLower];
          const mappedMatch = mappedServices.some(mapped => 
            shop.specialties?.some(specialty => 
              specialty.toLowerCase().includes(mapped) ||
              mapped.includes(specialty.toLowerCase())
            )
          );
          
          return specialtyMatch || mappedMatch;
        });
        
        debugSteps.push({
          step: "After Service Filter",
          service: service,
          count: filteredShops.length,
          shops: filteredShops.map(s => `${s.name} - ${s.specialties?.join(', ')}`)
        });
      }

      // Sort by rating (default)
      filteredShops.sort((a, b) => b.rating_average - a.rating_average);
      
      debugSteps.push({
        step: "Final Sorted",
        count: filteredShops.length,
        shops: filteredShops.map(s => `${s.name} (${s.rating_average}⭐)`)
      });

      console.log("🔍 Debug Steps:", debugSteps);
      
      setDebugInfo({
        originalCount: mockShops.length,
        filteredCount: filteredShops.length,
        filters: { location, service },
        steps: debugSteps
      });

      setShops(filteredShops);
      setLoading(false);
    }, 800); // Reduced delay for better UX
  }, [searchParams]);

  const handleShopClick = (shopId: string) => {
    router.push(`/shop/profile?id=${shopId}`);
  };

  const handleBookService = (shopId: string) => {
    router.push(`/booking?shop=${shopId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 font-semibold leading-6 text-sm shadow-lg rounded-xl text-white bg-blue-500">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching for mechanics...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.back()}
                className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Search Results</h1>
                <p className="text-slate-600">
                  {filters.location && `in ${filters.location}`}
                  {filters.service && ` for ${filters.service}`}
                </p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              {shops.length} of {debugInfo.originalCount} shops found
            </div>
          </div>
        </div>
      </header>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <details className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <summary className="cursor-pointer font-semibold text-yellow-800">
              🐛 Debug Info (click to expand)
            </summary>
            <pre className="mt-2 text-xs text-yellow-700 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {shops.length === 0 ? (
          /* No Results */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No shops found</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              We couldn't find any mechanics matching your search criteria. Try expanding your search area or adjusting your filters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Start New Search
              </button>
              <button
                onClick={() => {
                  const newParams = new URLSearchParams();
                  if (filters.location) newParams.set("location", filters.location);
                  router.push(`/search?${newParams.toString()}`);
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Remove Service Filter
              </button>
            </div>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleShopClick(shop.id)}
              >
                {/* Shop Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10"></div>
                  <div className="relative text-slate-400 group-hover:text-slate-500 transition-colors duration-200">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12" />
                    </svg>
                  </div>
                  {shop.is_verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Shop Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {shop.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <div className="flex mr-1">
                        {renderStars(Math.floor(shop.rating_average))}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {shop.rating_average}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {shop.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {shop.specialties?.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        {specialty}
                      </span>
                    ))}
                    {shop.specialties && shop.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                        +{shop.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Location and Contact */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {shop.city}, {shop.state} {shop.zip_code}
                    </div>
                    {shop.phone && (
                      <div className="flex items-center text-slate-500 text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {shop.phone}
                      </div>
                    )}
                    <div className="flex items-center text-slate-500 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {shop.total_reviews} reviews
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShopClick(shop.id);
                      }}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookService(shop.id);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show all available shops for testing */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              🧪 All Available Shops (Development)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockShops.map((shop) => (
                <div key={shop.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="font-semibold">{shop.name}</div>
                  <div className="text-gray-600">{shop.city}, {shop.state}</div>
                  <div className="text-gray-500 text-xs">{shop.specialties?.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 font-semibold leading-6 text-sm shadow-lg rounded-xl text-white bg-blue-500">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}