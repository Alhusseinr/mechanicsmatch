'use client';

import { useState } from 'react';

// Type definitions
interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  vehicleInfo: string;
  problemDescription: string;
  estimatedCost?: number;
}

interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  vehicleInfo: string;
  problemDescription: string;
  status: 'pending' | 'sent' | 'accepted' | 'declined';
  quotedAmount?: number;
  createdAt: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedToday: number;
  totalRevenue: number;
  avgRating: number;
  totalReviews: number;
}

// Mock data
const mockStats: DashboardStats = {
  totalBookings: 47,
  pendingBookings: 8,
  completedToday: 3,
  totalRevenue: 15420,
  avgRating: 4.8,
  totalReviews: 127
};

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    customerPhone: '(555) 123-4567',
    customerEmail: 'sarah.j@email.com',
    serviceName: 'Performance Tune',
    appointmentDate: '2025-06-22',
    appointmentTime: '09:00',
    status: 'confirmed',
    vehicleInfo: '2020 BMW M3',
    problemDescription: 'Need ECU tuning for track performance',
    estimatedCost: 650
  },
  {
    id: '2',
    customerName: 'Mike Wilson',
    customerPhone: '(555) 987-6543',
    customerEmail: 'mike.w@email.com',
    serviceName: 'Engine Diagnostics',
    appointmentDate: '2025-06-22',
    appointmentTime: '11:00',
    status: 'pending',
    vehicleInfo: '2018 Audi A4',
    problemDescription: 'Check engine light, rough idle',
    estimatedCost: 180
  },
  {
    id: '3',
    customerName: 'Lisa Chen',
    customerPhone: '(555) 456-7890',
    customerEmail: 'lisa.c@email.com',
    serviceName: 'Oil Change Premium',
    appointmentDate: '2025-06-22',
    appointmentTime: '14:00',
    status: 'confirmed',
    vehicleInfo: '2021 Porsche 911',
    problemDescription: 'Regular maintenance - synthetic oil change'
  },
  {
    id: '4',
    customerName: 'David Brown',
    customerPhone: '(555) 321-0987',
    customerEmail: 'david.b@email.com',
    serviceName: 'Brake Service',
    appointmentDate: '2025-06-23',
    appointmentTime: '10:00',
    status: 'pending',
    vehicleInfo: '2019 Tesla Model S',
    problemDescription: 'Brake pads replacement needed',
    estimatedCost: 420
  },
  {
    id: '5',
    customerName: 'Anna Martinez',
    customerPhone: '(555) 654-3210',
    customerEmail: 'anna.m@email.com',
    serviceName: 'Transmission Service',
    appointmentDate: '2025-06-23',
    appointmentTime: '13:00',
    status: 'in_progress',
    vehicleInfo: '2017 Honda Civic',
    problemDescription: 'Transmission slipping, needs inspection',
    estimatedCost: 850
  }
];

const mockQuotes: Quote[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.s@email.com',
    vehicleInfo: '2019 Ford Mustang GT',
    problemDescription: 'Supercharger installation and tuning package for track days',
    status: 'pending',
    createdAt: '2025-06-21'
  },
  {
    id: '2',
    customerName: 'Emma Davis',
    customerEmail: 'emma.d@email.com',
    vehicleInfo: '2017 Subaru WRX',
    problemDescription: 'Turbo replacement and performance upgrade with supporting mods',
    status: 'sent',
    quotedAmount: 3200,
    createdAt: '2025-06-20'
  },
  {
    id: '3',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.t@email.com',
    vehicleInfo: '2020 Volkswagen Golf R',
    problemDescription: 'Stage 2 tune with downpipe and intake modifications',
    status: 'accepted',
    quotedAmount: 1850,
    createdAt: '2025-06-19'
  },
  {
    id: '4',
    customerName: 'Michael Green',
    customerEmail: 'michael.g@email.com',
    vehicleInfo: '2021 Toyota Supra',
    problemDescription: 'Full exhaust system and ECU tune for maximum performance',
    status: 'declined',
    quotedAmount: 2400,
    createdAt: '2025-06-18'
  }
];

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Outstanding work on my BMW M3! The performance tune transformed my car. Professional service and fair pricing.',
    date: '2025-06-20',
    serviceName: 'Performance Tune'
  },
  {
    id: '2',
    customerName: 'Mark Thompson',
    rating: 5,
    comment: 'Best mechanic in LA! Fixed my Audi\'s complex engine issue that three other shops couldn\'t diagnose.',
    date: '2025-06-18',
    serviceName: 'Engine Diagnostics'
  },
  {
    id: '3',
    customerName: 'Lisa Chen',
    rating: 4,
    comment: 'Great service and communication. The oil change was done quickly and professionally.',
    date: '2025-06-15',
    serviceName: 'Oil Change Premium'
  },
  {
    id: '4',
    customerName: 'David Brown',
    rating: 5,
    comment: 'Excellent brake service! The team was professional and completed the work ahead of schedule.',
    date: '2025-06-12',
    serviceName: 'Brake Service'
  },
  {
    id: '5',
    customerName: 'Anna Martinez',
    rating: 4,
    comment: 'Good work on the transmission service. Clear communication throughout the process.',
    date: '2025-06-10',
    serviceName: 'Transmission Service'
  }
];

// Main component
export default function MechanicDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'quotes' | 'reviews' | 'analytics'>('overview');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState(mockBookings);

  // Helper functions
  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Mechanic Dashboard</h1>
              <p className="text-slate-600">Elite Motor Works</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 21h11a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                E
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/70 backdrop-blur-sm p-1 rounded-2xl mb-8 shadow-lg">
          {[
            { id: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'quotes', label: 'Quotes', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { id: 'reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
            { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Total Bookings</p>
                    <p className="text-3xl font-bold text-slate-900">{mockStats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Pending Bookings</p>
                    <p className="text-3xl font-bold text-orange-600">{mockStats.pendingBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Completed Today</p>
                    <p className="text-3xl font-bold text-green-600">{mockStats.completedToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold text-slate-900">${mockStats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Average Rating</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-slate-900">{mockStats.avgRating}</p>
                      <div className="flex">{renderStars(Math.floor(mockStats.avgRating))}</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Total Reviews</p>
                    <p className="text-3xl font-bold text-slate-900">{mockStats.totalReviews}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Today's Schedule</h3>
              <div className="space-y-4">
                {bookings.filter(booking => booking.appointmentDate === '2025-06-22').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold text-slate-900">{booking.appointmentTime}</div>
                      <div>
                        <div className="font-semibold text-slate-900">{booking.customerName}</div>
                        <div className="text-sm text-slate-600">{booking.serviceName} - {booking.vehicleInfo}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Reviews</h3>
              <div className="space-y-4">
                {mockReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-slate-900">{review.customerName}</div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-slate-600">{review.date}</span>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">{review.serviceName}</span>
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Manage Bookings</h2>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{booking.customerName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Service:</span>
                          <span className="ml-2 font-medium">{booking.serviceName}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Vehicle:</span>
                          <span className="ml-2 font-medium">{booking.vehicleInfo}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Date & Time:</span>
                          <span className="ml-2 font-medium">{booking.appointmentDate} at {booking.appointmentTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Phone:</span>
                          <span className="ml-2 font-medium">{booking.customerPhone}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-slate-600">Issue:</span>
                        <p className="mt-1 text-slate-700">{booking.problemDescription}</p>
                      </div>
                    </div>
                    {booking.estimatedCost && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">${booking.estimatedCost}</div>
                        <div className="text-sm text-slate-600">Estimated</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                        Contact Customer
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'in_progress')}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                          Start Work
                        </button>
                      )}
                      {booking.status === 'in_progress' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Quote Requests</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300">
                Create Quote
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockQuotes.map((quote) => (
                <div key={quote.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{quote.customerName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(quote.status)}`}>
                          {quote.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-slate-600">Vehicle:</span>
                          <span className="ml-2 font-medium">{quote.vehicleInfo}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Email:</span>
                          <span className="ml-2 font-medium">{quote.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Requested:</span>
                          <span className="ml-2 font-medium">{quote.createdAt}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-slate-600">Description:</span>
                        <p className="mt-1 text-slate-700">{quote.problemDescription}</p>
                      </div>
                    </div>
                    {quote.quotedAmount && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${quote.quotedAmount}</div>
                        <div className="text-sm text-slate-600">Quoted</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                        View Details
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {quote.status === 'pending' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                          Send Quote
                        </button>
                      )}
                      {quote.status === 'accepted' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Create Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(Math.floor(mockStats.avgRating))}</div>
                  <span className="text-xl font-bold">{mockStats.avgRating}</span>
                  <span className="text-slate-600">({mockStats.totalReviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {review.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{review.customerName}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-slate-500 text-sm">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {review.serviceName}
                    </span>
                  </div>
                  <p className="text-slate-700 mb-4">{review.comment}</p>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                      Reply
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Analytics & Reports</h2>
            
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Trends</h3>
                <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>Revenue Chart</p>
                    <p className="text-sm">Connect charts library</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Service Popularity</h3>
                <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <p>Service Distribution</p>
                    <p className="text-sm">Pie chart placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                  <div className="text-slate-600 font-medium">Bookings</div>
                  <div className="text-sm text-green-600 mt-1">+12% from last month</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">${mockStats.totalRevenue.toLocaleString()}</div>
                  <div className="text-slate-600 font-medium">Revenue</div>
                  <div className="text-sm text-green-600 mt-1">+8% from last month</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{mockStats.avgRating}</div>
                  <div className="text-slate-600 font-medium">Avg Rating</div>
                  <div className="text-sm text-green-600 mt-1">+0.2 from last month</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                  <div className="text-slate-600 font-medium">Customer Satisfaction</div>
                  <div className="text-sm text-green-600 mt-1">+3% from last month</div>
                </div>
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Top Services This Month</h3>
              <div className="space-y-4">
                {[
                  { name: 'Performance Tune', bookings: 15, revenue: 9750 },
                  { name: 'Engine Diagnostics', bookings: 12, revenue: 2160 },
                  { name: 'Oil Change Premium', bookings: 8, revenue: 720 },
                  { name: 'Brake Service', bookings: 6, revenue: 2520 },
                  { name: 'Turbo Installation', bookings: 3, revenue: 9600 }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{service.name}</div>
                        <div className="text-sm text-slate-600">{service.bookings} bookings</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${service.revenue.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Export Reports</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Export Monthly Report
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Export Customer Data
                </button>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                  Export Financial Summary
                </button>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                  Export Service Analytics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-600">Name:</span> <span className="font-medium">{selectedBooking.customerName}</span></div>
                    <div><span className="text-slate-600">Phone:</span> <span className="font-medium">{selectedBooking.customerPhone}</span></div>
                    <div><span className="text-slate-600">Email:</span> <span className="font-medium">{selectedBooking.customerEmail}</span></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Appointment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-600">Service:</span> <span className="font-medium">{selectedBooking.serviceName}</span></div>
                    <div><span className="text-slate-600">Date:</span> <span className="font-medium">{selectedBooking.appointmentDate}</span></div>
                    <div><span className="text-slate-600">Time:</span> <span className="font-medium">{selectedBooking.appointmentTime}</span></div>
                    <div><span className="text-slate-600">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Vehicle Information</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-lg font-medium">{selectedBooking.vehicleInfo}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Problem Description</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">{selectedBooking.problemDescription}</p>
                </div>
              </div>
              
              {selectedBooking.estimatedCost && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Estimated Cost</h4>
                  <div className="text-2xl font-bold text-orange-600">${selectedBooking.estimatedCost}</div>
                </div>
              )}
              
              <div className="flex space-x-4 pt-4 border-t border-slate-200">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Update Status
                </button>
                <button className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                  Send Message
                </button>
                <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}