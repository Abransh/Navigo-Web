// mocks/admin-mock-data.ts
import { BookingStatus } from '@/services/booking-service';

// Dashboard Statistics
export const mockDashboardStats = {
  totalUsers: 245,
  totalBookings: 128,
  totalRevenue: 42500,
  pendingVerifications: 12,
  companionApplications: 8
};

// User Data
export const mockUsers = Array.from({ length: 20 }, (_, i) => ({
  id: `user-${i + 1}`,
  firstName: `User`,
  lastName: `${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i === 0 ? 'admin' : (i % 3 === 0 ? 'companion' : 'tourist'),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  isActive: i % 5 !== 0,
  isVerified: true,
  profilePicture: i % 4 === 0 ? `/avatars/avatar-${(i % 8) + 1}.jpg` : null
}));

// Booking Data
export const mockBookings = Array.from({ length: 15 }, (_, i) => ({
  id: `booking-${i + 1}`,
  tourist: {
    id: `user-${i + 10}`,
    firstName: `Tourist`,
    lastName: `${i + 1}`,
    email: `tourist${i + 1}@example.com`,
  },
  companion: {
    id: `companion-${i % 5 + 1}`,
    user: {
      id: `user-${i % 5 + 20}`,
      firstName: `Companion`,
      lastName: `${i % 5 + 1}`,
      email: `companion${i % 5 + 1}@example.com`,
    },
    hourlyRate: 20 + (i % 5) * 5,
  },
  startDate: new Date(Date.now() + i * 86400000).toISOString(),
  endDate: new Date(Date.now() + (i + 1) * 86400000).toISOString(),
  status: [
    BookingStatus.PENDING, 
    BookingStatus.CONFIRMED, 
    BookingStatus.COMPLETED, 
    BookingStatus.CANCELLED
  ][i % 4],
  totalAmount: (i + 1) * 1000,
  location: ['New Delhi', 'Mumbai', 'Varanasi', 'Jaipur', 'Goa'][i % 5],
  notes: i % 2 === 0 ? `Special request notes for booking ${i+1}` : null,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
}));

// Payment Data
export const mockPayments = Array.from({ length: 12 }, (_, i) => ({
  id: `payment-${i + 1}`,
  booking: {
    id: `booking-${i + 1}`,
    tourist: {
      firstName: `Tourist`,
      lastName: `${i + 1}`,
      email: `tourist${i + 1}@example.com`,
    },
    totalAmount: (i + 1) * 1000,
  },
  amount: ((i + 1) * 1000) * (i % 3 === 0 ? 0.2 : 1), // 20% or full payment
  method: ['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'WALLET'][i % 4],
  status: ['completed', 'pending', 'failed'][i % 3],
  transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
}));

// Companion Applications Data
export const mockCompanionApplications = Array.from({ length: 8 }, (_, i) => ({
  id: `application-${i + 1}`,
  user: {
    id: `user-${30 + i}`,
    firstName: `Applicant`,
    lastName: `${i + 1}`,
    email: `applicant${i + 1}@example.com`,
    profilePicture: i % 3 === 0 ? `/avatars/avatar-${(i % 8) + 1}.jpg` : null,
  },
  bio: `Experienced guide with ${3 + i} years of experience in tourism. I specialize in cultural and historical tours, and I speak multiple languages fluently. I love sharing the rich heritage of India with visitors from around the world.`,
  languages: ['English', 'Hindi', i % 2 === 0 ? 'French' : 'German'],
  specialties: ['History', 'Food', i % 3 === 0 ? 'Architecture' : 'Shopping'],
  hourlyRate: 20 + i * 5,
  isVerified: false,
  isAvailable: true,
  averageRating: 0,
  totalReviews: 0,
  status: ['pending', 'approved', 'rejected'][i % 3],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
}));