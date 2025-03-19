// services/admin-service.ts
import apiClient from './api-client';

export interface AdminStats {
  totalUsers: number;
  totalTourists: number;
  totalCompanions: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVerifications: number;
  activeBookings: number;
  companionApplications: number;
  recentReviews: any[];
  recentPayments: any[];
  recentRegistrations: any[];
}

export interface UserManagement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface BookingManagement {
  id: string;
  tourist: {
    firstName: string;
    lastName: string;
  };
  companion: {
    firstName: string;
    lastName: string;
  };
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  booking: {
    id: string;
    tourist: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface CompanionApplication {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  bio: string;
  languages: string[];
  specialties: string[];
  hourlyRate: number;
  status: 'pending' | 'approved' | 'rejected';
}

const adminService = {
  // Fetch overall dashboard statistics
  getDashboardStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  // User Management
  getUsers: async (page = 1, limit = 10, filter = ''): Promise<{ 
    users: UserManagement[], 
    total: number, 
    page: number 
  }> => {
    const response = await apiClient.get('/admin/users', {
      params: { page, limit, filter }
    });
    return response.data;
  },

  updateUserStatus: async (userId: string, status: 'active' | 'suspended') => {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  // Booking Management
  getBookings: async (page = 1, limit = 10, filter = ''): Promise<{ 
    bookings: BookingManagement[], 
    total: number, 
    page: number 
  }> => {
    const response = await apiClient.get('/admin/bookings', {
      params: { page, limit, filter }
    });
    return response.data;
  },

  // Payment Management
  getPayments: async (page = 1, limit = 10, filter = ''): Promise<{ 
    payments: PaymentRecord[], 
    total: number, 
    page: number 
  }> => {
    const response = await apiClient.get('/admin/payments', {
      params: { page, limit, filter }
    });
    return response.data;
  },

  // Companion Applications
  getCompanionApplications: async (page = 1, limit = 10): Promise<{ 
    applications: CompanionApplication[], 
    total: number, 
    page: number 
  }> => {
    const response = await apiClient.get('/admin/companion-applications', {
      params: { page, limit }
    });
    return response.data;
  },

  processCompanionApplication: async (applicationId: string, status: 'approved' | 'rejected') => {
    const response = await apiClient.patch(`/admin/companion-applications/${applicationId}`, { status });
    return response.data;
  },

  // Companion Management
  getVerifiedCompanions: async (page = 1, limit = 10): Promise<any[]> => {
    const response = await apiClient.get('/admin/companions', {
      params: { page, limit }
    });
    return response.data;
  }
};

export default adminService;