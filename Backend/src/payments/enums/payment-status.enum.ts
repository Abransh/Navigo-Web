// src/payments/enums/payment-status.enum.ts
export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
  }
  
  // src/payments/enums/payment-method.enum.ts
  export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    UPI = 'upi',
    WALLET = 'wallet',
    BANK_TRANSFER = 'bank_transfer'
  }