"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useVehicleData } from "@/lib/vehicleData";
import { CustomSelect } from "@/components/ui/CustomSelect";

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

export default function AddCarModal({
  open,
  onClose,
  onSubmit,
}: AddCarModalProps) {
  // Use the vehicle data hook with API integration
  const {
    makes,
    models,
    trims,
    loading,
    errors,
    loadModels,
    loadTrims,
    getYears,
  } = useVehicleData();

  // Form state
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedMakeObj, setSelectedMakeObj] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModelObj, setSelectedModelObj] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [customTrim, setCustomTrim] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [years] = useState(getYears());

  // Handle make selection
  const handleMakeChange = (makeId: string) => {
    setSelectedMake(makeId);
    const makeObj = makes.find((m) => m.id === makeId);
    setSelectedMakeObj(makeObj);

    // Reset dependent fields
    setSelectedModel("");
    setSelectedModelObj(null);
    setSelectedYear("");
    setSelectedTrim("");
    setCustomTrim("");
  };

  // Handle model selection
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const modelObj = models.find((m) => m.id === modelId);
    setSelectedModelObj(modelObj);

    // Only reset trim fields, keep the year
    setSelectedTrim("");
    setCustomTrim("");

    // Load trims if we have all required data
    if (selectedMakeObj && modelObj && selectedYear) {
      loadTrims(selectedMakeObj.name, modelObj.name, parseInt(selectedYear));
    }
  };

  // Handle year selection
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedTrim("");
    setCustomTrim("");

    // Load trims when year is selected (and we have make + model)
    if (selectedMakeObj && selectedModelObj && year) {
      loadTrims(selectedMakeObj.name, selectedModelObj.name, parseInt(year));
    }
  };

  // Load models when make and year change
  useEffect(() => {
    if (selectedMakeObj && selectedYear) {
      loadModels(selectedMakeObj.name, parseInt(selectedYear), true);
    }
  }, [selectedMakeObj, selectedYear]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedMake("");
      setSelectedMakeObj(null);
      setSelectedModel("");
      setSelectedModelObj(null);
      setSelectedYear("");
      setSelectedTrim("");
      setCustomTrim("");
      setLicensePlate("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMakeObj || !selectedModelObj || !selectedYear) {
      return;
    }

    // Use selected trim or custom trim
    const finalTrim = selectedTrim || customTrim;
    if (!finalTrim) {
      return;
    }

    onSubmit({
      car_make: selectedMakeObj.name,
      car_model: selectedModelObj.name,
      car_trim: finalTrim,
      car_year: parseInt(selectedYear),
      car_license_plate: licensePlate || undefined,
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Add New Vehicle</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Make Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Make *
              </label>
              <CustomSelect
                options={makes.map((make) => ({
                  value: make.id,
                  label: make.name,
                }))}
                value={selectedMake}
                onChange={handleMakeChange}
                placeholder={
                  loading.makes ? "Loading makes..." : "Select a make"
                }
                disabled={loading.makes}
              />
              {errors.makes && (
                <p className="text-sm text-red-500 mt-1">{errors.makes}</p>
              )}
              {!loading.makes && makes.length > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ {makes.length} makes loaded from NHTSA database
                </p>
              )}
            </div>

            {/* Year Selection */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  !selectedMake ? "text-slate-400" : "text-slate-900"
                }`}
              >
                Year *
              </label>
              <CustomSelect
                options={years.map((year) => ({
                  value: year.toString(),
                  label: year.toString(),
                }))}
                value={selectedYear}
                onChange={handleYearChange}
                placeholder={
                  !selectedMake ? "Select make first" : "Select a year"
                }
                disabled={!selectedMake}
              />
            </div>

            {/* Model Selection */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  !selectedMake ? "text-slate-400" : "text-slate-900"
                }`}
              >
                Model *
              </label>
              <CustomSelect
                options={models.map((model) => ({
                  value: model.id,
                  label: model.name,
                }))}
                value={selectedModel}
                onChange={handleModelChange}
                placeholder={
                  !selectedMake
                    ? "Select make first"
                    : !selectedYear
                    ? "Select year first"
                    : loading.models
                    ? "Loading models..."
                    : models.length === 0
                    ? "No models found - try a different year"
                    : "Select a model"
                }
                disabled={!selectedMake || !selectedYear || loading.models}
              />
              {errors.models && (
                <p className="text-sm text-red-500 mt-1">{errors.models}</p>
              )}

              {/* Show API data source info */}
              {selectedMake &&
                selectedYear &&
                !loading.models &&
                models.length > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ {models.length} models loaded from NHTSA database
                  </p>
                )}
            </div>

            {/* Trim Selection */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  !selectedModel ? "text-slate-400" : "text-slate-900"
                }`}
              >
                Trim *
              </label>

              {/* API Trims (if available) */}
              {trims.length > 0 && (
                <>
                  <CustomSelect
                    options={[
                      { value: "", label: "Select a trim" },
                      ...trims.map((trim) => ({ value: trim, label: trim })),
                      { value: "custom", label: "Enter custom trim..." },
                    ]}
                    value={selectedTrim}
                    onChange={setSelectedTrim}
                    placeholder={
                      loading.trims ? "Loading trims..." : "Select a trim"
                    }
                    disabled={!selectedModel || loading.trims}
                  />
                  {errors.trims && (
                    <p className="text-sm text-red-500 mt-1">{errors.trims}</p>
                  )}
                  {!loading.trims && trims.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ {trims.length} trims loaded from NHTSA database
                    </p>
                  )}
                </>
              )}

              {/* Custom Trim Input */}
              {((trims.length === 0 && selectedModel && !loading.trims) ||
                selectedTrim === "custom") && (
                <div className={trims.length > 0 ? "mt-3" : ""}>
                  {trims.length > 0 && (
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Custom Trim
                    </label>
                  )}
                  <input
                    type="text"
                    value={customTrim}
                    onChange={(e) => setCustomTrim(e.target.value)}
                    required={!selectedTrim || selectedTrim === "custom"}
                    disabled={!selectedModel}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="e.g., LX, EX, Sport, Base"
                  />
                  {!loading.trims && trims.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ {trims.length}{" "}
                      {trims.includes("Base") || trims.includes("LX")
                        ? "common"
                        : "verified"}{" "}
                      trims available
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                License Plate (Optional)
              </label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 transition-colors"
                placeholder="e.g., ABC 1234"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !selectedMakeObj ||
                !selectedModelObj ||
                !selectedYear ||
                (!selectedTrim && !customTrim) ||
                loading.models ||
                loading.trims
              }
              className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {loading.models || loading.trims ? "Loading..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
