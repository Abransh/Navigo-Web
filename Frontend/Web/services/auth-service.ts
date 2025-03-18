// services/auth-service.ts
import apiClient from './api-client';

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
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Store token in localStorage
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    // Store token in localStorage
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export default {
  login,
  register,
  logout,
  isAuthenticated,
  getToken,
};