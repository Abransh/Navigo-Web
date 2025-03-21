// services/admin-service.ts
import apiClient from './api-client';
import { ADMIN_PATHS } from './admin-paths';
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
  return FORCE_MOCK || process.env.NODE_ENV === 'development';
};

export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVerifications: number;
  companionApplications: number;
}

export interface UserManagement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

const adminService = {
  // Fetch dashboard statistics
  getDashboardStats: async (): Promise<AdminStats> => {
    try {
      // Use mock data in development or if forced
      if (useMockData()) {
        console.log('Using mock data for admin stats');
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockDashboardStats;
      }
      
      // Use real API in production
      const response = await apiClient.get(ADMIN_PATHS.STATS);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      return mockDashboardStats; // Fallback to mock data on error
    }
  },

  // User Management
  getUsers: async (page = 1, limit = 10, filter = ''): Promise<{ 
    users: UserManagement[], 
    total: number, 
    page: number 
  }> => {
    try {
      // Use mock data in development or if forced
      if (useMockData()) {
        console.log('Using mock data for users');
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
        const end = start + limit;
        
        return {
          users: filteredUsers.slice(start, end),
          total: filteredUsers.length,
          page
        };
      }
      
      // Use real API in production
      const response = await apiClient.get(ADMIN_PATHS.USERS, {
        params: { page, limit, filter }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      
      // Return mock data on error
      let filteredUsers = [...mockUsers];
      const start = (page - 1) * limit;
      const end = start + limit;
      
      return {
        users: filteredUsers.slice(start, end),
        total: filteredUsers.length,
        page
      };
    }
  },

  // Update user status
  updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<any> => {
    const isActive = status === 'active';
    try {
      if (useMockData()) {
        console.log(`Mock: Updating user ${userId} status to ${status}`);
        await new Promise(resolve => setTimeout(resolve, 600));
        // Update mock data for consistency in the session
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex >= 0) {
          mockUsers[userIndex].isActive = isActive;
        }
        return { success: true };
      }
      
      // Use real API in production
      const response = await apiClient.patch(
        ADMIN_PATHS.USER_STATUS(userId), 
        { isActive }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update user status:', error);
      throw error;
    }
  },

  // Bookings management
  getBookings: async (page = 1, limit = 10, filter = ''): Promise<any> => {
    try {
      if (useMockData()) {
        console.log('Using mock data for bookings');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredBookings = [...mockBookings];
        if (filter) {
          const lowercaseFilter = filter.toLowerCase();
          filteredBookings = mockBookings.filter(booking => 
            booking.tourist.firstName?.toLowerCase().includes(lowercaseFilter) ||
            booking.tourist.lastName?.toLowerCase().includes(lowercaseFilter) ||
            booking.companion.firstName?.toLowerCase().includes(lowercaseFilter) ||
            booking.companion.lastName?.toLowerCase().includes(lowercaseFilter) ||
            booking.status?.toLowerCase().includes(lowercaseFilter)
          );
        }
        
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
          bookings: filteredBookings.slice(start, end),
          total: filteredBookings.length,
          page
        };
      }
      
      // Use real API in production
      const response = await apiClient.get(ADMIN_PATHS.BOOKINGS, {
        params: { page, limit, filter }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      
      // Return mock data on error
      const start = (page - 1) * limit;
      const end = start + limit;
      return { 
        bookings: mockBookings.slice(start, end), 
        total: mockBookings.length, 
        page 
      };
    }
  },

  // Payment management
  getPayments: async (page = 1, limit = 10, filter = ''): Promise<any> => {
    try {
      if (useMockData()) {
        console.log('Using mock data for payments');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredPayments = [...mockPayments];
        if (filter) {
          const lowercaseFilter = filter.toLowerCase();
          filteredPayments = mockPayments.filter(payment => 
            payment.booking?.tourist?.firstName?.toLowerCase().includes(lowercaseFilter) ||
            payment.booking?.tourist?.lastName?.toLowerCase().includes(lowercaseFilter) ||
            payment.status?.toLowerCase().includes(lowercaseFilter) ||
            payment.method?.toLowerCase().includes(lowercaseFilter)
          );
        }
        
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
          payments: filteredPayments.slice(start, end),
          total: filteredPayments.length,
          page
        };
      }
      
      // Use real API in production
      const response = await apiClient.get(ADMIN_PATHS.PAYMENTS, {
        params: { page, limit, filter }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      
      // Return mock data on error
      const start = (page - 1) * limit;
      const end = start + limit;
      return { 
        payments: mockPayments.slice(start, end), 
        total: mockPayments.length, 
        page 
      };
    }
  },

  // Companion applications
  getCompanionApplications: async (page = 1, limit = 10): Promise<any> => {
    try {
      if (useMockData()) {
        console.log('Using mock data for companion applications');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
          applications: mockCompanionApplications.slice(start, end),
          total: mockCompanionApplications.length,
          page
        };
      }
      
      // Use real API in production
      const response = await apiClient.get(ADMIN_PATHS.COMPANION_APPLICATIONS, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch companion applications:', error);
      
      // Return mock data on error
      const start = (page - 1) * limit;
      const end = start + limit;
      return { 
        applications: mockCompanionApplications.slice(start, end), 
        total: mockCompanionApplications.length, 
        page 
      };
    }
  },

  processCompanionApplication: async (applicationId: string, status: 'approved' | 'rejected'): Promise<any> => {
    try {
      if (useMockData()) {
        console.log(`Mock: Processing application ${applicationId} with status ${status}`);
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Update mock data to reflect the change 
        const appIndex = mockCompanionApplications.findIndex(a => a.id === applicationId);
        if (appIndex >= 0) {
          mockCompanionApplications[appIndex].status = status;
        }
        
        return { success: true };
      }
      
      // Use real API in production
      const response = await apiClient.patch(
        ADMIN_PATHS.PROCESS_APPLICATION(applicationId), 
        { status }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to process companion application:', error);
      throw error;
    }
  }
};

export default adminService;