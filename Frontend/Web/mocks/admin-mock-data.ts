// mocks/admin-mock-data.ts
export const mockDashboardStats = {
    totalUsers: 245,
    totalBookings: 128,
    totalRevenue: 42500,
    pendingVerifications: 12,
    companionApplications: 8
  };
  
  export const mockUsers = Array.from({ length: 20 }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: `User`,
    lastName: `${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i === 0 ? 'admin' : (i % 3 === 0 ? 'companion' : 'tourist'),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    isActive: i % 5 !== 0
  }));
  
  export const mockBookings = Array.from({ length: 15 }, (_, i) => ({
    id: `booking-${i + 1}`,
    tourist: {
      firstName: `Tourist`,
      lastName: `${i + 1}`,
    },
    companion: {
      firstName: `Companion`,
      lastName: `${i % 5 + 1}`,
    },
    startDate: new Date(Date.now() + i * 86400000).toISOString(),
    endDate: new Date(Date.now() + (i + 1) * 86400000).toISOString(),
    status: ['pending', 'confirmed', 'completed', 'cancelled'][i % 4],
    totalAmount: (i + 1) * 1000
  }));
  
  export const mockPayments = Array.from({ length: 12 }, (_, i) => ({
    id: `payment-${i + 1}`,
    booking: {
      id: `booking-${i + 1}`,
      tourist: {
        firstName: `Tourist`,
        lastName: `${i + 1}`,
      }
    },
    amount: (i + 1) * 1000,
    method: ['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'WALLET'][i % 4],
    status: ['completed', 'pending', 'failed'][i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toISOString()
  }));
  
  export const mockCompanionApplications = Array.from({ length: 8 }, (_, i) => ({
    id: `application-${i + 1}`,
    user: {
      firstName: `Applicant`,
      lastName: `${i + 1}`,
      email: `applicant${i + 1}@example.com`
    },
    bio: `Experienced guide with ${3 + i} years of experience in tourism.`,
    languages: ['English', 'Hindi', i % 2 === 0 ? 'French' : 'German'],
    specialties: ['History', 'Food', i % 3 === 0 ? 'Architecture' : 'Shopping'],
    hourlyRate: 20 + i * 5,
    status: ['pending', 'approved', 'rejected'][i % 3]
  }));