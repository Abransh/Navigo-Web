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
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log detailed error information for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        console.log('Unauthorized access, logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login if unauthorized
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;