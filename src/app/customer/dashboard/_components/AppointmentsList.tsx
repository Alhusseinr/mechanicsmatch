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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Your Upcoming Appointments
          </h3>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {new Date(booking.appointment_date).getDate()}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {booking.service_id}
                    </div>
                    <div className="text-sm text-slate-600">
                      {booking.shop_name} • {booking.appointment_time} •{" "}
                      {booking.vehicle_make} {booking.vehicle_model} • $
                      {booking.final_cost}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 mt-6">
            Past Services
          </h3>
          <div className="space-y-4">
            {completedBookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
              >
                <div>
                  <div className="font-semibold text-slate-900">
                    {booking.service_id}
                  </div>
                  <div className="text-sm text-slate-600">
                    {booking.shop_name} • {booking.appointment_date} • $
                    {booking.final_cost}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                    Leave a Review
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
