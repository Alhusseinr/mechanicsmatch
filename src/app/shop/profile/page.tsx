'use client';

import { useState } from 'react';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  priceRange: string;
  duration: string;
}

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  certifications: string[];
  operatingHours: Record<string, { open: string; close: string }>;
  photos: string[];
  verified: boolean;
}

// Mock data
const mockShop: Shop = {
  id: '1',
  name: 'Elite Motor Works',
  description: 'Specializing in high-performance vehicles and European imports. With over 15 years of experience, we provide expert diagnostics, engine rebuilds, and performance tuning. Our ASE-certified technicians use the latest equipment to ensure your vehicle runs at its peak performance.',
  address: '1234 Automotive Blvd',
  city: 'Los Angeles',
  state: 'CA',
  phone: '(555) 123-4567',
  email: 'info@elitemotorworks.com',
  website: 'https://elitemotorworks.com',
  rating: 4.9,
  totalReviews: 127,
  specialties: ['Performance Tuning', 'Engine Diagnostics', 'European Imports', 'Turbo Systems'],
  certifications: ['ASE Certified', 'BMW Specialist', 'Audi Certified', 'Porsche Trained'],
  operatingHours: {
    monday: { open: '08:00', close: '17:00' },
    tuesday: { open: '08:00', close: '17:00' },
    wednesday: { open: '08:00', close: '17:00' },
    thursday: { open: '08:00', close: '17:00' },
    friday: { open: '08:00', close: '17:00' },
    saturday: { open: '09:00', close: '15:00' },
    sunday: { open: 'Closed', close: 'Closed' }
  },
  photos: [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ],
  verified: true
};

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Performance Tune',
    description: 'Complete ECU tuning for maximum performance gains',
    category: 'Performance',
    priceRange: '$400 - $800',
    duration: '2-4 hours'
  },
  {
    id: '2',
    name: 'Engine Diagnostics',
    description: 'Comprehensive computer diagnostics and troubleshooting',
    category: 'Diagnostics',
    priceRange: '$150 - $250',
    duration: '1-2 hours'
  },
  {
    id: '3',
    name: 'Turbo Installation',
    description: 'Professional turbocharger installation and tuning',
    category: 'Performance',
    priceRange: '$2,500 - $5,000',
    duration: '1-2 days'
  },
  {
    id: '4',
    name: 'Oil Change Premium',
    description: 'High-performance synthetic oil change with filter',
    category: 'Maintenance',
    priceRange: '$80 - $120',
    duration: '30-45 minutes'
  }
];

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Outstanding work on my BMW M3! The performance tune transformed my car. Professional service and fair pricing.',
    date: '2025-01-15',
    photos: ['/api/placeholder/200/150']
  },
  {
    id: '2',
    customerName: 'Mark Thompson',
    rating: 5,
    comment: 'Best mechanic in LA! Fixed my Audi\'s complex engine issue that three other shops couldn\'t diagnose.',
    date: '2025-01-10'
  },
  {
    id: '3',
    customerName: 'Lisa Chen',
    rating: 4,
    comment: 'Great service and communication. The turbo install was done perfectly and on time.',
    date: '2025-01-05'
  }
];

export default function MechanicProfile() {
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'photos' | 'about'>('services');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleBookService = (serviceId: string) => {
    console.log('Booking service:', serviceId);
    // Navigation to booking page would go here
  };

  const handleGetQuote = () => {
    console.log('Requesting quote');
    // Navigation to quote request would go here
  };

  const formatHours = (hours: { open: string; close: string }) => {
    if (hours.open === 'Closed') return 'Closed';
    return `${hours.open} - ${hours.close}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-slate-800">Mechanic Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Shop Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-bold">{mockShop.name}</h1>
                    {mockShop.verified && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {renderStars(Math.floor(mockShop.rating))}
                      <span className="ml-2 text-xl font-semibold">{mockShop.rating}</span>
                      <span className="ml-2 text-slate-300">({mockShop.totalReviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-slate-300">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {mockShop.address}, {mockShop.city}, {mockShop.state}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {mockShop.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <button
                  onClick={handleGetQuote}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Quote
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl backdrop-blur-sm transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl backdrop-blur-sm transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-8 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {mockShop.specialties.map((specialty, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl mb-8">
                {[
                  { id: 'services', label: 'Services', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                  { id: 'reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                  { id: 'photos', label: 'Photos', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { id: 'about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockServices.map((service) => (
                      <div key={service.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h4>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {service.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-600">{service.priceRange}</div>
                            <div className="text-sm text-slate-500">{service.duration}</div>
                          </div>
                        </div>
                        <p className="text-slate-600 mb-4">{service.description}</p>
                        <button
                          onClick={() => handleBookService(service.id)}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                          Book Service
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">Customer Reviews</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {renderStars(Math.floor(mockShop.rating))}
                        <span className="ml-2 text-2xl font-bold text-slate-900">{mockShop.rating}</span>
                      </div>
                      <div className="text-slate-600">
                        Based on {mockShop.totalReviews} reviews
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {review.customerName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{review.customerName}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="text-slate-500 text-sm">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-700 mb-4">{review.comment}</p>
                        {review.photos && review.photos.length > 0 && (
                          <div className="flex space-x-3">
                            {review.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo}
                                alt="Review photo"
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setSelectedPhoto(photo)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">Shop Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockShop.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-slate-200 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <img
                          src={photo}
                          alt={`Shop photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">About {mockShop.name}</h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{mockShop.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Certifications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockShop.certifications.map((cert, index) => (
                        <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-green-800">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h4>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 space-y-4">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-slate-700">{mockShop.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-700">{mockShop.email}</span>
                      </div>
                      {mockShop.website && (
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <a href={mockShop.website} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                            {mockShop.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-slate-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-slate-700">{mockShop.address}, {mockShop.city}, {mockShop.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Operating Hours */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Operating Hours</h4>
                  <div className="space-y-2">
                    {Object.entries(mockShop.operatingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-slate-600 capitalize">{day}</span>
                        <span className="text-slate-900 font-medium">{formatHours(hours)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Book Now</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Ask Question</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l6-6 6 6v13a2 2 0 01-2 2H11a2 2 0 01-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6M15 9l-6 6" />
                      </svg>
                      <span>Save Shop</span>
                    </button>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Location</h4>
                  <div className="w-full h-48 bg-slate-200 rounded-xl flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <p>Interactive Map</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img src={selectedPhoto} alt="Enlarged photo" className="max-w-full max-h-full object-contain rounded-lg" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}