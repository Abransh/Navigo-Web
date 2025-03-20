// services/admin-service.ts
import apiClient, { basePath } from './api-client';
import { 
  mockDashboardStats, 
  mockUsers, 
  mockBookings, 
  mockPayments, 
  mockCompanionApplications 
} from '@/mocks/admin-mock-data';

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
      // Use mock data in development
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockDashboardStats;
      }
      
      const response = await apiClient.get(`${basePath}/admin/stats`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      return mockDashboardStats; // Fallback to mock data
    }
  },

  // User Management
  getUsers: async (page = 1, limit = 10, filter = ''): Promise<{ 
    users: UserManagement[], 
    total: number, 
    page: number 
  }> => {
    try {
      // Use mock data in development
      if (process.env.NODE_ENV === 'development') {
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
      
      const response = await apiClient.get(`${basePath}/admin/users`, {
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
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { success: true };
      }
      
      return apiClient.patch(`${basePath}/admin/users/${userId}/status`, { isActive });
    } catch (error) {
      console.error('Failed to update user status:', error);
      throw error;
    }
  },

  // Bookings management
  getBookings: async (page = 1, limit = 10, filter = ''): Promise<any> => {
    try {
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredBookings = [...mockBookings];
        if (filter) {
          const lowercaseFilter = filter.toLowerCase();
          filteredBookings = mockBookings.filter(booking => 
            booking.tourist.firstName.toLowerCase().includes(lowercaseFilter) ||
            booking.tourist.lastName.toLowerCase().includes(lowercaseFilter) ||
            booking.companion.firstName.toLowerCase().includes(lowercaseFilter) ||
            booking.companion.lastName.toLowerCase().includes(lowercaseFilter) ||
            booking.status.toLowerCase().includes(lowercaseFilter)
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
      
      const response = await apiClient.get(`${basePath}/admin/bookings`, {
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
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
          payments: mockPayments.slice(start, end),
          total: mockPayments.length,
          page
        };
      }
      
      const response = await apiClient.get(`${basePath}/admin/payments`, {
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
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const start = (page - 1) * limit;
        const end = start + limit;
        
        return {
          applications: mockCompanionApplications.slice(start, end),
          total: mockCompanionApplications.length,
          page
        };
      }
      
      const response = await apiClient.get(`${basePath}/admin/companion-applications`, {
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
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { success: true };
      }
      
      const response = await apiClient.patch(`${basePath}/admin/companion-applications/${applicationId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Failed to process companion application:', error);
      throw error;
    }
  }
};

export default adminService;