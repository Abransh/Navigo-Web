// services/api-client.ts
import axios from 'axios';

// Default to localhost:3001 if NEXT_PUBLIC_API_URL is not defined
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

console.log('API URL:', API_URL); // For debugging during development

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    // Log detailed error information for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorInfo = {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase()
      };
      
      console.error(`❌ API Error Response (${errorInfo.status}):`, 
        JSON.stringify(errorInfo, null, 2));
      
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        console.log('Unauthorized access, logging out...');
        
        // Don't log out if trying to login/register
        const authPaths = ['/auth/login', '/auth/register', '/api/auth/login', '/api/auth/register'];
        const isAuthPath = authPaths.some(path => error.config?.url?.includes(path));
        
        if (!isAuthPath) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Redirect to login if unauthorized
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
      
      // Handle 404 Not Found errors
      if (error.response.status === 404) {
        console.warn(`Route not found: ${error.config?.method} ${error.config?.url}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error - No Response:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        error: error.message
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;