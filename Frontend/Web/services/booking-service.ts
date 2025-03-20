// services/booking-service.ts
import apiClient from './api-client';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  WALLET = 'WALLET',
  BANK_TRANSFER = 'BANK_TRANSFER',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  CASH = 'CASH',
}

export interface Companion {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  languages: string[];
  specialties: string[];
  hourlyRate: number;
  averageRating: number;
  totalReviews: number;
  profilePicture?: string;
}

export interface Booking {
  id: string;
  touristId: string;
  companionId: string;
  companion?: Companion;
  startDate: string;
  endDate: string;
  location?: string;
  notes?: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  paymentOption?: 'pay-now' | 'pay-later';
}

export interface CreateBookingData {
  companionId: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  location?: string;
  notes?: string;
  paymentOption?: 'pay-now' | 'pay-later';
}

export interface BookingReviewData {
  bookingId: string;
  rating: number;
  comment: string;
}

/**
 * Create a new booking
 */
const createBooking = async (data: CreateBookingData): Promise<Booking> => {
  const response = await apiClient.post<Booking>('/bookings', data);
  return response.data;
};

/**
 * Get all bookings for the current user
 */
const getUserBookings = async (status?: BookingStatus): Promise<Booking[]> => {
  const params = status ? { status } : {};
  const response = await apiClient.get<Booking[]>('/bookings', { params });
  return response.data;
};

/**
 * Get a specific booking by ID
 */
const getBookingById = async (id: string): Promise<Booking> => {
  const response = await apiClient.get<Booking>(`/bookings/${id}`);
  return response.data;
};

/**
 * Update a booking (can be used to cancel a booking)
 */
const updateBooking = async (id: string, data: Partial<CreateBookingData> | { status: BookingStatus }): Promise<Booking> => {
  const response = await apiClient.patch<Booking>(`/bookings/${id}`, data);
  return response.data;
};

/**
 * Cancel a booking
 */
const cancelBooking = async (id: string, reason?: string): Promise<Booking> => {
  return updateBooking(id, { 
    status: BookingStatus.CANCELLED, 
    notes: reason 
  });
};

/**
 * Create a review for a completed booking
 */
const createReview = async (data: BookingReviewData): Promise<any> => {
  const response = await apiClient.post<any>('/reviews', data);
  return response.data;
};

/**
 * Calculate an estimated price for a booking before creating it
 */
const calculatePrice = async (companionId: string, startDate: string, endDate: string): Promise<{totalAmount: number}> => {
  const response = await apiClient.post<{totalAmount: number}>('/bookings/calculate-price', {
    companionId,
    startDate,
    endDate
  });
  return response.data;
};

/**
 * Get available time slots for a companion on a specific date
 */
const getAvailableTimeSlots = async (companionId: string, date: string): Promise<string[]> => {
  const response = await apiClient.get<string[]>(`/bookings/available-slots`, {
    params: { companionId, date }
  });
  return response.data;
};

/**
 * Get companion availability calendar (days with available slots)
 */
const getCompanionAvailability = async (companionId: string, month: number, year: number): Promise<string[]> => {
  const response = await apiClient.get<string[]>(`/bookings/availability`, {
    params: { companionId, month, year }
  });
  return response.data;
};

/**
 * Get upcoming bookings
 */
const getUpcomingBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>(`/bookings/upcoming`);
  return response.data;
};

/**
 * Complete a booking (mark as completed)
 */
const completeBooking = async (id: string): Promise<Booking> => {
  return updateBooking(id, { status: BookingStatus.COMPLETED });
};

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  createReview,
  calculatePrice,
  getAvailableTimeSlots,
  getCompanionAvailability,
  getUpcomingBookings,
  completeBooking,
};