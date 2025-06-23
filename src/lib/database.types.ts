export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          avatar_url: string | null
          user_type: 'customer' | 'mechanic'
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          avatar_url?: string | null
          user_type: 'customer' | 'mechanic'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          avatar_url?: string | null
          user_type?: 'customer' | 'mechanic'
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      shops: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          address: string
          city: string
          state: string
          zip_code: string
          phone: string | null
          email: string | null
          website_url: string | null
          business_license: string | null
          insurance_info: string | null
          logo_url: string | null
          cover_image_url: string | null
          specialties: string[] | null
          certifications: string[] | null
          operating_hours: Record<string, any> | null
          is_verified: boolean
          is_active: boolean
          rating_average: number
          total_reviews: number
          latitude: number | null
          longitude: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          address: string
          city: string
          state: string
          zip_code: string
          phone?: string | null
          email?: string | null
          website_url?: string | null
          business_license?: string | null
          insurance_info?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          specialties?: string[] | null
          certifications?: string[] | null
          operating_hours?: Record<string, any> | null
          is_verified?: boolean
          is_active?: boolean
          rating_average?: number
          total_reviews?: number
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          address?: string
          city?: string
          state?: string
          zip_code?: string
          phone?: string | null
          email?: string | null
          website_url?: string | null
          business_license?: string | null
          insurance_info?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          specialties?: string[] | null
          certifications?: string[] | null
          operating_hours?: Record<string, any> | null
          is_verified?: boolean
          is_active?: boolean
          rating_average?: number
          total_reviews?: number
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          customer_id: string
          shop_id: string
          service_id: string | null
          appointment_date: string
          appointment_time: string
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_year: number | null
          vehicle_vin: string | null
          problem_description: string | null
          special_instructions: string | null
          estimated_cost: number | null
          final_cost: number | null
          payment_status: 'pending' | 'paid' | 'refunded'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          shop_id: string
          service_id?: string | null
          appointment_date: string
          appointment_time: string
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
          vehicle_vin?: string | null
          problem_description?: string | null
          special_instructions?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          payment_status?: 'pending' | 'paid' | 'refunded'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          shop_id?: string
          service_id?: string | null
          appointment_date?: string
          appointment_time?: string
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
          vehicle_vin?: string | null
          problem_description?: string | null
          special_instructions?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          payment_status?: 'pending' | 'paid' | 'refunded'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          customer_id: string
          shop_id: string
          booking_id: string | null
          rating: number
          title: string | null
          comment: string | null
          photos: string[] | null
          response_from_shop: string | null
          response_date: string | null
          is_verified: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          shop_id: string
          booking_id?: string | null
          rating: number
          title?: string | null
          comment?: string | null
          photos?: string[] | null
          response_from_shop?: string | null
          response_date?: string | null
          is_verified?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          shop_id?: string
          booking_id?: string | null
          rating?: number
          title?: string | null
          comment?: string | null
          photos?: string[] | null
          response_from_shop?: string | null
          response_date?: string | null
          is_verified?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'customer' | 'mechanic'
      booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'refunded'
    }
  }
}