// // services/payment-service.ts
// import apiClient from './api-client';
// import { PaymentMethod } from './booking-service';

// export interface CreatePaymentIntentRequest {
//   bookingId: string;
//   amount: number;
//   method: PaymentMethod;
// }

// export interface PaymentIntentResponse {
//   clientSecret: string;
//   paymentId: string;
//   ephemeralKey?: string; // For Apple Pay support
//   customerId?: string; // For saved payment methods
// }

// export interface RefundResponse {
//   paymentId: string;
//   refundId: string;
//   amount: number;
// }

// export interface ApplePayMerchantSession {
//   merchantSessionIdentifier: string;
//   nonce: string;
//   merchantIdentifier: string;
//   domainName: string;
//   displayName: string;
//   initiative: string;
//   initiativeContext: string;
// }

// /**
//  * Create a payment intent for a booking
//  */
// const createPaymentIntent = async (
//   bookingId: string, 
//   amount: number, 
//   method: PaymentMethod,
//   currency: string = 'inr'
// ): Promise<PaymentIntentResponse> => {
//   try {
//     const response = await apiClient.post<PaymentIntentResponse>('/payments', {
//       bookingId,
//       amount,
//       method,
//       currency,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to create payment intent:', error);
//     throw error;
//   }
// };

// /**
//  * Get all payments for a booking
//  */
// const getPaymentsByBooking = async (bookingId: string): Promise<any[]> => {
//   try {
//     const response = await apiClient.get<any[]>(`/payments/${bookingId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch payments for booking:', error);
//     throw error;
//   }
// };

// /**
//  * Refund a payment
//  */
// const refundPayment = async (paymentId: string, amount?: number): Promise<RefundResponse> => {
//   try {
//     const response = await apiClient.post<RefundResponse>(`/payments/${paymentId}/refund`, {
//       amount,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to refund payment:', error);
//     throw error;
//   }
// };

// /**
//  * Verify payment status
//  */
// const verifyPaymentStatus = async (paymentId: string): Promise<{ status: string }> => {
//   try {
//     const response = await apiClient.get<{ status: string }>(`/payments/${paymentId}/status`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to verify payment status:', error);
//     throw error;
//   }
// };

// /**
//  * Mark a booking as paid after tour (for pay-later option)
//  */
// const markBookingAsPaid = async (bookingId: string, amount: number): Promise<any> => {
//   try {
//     const response = await apiClient.post(`/payments/mark-paid`, {
//       bookingId,
//       amount,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to mark booking as paid:', error);
//     throw error;
//   }
// };

// /**
//  * Get Apple Pay merchant session for domain validation
//  * This is required to validate the domain for Apple Pay
//  */
// const getApplePayMerchantSession = async (validationURL: string): Promise<ApplePayMerchantSession> => {
//   try {
//     const response = await apiClient.post<ApplePayMerchantSession>('/payments/apple-pay-session', {
//       validationURL,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to get Apple Pay merchant session:', error);
//     throw error;
//   }
// };

// /**
//  * Check if Apple Pay is available on the current device and browser
//  */
// const isApplePayAvailable = (): boolean => {
//   if (typeof window === 'undefined') return false;
  
//   // Check for Apple Pay support
//   const isAppleDevice = window.navigator.vendor.indexOf('Apple') > -1;
//   const isIOSDevice = /iP(ad|hone|od)/.test(navigator.userAgent);
//   const hasApplePaySession = 'ApplePaySession' in window;
  
//   return isAppleDevice && isIOSDevice && hasApplePaySession;
// };

// export default {
//   createPaymentIntent,
//   getPaymentsByBooking,
//   refundPayment,
//   verifyPaymentStatus,
//   markBookingAsPaid,
//   getApplePayMerchantSession,
//   isApplePayAvailable,
// };


// services/payment-service.ts
import apiClient from './api-client';
import { PaymentMethod } from './booking-service';

export interface ApplePayMerchantSession {
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
  initiative: string;
  initiativeContext: string;
}

export interface PaymentIntentRequest {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  currency?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
  ephemeralKey?: string;
  customerId?: string;
}

export interface RefundRequest {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface RefundResponse {
  paymentId: string;
  refundId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

const createPaymentIntent = async (
  bookingId: string, 
  amount: number, 
  method: PaymentMethod = PaymentMethod.CREDIT_CARD,
  currency: string = 'INR'
): Promise<PaymentIntentResponse> => {
  try {
    const response = await apiClient.post<PaymentIntentResponse>('/payments', {
      bookingId,
      amount,
      method,
      currency
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    throw error;
  }
};

const verifyPaymentIntent = async (paymentIntentId: string): Promise<{ status: string }> => {
  try {
    const response = await apiClient.get<{ status: string }>(`/payments/${paymentIntentId}/status`);
    return response.data;
  } catch (error) {
    console.error('Failed to verify payment intent:', error);
    throw error;
  }
};

const refundPayment = async (request: RefundRequest): Promise<RefundResponse> => {
  try {
    const response = await apiClient.post<RefundResponse>(`/payments/${request.paymentId}/refund`, request);
    return response.data;
  } catch (error) {
    console.error('Failed to process refund:', error);
    throw error;
  }
};

const getApplePayMerchantSession = async (validationURL: string): Promise<ApplePayMerchantSession> => {
  try {
    const response = await apiClient.post<ApplePayMerchantSession>('/payments/apple-pay-session', { 
      validationURL 
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get Apple Pay merchant session:', error);
    throw error;
  }
};

const isApplePayAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for Apple Pay support
  const isAppleDevice = window.navigator.vendor.indexOf('Apple') > -1;
  const isIOSDevice = /iP(ad|hone|od)/.test(navigator.userAgent);
  const hasApplePaySession = 'ApplePaySession' in window;
  
  return isAppleDevice && isIOSDevice && hasApplePaySession;
};

export default {
  createPaymentIntent,
  verifyPaymentIntent,
  refundPayment,
  getApplePayMerchantSession,
  isApplePayAvailable,
};