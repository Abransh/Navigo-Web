import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentStatus } from '../enums/payment-status.enum';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16', // Update to latest version
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', metadata?: Record<string, string>): Promise<{
    clientSecret: string;
    paymentIntentId: string;
  }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/paisa
      currency,
      metadata,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<{
    status: PaymentStatus;
    amount: number;
  }> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    // Map Stripe status to our PaymentStatus enum
    let status: PaymentStatus;
    switch (paymentIntent.status) {
      case 'succeeded':
        status = PaymentStatus.COMPLETED;
        break;
      case 'canceled':
        status = PaymentStatus.FAILED;
        break;
      default:
        status = PaymentStatus.PENDING;
    }

    return {
      status,
      amount: paymentIntent.amount / 100, // Convert back from cents/paisa
    };
  }

  async createRefund(paymentIntentId: string): Promise<boolean> {
    try {
      await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}