// services/api-client.ts
import axios from 'axios';

// Get API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Determine the base path to use for API requests
// The NestJS backend appears to be using a global prefix 'api'
export const basePath = '/api';

console.log('API Client Configuration:', { 
  baseURL: API_URL,
  basePath
});

// Create the axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Set a reasonable timeout
  timeout: 15000,
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, 
        config.params ? { params: config.params } : '');
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
        { status: response.status });
    }
    return response;
  },
  async (error) => {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside the 2xx range
      const errorInfo = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase()
      };
      
      // More concise error logging
      console.error(`API Error (${errorInfo.status}): ${errorInfo.url}`, 
        error.response.data?.message || error.response.statusText);
      
      // Handle 401 Unauthorized errors - but not for auth endpoints
      if (error.response.status === 401) {
        const authPaths = ['/auth/login', '/auth/register', '/api/auth/login', '/api/auth/register'];
        const isAuthPath = authPaths.some(path => error.config?.url?.includes(path));
        
        if (!isAuthPath) {
          console.log('Unauthorized access, clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect to login in browser environment
          if (typeof window !== 'undefined') {
            // Don't redirect if already on login page
            if (!window.location.pathname.includes('/login')) {
              window.location.href = `/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
            }
          }
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Network Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        error: error.message
      });
      
      // Check if this might be a CORS or network connectivity issue
      if (error.message.includes('Network Error')) {
        console.warn('This might be a CORS issue or the API server is unreachable.');
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;