'use client';

import React from "react";

interface AddCarModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (carData: {
    car_make: string;
    car_model: string;
    car_trim: string;
    car_year: number;
    car_license_plate?: string;
  }) => void;
}

export default function AddCarModal({ open, onClose, onSubmit }: AddCarModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Add New Car
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit({
              car_make: formData.get("make") as string,
              car_model: formData.get("model") as string,
              car_trim: formData.get("trim") as string,
              car_year: Number(formData.get("year")),
              car_license_plate: formData.get("licensePlate") as string,
            });
          }}
        >
          <div className="space-y-4">
            {/* ...inputs as before... */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Make
              </label>
              <input
                name="make"
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                placeholder="e.g., Toyota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Model
              </label>
              <input
                name="model"
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                placeholder="e.g., Camry"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Trim
              </label>
              <input
                name="trim"
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                placeholder="e.g., LX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
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
              <label className="block text-sm font-medium text-slate-700 mb-2">
                License Plate (Optional)
              </label>
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
              onClick={onClose}
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
  );
}