"use client";

import { CustomerCarsProps } from "@/lib/types";
import React from "react";

export default function CustomerCars({
  cars,
  onAddCar,
  onDeleteCar,
}: CustomerCarsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Cars</h3>
      </div>
      
      {/* Cars Grid - Mobile Responsive */}
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-100 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {/* Car Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                
                {/* Car Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base">
                    <span className="block sm:inline">{car.car_year} {car.car_make}</span>
                    <span className="block sm:inline sm:ml-1">{car.car_model} {car.car_trim}</span>
                  </div>
                </div>
                
                {/* Delete Button */}
                {onDeleteCar && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCar(car.id);
                    }}
                    className="text-red-500 hover:text-red-700 p-1 sm:p-2 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                    title="Delete car"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
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
          <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
            No vehicles added
          </h4>
          <p className="text-slate-600 mb-4 text-sm sm:text-base px-4">
            Add your first vehicle to get started with booking services
          </p>
          <button
            onClick={onAddCar}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            Add Your First Vehicle
          </button>
        </div>
      )}
    </div>
  );
}