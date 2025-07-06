import { Booking } from "@/lib/types";

interface AppointmentsProps {
  appointments: Booking[];
}

export default function AppointmentsList({ appointments }: AppointmentsProps) {
  const upcomingBookings = appointments.filter((b) => b.status === "pending");
  const completedBookings = appointments.filter(
    (b) => b.status === "completed"
  );

  return (
    <>
      {/* Upcoming Appointments */}
      {upcomingBookings.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
            Your Upcoming Appointments
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
              >
                {/* Mobile Layout: Stack vertically */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  {/* Left Section */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      {new Date(booking.appointment_date).getDate()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">
                        {booking.service_id}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 mt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium">{booking.shop_name}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{booking.appointment_time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="truncate">
                            {booking.vehicle_make} {booking.vehicle_model}
                          </span>
                        </div>
                        <div className="mt-1 font-semibold text-green-600">
                          ${booking.final_cost}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="px-3 sm:px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm sm:text-base">
                      Reschedule
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Past Services Section */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 mt-6 sm:mt-8">
            Past Services
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {completedBookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
              >
                {/* Mobile Layout: Stack vertically */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  {/* Left Section */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">
                        {booking.service_id}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 mt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium">{booking.shop_name}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{booking.appointment_date}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="font-semibold text-green-600">
                            ${booking.final_cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="px-3 sm:px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm sm:text-base">
                      Leave a Review
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base">
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Appointments State */}
      {upcomingBookings.length === 0 && completedBookings.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20 mb-6 sm:mb-8">
          <div className="text-center">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No appointments yet</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base px-4">
              Book your first service appointment to get started
            </p>
            <button
              onClick={() => console.log("Book new service")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
            >
              Book Your First Service
            </button>
          </div>
        </div>
      )}
    </>
  );
}