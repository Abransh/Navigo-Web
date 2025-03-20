// services/payment-service.ts
import apiClient from './api-client';
import { PaymentMethod } from './booking-service';

export interface CreatePaymentIntentRequest {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
}

export interface RefundResponse {
  paymentId: string;
  refundId: string;
  amount: number;
}

/**
 * Create a payment intent for a booking
 */
const createPaymentIntent = async (
  bookingId: string, 
  amount: number, 
  method: PaymentMethod
): Promise<PaymentIntentResponse> => {
  try {
    const response = await apiClient.post<PaymentIntentResponse>('/payments', {
      bookingId,
      amount,
      method,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    throw error;
  }
};

/**
 * Get all payments for a booking
 */
const getPaymentsByBooking = async (bookingId: string): Promise<any[]> => {
  try {
    const response = await apiClient.get<any[]>(`/payments/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch payments for booking:', error);
    throw error;
  }
};

/**
 * Refund a payment
 */
const refundPayment = async (paymentId: string, amount?: number): Promise<RefundResponse> => {
  try {
    const response = await apiClient.post<RefundResponse>(`/payments/${paymentId}/refund`, {
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to refund payment:', error);
    throw error;
  }
};

/**
 * Verify payment status
 */
const verifyPaymentStatus = async (paymentId: string): Promise<{ status: string }> => {
  try {
    const response = await apiClient.get<{ status: string }>(`/payments/${paymentId}/status`);
    return response.data;
  } catch (error) {
    console.error('Failed to verify payment status:', error);
    throw error;
  }
};

/**
 * Mark a booking as paid after tour (for pay-later option)
 */
const markBookingAsPaid = async (bookingId: string, amount: number): Promise<any> => {
  try {
    const response = await apiClient.post(`/payments/mark-paid`, {
      bookingId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to mark booking as paid:', error);
    throw error;
  }
};

export default {
  createPaymentIntent,
  getPaymentsByBooking,
  refundPayment,
  verifyPaymentStatus,
  markBookingAsPaid,
};