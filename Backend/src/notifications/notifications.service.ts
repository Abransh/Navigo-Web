// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue('notifications')
    private notificationsQueue: Queue,
  ) {}

  async sendNotification(userId: string, title: string, message: string, type: string) {
    await this.notificationsQueue.add('push-notification', {
      userId,
      title,
      message,
      type,
      timestamp: new Date(),
    });
  }

  async sendBookingConfirmation(userId: string, bookingId: string) {
    await this.sendNotification(
      userId,
      'Booking Confirmed',
      `Your booking #${bookingId} has been confirmed!`,
      'BOOKING_CONFIRMATION',
    );
  }

  async sendBookingCancellation(userId: string, bookingId: string) {
    await this.sendNotification(
      userId,
      'Booking Cancelled',
      `Your booking #${bookingId} has been cancelled.`,
      'BOOKING_CANCELLATION',
    );
  }

  async sendPaymentReceipt(userId: string, bookingId: string, amount: number) {
    await this.sendNotification(
      userId,
      'Payment Receipt',
      `Payment of ₹${amount} for booking #${bookingId} has been processed.`,
      'PAYMENT_RECEIPT',
    );
  }

  async sendNewMessageAlert(userId: string, senderName: string) {
    await this.sendNotification(
      userId,
      'New Message',
      `You have a new message from ${senderName}`,
      'NEW_MESSAGE',
    );
  }
}

// src/notifications/processors/notifications.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  private readonly logger = new Logger(NotificationsProcessor.name);

  @Process('push-notification')
  async handlePushNotification(job: Job) {
    this.logger.debug(`Processing notification: ${JSON.stringify(job.data)}`);
    // In a real application, you would:
    // 1. Save the notification to the database
    // 2. Send push notification using Firebase Cloud Messaging or similar service
    // 3. Emit event via WebSockets for real-time notification
    
    return job.data;
  }
}