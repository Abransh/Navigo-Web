// src/payments/services/stripe.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = configService.get<string>('STRIPE_SECRET_KEY', '');
    
    if (!stripeSecretKey) {
      console.warn('Stripe secret key is not configured');
    }
    
    this.stripe = new Stripe(stripeSecretKey || 'dummy_key_for_development', {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'inr'): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/paise
      currency,
    });
  }

  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.confirm(paymentIntentId);
  }
  
  async createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
    const refundParams: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    };
    
    if (amount) {
      refundParams.amount = Math.round(amount * 100);
    }
    
    return this.stripe.refunds.create(refundParams);
  }
}    