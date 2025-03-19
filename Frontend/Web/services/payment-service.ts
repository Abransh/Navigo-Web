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

const getPaymentsByBooking = async (bookingId: string): Promise<any[]> => {
  try {
    const response = await apiClient.get<any[]>(`/payments/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch payments for booking:', error);
    throw error;
  }
};

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

export default {
  createPaymentIntent,
  getPaymentsByBooking,
  refundPayment,
};