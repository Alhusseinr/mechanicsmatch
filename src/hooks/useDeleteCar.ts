import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/lib/database.types";

export function useDeleteCar() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  const deleteCar = async (carId: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', carId);
    setLoading(false);
    if (error) {
      setError(error.message);
      return false;
    }
    return true;
  };

  return { deleteCar, loading, error };
}