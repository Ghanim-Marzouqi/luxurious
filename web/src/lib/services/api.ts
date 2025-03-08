import { customers, dresses, bookings, recentActivities, dashboardStats, users } from './mockData';
import type { Customer, Dress, Booking, RecentActivity, DashboardStats, User, ApiResponse, LoginCredentials, RegisterCredentials, ResetPasswordRequest, ResetPasswordConfirm } from '$lib/types';
import { generateId } from '$lib/utils';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API response wrapper
async function apiResponse<T>(callback: () => T, errorChance = 0): Promise<ApiResponse<T>> {
  await delay(500); // Simulate network delay
  
  // Simulate random errors (for testing error handling)
  if (errorChance > 0 && Math.random() < errorChance) {
    return {
      error: 'An error occurred while processing your request.',
      status: 500
    };
  }
  
  try {
    const data = callback();
    return {
      data,
      status: 200
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      status: 500
    };
  }
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    return apiResponse(() => {
      const user = users.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, we would validate the password here
      
      return {
        user,
        token: 'mock-jwt-token'
      };
    });
  },
  
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      // In a real app, we would create a new user here
      return undefined;
    });
  },
  
  resetPassword: async (request: ResetPasswordRequest): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      // In a real app, we would send a reset password email here
      return undefined;
    });
  },
  
  confirmResetPassword: async (data: ResetPasswordConfirm): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      // In a real app, we would reset the password here
      return undefined;
    });
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiResponse(() => {
      // In a real app, we would validate the token and return the user
      return users[0];
    });
  }
};

// Customers API
export const customersApi = {
  getAll: async (): Promise<ApiResponse<Customer[]>> => {
    return apiResponse(() => [...customers]);
  },
  
  getById: async (id: string): Promise<ApiResponse<Customer>> => {
    return apiResponse(() => {
      const customer = customers.find(c => c.id === id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    });
  },
  
  create: async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Customer>> => {
    return apiResponse(() => {
      const newCustomer: Customer = {
        ...customer,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      customers.push(newCustomer);
      return newCustomer;
    });
  },
  
  update: async (id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> => {
    return apiResponse(() => {
      const index = customers.findIndex(c => c.id === id);
      
      if (index === -1) {
        throw new Error('Customer not found');
      }
      
      const updatedCustomer = {
        ...customers[index],
        ...customer,
        updatedAt: new Date().toISOString()
      };
      
      customers[index] = updatedCustomer;
      return updatedCustomer;
    });
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      const index = customers.findIndex(c => c.id === id);
      
      if (index === -1) {
        throw new Error('Customer not found');
      }
      
      customers.splice(index, 1);
    });
  },
  
  search: async (query: string): Promise<ApiResponse<Customer[]>> => {
    return apiResponse(() => {
      const lowercaseQuery = query.toLowerCase();
      return customers.filter(
        c => c.name.toLowerCase().includes(lowercaseQuery) || 
             c.email.toLowerCase().includes(lowercaseQuery) ||
             c.phone.includes(query)
      );
    });
  }
};

// Dresses API
export const dressesApi = {
  getAll: async (): Promise<ApiResponse<Dress[]>> => {
    return apiResponse(() => [...dresses]);
  },
  
  getById: async (id: string): Promise<ApiResponse<Dress>> => {
    return apiResponse(() => {
      const dress = dresses.find(d => d.id === id);
      if (!dress) {
        throw new Error('Dress not found');
      }
      return dress;
    });
  },
  
  create: async (dress: Omit<Dress, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Dress>> => {
    return apiResponse(() => {
      const newDress: Dress = {
        ...dress,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      dresses.push(newDress);
      return newDress;
    });
  },
  
  update: async (id: string, dress: Partial<Dress>): Promise<ApiResponse<Dress>> => {
    return apiResponse(() => {
      const index = dresses.findIndex(d => d.id === id);
      
      if (index === -1) {
        throw new Error('Dress not found');
      }
      
      const updatedDress = {
        ...dresses[index],
        ...dress,
        updatedAt: new Date().toISOString()
      };
      
      dresses[index] = updatedDress;
      return updatedDress;
    });
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      const index = dresses.findIndex(d => d.id === id);
      
      if (index === -1) {
        throw new Error('Dress not found');
      }
      
      dresses.splice(index, 1);
    });
  },
  
  search: async (query: string): Promise<ApiResponse<Dress[]>> => {
    return apiResponse(() => {
      const lowercaseQuery = query.toLowerCase();
      return dresses.filter(
        d => d.name.toLowerCase().includes(lowercaseQuery) || 
             d.description.toLowerCase().includes(lowercaseQuery) ||
             d.category.toLowerCase().includes(lowercaseQuery) ||
             d.color.toLowerCase().includes(lowercaseQuery)
      );
    });
  },
  
  getAvailable: async (): Promise<ApiResponse<Dress[]>> => {
    return apiResponse(() => dresses.filter(d => d.isAvailable));
  }
};

// Bookings API
export const bookingsApi = {
  getAll: async (): Promise<ApiResponse<Booking[]>> => {
    return apiResponse(() => {
      // Add customer and dress details to bookings
      return bookings.map(booking => ({
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      }));
    });
  },
  
  getById: async (id: string): Promise<ApiResponse<Booking>> => {
    return apiResponse(() => {
      const booking = bookings.find(b => b.id === id);
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      return {
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      };
    });
  },
  
  create: async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Booking>> => {
    return apiResponse(() => {
      const newBooking: Booking = {
        ...booking,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      bookings.push(newBooking);
      
      // Add customer and dress details
      return {
        ...newBooking,
        customer: customers.find(c => c.id === newBooking.customerId),
        dress: dresses.find(d => d.id === newBooking.dressId)
      };
    });
  },
  
  update: async (id: string, booking: Partial<Booking>): Promise<ApiResponse<Booking>> => {
    return apiResponse(() => {
      const index = bookings.findIndex(b => b.id === id);
      
      if (index === -1) {
        throw new Error('Booking not found');
      }
      
      const updatedBooking = {
        ...bookings[index],
        ...booking,
        updatedAt: new Date().toISOString()
      };
      
      bookings[index] = updatedBooking;
      
      // Add customer and dress details
      return {
        ...updatedBooking,
        customer: customers.find(c => c.id === updatedBooking.customerId),
        dress: dresses.find(d => d.id === updatedBooking.dressId)
      };
    });
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiResponse(() => {
      const index = bookings.findIndex(b => b.id === id);
      
      if (index === -1) {
        throw new Error('Booking not found');
      }
      
      bookings.splice(index, 1);
    });
  },
  
  getByCustomerId: async (customerId: string): Promise<ApiResponse<Booking[]>> => {
    return apiResponse(() => {
      const customerBookings = bookings.filter(b => b.customerId === customerId);
      
      // Add customer and dress details
      return customerBookings.map(booking => ({
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      }));
    });
  },
  
  getByDressId: async (dressId: string): Promise<ApiResponse<Booking[]>> => {
    return apiResponse(() => {
      const dressBookings = bookings.filter(b => b.dressId === dressId);
      
      // Add customer and dress details
      return dressBookings.map(booking => ({
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      }));
    });
  },
  
  getActive: async (): Promise<ApiResponse<Booking[]>> => {
    return apiResponse(() => {
      const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
      
      // Add customer and dress details
      return activeBookings.map(booking => ({
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      }));
    });
  }
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return apiResponse(() => dashboardStats);
  },
  
  getRecentActivities: async (): Promise<ApiResponse<RecentActivity[]>> => {
    return apiResponse(() => [...recentActivities]);
  },
  
  getUpcomingBookings: async (): Promise<ApiResponse<Booking[]>> => {
    return apiResponse(() => {
      const today = new Date();
      const upcomingBookings = bookings
        .filter(b => new Date(b.startDate) > today && (b.status === 'confirmed' || b.status === 'pending'))
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, 5);
      
      // Add customer and dress details
      return upcomingBookings.map(booking => ({
        ...booking,
        customer: customers.find(c => c.id === booking.customerId),
        dress: dresses.find(d => d.id === booking.dressId)
      }));
    });
  }
}; 