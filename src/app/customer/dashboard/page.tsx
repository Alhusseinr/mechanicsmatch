"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardLayout from "@/components/layouts/Dashboard";
import { randomUUID } from "crypto";
import { useAddCar } from "@/hooks/useAddCar";
import AddCarModal from "@/components/ui/AddCarModal";
import CustomerCars from "@/components/ui/CustomerCar";
import { useDeleteCar } from "@/hooks/useDeleteCar";

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
  customer_id: string;
  shop_name: string;
  shop_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  payment_status: "pending" | "paid" | "refunded";
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  problem_description?: string;
  special_instructions?: string;
  estimated_cost?: number;
  final_cost?: number;
  notes?: string;
}

interface Car {
  id: string;
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate: string;
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  console.log("User in dashboard:", user);

  const { addCar, loading, error } = useAddCar(user?.id || ""); // Pass user ID if available
  const { deleteCar } = useDeleteCar(); // Assuming you have a deleteCar function

  const upcomingBookings = bookings.filter((b) => b.status === "pending");
  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  );

  useEffect(() => {
    if (user?.cars) {
      setCars(user.cars);
    } else {
      setCars([]);
    }

    if (user?.appointments) {
      setBookings(user.appointments);
    } else {
      setBookings([]);
    }
  }, [user?.cars, user?.appointments]);

  const handleAddCar = async (carData: Partial<Car>) => {
    const newCar: Car = {
      id: crypto.randomUUID(),
      car_make: carData.car_make || "",
      car_model: carData.car_model || "",
      car_trim: carData.car_trim || "",
      car_year: carData.car_year || 0,
      car_license_plate: carData.car_license_plate || "",
      ...carData,
    };

    const insertedCar = await addCar(newCar, user?.id || "");

    if (insertedCar) {
      setCars([...cars, newCar]);
      setShowAddCar(false);
    } else {
      console.error("Failed to add car:", error);
    }
  };

   const handleDeleteCar = async (carId: string) => {
    const success = await deleteCar(carId);
    if (success) {
      setCars((prev) => prev.filter((car) => car.id !== carId));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Active Cars
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {cars.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {bookings.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Saved Shops
                </p>
                <p className="text-3xl font-bold text-slate-900">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Active Quotes
                </p>
                <p className="text-3xl font-bold text-slate-900">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => console.log("Book new service")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Book Service</h3>
                <p className="text-blue-100 text-sm">
                  Schedule a new appointment
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => console.log("Find mechanics")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Find Mechanics</h3>
                <p className="text-green-100 text-sm">
                  Discover trusted professionals
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAddCar(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Add Vehicle</h3>
                <p className="text-purple-100 text-sm">
                  Register a new vehicle
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Upcoming Appointments */}
        {upcomingBookings.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Upcoming Appointments
            </h3>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {new Date(booking.appointment_date).getDate()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {booking.service_id}
                      </div>
                      <div className="text-sm text-slate-600">
                        {booking.shop_name} • {booking.appointment_time} •{" "}
                        {booking.vehicle_make} {booking.vehicle_model} •{" "}
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
        <CustomerCars
          cars={cars}
          onAddCar={() => setShowAddCar(true)}
          onDeleteCar={handleDeleteCar}
        />

        {/* Recent Activity */}
        {completedBookings.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {completedBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-slate-900">
                      {/* {booking.serviceName} */}
                    </div>
                    <div className="text-sm text-slate-600">
                      {booking.shop_id} • {booking.appointment_date} • $
                      {booking.final_cost}
                    </div>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                  {booking.rating && (
                    <div className="flex">{renderStars(booking.rating)}</div>
                  )}
                  {!booking.reviewLeft && booking.rating && (
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                      Leave Review
                    </button>
                  )}
                </div> */}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Add Car Modal */}
        <AddCarModal
          open={showAddCar}
          onClose={() => setShowAddCar(false)}
          onSubmit={handleAddCar}
        />
      </div>
    </DashboardLayout>
  );
}

