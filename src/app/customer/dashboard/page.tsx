'use client';

import { useState } from 'react';

// Type definitions
interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  vin?: string;
  licensePlate?: string;
  color?: string;
  mileage?: number;
  lastService?: string;
  photo?: string;
}

interface Booking {
  id: string;
  shopName: string;
  shopId: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  vehicleInfo: string;
  cost?: number;
  rating?: number;
  reviewLeft?: boolean;
}

interface SavedShop {
  id: string;
  name: string;
  rating: number;
  location: string;
  specialties: string[];
  lastVisited?: string;
  totalVisits: number;
}

interface Quote {
  id: string;
  shopName: string;
  shopId: string;
  vehicleInfo: string;
  service: string;
  status: 'pending' | 'received' | 'accepted' | 'expired';
  quotedAmount?: number;
  validUntil?: string;
  createdAt: string;
}

interface Notification {
  id: string;
  type: 'booking' | 'quote' | 'reminder' | 'promotion';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    vin: 'JT2BG12K1Y0123456',
    licensePlate: 'ABC 1234',
    color: 'Silver',
    mileage: 45000,
    lastService: '2025-05-15'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: '2019',
    licensePlate: 'XYZ 5678',
    color: 'Blue',
    mileage: 52000,
    lastService: '2025-04-20'
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    shopName: 'Elite Motor Works',
    shopId: '1',
    serviceName: 'Oil Change Premium',
    appointmentDate: '2025-06-25',
    appointmentTime: '10:00',
    status: 'upcoming',
    vehicleInfo: '2020 Toyota Camry',
    cost: 95
  },
  {
    id: '2',
    shopName: 'Precision Auto Care',
    shopId: '3',
    serviceName: 'Brake Service',
    appointmentDate: '2025-06-10',
    appointmentTime: '14:00',
    status: 'completed',
    vehicleInfo: '2019 Honda Civic',
    cost: 320,
    rating: 5,
    reviewLeft: true
  },
  {
    id: '3',
    shopName: 'Elite Motor Works',
    shopId: '1',
    serviceName: 'Engine Diagnostics',
    appointmentDate: '2025-05-15',
    appointmentTime: '09:00',
    status: 'completed',
    vehicleInfo: '2020 Toyota Camry',
    cost: 180,
    rating: 5,
    reviewLeft: false
  }
];

const mockSavedShops: SavedShop[] = [
  {
    id: '1',
    name: 'Elite Motor Works',
    rating: 4.9,
    location: 'Downtown Los Angeles',
    specialties: ['Performance Tuning', 'Engine Diagnostics'],
    lastVisited: '2025-05-15',
    totalVisits: 3
  },
  {
    id: '2',
    name: 'Precision Auto Care',
    rating: 4.7,
    location: 'Westside',
    specialties: ['General Repair', 'Maintenance'],
    lastVisited: '2025-06-10',
    totalVisits: 1
  }
];

const mockQuotes: Quote[] = [
  {
    id: '1',
    shopName: 'Turbo Tech Mechanics',
    shopId: '5',
    vehicleInfo: '2020 Toyota Camry',
    service: 'Transmission Service',
    status: 'received',
    quotedAmount: 850,
    validUntil: '2025-06-30',
    createdAt: '2025-06-20'
  },
  {
    id: '2',
    shopName: 'Metro Garage Solutions',
    shopId: '4',
    vehicleInfo: '2019 Honda Civic',
    service: 'AC Repair',
    status: 'pending',
    createdAt: '2025-06-21'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Appointment Reminder',
    message: 'Your oil change appointment at Elite Motor Works is tomorrow at 10:00 AM',
    date: '2025-06-24',
    read: false
  },
  {
    id: '2',
    type: 'quote',
    title: 'New Quote Received',
    message: 'Turbo Tech Mechanics sent you a quote for Transmission Service',
    date: '2025-06-20',
    read: true
  }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'bookings' | 'saved' | 'quotes'>('overview');
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const completedBookings = mockBookings.filter(b => b.status === 'completed');
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleAddVehicle = (vehicleData: Partial<Vehicle>) => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      year: vehicleData.year || '',
      ...vehicleData
    };
    setVehicles([...vehicles, newVehicle]);
    setShowAddVehicle(false);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles(vehicles.filter(v => v.id !== vehicleId));
  };

  const handleMarkNotificationRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
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
              <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>
              <p className="text-slate-600">Welcome back, John!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Mechanic</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/70 backdrop-blur-sm p-1 rounded-2xl mb-8 shadow-lg overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'vehicles', label: 'My Vehicles', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'saved', label: 'Saved Shops', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
            { id: 'quotes', label: 'Quotes', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Active Vehicles</p>
                    <p className="text-3xl font-bold text-slate-900">{vehicles.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Total Bookings</p>
                    <p className="text-3xl font-bold text-slate-900">{mockBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Saved Shops</p>
                    <p className="text-3xl font-bold text-slate-900">{mockSavedShops.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Active Quotes</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {mockQuotes.filter(q => q.status === 'received' || q.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            {upcomingBookings.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Upcoming Appointments</h3>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {new Date(booking.appointmentDate).getDate()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{booking.serviceName}</div>
                          <div className="text-sm text-slate-600">
                            {booking.shopName} • {booking.appointmentTime} • {booking.vehicleInfo}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {completedBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-slate-900">{booking.serviceName}</div>
                      <div className="text-sm text-slate-600">
                        {booking.shopName} • {booking.appointmentDate} • ${booking.cost}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {booking.rating && (
                        <div className="flex">{renderStars(booking.rating)}</div>
                      )}
                      {!booking.reviewLeft && booking.rating && (
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Notifications</h3>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Mark all as read
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      notification.read
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                    onClick={() => handleMarkNotificationRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.read ? 'bg-transparent' : 'bg-blue-600'
                        }`} />
                        <div>
                          <div className="font-semibold text-slate-900">{notification.title}</div>
                          <div className="text-sm text-slate-600 mt-1">{notification.message}</div>
                          <div className="text-xs text-slate-500 mt-2">{notification.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">My Vehicles</h2>
              <button
                onClick={() => setShowAddVehicle(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="space-y-2 text-sm">
                      {vehicle.licensePlate && (
                        <div className="flex items-center text-slate-600">
                          <span className="font-medium mr-2">License:</span> {vehicle.licensePlate}
                        </div>
                      )}
                      {vehicle.mileage && (
                        <div className="flex items-center text-slate-600">
                          <span className="font-medium mr-2">Mileage:</span> {vehicle.mileage.toLocaleString()} mi
                        </div>
                      )}
                      {vehicle.lastService && (
                        <div className="flex items-center text-slate-600">
                          <span className="font-medium mr-2">Last Service:</span> {vehicle.lastService}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        View Details
                      </button>
                      <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium">
                        Book Service
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
              <select className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400">
                <option>All Bookings</option>
                <option>Upcoming</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{booking.serviceName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Shop:</span>
                          <span className="ml-2 font-medium">{booking.shopName}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Vehicle:</span>
                          <span className="ml-2 font-medium">{booking.vehicleInfo}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Date:</span>
                          <span className="ml-2 font-medium">{booking.appointmentDate} at {booking.appointmentTime}</span>
                        </div>
                        {booking.cost && (
                          <div>
                            <span className="text-slate-600">Cost:</span>
                            <span className="ml-2 font-medium">${booking.cost}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    {booking.status === 'completed' && (
                      <div className="flex items-center space-x-4">
                        {booking.rating ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(booking.rating)}</div>
                            {!booking.reviewLeft && (
                              <button className="text-blue-600 hover:text-blue-800 font-medium">
                                Write Review
                              </button>
                            )}
                          </div>
                        ) : (
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                            Rate & Review
                          </button>
                        )}
                      </div>
                    )}
                    <div className="flex items-center space-x-2 ml-auto">
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                        View Details
                      </button>
                      {booking.status === 'upcoming' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Manage Booking
                        </button>
                      )}
                      {booking.status === 'completed' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Saved Shops</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Browse More Shops
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSavedShops.map((shop) => (
                <div key={shop.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                    <svg className="w-24 h-24 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12" />
                    </svg>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{shop.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex">{renderStars(Math.floor(shop.rating))}</div>
                      <span className="text-slate-600">{shop.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {shop.location}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {shop.specialties.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-slate-600 mb-4">
                      <div>Last visited: {shop.lastVisited}</div>
                      <div>Total visits: {shop.totalVisits}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Book Service
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                        View Profile
                      </button>
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
              <h2 className="text-2xl font-bold text-slate-900">Service Quotes</h2>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Request Quote</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockQuotes.map((quote) => (
                <div key={quote.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{quote.service}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(quote.status)}`}>
                          {quote.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-slate-600">Shop:</span>
                          <span className="ml-2 font-medium">{quote.shopName}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Vehicle:</span>
                          <span className="ml-2 font-medium">{quote.vehicleInfo}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Requested:</span>
                          <span className="ml-2 font-medium">{quote.createdAt}</span>
                        </div>
                        {quote.validUntil && (
                          <div>
                            <span className="text-slate-600">Valid Until:</span>
                            <span className="ml-2 font-medium">{quote.validUntil}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {quote.quotedAmount && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${quote.quotedAmount}</div>
                        <div className="text-sm text-slate-600">Quoted Price</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                        Contact Shop
                      </button>
                    </div>
                    {quote.status === 'received' && (
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                          Accept Quote
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddVehicle(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Add New Vehicle</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddVehicle({
                make: formData.get('make') as string,
                model: formData.get('model') as string,
                year: formData.get('year') as string,
                licensePlate: formData.get('licensePlate') as string,
                vin: formData.get('vin') as string,
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Make</label>
                  <input
                    name="make"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., Toyota"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Model</label>
                  <input
                    name="model"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., Camry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
                  <input
                    name="year"
                    type="number"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">License Plate (Optional)</label>
                  <input
                    name="licensePlate"
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., ABC 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">VIN (Optional)</label>
                  <input
                    name="vin"
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
                    placeholder="Vehicle Identification Number"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddVehicle(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVehicle(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Vehicle Details</h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <svg className="w-32 h-32 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedVehicle.licensePlate && (
                    <div>
                      <span className="text-slate-600">License Plate:</span>
                      <span className="ml-2 font-medium">{selectedVehicle.licensePlate}</span>
                    </div>
                  )}
                  {selectedVehicle.vin && (
                    <div>
                      <span className="text-slate-600">VIN:</span>
                      <span className="ml-2 font-medium">{selectedVehicle.vin}</span>
                    </div>
                  )}
                  {selectedVehicle.color && (
                    <div>
                      <span className="text-slate-600">Color:</span>
                      <span className="ml-2 font-medium">{selectedVehicle.color}</span>
                    </div>
                  )}
                  {selectedVehicle.mileage && (
                    <div>
                      <span className="text-slate-600">Mileage:</span>
                      <span className="ml-2 font-medium">{selectedVehicle.mileage.toLocaleString()} mi</span>
                    </div>
                  )}
                  {selectedVehicle.lastService && (
                    <div>
                      <span className="text-slate-600">Last Service:</span>
                      <span className="ml-2 font-medium">{selectedVehicle.lastService}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Book Service
                </button>
                <button className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                  Edit Details
                </button>
                <button
                  onClick={() => {
                    handleDeleteVehicle(selectedVehicle.id);
                    setSelectedVehicle(null);
                  }}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}