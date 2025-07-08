"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layouts/Dashboard";
import { useAddCar } from "@/hooks/useAddCar";
import AddCarModal from "./_components/AddCarModal";
import CustomerCars from "./_components/CustomerCar";
import { useDeleteCar } from "@/hooks/useDeleteCar";
import { useCustomerData } from "@/hooks/useCustomerData";
import Loader from "@/components/ui/Loader";
import { Car } from "@/lib/types";
import AppointmentsList from "./_components/AppointmentsList";

export default function CustomerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { cars, appointments, loading: dataLoading, error: dataError, refreshData } = useCustomerData();
  const [showAddCar, setShowAddCar] = useState(false);

  const { addCar, error } = useAddCar(user?.id || ""); // Pass user ID if available
  const { deleteCar } = useDeleteCar(); // Assuming you have a deleteCar function

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
      // Refresh the data to get the updated cars list
      refreshData();
      setShowAddCar(false);
    } else {
      console.error("Failed to add car:", error);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    const success = await deleteCar(carId);
    if (success) {
      // Refresh the data to get the updated cars list
      refreshData();
    }
  };

  if (authLoading) {
    return <Loader loading={authLoading} />;
  }

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section - Professional Enterprise Design */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Welcome back{user?.first_name ? `, ${user.first_name}` : ""}!
              </h1>
              <p className="text-slate-600">
                Manage your vehicles and service appointments in one place
              </p>
              {dataLoading && (
                <p className="text-slate-700 text-sm mt-2 flex items-center">
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading your data...
                </p>
              )}
              {dataError && (
                <p className="text-red-600 text-sm mt-2">{dataError}</p>
              )}
            </div>

            {/* Professional Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => console.log("Find mechanics")}
                className="flex items-center space-x-2 bg-white border border-gray-300 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4"
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
                <span className="hidden sm:inline">Find Shops</span>
              </button>

              <button
                onClick={() => console.log("Book service")}
                className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Book Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List - Component handles its own mobile responsiveness */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-6">
          <AppointmentsList appointments={appointments} />
        </div>

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
