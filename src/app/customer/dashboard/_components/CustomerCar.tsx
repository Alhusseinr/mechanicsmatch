"use client";

import { CustomerCarsProps } from "@/lib/types";
import React from "react";

export default function CustomerCars({
  cars,
  onAddCar,
  onDeleteCar,
}: CustomerCarsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">Your Cars</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-slate-100 rounded-xl p-4 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <div className="font-semibold text-slate-900">
                  {car.car_year} {car.car_make} {car.car_model} {car.car_trim}
                </div>
                <div className="text-sm text-slate-600">
                  {car.car_license_plate}
                </div>
              </div>
              {onDeleteCar && (
                <button
                  onClick={() => onDeleteCar(car.id)}
                  className="text-red-500 hover:text-red-700 justify-self-end ml-auto"
                  title="Delete car"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
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
    </div>
  );
}
