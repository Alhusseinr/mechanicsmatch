'use client';

import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  duration: string;
  category: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface FormData {
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleVin: string;
  problemDescription: string;
  specialInstructions: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

// Mock data
const mockShop = {
  id: '1',
  name: 'Elite Motor Works',
  address: '1234 Automotive Blvd, Los Angeles, CA',
  phone: '(555) 123-4567'
};

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Performance Tune',
    description: 'Complete ECU tuning for maximum performance gains',
    priceRange: '$400 - $800',
    duration: '2-4 hours',
    category: 'Performance'
  },
  {
    id: '2',
    name: 'Engine Diagnostics',
    description: 'Comprehensive computer diagnostics and troubleshooting',
    priceRange: '$150 - $250',
    duration: '1-2 hours',
    category: 'Diagnostics'
  },
  {
    id: '3',
    name: 'Oil Change Premium',
    description: 'High-performance synthetic oil change with filter',
    priceRange: '$80 - $120',
    duration: '30-45 minutes',
    category: 'Maintenance'
  }
];

const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  
  times.forEach((time, index) => {
    slots.push({
      id: `${date}-${time}`,
      time,
      available: Math.random() > 0.3 // Randomly make some unavailable
    });
  });
  
  return slots;
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceId: '',
    appointmentDate: '',
    appointmentTime: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleVin: '',
    problemDescription: '',
    specialInstructions: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Generate time slots when date changes
    if (field === 'appointmentDate' && value) {
      setAvailableSlots(generateTimeSlots(value));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep(5); // Success step
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  const selectedService = mockServices.find(s => s.id === formData.serviceId);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.serviceId;
      case 2:
        return !!(formData.appointmentDate && formData.appointmentTime);
      case 3:
        return !!(formData.vehicleMake && formData.vehicleModel && formData.vehicleYear && formData.problemDescription);
      case 4:
        return !!(formData.customerName && formData.customerEmail && formData.customerPhone);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-slate-800">Book Service</h1>
            </div>
            <div className="text-sm text-slate-600">
              {mockShop.name}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className={currentStep >= 1 ? 'text-blue-600' : 'text-slate-500'}>Select Service</span>
            <span className={currentStep >= 2 ? 'text-blue-600' : 'text-slate-500'}>Choose Date & Time</span>
            <span className={currentStep >= 3 ? 'text-blue-600' : 'text-slate-500'}>Vehicle Details</span>
            <span className={currentStep >= 4 ? 'text-blue-600' : 'text-slate-500'}>Contact Info</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Select a Service</h2>
              <div className="space-y-4">
                {mockServices.map((service) => (
                  <label
                    key={service.id}
                    className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.serviceId === service.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={formData.serviceId === service.id}
                      onChange={(e) => handleInputChange('serviceId', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-2">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>Duration: {service.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-600">{service.priceRange}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Choose Date & Time</h2>
              {selectedService && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                  <h3 className="font-semibold text-blue-900 mb-1">Selected Service:</h3>
                  <p className="text-blue-800">{selectedService.name} - {selectedService.duration}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={formData.appointmentDate}
                    onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Available Times
                  </label>
                  {formData.appointmentDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => handleInputChange('appointmentTime', slot.time)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            formData.appointmentTime === slot.time
                              ? 'bg-blue-600 text-white shadow-lg'
                              : slot.available
                              ? 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:shadow-md'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">Please select a date first</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Vehicle Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Make
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Toyota"
                    value={formData.vehicleMake}
                    onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Camry"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2020"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={formData.vehicleYear}
                    onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  VIN (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Vehicle Identification Number"
                  value={formData.vehicleVin}
                  onChange={(e) => handleInputChange('vehicleVin', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Problem Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Please describe the issue or service needed..."
                  value={formData.problemDescription}
                  onChange={(e) => handleInputChange('problemDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions or preferences..."
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="font-medium">{formData.appointmentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="font-medium">{formData.appointmentTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Vehicle:</span>
                    <span className="font-medium">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-medium">{selectedService?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estimated Cost:</span>
                    <span className="font-medium text-orange-600">{selectedService?.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-slate-600 mb-8">
                Your appointment has been successfully scheduled with {mockShop.name}.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-bold text-green-900 mb-3">Appointment Details:</h3>
                <div className="space-y-2 text-green-800">
                  <div><strong>Service:</strong> {selectedService?.name}</div>
                  <div><strong>Date:</strong> {formData.appointmentDate}</div>
                  <div><strong>Time:</strong> {formData.appointmentTime}</div>
                  <div><strong>Shop:</strong> {mockShop.name}</div>
                  <div><strong>Address:</strong> {mockShop.address}</div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600">
                  A confirmation email has been sent to {formData.customerEmail}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300">
                    View My Bookings
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-8 rounded-xl font-semibold transition-all duration-300">
                    Book Another Service
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isStepValid(currentStep)
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transform hover:scale-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep) || isSubmitting}
                  className={`flex items-center space-x-2 py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    isStepValid(currentStep) && !isSubmitting
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:scale-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}