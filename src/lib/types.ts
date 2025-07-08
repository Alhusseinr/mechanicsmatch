// =============================================================================
// AUTH & USER TYPES
// =============================================================================

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar_url?: string
  user_type: 'customer' | 'mechanic'
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  login: (email: string, password: string) => Promise<any | null>
  refreshUserProfile: () => Promise<void>
}

export interface LoginFormData {
  email: string
  password: string
  userType: 'customer' | 'mechanic'
  rememberMe: boolean
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  userType: 'customer' | 'mechanic'
  shopName?: string
  businessLicense?: string
  agreeToTerms: boolean
}

// =============================================================================
// VEHICLE TYPES
// =============================================================================

export interface Vehicle {
  id: string
  user_id: string
  car_make: string
  car_model: string
  car_trim: string
  car_year: number
  car_license_plate?: string
  vin?: string
  color?: string
  mileage?: number
  last_service?: string
  photo?: string
  created_at: string
  updated_at: string
}

export interface Car {
  id: string;
  car_make: string;
  car_model: string;
  car_trim: string;
  car_year: number;
  car_license_plate: string;
}

// =============================================================================
// SHOP TYPES
// =============================================================================

export interface Shop {
  id: string
  owner_id: string
  name: string
  description?: string
  address: string
  city: string
  state: string
  zip_code: string
  phone?: string
  email?: string
  website_url?: string
  business_license?: string
  insurance_info?: string
  logo_url?: string
  cover_image_url?: string
  specialties?: string[]
  certifications?: string[]
  operating_hours?: OperatingHours
  is_verified: boolean
  is_active: boolean
  rating_average: number
  total_reviews: number
  latitude?: number
  longitude?: number
  photos?: string[]
  verified?: boolean // For compatibility
  created_at: string
  updated_at: string
}

export interface OperatingHours {
  monday: { open: string; close: string }
  tuesday: { open: string; close: string }
  wednesday: { open: string; close: string }
  thursday: { open: string; close: string }
  friday: { open: string; close: string }
  saturday: { open: string; close: string }
  sunday: { open: string; close: string }
}

export interface Mechanic {
  id: number
  name: string
  description: string
  rating: number
  location: string
  specialties: string[]
  verified: boolean
}

// =============================================================================
// SERVICE TYPES
// =============================================================================

export interface Service {
  id: string
  shop_id: string
  name: string
  description: string
  category: string
  price_min?: number
  price_max?: number
  price_range: string
  duration: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ServiceOption {
  value: string
  label: string
}

// =============================================================================
// BOOKING TYPES
// =============================================================================

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'refunded'

// export interface Booking {
//   id: string
//   customer_id: string
//   shop_id: string
//   service_id: string
//   shop_name?: string // For display purposes
//   service_name?: string // For display purposes
//   appointment_date: string
//   appointment_time: string
//   status: BookingStatus
//   payment_status: PaymentStatus
//   vehicle_make?: string
//   vehicle_model?: string
//   vehicle_year?: number
//   vehicle_vin?: string
//   problem_description?: string
//   special_instructions?: string
//   estimated_cost?: number
//   final_cost?: number
//   notes?: string
//   customer_name?: string // For shop dashboard
//   customer_phone?: string // For shop dashboard
//   customer_email?: string // For shop dashboard
//   vehicle_info?: string // Combined vehicle info for display
//   created_at: string
//   updated_at: string
// }



export interface Booking {
  id: string;
  customer_id: string;
  shop_name: string;
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
}

export interface TimeSlot {
  id: string
  time: string
  available: boolean
}

export interface BookingFormData {
  serviceId: string
  appointmentDate: string
  appointmentTime: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehicleVin: string
  problemDescription: string
  specialInstructions: string
  customerName: string
  customerEmail: string
  customerPhone: string
}

// =============================================================================
// REVIEW TYPES
// =============================================================================

export interface Review {
  id: string
  customer_id: string
  shop_id: string
  booking_id?: string
  rating: number
  title?: string
  comment?: string
  photos?: string[]
  response_from_shop?: string
  response_date?: string
  is_verified: boolean
  is_featured: boolean
  customer_name?: string // For display
  date?: string // For display
  service?: string // For display
  created_at: string
  updated_at: string
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface ProfileFormData {
  first_name: string
  last_name: string
  phone: string
  user_type: 'customer' | 'mechanic'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

// =============================================================================
// UI COMPONENT TYPES
// =============================================================================

export interface SelectOption {
  value: string
  label: string
}

export interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface LoaderProps {
  loading: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// =============================================================================
// LAYOUT TYPES
// =============================================================================

export interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: 'customer' | 'mechanic'
  fallbackPath?: string
}

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  userType: 'customer' | 'mechanic'
  currentPath: string
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  total_pages: number
}

// =============================================================================
// STATISTICS TYPES
// =============================================================================

export interface CustomerStats {
  totalBookings: number
  activeVehicles: number
  savedShops: number
  activeQuotes: number
}

export interface ShopStats {
  totalBookings: number
  pendingBookings: number
  completedToday: number
  totalRevenue: number
  avgRating: number
  totalReviews: number
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  active: boolean
}

export interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  user?: User | null
  session?: Session | null
  signOut?: () => Promise<void>
  pathname?: string
}

// =============================================================================
// SEARCH TYPES
// =============================================================================

export interface SearchFilters {
  location: string;
  service: string;
  radius?: number;
  minRating?: number;
  priceRange?: [number, number];
  sortBy?: 'rating' | 'distance' | 'price' | 'reviews';
}

export interface SearchResult {
  shops: Shop[];
  total: number;
  hasMore?: boolean;
  page?: number;
  filters?: SearchFilters;
}

export interface UseSearchResult {
  shops: Shop[];
  total: number;
  hasMore: boolean;
  page: number;
}

// =============================================================================
// DASHBOARD COMPONENT TYPES
// =============================================================================

export interface CustomerCarsProps {
  cars: Car[]
  onAddCar: () => void
  onDeleteCar?: (id: string) => void
}

export interface AddCarModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (carData: Partial<Car>) => void
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type UserType = 'customer' | 'mechanic'

export type Theme = 'light' | 'dark' | 'system'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

// =============================================================================
// DATABASE TYPES (Re-export from database.types.ts if needed)
// =============================================================================

// export type { Database } from './lib/database.types'
// If you have 'database.types.ts' in the same folder, use:
export type { Database } from './database.types'
// Or remove the line entirely if the file does not exist.