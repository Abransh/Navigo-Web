// contexts/auth-context.tsx
"use client"; 

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import authService, { LoginCredentials, RegisterData, AuthResponse } from '@/services/auth-service';
import apiClient from '@/services/api-client';
import { toast } from 'react-hot-toast';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  processSocialAuthToken: (token: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Set the authorization header for all future requests
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Parse and set user data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Optionally verify token with a backend call
          await refreshUserProfile();
        } catch (error) {
          console.error('Failed to restore authentication state:', error);
          // Clear invalid auth data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await authService.login(credentials);
      
      // Save user data
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Save user to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Save token to localStorage
      localStorage.setItem('token', response.access_token);
      
      // Set token in apiClient for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
      
      console.log('Login successful:', response);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      // Ensure role is set to tourist if not specified
      const registerData = {
        ...data,
        role: data.role || 'tourist'
      };
      
      const response = await authService.register(registerData);
      
      // Save user data
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Save user to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Save token to localStorage
      localStorage.setItem('token', response.access_token);
      
      // Set token in apiClient for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
      
      console.log('Registration successful:', response);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const processSocialAuthToken = async (token: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set token in API client
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      try {
        // Fetch user profile
        const userData = await authService.getCurrentUser();
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('User profile loaded after social login:', userData);
        
        toast.success('Successfully signed in!');
      } catch (error) {
        console.error('Failed to get user profile after social login:', error);
        
        // Even if getting profile fails, we still have a valid token
        // so we'll set authenticated state
        setIsAuthenticated(true);
        
        // Create a basic user object from the token
        try {
          // Extract email from JWT if possible
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const basicUser = {
            id: tokenPayload.sub,
            email: tokenPayload.email || 'user@example.com',
            firstName: 'User',
            lastName: '',
            role: tokenPayload.role || 'tourist'
          };
          
          setUser(basicUser);
          localStorage.setItem('user', JSON.stringify(basicUser));
        } catch (e) {
          console.error('Failed to parse token:', e);
        }
      }
    } catch (error) {
      console.error('Failed to process social auth token:', error);
      logout(); // Clean up if authentication fails
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear auth header
    delete apiClient.defaults.headers.common['Authorization'];
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    console.log('Logged out successfully');
  };

  const refreshUserProfile = async (): Promise<void> => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      processSocialAuthToken,
      refreshUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};