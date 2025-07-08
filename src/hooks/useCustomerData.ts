"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Car {
  id: string;
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate: string;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  shop_name: string;
  customer_id: string;
  shop_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  payment_status: "pending" | "paid" | "refunded";
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  problem_description?: string;
  special_instructions?: string;
  estimated_cost?: number;
  final_cost?: number;
  notes?: string;
  shop?: any;
}

export const useCustomerData = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchCars = async () => {
    if (!user?.id) return;

    try {
      const { data: userCars, error: userCarsError } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user.id);

      if (userCarsError) {
        throw userCarsError;
      }

      setCars(userCars || []);
    } catch (error) {
      console.error("Error fetching user cars:", error);
      setError("Failed to fetch cars");
    }
  };

  const fetchAppointments = async () => {
    if (!user?.id) return;

    try {
      const { data: customerAppointments, error: customerAppointmentsError } =
        await supabase
          .from("bookings")
          .select("*")
          .eq("customer_id", user.id);

      if (customerAppointmentsError) {
        throw customerAppointmentsError;
      }

      if (customerAppointments) {
        // Enhance appointments with shop and service details
        const enhancedAppointments = await Promise.all(
          customerAppointments.map(async (appointment) => {
            try {
              // Fetch shop details
              const { data: shop, error: shopError } = await supabase
                .from("shops")
                .select("*")
                .eq("id", appointment.shop_id)
                .single();

              if (shopError) {
                console.error("Error fetching shop details:", shopError);
              }

              // Fetch service details
              const { data: service, error: serviceError } = await supabase
                .from("services")
                .select("*")
                .eq("id", appointment.service_id)
                .single();

              if (serviceError) {
                console.error("Error fetching service details:", serviceError);
              }

              // Format appointment time
              const apptTime = new Date(
                `1970-01-01T${appointment.appointment_time}`
              );
              const formattedTime = apptTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return {
                ...appointment,
                shop_name: shop?.name || "Unknown Shop",
                service_name: service?.name || "Unknown Service",
                appointment_time: formattedTime,
                shop,
                service,
              };
            } catch (error) {
              console.error("Error enhancing appointment:", error);
              return appointment;
            }
          })
        );

        setAppointments(enhancedAppointments);
      }
    } catch (error) {
      console.error("Error fetching customer appointments:", error);
      setError("Failed to fetch appointments");
    }
  };

  const fetchData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      await Promise.all([fetchCars(), fetchAppointments()]);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // No need to sync with AuthContext - just return the data directly

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]); // Only re-run when user ID changes

  return {
    cars,
    appointments,
    loading,
    error,
    refreshData,
  };
};