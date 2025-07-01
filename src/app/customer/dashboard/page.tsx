'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/Dashboard';

// Your existing interfaces and mock data remain the same
// interface Vehicle {
//   id: string;
//   make: string;
//   model: string;
//   trim: string;
//   year: string;
//   vin?: string;
//   licensePlate?: string;
//   color?: string;
//   mileage?: number;
//   lastService?: string;
//   photo?: string;
// }

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

interface Car {
  id: string;
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate: string;
  created_at: string;
  updated_at: string;
}

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
  }
];

export default function CustomerDashboard() {
  const { user } = useAuth();

  const [cars, setCars] = useState([] as Car[]);
  const [showAddCar, setShowAddCar] = useState(false);

  const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
  const completedBookings = mockBookings.filter(b => b.status === 'completed');

   useEffect(() => {
    if (user?.cars) {
      setCars(user.cars);
    } else {
      setCars([]);
    }
  }, [user?.cars]);

  // const handleAddVehicle = (vehicleData: Partial<Car>) => {
  //   const newVehicle: Car = {
  //     id: Date.now().toString(),
  //     car_make: vehicleData.car_make || '',
  //     car_model: vehicleData.car_model || '',
  //     car_trim: vehicleData.car_trim || '',
  //     car_year: vehicleData.car_year || 0,
  //     car_license_plate: vehicleData.car_license_plate || '',
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //     ...vehicleData
  //   };
  //   setVehicles([...vehicles, newVehicle]);
  //   setShowAddVehicle(false);
  // };

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
    <DashboardLayout
      title=""
      subtitle=""
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Cars</p>
                <p className="text-3xl font-bold text-slate-900">{cars.length}</p>
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
                <p className="text-3xl font-bold text-slate-900">3</p>
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
                <p className="text-3xl font-bold text-slate-900">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => console.log('Book new service')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Book Service</h3>
                <p className="text-blue-100 text-sm">Schedule a new appointment</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => console.log('Find mechanics')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Find Mechanics</h3>
                <p className="text-green-100 text-sm">Discover trusted professionals</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowAddCar(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Add Vehicle</h3>
                <p className="text-purple-100 text-sm">Register a new vehicle</p>
              </div>
            </div>
          </button>
        </div>

        {/* Upcoming Appointments */}
        {upcomingBookings.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
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

        {/* Recent Vehicles */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">My Cars</h3>
            <button 
              onClick={() => setShowAddCar(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Add Car
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car.id} className="bg-slate-100 rounded-xl p-4 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {car.car_year} {car.car_make} {car.car_model} {car.car_trim}
                    </div>
                    <div className="text-sm text-slate-600">{car.car_license_plate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        {/* Add Car Modal */}
        {showAddCar && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddCar(false)}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Add New Car</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                // handleAddVehicle({
                //   make: formData.get('make') as string,
                //   model: formData.get('model') as string,
                //   trim: formData.get('trim') as string,
                //   year: formData.get('year') as string,
                //   licensePlate: formData.get('licensePlate') as string,
                //   vin: formData.get('vin') as string,
                // });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Make</label>
                    <input
                      name="make"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                      placeholder="e.g., Toyota"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Model</label>
                    <input
                      name="model"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
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
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">License Plate (Optional)</label>
                    <input
                      name="licensePlate"
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                      placeholder="e.g., ABC 1234"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddCar(false)}
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
      </div>
    </DashboardLayout>
  );
}