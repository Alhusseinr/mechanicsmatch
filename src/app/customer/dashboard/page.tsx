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

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <AppointmentsList 
          appointments={appointments} 
        />

        <CustomerCars
          cars={cars}
          onAddCar={() => setShowAddCar(true)}
          onDeleteCar={handleDeleteCar}
        />

        <AddCarModal
          open={showAddCar}
          onClose={() => setShowAddCar(false)}
          onSubmit={handleAddCar}
        />
      </div>
    </DashboardLayout>
  );
}
