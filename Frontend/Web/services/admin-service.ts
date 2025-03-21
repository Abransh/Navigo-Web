// services/admin-service.ts
import apiClient, { basePath } from './api-client';
import { 
  mockDashboardStats, 
  mockUsers, 
  mockBookings, 
  mockPayments, 
  mockCompanionApplications 
} from '../mocks/admin-mock-data';

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
  isVerified?: boolean;
}

export interface BookingManagement {
  id: string;
  tourist: {
    id: string;
    firstName: string;
    lastName: string;
  };
  companion: {
    id: string;
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}

export interface CompanionApplication {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  languages: string[];
  specialties: string[];
  hourlyRate: number;
  bio: string;
  status: string;
}

const adminService = {
  // Fetch dashboard statistics
  getDashboardStats: async (): Promise<AdminStats> => {
    try {
      // In development, we can use mock data or real API based on environment
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('Using mock dashboard stats');
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockDashboardStats;
      }
      
      const response = await apiClient.get(`${basePath}/admin/stats`);
      console.log('Dashboard stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      // Fallback to mock data
      return mockDashboardStats;
    }
  },

  // User Management
  getUsers: async (page = 1, limit = 10, filter = ''): Promise<{ 
    users: UserManagement[], 
    total: number, 
    page: number 
  }> => {
    try {
      // In development, we can use mock data or real API based on environment
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('Using mock users data');
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
      
      console.log('Users response:', response.data);
      
      // Transform data if needed to match expected format
      const transformedData = {
        users: response.data.users.map((user: UserManagement) => ({
          ...user,
          // Make sure all expected fields are present
          isActive: user.isActive !== undefined ? user.isActive : true,
        })),
        total: response.data.total,
        page: response.data.page
      };
      
      return transformedData;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      
      // Return mock data on error
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
  },

  // Update user status
  updateUserStatus: async (userId: string, status: 'active' | 'suspended'): Promise<any> => {
    const isActive = status === 'active';
    try {
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log(`Mock: Setting user ${userId} to ${status}`);
        await new Promise(resolve => setTimeout(resolve, 600));
        return { success: true };
      }
      
      const response = await apiClient.patch(`${basePath}/admin/users/${userId}/status`, { 
        isActive 
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to update user status:', error);
      throw error;
    }
  },

  // Bookings management
  getBookings: async (page = 1, limit = 10, filter = ''): Promise<{
    bookings: BookingManagement[],
    total: number,
    page: number
  }> => {
    try {
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('Using mock bookings data');
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
      
      console.log('Bookings response:', response.data);
      
      // Transform data if needed to match expected format
      const transformedData = {
        bookings: response.data.bookings.map(booking => ({
          ...booking,
          // Add any transformations needed to match frontend model
          tourist: booking.tourist || { firstName: 'Unknown', lastName: 'User' },
          companion: booking.companion || { firstName: 'Unknown', lastName: 'User' }
        })),
        total: response.data.total,
        page: response.data.page
      };
      
      return transformedData;
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
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('Using mock payments data');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filteredPayments = [...mockPayments];
        if (filter) {
          const lowercaseFilter = filter.toLowerCase();
          filteredPayments = mockPayments.filter(payment => 
            payment.booking.tourist.firstName.toLowerCase().includes(lowercaseFilter) ||
            payment.booking.tourist.lastName.toLowerCase().includes(lowercaseFilter) ||
            payment.status.toLowerCase().includes(lowercaseFilter) ||
            payment.method.toLowerCase().includes(lowercaseFilter)
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
      
      const response = await apiClient.get(`${basePath}/admin/payments`, {
        params: { page, limit, filter }
      });
      
      console.log('Payments response:', response.data);
      
      // Transform data if needed
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
  getCompanionApplications: async (page = 1, limit = 10): Promise<{
    applications: CompanionApplication[],
    total: number,
    page: number
  }> => {
    try {
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('Using mock companion applications data');
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
      
      console.log('Companion applications response:', response.data);
      
      // Transform data if needed
      const transformedData = {
        applications: response.data.applications.map(app => ({
          ...app,
          // Add any transformations needed
          status: app.status || 'pending',
          languages: app.languages || [],
          specialties: app.specialties || []
        })),
        total: response.data.total,
        page: response.data.page
      };
      
      return transformedData;
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
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log(`Mock: Processing companion application ${applicationId} as ${status}`);
        await new Promise(resolve => setTimeout(resolve, 600));
        return { success: true, status };
      }
      
      const response = await apiClient.patch(`${basePath}/admin/companion-applications/${applicationId}`, { 
        status 
      });
      
      return response.data;
    } catch (error) {
      console.error('Failed to process companion application:', error);
      throw error;
    }
  }
};

export default adminService;