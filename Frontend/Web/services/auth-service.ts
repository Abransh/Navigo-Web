// services/auth-service.ts
import apiClient, { basePath } from './api-client';
import { User } from '@/contexts/auth-context';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Login with email and password
 */
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(`${basePath}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

/**
 * Register a new user
 */
const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(`${basePath}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

/**
 * Get the current user profile 
 * Tries multiple endpoints to handle different API structures
 */
const getCurrentUser = async (): Promise<User> => {
  // List of possible endpoint paths to try in order of preference
  const endpointPaths = [
    `${basePath}/auth/current-user`,
    `${basePath}/auth/me`,
    `${basePath}/users/me`, 
    `/auth/current-user`,
    `/auth/me`,
    `/users/me`
  ];
  
  let lastError: any = null;
  
  // Try each endpoint until one works
  for (const path of endpointPaths) {
    try {
      console.log(`Attempting to fetch user profile from: ${path}`);
      const response = await apiClient.get<User>(path);
      
      // If successful, return the data
      console.log('Successfully fetched user profile from:', path);
      return response.data;
    } catch (error: any) {
      console.warn(`Failed to get user profile from ${path}:`, error.message);
      lastError = error;
      
      // If this is not a 404 error, it might be an auth failure (401/403)
      // We can continue trying other endpoints in case the API structure varies
      if (error.response?.status !== 404 && error.response?.status !== 401) {
        throw error;
      }
      
      // Continue to try the next endpoint
    }
  }
  
  // If we get here, all endpoints failed
  console.error('All user profile endpoints failed');
  throw lastError;
};

/**
 * Log the user out
 */
const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if the user is authenticated
 */
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

/**
 * Get the authentication token
 */
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Request a password reset
 */
const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await apiClient.post(`${basePath}/auth/forgot-password`, { email });
  } catch (error) {
    console.error('Request password reset API error:', error);
    throw error;
  }
};

/**
 * Verify a password reset token
 */
const verifyResetToken = async (token: string): Promise<boolean> => {
  try {
    const response = await apiClient.get(`${basePath}/auth/reset-password/verify/${token}`);
    return response.data.valid;
  } catch (error) {
    console.error('Verify reset token API error:', error);
    throw error;
  }
};

/**
 * Reset password with token
 */
const resetPassword = async (token: string, password: string): Promise<void> => {
  try {
    await apiClient.post(`${basePath}/auth/reset-password`, { token, password });
  } catch (error) {
    console.error('Reset password API error:', error);
    throw error;
  }
};

/**
 * Initiate OAuth login
 */
const initiateOAuthLogin = (provider: string, redirectUrl?: string): void => {
  // Get the API URL from environment variable
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  // Construct the full OAuth URL
  const oauthUrl = `${apiUrl}${basePath}/auth/${provider}`;
  
  // Store the redirect URL in localStorage if provided
  if (redirectUrl) {
    localStorage.setItem('redirectTo', redirectUrl);
  }
  
  console.log(`Initiating OAuth login to: ${oauthUrl}`);
  
  // Navigate to the OAuth provider login page
  window.location.href = oauthUrl;
};

export default {
  login,
  register,
  getCurrentUser,
  logout,
  isAuthenticated,
  getToken,
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
  initiateOAuthLogin,
};