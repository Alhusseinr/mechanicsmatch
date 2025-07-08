"use client";

import { CustomerCarsProps, Car } from "@/lib/types";
import React, { useState } from "react";

// Enhanced Car interface with additional properties
interface EnhancedCar extends Car {
  mileage?: number;
  color?: string;
  vin?: string;
  last_service_date?: string;
  next_service_due?: string;
  service_history?: ServiceRecord[];
  maintenance_alerts?: MaintenanceAlert[];
  photos?: string[];
}

interface ServiceRecord {
  id: string;
  date: string;
  service_type: string;
  shop_name: string;
  cost: number;
  mileage: number;
  notes?: string;
}

interface MaintenanceAlert {
  id: string;
  type:
    | "oil_change"
    | "tire_rotation"
    | "brake_inspection"
    | "general_maintenance";
  message: string;
  due_date?: string;
  due_mileage?: number;
  urgency: "low" | "medium" | "high";
}

// Car Detail Modal Component
interface CarDetailModalProps {
  car: EnhancedCar | null;
  open: boolean;
  onClose: () => void;
  onEdit: (car: EnhancedCar) => void;
  onDelete: (carId: string) => void;
  onBookService: (car: EnhancedCar) => void;
}

function CarDetailModal({
  car,
  open,
  onClose,
  onEdit,
  onDelete,
  onBookService,
}: CarDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "history" | "maintenance"
  >("overview");

  if (!open || !car) return null;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-2 sm:p-4 text-center sm:items-center">
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full transform overflow-hidden rounded-t-2xl sm:rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold leading-6 text-gray-900 sm:text-xl">
                  {car.car_year} {car.car_make} {car.car_model}
                </h3>
                <p className="text-sm text-gray-600">{car.car_trim}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4 sm:px-6" aria-label="Tabs">
              {[
                { id: "overview", name: "Overview", icon: "🚗" },
                { id: "history", name: "Service History", icon: "📋" },
                { id: "maintenance", name: "Maintenance", icon: "🔧" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="px-4 py-4 sm:px-6 sm:py-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Car Photo */}
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <p className="text-sm">Car Photo</p>
                    <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800">
                      Add Photo
                    </button>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium font-semibold text-gray-900">
                      Vehicle Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Make:</span>
                        <span className="font-medium text-gray-900">{car.car_make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Model:</span>
                        <span className="font-medium text-gray-900">{car.car_model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span className="font-medium text-gray-900">{car.car_year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Trim:</span>
                        <span className="font-medium text-gray-900">{car.car_trim}</span>
                      </div>
                      {car.color && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Color:</span>
                          <span className="font-medium text-gray-900">{car.color}</span>
                        </div>
                      )}
                      {car.mileage && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Mileage:</span>
                          <span className="font-medium text-gray-900">
                            {car.mileage.toLocaleString()} mi
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium font-semibold text-gray-900">Registration</h4>
                    <div className="space-y-2 text-sm">
                      {car.car_license_plate && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">License Plate:</span>
                          <span className="font-medium text-gray-900 font-mono">
                            {car.car_license_plate}
                          </span>
                        </div>
                      )}
                      {car.vin && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">VIN:</span>
                          <span className="font-medium text-gray-900 font-mono text-xs">
                            {car.vin}
                          </span>
                        </div>
                      )}
                      {car.last_service_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Service:</span>
                          <span className="font-medium text-gray-900">
                            {car.last_service_date}
                          </span>
                        </div>
                      )}
                      {car.next_service_due && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Next Service:</span>
                          <span className="font-medium text-gray-900">
                            {car.next_service_due}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Maintenance Alerts */}
                {car.maintenance_alerts &&
                  car.maintenance_alerts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Maintenance Alerts
                      </h4>
                      <div className="space-y-2">
                        {car.maintenance_alerts.slice(0, 3).map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-3 rounded-lg border ${getUrgencyColor(
                              alert.urgency
                            )}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {alert.message}
                              </span>
                              <span className="text-xs font-semibold">
                                {alert.urgency.toUpperCase()}
                              </span>
                            </div>
                            {alert.due_date && (
                              <p className="text-xs mt-1">
                                Due: {alert.due_date}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Service History</h4>
                {car.service_history && car.service_history.length > 0 ? (
                  <div className="space-y-4">
                    {car.service_history.map((service) => (
                      <div
                        key={service.id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">
                            {service.service_type}
                          </h5>
                          <span className="text-sm font-semibold text-green-600">
                            ${service.cost}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Shop:</span>{" "}
                            {service.shop_name}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span>{" "}
                            {service.date}
                          </p>
                          <p>
                            <span className="font-medium">Mileage:</span>{" "}
                            {service.mileage.toLocaleString()} mi
                          </p>
                          {service.notes && (
                            <p>
                              <span className="font-medium">Notes:</span>{" "}
                              {service.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-4"
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
                    <p>No service history yet</p>
                    <p className="text-sm">
                      Book your first service to start tracking history
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "maintenance" && (
              <div className="space-y-6">
                <h4 className="font-medium text-gray-900">
                  Maintenance Schedule
                </h4>

                {/* Upcoming Maintenance */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Upcoming
                  </h5>
                  {car.maintenance_alerts &&
                  car.maintenance_alerts.length > 0 ? (
                    <div className="space-y-3">
                      {car.maintenance_alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-lg border ${getUrgencyColor(
                            alert.urgency
                          )}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{alert.message}</span>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/50">
                              {alert.urgency.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm space-y-1">
                            {alert.due_date && (
                              <p>Due Date: {alert.due_date}</p>
                            )}
                            {alert.due_mileage && (
                              <p>
                                Due Mileage:{" "}
                                {alert.due_mileage.toLocaleString()} mi
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No upcoming maintenance</p>
                      <p className="text-sm">Your vehicle is up to date!</p>
                    </div>
                  )}
                </div>

                {/* Maintenance Tips */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Maintenance Tips
                  </h5>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                    <p className="font-medium text-blue-900">
                      Regular Maintenance Reminders:
                    </p>
                    <ul className="text-blue-800 space-y-1 ml-4">
                      <li>• Oil change every 5,000-7,500 miles</li>
                      <li>• Tire rotation every 5,000-8,000 miles</li>
                      <li>• Brake inspection every 12,000 miles</li>
                      <li>• Check air filter every 15,000 miles</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onBookService(car)}
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Book Service
              </button>
              <button
                onClick={() => onEdit(car)}
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Edit Details
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this vehicle?"
                    )
                  ) {
                    onDelete(car.id);
                    onClose();
                  }
                }}
                className="sm:flex-none bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Customer Cars Component
export default function EnhancedCustomerCars({
  cars,
  onAddCar,
  onDeleteCar,
}: CustomerCarsProps) {
  const [selectedCar, setSelectedCar] = useState<EnhancedCar | null>(null);
  const [showCarDetail, setShowCarDetail] = useState(false);

  // Mock enhanced car data with additional properties
  const enhancedCars: EnhancedCar[] = cars.map((car, index) => ({
    ...car,
    mileage: 45000 + index * 15000,
    color: ["Red", "Blue", "Silver", "Black", "White"][index % 5],
    vin: `1HGCM82633A${String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0"
    )}`,
    last_service_date: "2024-12-15",
    next_service_due: "2025-03-15",
    service_history: [
      {
        id: "1",
        date: "2024-12-15",
        service_type: "Oil Change",
        shop_name: "QuickLube Plus",
        cost: 65,
        mileage: 43500,
        notes: "Synthetic oil, new filter",
      },
      {
        id: "2",
        date: "2024-09-10",
        service_type: "Brake Inspection",
        shop_name: "Elite Motor Works",
        cost: 120,
        mileage: 41200,
        notes: "Front pads at 40%, rears good",
      },
    ],
    maintenance_alerts: [
      {
        id: "1",
        type: "oil_change",
        message: "Oil change due soon",
        due_date: "2025-03-15",
        due_mileage: 50000,
        urgency: "medium",
      },
      ...(index === 0
        ? [
            {
              id: "2",
              type: "brake_inspection" as const,
              message: "Brake inspection overdue",
              due_date: "2025-01-15",
              urgency: "high" as const,
            },
          ]
        : []),
    ],
  }));

  const handleCarClick = (car: EnhancedCar) => {
    setSelectedCar(car);
    setShowCarDetail(true);
  };

  const handleEditCar = (car: EnhancedCar) => {
    console.log("Edit car:", car);
    setShowCarDetail(false);
    // Open edit modal
  };

  const handleBookService = (car: EnhancedCar) => {
    console.log("Book service for car:", car);
    setShowCarDetail(false);
    // Navigate to booking page with car pre-selected
  };

  const getMaintenanceStatus = (car: EnhancedCar) => {
    if (!car.maintenance_alerts?.length) return { status: "good", count: 0 };

    const highUrgency = car.maintenance_alerts.filter(
      (a) => a.urgency === "high"
    ).length;
    const mediumUrgency = car.maintenance_alerts.filter(
      (a) => a.urgency === "medium"
    ).length;

    if (highUrgency > 0) return { status: "urgent", count: highUrgency };
    if (mediumUrgency > 0) return { status: "attention", count: mediumUrgency };
    return { status: "good", count: 0 };
  };

  const getStatusBadge = (status: string, count: number) => {
    switch (status) {
      case "urgent":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {count} Urgent
          </span>
        );
      case "attention":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {count} Alert{count > 1 ? "s" : ""}
          </span>
        );
      case "good":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Up to Date
          </span>
        );
      default:
        return null;
    }
  };

  const getCarIcon = (make: string) => {
    return (
      <svg
        className="w-8 h-8 text-slate-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>
    );
  };


  return (
    <>
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6 sm:mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Vehicle Fleet
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {enhancedCars.length > 0
                ? `${enhancedCars.length} vehicle${
                    enhancedCars.length !== 1 ? "s" : ""
                  } registered`
                : "No vehicles registered"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddCar}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
              <span className="hidden sm:inline">Add Vehicle</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Cars Display - List View Only */}
        {enhancedCars.length > 0 ? (
          <div className="space-y-4">
            {enhancedCars.map((car) => {
              const maintenanceStatus = getMaintenanceStatus(car);

              return (
                <div
                  key={car.id}
                  onClick={() => handleCarClick(car)}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getCarIcon(car.car_make)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {car.car_year} {car.car_make} {car.car_model}
                        </h4>
                        {getStatusBadge(
                          maintenanceStatus.status,
                          maintenanceStatus.count
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                        <span>{car.car_trim}</span>
                        {car.mileage && (
                          <>
                            <span>•</span>
                            <span>{car.mileage.toLocaleString()} mi</span>
                          </>
                        )}
                        {car.color && (
                          <>
                            <span>•</span>
                            <span>{car.color}</span>
                          </>
                        )}
                      </div>

                      {car.car_license_plate && (
                        <div className="text-xs text-gray-500">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {car.car_license_plate}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-8 sm:py-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 border-2 border-slate-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              No vehicles registered
            </h4>
            <p className="text-slate-600 mb-6 text-sm sm:text-base px-4 max-w-md mx-auto">
              Add your first vehicle to get started with booking services and
              managing your automotive maintenance
            </p>
            <button
              onClick={onAddCar}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Add Vehicle
            </button>
          </div>
        )}
      </div>

      {/* Car Detail Modal */}
      <CarDetailModal
        car={selectedCar}
        open={showCarDetail}
        onClose={() => setShowCarDetail(false)}
        onEdit={handleEditCar}
        onDelete={onDeleteCar || (() => {})}
        onBookService={handleBookService}
      />
    </>
  );
}
