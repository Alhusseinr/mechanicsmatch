"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/Dashboard";
import { useAddCar } from "@/hooks/useAddCar";
import AddCarModal from "./_components/AddCarModal";
import CustomerCars from "./_components/CustomerCar";
import { useDeleteCar } from "@/hooks/useDeleteCar";
import Loader from "@/components/ui/Loader";
import { Car, Booking } from "@/lib/types";
import AppointmentsList from "./_components/AppointmentsList";

export default function CustomerDashboard() {
  const { user, loading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [appointments, setAppointments] = useState<Booking[]>([]);

  console.log("User in dashboard:", user);

  const { addCar, error } = useAddCar(user?.id || ""); // Pass user ID if available
  const { deleteCar } = useDeleteCar(); // Assuming you have a deleteCar function

  useEffect(() => {
    if (user?.cars) {
      setCars(user.cars);
    } else {
      setCars([]);
    }

    if (user?.appointments) {
      setAppointments(user.appointments);
    } else {
      setAppointments([]);
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

    const insertedCar = await addCar(newCar);

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

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Quick Actions - Mobile Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <button
            onClick={() => console.log("Book new service")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
              <div className="text-left min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">Book Service</h3>
                <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">
                  Schedule a new appointment
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => console.log("Find mechanics")}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
              <div className="text-left min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">Find Mechanics</h3>
                <p className="text-green-100 text-xs sm:text-sm hidden sm:block">
                  Discover trusted professionals
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAddCar(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
              <div className="text-left min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">Add Vehicle</h3>
                <p className="text-purple-100 text-xs sm:text-sm hidden sm:block">
                  Register a new vehicle
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Appointments List - Component handles its own mobile responsiveness */}
        <AppointmentsList appointments={appointments} />

        {/* Customer Cars - Component handles its own mobile responsiveness */}
        <CustomerCars
          cars={cars}
          onAddCar={() => setShowAddCar(true)}
          onDeleteCar={handleDeleteCar}
        />

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