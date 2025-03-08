export type UserRole = 'admin' | 'staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dress {
  id: string;
  name: string;
  description: string;
  category: string;
  size: string;
  color: string;
  price: number;
  rentalPrice: number;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customer?: Customer;
  dressId: string;
  dress?: Dress;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  activeBookings: number;
  totalRevenue: number;
  availableDresses: number;
  totalCustomers: number;
}

export interface RecentActivity {
  id: string;
  type: 'booking' | 'customer' | 'dress';
  action: 'created' | 'updated' | 'deleted';
  entityId: string;
  entityName: string;
  timestamp: string;
  performedBy: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
} 