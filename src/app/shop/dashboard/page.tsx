'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layouts/Dashboard';

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

// Mock data
const mockStats = {
  totalBookings: 47,
  pendingBookings: 8,
  completedToday: 3,
  totalRevenue: 15420,
  avgRating: 4.8,
  totalReviews: 127,
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
    estimatedCost: 650,
  },
  {
    id: '2',
    customerName: 'Mike Rodriguez',
    customerPhone: '(555) 987-6543',
    customerEmail: 'mike.r@email.com',
    serviceName: 'Oil Change Premium',
    appointmentDate: '2025-06-22',
    appointmentTime: '11:00',
    status: 'pending',
    vehicleInfo: '2019 Audi A4',
    problemDescription: 'Regular maintenance oil change',
    estimatedCost: 95,
  },
  {
    id: '3',
    customerName: 'Emily Chen',
    customerPhone: '(555) 456-7890',
    customerEmail: 'emily.c@email.com',
    serviceName: 'Brake Service',
    appointmentDate: '2025-06-21',
    appointmentTime: '14:00',
    status: 'completed',
    vehicleInfo: '2021 Tesla Model 3',
    problemDescription: 'Brake pads replacement needed',
    estimatedCost: 320,
  }
];

const recentReviews = [
  {
    id: '1',
    customerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! My car runs like new after the tune.',
    date: '2025-06-20',
    service: 'Performance Tune'
  },
  {
    id: '2',
    customerName: 'Lisa Davis',
    rating: 5,
    comment: 'Professional and quick. Highly recommend!',
    date: '2025-06-19',
    service: 'Oil Change'
  }
];

// Main Dashboard Component
function MechanicDashboardContent() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState(mockBookings);

  const { user } = useAuth();

  // Helper functions
  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const todaysBookings = bookings.filter(
    (booking) => booking.appointmentDate === '2025-06-22'
  );
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending');

  return (
    <DashboardLayout 
      title="Mechanic Dashboard" 
      subtitle="Elite Motor Works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <div className="mt-2 text-sm text-green-600">+12% from last month</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending Bookings</p>
                <p className="text-3xl font-bold text-slate-900">{mockStats.pendingBookings}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-slate-600">Needs attention</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-slate-900">${mockStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-600">+8% from last month</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-slate-900">{mockStats.avgRating}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-sm text-slate-600">From {mockStats.totalReviews} reviews</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Add Service</h3>
                <p className="text-blue-100 text-sm">Create a new service offering</p>
              </div>
            </div>
          </button>

          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">View Calendar</h3>
                <p className="text-green-100 text-sm">Manage appointments</p>
              </div>
            </div>
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">View Reports</h3>
                <p className="text-purple-100 text-sm">Analytics & insights</p>
              </div>
            </div>
          </button>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Today's Schedule</h3>
            <span className="text-sm text-slate-600">{todaysBookings.length} appointments</span>
          </div>
          
          {todaysBookings.length > 0 ? (
            <div className="space-y-4">
              {todaysBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {booking.appointmentTime}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{booking.customerName}</div>
                      <div className="text-sm text-slate-600">
                        {booking.serviceName} • {booking.vehicleInfo}
                      </div>
                      <div className="text-xs text-slate-500">{booking.problemDescription}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">${booking.estimatedCost}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No appointments scheduled for today</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Bookings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Pending Bookings</h3>
              <span className="text-sm text-slate-600">{pendingBookings.length} pending</span>
            </div>
            
            {pendingBookings.length > 0 ? (
              <div className="space-y-4">
                {pendingBookings.map((booking) => (
                  <div key={booking.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-slate-900">{booking.customerName}</div>
                        <div className="text-sm text-slate-600">{booking.serviceName}</div>
                        <div className="text-xs text-slate-500">{booking.appointmentDate} at {booking.appointmentTime}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">${booking.estimatedCost}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No pending bookings</p>
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Recent Reviews</h3>
              <span className="text-sm text-slate-600">Latest feedback</span>
            </div>
            
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-slate-900">{review.customerName}</div>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">"{review.comment}"</div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{review.service}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 text-blue-600 hover:text-blue-800 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
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
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Customer:</span>
                    <span className="ml-2 font-medium">{selectedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Phone:</span>
                    <span className="ml-2 font-medium">{selectedBooking.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Service:</span>
                    <span className="ml-2 font-medium">{selectedBooking.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Vehicle:</span>
                    <span className="ml-2 font-medium">{selectedBooking.vehicleInfo}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Date & Time:</span>
                    <span className="ml-2 font-medium">{selectedBooking.appointmentDate} at {selectedBooking.appointmentTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Estimated Cost:</span>
                    <span className="ml-2 font-medium">${selectedBooking.estimatedCost}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-slate-600">Problem Description:</span>
                  <p className="mt-1 text-slate-900">{selectedBooking.problemDescription}</p>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed');
                      setSelectedBooking(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Accept Booking
                  </button>
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'cancelled');
                      setSelectedBooking(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Decline Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// Main exported component with protection
export default function MechanicDashboard() {
  return (
    <ProtectedRoute requiredUserType="mechanic">
      <MechanicDashboardContent />
    </ProtectedRoute>
  );
}