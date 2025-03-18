// src/payments/payments.service.ts
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { BookingsService } from '../bookings/bookings.service';
import { StripeService } from './services/stripe.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PaymentStatus } from './enums/payment-status.enum';
import { UserRole } from '../users/enums/user-role.enum';
import { BookingStatus } from '../bookings/enums/booking-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private bookingsService: BookingsService,
    private stripeService: StripeService,
    private notificationsService: NotificationsService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto, userId: string) {
    // Get the booking
    const booking = await this.bookingsService.findOne(createPaymentDto.bookingId);
    
    // Verify the user is the tourist who made the booking
    if (booking.tourist.id !== userId) {
      throw new ForbiddenException('You are not authorized to make a payment for this booking');
    }
    
    // Verify booking is in a state where payment is allowed
    if (booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException(`Cannot make a payment for a ${booking.status.toLowerCase()} booking`);
    }
    
    // Verify payment amount is valid
    if (createPaymentDto.amount <= 0 || createPaymentDto.amount > booking.totalAmount) {
      throw new BadRequestException('Invalid payment amount');
    }
    
    // Create a payment intent with Stripe
    const paymentIntent = await this.stripeService.createPaymentIntent(
      createPaymentDto.amount,
      'usd'
    );
    
    // Create a payment record
    const payment = this.paymentRepository.create({
      booking,
      amount: createPaymentDto.amount,
      method: createPaymentDto.method,
      status: PaymentStatus.PENDING,
      transactionId: paymentIntent.id,
    });
    
    await this.paymentRepository.save(payment);
    
    // Return the client secret for the frontend to complete the payment
    return {
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    };
  }

  async getPaymentsByBooking(bookingId: string, userId: string, role: string) {
    const booking = await this.bookingsService.findOne(bookingId);
    
    // Check authorization
    if (
      role !== UserRole.ADMIN &&
      booking.tourist.id !== userId &&
      booking.companion.user.id !== userId
    ) {
      throw new ForbiddenException('You are not authorized to view payments for this booking');
    }
    
    // Get payments for the booking
    return this.paymentRepository.find({
      where: { booking: { id: bookingId } },
      order: { createdAt: 'DESC' },
    });
  }

  async handleWebhook(webhookDto: PaymentWebhookDto) {
    // Process Stripe webhook events
    const { type, data } = webhookDto;
    
    // Handle payment intent succeeded event
    if (type === 'payment_intent.succeeded') {
      const paymentIntentId = data.object.id;
      
      // Find the payment with this transaction ID
      const payment = await this.paymentRepository.findOne({
        where: { transactionId: paymentIntentId },
        relations: ['booking', 'booking.tourist'],
      });
      
      if (payment) {
        // Update payment status
        payment.status = PaymentStatus.COMPLETED;
        await this.paymentRepository.save(payment);
        
        // Get the booking
        const booking = payment.booking;
        
        // If this is the first payment, confirm the booking
        if (booking.status === BookingStatus.PENDING) {
          await this.bookingsService.update(
            booking.id,
            { status: BookingStatus.CONFIRMED },
          );
        }
        
        // Send notification to tourist
        await this.notificationsService.sendPaymentReceipt(
          booking.tourist.id,
          booking.id,
          payment.amount
        );
        
        return { success: true, message: 'Payment processed successfully' };
      }
    }
    
    // Handle payment intent failed event
    if (type === 'payment_intent.payment_failed') {
      const paymentIntentId = data.object.id;
      
      // Find the payment with this transaction ID
      const payment = await this.paymentRepository.findOne({
        where: { transactionId: paymentIntentId },
      });
      
      if (payment) {
        // Update payment status
        payment.status = PaymentStatus.FAILED;
        await this.paymentRepository.save(payment);
        
        return { success: true, message: 'Payment failure recorded' };
      }
    }
    
    return { success: true, message: 'Webhook received' };
  }

  async refundPayment(paymentId: string, userId: string, amount?: number) {
    // Find the payment
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['booking', 'booking.tourist'],
    });
    
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    
    // Verify the user is authorized (admin or the tourist who made the payment)
    if (payment.booking.tourist.id !== userId /* && role !== UserRole.ADMIN */) {
      throw new ForbiddenException('You are not authorized to refund this payment');
    }
    
    // Verify payment is completed
    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Only completed payments can be refunded');
    }
    
    // Process refund via Stripe
    const refund = await this.stripeService.createRefund(
      payment.transactionId,
      amount
    );
    
    // Update payment status
    payment.status = PaymentStatus.REFUNDED;
    await this.paymentRepository.save(payment);
    
    // Return refund details
    return {
      paymentId: payment.id,
      refundId: refund.id,
      amount: amount || payment.amount,
    };
  }
}
