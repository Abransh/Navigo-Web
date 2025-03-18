// contexts/auth-context.tsx
"use client"; 

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import authService, { LoginCredentials, RegisterData, AuthResponse } from '@/services/auth-service';
import apiClient from '@/services/api-client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
          // const verifiedUser = await userService.verifyToken();
          // setUser(verifiedUser);
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

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await authService.login(credentials);
      
      // Save user data
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Save user to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Set token in apiClient for future requests
      if (response.access_token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
      }
      
      console.log('Login successful:', response);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
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
      
      // Set token in apiClient for future requests
      if (response.access_token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
      }
      
      console.log('Registration successful:', response);
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
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

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
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