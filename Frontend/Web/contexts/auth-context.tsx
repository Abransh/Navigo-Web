// contexts/auth-context.tsx
"use client"; 

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
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


// Helper function to parse JWT token
const parseJwt = (token: string) => {
  try {
    // First check if token is a string and has proper format
    if (!token || typeof token !== 'string' || !token.includes('.')) {
      return { sub: null, email: null, exp: 0 };
    }
    
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.warn('Invalid token format - missing payload section');
      return { sub: null, email: null, exp: 0 };
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return { sub: null, email: null, exp: 0 };
  }
};

// Check if a token has expired
const isTokenExpired = (token: string): boolean => {
  try {
    if (token === 'mock-jwt-token-for-admin-development') {
      return false;
    }
    const { exp } = parseJwt(token);
    // Check if expiration time exists and convert to milliseconds
    if (!exp) return true;
    
    // JWT exp is in seconds, convert to milliseconds and compare
    return Date.now() >= exp * 1000;
  } catch (e) {
    console.error('Error checking token expiration:', e);
    return true; // Assume expired on error
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage on first load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        // Add this check for force admin mode
        const forceAdmin = localStorage.getItem('forceAdmin') === 'true';
        
        // Check if we have both token and user data
        if (token && userData) {
          // Skip token expiration check if we're in force admin mode
          if (!forceAdmin && isTokenExpired(token)) {
            console.log('Token has expired, clearing auth data');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return;
          }
          
          // Set the authorization header for all future requests
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Parse and set user data
          const parsedUser = JSON.parse(userData);
          
          // Ensure admin role is set if we're in force admin mode
          if (forceAdmin && parsedUser.role?.toLowerCase() !== 'admin') {
            parsedUser.role = 'admin';
          }
          
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Skip profile refresh if we're in force admin mode
          if (!forceAdmin) {
            try {
              await refreshUserProfile();
            } catch (error) {
              console.warn('Failed to refresh user profile, but continuing with stored data:', error);
            }
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
        // Clear invalid auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const FORCE_MOCK_AUTH = process.env.NODE_ENV === 'development';

  // Modify login function
const login = async (email: string, password: string): Promise<AuthResponse> => {
  console.log('Login function called with:', email, password);

  setLoading(true);
  try {
    // DEVELOPMENT ONLY: Mock admin login
    if (FORCE_MOCK_AUTH && email === 'admin@navigo.com' && password === 'Admin123!') {
      const mockUser = {
        id: 'admin-mock-id',
        email: 'admin@navigo.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      };
      
      const mockToken = 'mock-jwt-token-for-admin-development';
      
      // Update auth state
      setUser(mockUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      // Set header for API client
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      console.log('Mock admin login successful (DEVELOPMENT ONLY)');
      
      return {
        user: mockUser,
        access_token: mockToken
      };
      }
  
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
      
      console.log('Login successful');
      const token = response.access_token;
      console.log('Token payload:', parseJwt(token));
        console.log('User from API:', response.user);
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
      
      console.log('Registration successful');
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
      
      // Extract basic info from token for fallback
      const tokenPayload = parseJwt(token);
      
      try {
        // Try to get the user profile from the API
        const userData = await authService.getCurrentUser();
        
        // Update state with profile data
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('User profile loaded after social login');
      } catch (error) {
        console.error('Failed to get user profile after social login:', error);
        
        // If API call fails, use token data as fallback
        if (tokenPayload && (tokenPayload.sub || tokenPayload.id)) {
          // Create basic user object from token data
          const basicUser: User = {
            id: tokenPayload.sub || tokenPayload.id,
            email: tokenPayload.email || `user_${(tokenPayload.sub || '').substring(0, 8)}@example.com`,
            firstName: tokenPayload.firstName || tokenPayload.given_name || 'User',
            lastName: tokenPayload.lastName || tokenPayload.family_name || '',
            role: tokenPayload.role || 'tourist'
          };
          
          // Update state with basic data
          setUser(basicUser);
          setIsAuthenticated(true);
          
          // Store in localStorage
          localStorage.setItem('user', JSON.stringify(basicUser));
          
          // Warn user about limited profile info
          toast('Signed in with limited profile information. Some features may be restricted.');
        } else {
          throw new Error('Invalid authentication token');
        }
      }
    } catch (error) {
      console.error('Failed to process social auth token:', error);
      
      // Clean up any partial auth data
      logout();
      
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
      // Check if current user already has admin role
      const currentUser = user;
      const isCurrentlyAdmin = currentUser?.role?.toLowerCase() === 'admin';
      
      const userData = await authService.getCurrentUser();
      
      if (userData) {
        // IMPORTANT: Preserve admin role if it was set before
        if (isCurrentlyAdmin && userData.role?.toLowerCase() !== 'admin') {
          console.log("Preserving admin role from previous state");
          userData.role = 'admin';
        }
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      // Don't log out or change state on error - this preserves current user
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
}; // Add this closing brace here

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};