import { useState } from 'react';
import { Booking } from "@/lib/types";
import { RescheduleModal, ViewDetailsModal, LeaveReviewModal, ViewInvoiceModal } from './ModalWrapper';

interface AppointmentsProps {
  appointments: Booking[];
}

type ViewMode = 'sections' | 'all';

export default function AppointmentsList({ appointments }: AppointmentsProps) {
  // Modal states
  const [rescheduleModal, setRescheduleModal] = useState({ open: false, booking: null as Booking | null });
  const [detailsModal, setDetailsModal] = useState({ open: false, booking: null as Booking | null });
  const [reviewModal, setReviewModal] = useState({ open: false, booking: null as Booking | null });
  const [invoiceModal, setInvoiceModal] = useState({ open: false, booking: null as Booking | null });

  // View mode state
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    completed: false,
    cancelled: false
  });

  // Categorize appointments into logical sections
  const activeAppointments = appointments.filter((b) => 
    b.status === "pending" || b.status === "confirmed" || b.status === "in_progress"
  );
  const completedAppointments = appointments.filter((b) => b.status === "completed");
  const cancelledAppointments = appointments.filter((b) => b.status === "cancelled");

  // Get status counts
  const statusCounts = {
    pending: appointments.filter(b => b.status === 'pending').length,
    confirmed: appointments.filter(b => b.status === 'confirmed').length,
    in_progress: appointments.filter(b => b.status === 'in_progress').length,
    completed: appointments.filter(b => b.status === 'completed').length,
    cancelled: appointments.filter(b => b.status === 'cancelled').length,
  };

  const totalActive = statusCounts.pending + statusCounts.confirmed + statusCounts.in_progress;

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold border";
    
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-amber-50 text-amber-700 border-amber-200`;
      case 'confirmed':
        return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200`;
      case 'in_progress':
        return `${baseClasses} bg-indigo-50 text-indigo-700 border-indigo-200`;
      case 'completed':
        return `${baseClasses} bg-green-50 text-green-700 border-green-200`;
      case 'cancelled':
        return `${baseClasses} bg-red-50 text-red-700 border-red-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  // Get appropriate actions for each status
  const getStatusActions = (booking: Booking) => {
    switch (booking.status) {
      case 'pending':
        return (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button 
              onClick={() => openRescheduleModal(booking)}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Reschedule
            </button>
            <button 
              onClick={() => openDetailsModal(booking)}
              className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              View Details
            </button>
          </div>
        );
      
      case 'confirmed':
        return (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button 
              onClick={() => openRescheduleModal(booking)}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Reschedule
            </button>
            <button 
              onClick={() => openDetailsModal(booking)}
              className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              View Details
            </button>
          </div>
        );

      case 'in_progress':
        return (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button 
              onClick={() => openDetailsModal(booking)}
              className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              Track Progress
            </button>
          </div>
        );

      case 'completed':
        return (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button 
              onClick={() => openReviewModal(booking)}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Leave Review
            </button>
            <button 
              onClick={() => openInvoiceModal(booking)}
              className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              View Invoice
            </button>
          </div>
        );

      case 'cancelled':
        return (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button 
              onClick={() => openDetailsModal(booking)}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              View Details
            </button>
            <button 
              onClick={() => console.log('Rebook service')}
              className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              Book Again
            </button>
          </div>
        );

      default:
        return (
          <button 
            onClick={() => openDetailsModal(booking)}
            className="px-3 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            View Details
          </button>
        );
    }
  };

  // Get appropriate icon and color for each status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="w-10 h-10 bg-amber-100 border border-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      
      case 'confirmed':
        return (
          <div className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );

      case 'in_progress':
        return (
          <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </div>
        );

      case 'completed':
        return (
          <div className="w-10 h-10 bg-green-100 border border-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );

      case 'cancelled':
        return (
          <div className="w-10 h-10 bg-red-100 border border-red-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  // Render appointment card
  const renderAppointmentCard = (booking: Booking) => (
    <div
      key={booking.id}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Left Section */}
        <div className="flex items-start space-x-3 sm:space-x-4">
          {getStatusIcon(booking.status)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <div className="font-semibold text-slate-900 text-sm sm:text-base">
                {booking.service_name || booking.service_id}
              </div>
              <span className={getStatusBadge(booking.status)}>
                {booking.status.replace('_', ' ')}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-medium">{booking.shop_name}</span>
                <span className="hidden sm:inline">•</span>
                <span>{booking.appointment_date} at {booking.appointment_time}</span>
                <span className="hidden sm:inline">•</span>
                <span className="truncate">
                  {booking.vehicle_make} {booking.vehicle_model}
                </span>
              </div>
              <div className="mt-1 font-semibold text-green-600">
                ${booking.final_cost || booking.estimated_cost || 'TBD'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {getStatusActions(booking)}
      </div>
    </div>
  );

  // Render collapsible section
  const renderSection = (
    title: string,
    appointments: Booking[],
    sectionKey: keyof typeof expandedSections,
    icon: React.ReactNode,
    description: string
  ) => {
    if (appointments.length === 0) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        {/* Section Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center space-x-3">
            {icon}
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
                <span>{title}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm font-semibold">
                  {appointments.length}
                </span>
              </h3>
              <p className="text-sm text-slate-600 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className={`w-5 h-5 text-slate-400 transition-transform ${
                expandedSections[sectionKey] ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Section Content */}
        {expandedSections[sectionKey] && (
          <div className="px-4 pb-4 border-t border-gray-200">
            <div className="space-y-3 pt-4">
              {appointments.map(renderAppointmentCard)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modal handlers
  const handleReschedule = async (bookingId: string, newDate: string, newTime: string) => {
    console.log('Rescheduling booking:', bookingId, 'to', newDate, newTime);
  };

  const handleSubmitReview = async (bookingId: string, rating: number, title: string, comment: string) => {
    console.log('Submitting review for booking:', bookingId, { rating, title, comment });
  };

  const openRescheduleModal = (booking: Booking) => {
    setRescheduleModal({ open: true, booking });
  };

  const openDetailsModal = (booking: Booking) => {
    setDetailsModal({ open: true, booking });
  };

  const openReviewModal = (booking: Booking) => {
    setReviewModal({ open: true, booking });
  };

  const openInvoiceModal = (booking: Booking) => {
    setInvoiceModal({ open: true, booking });
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No appointments scheduled</h3>
          <p className="text-slate-600 mb-6 text-sm px-4">
            Book your first service appointment to get started
          </p>
          <button
            onClick={() => console.log("Book new service")}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm"
          >
            Book Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Overview Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Your Appointments</h2>
            <p className="text-sm text-slate-600">Manage all your automotive service appointments</p>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 sm:mt-0 grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalActive}</div>
              <div className="text-xs text-slate-600">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
              <div className="text-xs text-slate-600">Completed</div>
            </div>
            {statusCounts.cancelled > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</div>
                <div className="text-xs text-slate-600">Cancelled</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Appointments Section */}
      {renderSection(
        "Active Appointments",
        activeAppointments,
        "active",
        <div className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>,
        "Upcoming appointments that require your attention"
      )}

      {/* Completed Appointments Section */}
      {renderSection(
        "Completed Services",
        completedAppointments,
        "completed",
        <div className="w-8 h-8 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>,
        "Successfully completed automotive services"
      )}

      {/* Cancelled Appointments Section */}
      {renderSection(
        "Cancelled Appointments",
        cancelledAppointments,
        "cancelled",
        <div className="w-8 h-8 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>,
        "Appointments that were cancelled"
      )}

      {/* Modals */}
      <RescheduleModal
        open={rescheduleModal.open}
        onClose={() => setRescheduleModal({ open: false, booking: null })}
        booking={rescheduleModal.booking}
        onReschedule={handleReschedule}
      />

      <ViewDetailsModal
        open={detailsModal.open}
        onClose={() => setDetailsModal({ open: false, booking: null })}
        booking={detailsModal.booking}
      />

      <LeaveReviewModal
        open={reviewModal.open}
        onClose={() => setReviewModal({ open: false, booking: null })}
        booking={reviewModal.booking}
        onSubmitReview={handleSubmitReview}
      />

      <ViewInvoiceModal
        open={invoiceModal.open}
        onClose={() => setInvoiceModal({ open: false, booking: null })}
        booking={invoiceModal.booking}
      />
    </>
  );
}