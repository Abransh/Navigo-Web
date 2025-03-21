// services/admin-service.ts
import apiClient from './api-client';
import { ADMIN_PATHS } from './admin-paths';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  mockDashboardStats, 
  mockUsers, 
  mockBookings, 
  mockPayments, 
  mockCompanionApplications 
} from '../mocks/admin-mock-data';

// Flag to force using mock data (for testing)
// Set this to true to always use mock data regardless of environment
const FORCE_MOCK = false;

// Helper function to determine if we should use mock data
const useMockData = () => {
  // Only use mock data when specifically requested
  // This is now turned off by default - we want to use real data
  return FORCE_MOCK;
};

/**
 * Dashboard statistics interface
 */
export interface AdminStats {
  totalUsers: number;
  totalCompanions: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVerifications: number;
  companionApplications: number;
}

/**
 * User management interface
 */
export interface UserManagement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
  isVerified?: boolean;
}

/**
 * Booking interface for admin
 */
export interface AdminBooking {
  id: string;
  tourist: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  companion: {
    id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    hourlyRate: number;
  };
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment record interface
 */
export interface PaymentRecord {
  id: string;
  booking: {
    id: string;
    tourist: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  createdAt: string;
}

/**
 * Companion application interface
 */
export interface CompanionApplication {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
  };
  bio: string;
  languages: string[];
  specialties: string[];
  hourlyRate: number;
  status: string;
  createdAt: string;
}

/**
 * Admin service for handling all admin-related API calls
 */
const adminService = {
  /**
   * Fetch dashboard statistics
   */
  // In admin-service.ts, modify error handling in getDashboardStats and other methods
getDashboardStats: async (): Promise<AdminStats> => {
  try {
    console.log('Fetching admin dashboard stats from API');
    
    const response = await apiClient.get<AdminStats>(ADMIN_PATHS.STATS);
    
    console.log('Successfully fetched admin stats from API');
    return response.data;
  } catch (error: any) {
    // More detailed error logging
    console.error('Failed to fetch admin stats:', error);
    console.error('Request URL:', ADMIN_PATHS.STATS);
    
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    
    // Show error toast with specific message
    if (error.response?.status === 401) {
      toast.error('Authentication required. Please log in again.');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to access admin statistics.');
    } else {
      toast.error('Failed to load dashboard statistics. Using backup data.');
    }
    
    // Fallback to mock data on error
    return mockDashboardStats;
  }
},

  /**
   * Get users with pagination and filtering
   */
  getUsers: async (page = 1, limit = 10, filter = ''): Promise<{ 
    users: UserManagement[], 
    total: number, 
    page: number,
    limit: number 
  }> => {
    try {
      console.log(`Fetching users from API: page=${page}, limit=${limit}, filter="${filter}"`);
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.USERS, {
        params: { page, limit, filter }
      });
      
      console.log(`Successfully fetched ${response.data.users.length} users from API`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to fetch users:', error);
      
      // Show toast with specific message based on error
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to access user data.');
      } else if (error.response?.status === 500) {
        toast.error('Database error while loading users. Using backup data.');
      } else {
        toast.error('Failed to load users. Using backup data.');
      }
      
      // Fallback to mock data on error
      let filteredUsers = [...mockUsers];
      if (filter) {
        const lowercaseFilter = filter.toLowerCase();
        filteredUsers = mockUsers.filter(user => 
          user.firstName.toLowerCase().includes(lowercaseFilter) ||
          user.lastName.toLowerCase().includes(lowercaseFilter) ||
          user.email.toLowerCase().includes(lowercaseFilter) ||
          user.role.toLowerCase().includes(lowercaseFilter)
        );
      }
      
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, filteredUsers.length);
      
      return {
        users: filteredUsers.slice(start, end),
        total: filteredUsers.length,
        page,
        limit
      };
    }
  },

  /**
   * Update user status (active/suspended)
   */
  updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<any> => {
    const isActive = status === 'active';
    try {
      console.log(`Updating user ${userId} status to ${status}`);
      
      // Use real API by default
      const response = await apiClient.patch(
        ADMIN_PATHS.USER_STATUS(userId), 
        { isActive }
      );
      
      // Show success message
      toast.success(`User ${status === 'active' ? 'activated' : 'suspended'} successfully`);
      
      console.log(`Successfully updated user status: ${userId}`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to update user status:', error);
      
      // Show specific error message
      if (error.response?.status === 404) {
        toast.error('User not found. They may have been deleted.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to update this user.');
      } else {
        toast.error(`Failed to ${status} user. Please try again.`);
      }
      
      // If using mock data for testing, update the mock data too
      if (useMockData()) {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex >= 0) {
          mockUsers[userIndex].isActive = isActive;
          return { success: true };
        }
      }
      
      // Rethrow error for component error handling
      throw error;
    }
  },

  /**
   * Get bookings with pagination and filtering
   */
  getBookings: async (page = 1, limit = 10, filter = ''): Promise<{
    bookings: AdminBooking[],
    total: number,
    page: number,
    limit: number
  }> => {
    try {
      console.log(`Fetching bookings from API: page=${page}, limit=${limit}, filter="${filter}"`);
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.BOOKINGS, {
        params: { page, limit, filter }
      });
      
      console.log(`Successfully fetched ${response.data.bookings.length} bookings from API`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to fetch bookings:', error);
      
      // Show toast with specific message based on error
      if (error.response?.status === 401) {
        toast.error('Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to access booking data.');
      } else {
        toast.error('Failed to load bookings. Using backup data.');
      }
      
      // Fallback to mock data on error
      let filteredBookings = [...mockBookings];
      if (filter) {
        const lowercaseFilter = filter.toLowerCase();
        filteredBookings = mockBookings.filter(booking => 
          booking.tourist.firstName?.toLowerCase().includes(lowercaseFilter) ||
          booking.tourist.lastName?.toLowerCase().includes(lowercaseFilter) ||
          booking.companion.user?.firstName?.toLowerCase().includes(lowercaseFilter) ||
          booking.companion.user?.lastName?.toLowerCase().includes(lowercaseFilter) ||
          booking.status?.toLowerCase().includes(lowercaseFilter) ||
          booking.location?.toLowerCase().includes(lowercaseFilter)
        );
      }
      
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, filteredBookings.length);
      
      return { 
        bookings: filteredBookings.slice(start, end), 
        total: filteredBookings.length, 
        page,
        limit
      };
    }
  },

  /**
   * Get a single booking by ID
   */
  getBookingById: async (id: string): Promise<AdminBooking> => {
    try {
      console.log(`Fetching booking details for ID: ${id}`);
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.BOOKING_DETAILS(id));
      
      console.log('Successfully fetched booking details');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch booking details:', error);
      
      // Show error toast
      if (error.response?.status === 404) {
        toast.error('Booking not found');
      } else {
        toast.error('Failed to load booking details');
      }
      
      // Find the booking in mock data
      const mockBooking = mockBookings.find(b => b.id === id);
      if (mockBooking) {
        return mockBooking;
      }
      
      // Rethrow if not found in mock data either
      throw error;
    }
  },

  /**
   * Get payments with pagination and filtering
   */
  getPayments: async (page = 1, limit = 10, filter = ''): Promise<{
    payments: PaymentRecord[],
    total: number,
    page: number,
    limit: number
  }> => {
    try {
      console.log(`Fetching payments from API: page=${page}, limit=${limit}, filter="${filter}"`);
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.PAYMENTS, {
        params: { page, limit, filter }
      });
      
      console.log(`Successfully fetched ${response.data.payments.length} payments from API`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to fetch payments:', error);
      
      // Show error toast
      toast.error('Failed to load payment data. Using backup data.');
      
      // Fallback to mock data on error
      let filteredPayments = [...mockPayments];
      if (filter) {
        const lowercaseFilter = filter.toLowerCase();
        filteredPayments = mockPayments.filter(payment => 
          payment.booking?.tourist?.firstName?.toLowerCase().includes(lowercaseFilter) ||
          payment.booking?.tourist?.lastName?.toLowerCase().includes(lowercaseFilter) ||
          payment.status?.toLowerCase().includes(lowercaseFilter) ||
          payment.method?.toLowerCase().includes(lowercaseFilter) ||
          payment.transactionId?.toLowerCase().includes(lowercaseFilter)
        );
      }
      
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, filteredPayments.length);
      
      return { 
        payments: filteredPayments.slice(start, end), 
        total: filteredPayments.length, 
        page,
        limit
      };
    }
  },

  /**
   * Get companion applications with pagination
   */
  getCompanionApplications: async (page = 1, limit = 10): Promise<{
    applications: CompanionApplication[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }> => {
    try {
      console.log(`Fetching companion applications from API: page=${page}, limit=${limit}`);
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.COMPANION_APPLICATIONS, {
        params: { page, limit }
      });
      
      console.log(`Successfully fetched ${response.data.applications.length} applications from API`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to fetch companion applications:', error);
      
      // Show error toast
      if (error.response?.status === 401) {
        toast.error('Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to access applications.');
      } else {
        toast.error('Failed to load companion applications. Using backup data.');
      }
      
      // Fallback to mock data on error
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, mockCompanionApplications.length);
      const totalPages = Math.ceil(mockCompanionApplications.length / limit);
      
      return { 
        applications: mockCompanionApplications.slice(start, end), 
        total: mockCompanionApplications.length, 
        page,
        limit,
        totalPages
      };
    }
  },

  /**
   * Process companion application (approve/reject)
   */
  processCompanionApplication: async (applicationId: string, status: 'approved' | 'rejected'): Promise<any> => {
    try {
      console.log(`Processing application ${applicationId} with status ${status}`);
      
      // Use real API by default
      const response = await apiClient.patch(
        ADMIN_PATHS.PROCESS_APPLICATION(applicationId), 
        { status }
      );
      
      // Show success message
      toast.success(`Application ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      
      console.log(`Successfully processed application: ${applicationId}`);
      return response.data;
    } catch (error: any) {
      // Log the error
      console.error('Failed to process companion application:', error);
      
      // Show specific error message
      if (error.response?.status === 404) {
        toast.error('Application not found. It may have already been processed.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to process applications.');
      } else {
        toast.error(`Failed to ${status} application. Please try again.`);
      }
      
      // If using mock data for testing, update the mock data
      if (useMockData()) {
        const appIndex = mockCompanionApplications.findIndex(a => a.id === applicationId);
        if (appIndex >= 0) {
          mockCompanionApplications[appIndex].status = status;
          return { success: true };
        }
      }
      
      // Rethrow error for component error handling
      throw error;
    }
  },

  /**
   * Get application statistics
   */
  getApplicationStats: async (): Promise<{
    total: number,
    pending: number,
    approved: number,
    rejected: number
  }> => {
    try {
      console.log('Fetching application statistics from API');
      
      // Use real API by default
      const response = await apiClient.get(ADMIN_PATHS.COMPANION_APPLICATION_STATS);
      
      console.log('Successfully fetched application statistics');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch application statistics:', error);
      
      // Fallback to calculating from mock data
      const total = mockCompanionApplications.length;
      const pending = mockCompanionApplications.filter(app => app.status === 'pending').length;
      const approved = mockCompanionApplications.filter(app => app.status === 'approved').length;
      const rejected = mockCompanionApplications.filter(app => app.status === 'rejected').length;
      
      return {
        total,
        pending,
        approved,
        rejected
      };
    }
  },

  /**
   * Check if API endpoints are available
   * Useful for determining if we need to fallback to mock data
   */
  checkApiAvailability: async (): Promise<boolean> => {
    try {
      await apiClient.get(ADMIN_PATHS.STATS);
      return true;
    } catch (error) {
      console.error('Admin API endpoints not available:', error);
      return false;
    }
  }
};

export default adminService;