import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/lib/database.types";

type Car = {
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate?: string;
  user_id: string; // associate car with user
};

export function useAddCar(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  const addCar = async (car: Omit<Car, 'user_id'>) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('cars')
      .insert([{ ...car, user_id: userId }])
      .select()
      .single();
    setLoading(false);
    if (error) {
      setError(error.message);
      return null;
    }
    return data;
  };

  return { addCar, loading, error };
}