import { writable } from 'svelte/store';
import type { AuthState, LoginCredentials, RegisterCredentials, ResetPasswordRequest, ResetPasswordConfirm, User } from '$lib/types';
import { browser } from '$app/environment';

// Initialize auth state
const initialState: AuthState = {
  user: null,
  token: browser ? localStorage.getItem('token') : null,
  isAuthenticated: browser ? !!localStorage.getItem('token') : false,
  isLoading: false
};

// Create the store
const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    login: async (credentials: LoginCredentials) => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // This would be an API call in a real application
        // For now, we'll simulate a successful login
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: credentials.email.includes('admin') ? 'Admin User' : 'Staff User',
          role: credentials.email.includes('admin') ? 'admin' : 'staff',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const mockToken = 'mock-jwt-token';
        
        // Always store token in localStorage for demo purposes
        if (browser) {
          localStorage.setItem('token', mockToken);
        }
        
        // Update store
        update(state => ({
          ...state,
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
          isLoading: false
        }));
        
        return { success: true };
      } catch (error) {
        update(state => ({ ...state, isLoading: false }));
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      }
    },
    register: async (credentials: RegisterCredentials) => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // This would be an API call in a real application
        // For now, we'll simulate a successful registration
        update(state => ({ ...state, isLoading: false }));
        return { success: true };
      } catch (error) {
        update(state => ({ ...state, isLoading: false }));
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      }
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('token');
      }
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      });
    },
    resetPassword: async (request: ResetPasswordRequest) => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // This would be an API call in a real application
        // For now, we'll simulate a successful password reset request
        update(state => ({ ...state, isLoading: false }));
        return { success: true };
      } catch (error) {
        update(state => ({ ...state, isLoading: false }));
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      }
    },
    confirmResetPassword: async (data: ResetPasswordConfirm) => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // This would be an API call in a real application
        // For now, we'll simulate a successful password reset
        update(state => ({ ...state, isLoading: false }));
        return { success: true };
      } catch (error) {
        update(state => ({ ...state, isLoading: false }));
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        };
      }
    },
    checkAuth: async () => {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // For demo purposes, we'll always authenticate the user
        // In a real application, we would validate the token with the server
        const token = browser ? localStorage.getItem('token') : null;
        
        // If there's no token, create a mock one for demo purposes
        if (!token && browser) {
          localStorage.setItem('token', 'mock-jwt-token');
        }
        
        // Mock user data
        const mockUser: User = {
          id: '1',
          email: 'admin@luxurious.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        update(state => ({
          ...state,
          user: mockUser,
          token: token || 'mock-jwt-token',
          isAuthenticated: true,
          isLoading: false
        }));
        
        return true;
      } catch (error) {
        if (browser) {
          localStorage.removeItem('token');
        }
        
        update(state => ({
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        }));
        
        return false;
      }
    }
  };
};

export const auth = createAuthStore(); 