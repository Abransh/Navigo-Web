// src/payments/payments.services.ts
import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './enums/payment-status.enum';
import { BookingsService } from '../bookings/bookings.service';
import { StripeService } from './services/stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { UserRole } from '../users/enums/user-role.enum';
import { BookingStatus } from '../bookings/enums/booking-status.enum';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private bookingsService: BookingsService,
    private stripeService: StripeService,
    private notificationsService: NotificationsService,
    private connection: Connection, // Inject connection for transaction support
  ) {}

  /**
   * Get total revenue from all completed payments
   */
  async getTotalRevenue(): Promise<number> {
    try {
      const result = await this.paymentRepository
        .createQueryBuilder('payment')
        .select('SUM(payment.amount)', 'total')
        .where('payment.status = :status', { status: PaymentStatus.COMPLETED })
        .getRawOne();

      return result.total || 0;
    } catch (error) {
      this.logger.error(`Failed to get total revenue: ${error.message}`, error.stack);
      return 0; // Return 0 instead of throwing error to prevent dashboard failures
    }
  }

  /**
   * Get paginated payments with optional filtering
   */
  async getPaginatedPayments(page = 1, limit = 10, filter = '') {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder = this.paymentRepository
        .createQueryBuilder('payment')
        .leftJoinAndSelect('payment.booking', 'booking')
        .leftJoinAndSelect('booking.tourist', 'tourist')
        .leftJoinAndSelect('booking.companion', 'companion');

      if (filter) {
        queryBuilder.where(
          'payment.transactionId LIKE :filter OR tourist.firstName LIKE :filter OR tourist.lastName LIKE :filter',
          { filter: `%${filter}%` }
        );
      }

      const [payments, total] = await queryBuilder
        .skip(skip)
        .take(limit)
        .orderBy('payment.createdAt', 'DESC')
        .getManyAndCount();

      return {
        payments,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Failed to get paginated payments: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve payments');
    }
  }

  /**
   * Create a payment intent for a booking
   */
  async createPayment(createPaymentDto: CreatePaymentDto, userId: string) {
    // Start transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
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
      
      // Create a payment record using the transaction
      const payment = queryRunner.manager.create(Payment, {
        booking,
        amount: createPaymentDto.amount,
        method: createPaymentDto.method,
        status: PaymentStatus.PENDING,
        transactionId: paymentIntent.id,
      });
      
      const savedPayment = await queryRunner.manager.save(payment);
      
      // Commit the transaction
      await queryRunner.commitTransaction();
      
      this.logger.log(`Created payment intent ${paymentIntent.id} for booking ${booking.id}`);
      
      // Return the client secret for the frontend to complete the payment
      return {
        clientSecret: paymentIntent.client_secret,
        paymentId: savedPayment.id,
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      
      if (error instanceof BadRequestException || 
          error instanceof ForbiddenException || 
          error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Failed to create payment: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to process payment');
    } finally {
      // Release the query runner regardless of outcome
      await queryRunner.release();
    }
  }

  /**
   * Get payments for a specific booking
   */
  async getPaymentsByBooking(bookingId: string, userId: string, role: string) {
    try {
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
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Failed to get payments for booking ${bookingId}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve payment information');
    }
  }

  /**
   * Handle webhook events from payment processor
   */
  async handleWebhook(webhookDto: PaymentWebhookDto) {
    try {
      // Process Stripe webhook events
      const { type, data } = webhookDto;
      this.logger.log(`Processing webhook event: ${type}`);
      
      // Handle payment intent succeeded event
      if (type === 'payment_intent.succeeded') {
        const paymentIntentId = data.object.id;
        
        // Find the payment with this transaction ID
        const payment = await this.paymentRepository.findOne({
          where: { transactionId: paymentIntentId },
          relations: ['booking', 'booking.tourist'],
        });
        
        if (payment) {
          // Start transaction
          const queryRunner = this.connection.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();
          
          try {
            // Update payment status
            payment.status = PaymentStatus.COMPLETED;
            await queryRunner.manager.save(payment);
            
            // Get the booking
            const booking = payment.booking;
            
            // If this is the first payment, confirm the booking
            if (booking.status === BookingStatus.PENDING) {
              booking.status = BookingStatus.CONFIRMED;
              await queryRunner.manager.save(booking);
            }
            
            // Commit transaction
            await queryRunner.commitTransaction();
            
            // Send notification (non-critical operation)
            try {
              await this.notificationsService.sendPaymentReceipt(
                booking.tourist.id,
                booking.id,
                payment.amount
              );
            } catch (notificationError) {
              this.logger.error(`Failed to send payment notification: ${notificationError.message}`);
              // Don't fail the webhook processing for notification errors
            }
            
            return { success: true, message: 'Payment processed successfully' };
          } catch (error) {
            // Rollback transaction on error
            await queryRunner.rollbackTransaction();
            throw error;
          } finally {
            // Release query runner
            await queryRunner.release();
          }
        } else {
          this.logger.warn(`Payment not found for intent ID: ${paymentIntentId}`);
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
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
      // Return success to acknowledge receipt (Stripe will retry otherwise)
      return { success: true, message: 'Webhook received with errors' };
    }
  }

  /**
   * Refund a payment
   */
  async refundPayment(paymentId: string, userId: string, role: string, amount?: number) {
    // Start transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      // Find the payment
      const payment = await this.paymentRepository.findOne({
        where: { id: paymentId },
        relations: ['booking', 'booking.tourist'],
      });
      
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
      
      // Verify the user is authorized (admin or the tourist who made the payment)
      if (payment.booking.tourist.id !== userId && role !== UserRole.ADMIN) {
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
      await queryRunner.manager.save(payment);
      
      // Commit transaction
      await queryRunner.commitTransaction();
      
      this.logger.log(`Refunded payment ${paymentId} with refund ID ${refund.id}`);
      
      // Return refund details
      return {
        paymentId: payment.id,
        refundId: refund.id,
        amount: amount || payment.amount,
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      
      if (error instanceof BadRequestException || 
          error instanceof ForbiddenException || 
          error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Failed to process refund: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to process refund');
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Get a single payment by ID
   */
  async findOne(id: string, userId: string, role: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { id },
        relations: ['booking', 'booking.tourist', 'booking.companion', 'booking.companion.user'],
      });
      
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
      
      // Check authorization
      if (
        role !== UserRole.ADMIN &&
        payment.booking.tourist.id !== userId &&
        payment.booking.companion.user.id !== userId
      ) {
        throw new ForbiddenException('You are not authorized to view this payment');
      }
      
      return payment;
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Failed to find payment ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve payment');
    }
  }
}