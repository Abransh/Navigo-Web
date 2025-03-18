// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

interface BookingDetails {
  id: string;
  date?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  companion?: {
    name: string;
    profilePicture?: string;
  };
  totalAmount?: number;
  [key: string]: any;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private getAppUrl(): string {
    return this.configService.get('FRONTEND_URL', 'http://localhost:3000');
  }

  private getAppName(): string {
    return this.configService.get('APP_NAME', 'Navigo');
  }

  private getSupportEmail(): string {
    return this.configService.get('SUPPORT_EMAIL', 'support@navigo.com');
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ): Promise<any> {
    // Add common context variables
    const commonContext = {
      appName: this.getAppName(),
      appUrl: this.getAppUrl(),
      supportEmail: this.getSupportEmail(),
      year: new Date().getFullYear(),
      ...context,
    };

    return this.mailerService.sendMail({
      to,
      subject,
      template,
      context: commonContext,
    });
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    await this.sendMail(email, `Welcome to ${this.getAppName()}!`, 'welcome', {
      firstName,
      loginUrl: `${this.getAppUrl()}/login`,
    });
  }

  async sendPasswordResetEmail(
    email: string,
    firstName: string,
    resetLink: string,
  ): Promise<void> {
    await this.sendMail(
      email,
      `${this.getAppName()} - Password Reset Request`,
      'password-reset',
      {
        firstName,
        resetLink,
      }
    );
  }

  async sendPasswordResetConfirmationEmail(
    email: string,
    firstName: string,
  ): Promise<void> {
    await this.sendMail(
      email,
      `${this.getAppName()} - Password Reset Successful`,
      'password-reset-confirmation',
      {
        firstName,
      });
  }

  async sendBookingConfirmation(
    email: string,
    firstName: string,
    bookingDetails: BookingDetails,
  ): Promise<void> {
    await this.sendMail(
      email,
      `${this.getAppName()} - Booking Confirmation`,
      'booking-confirmation',
      {
        firstName,
        booking: bookingDetails,
        myBookingsUrl: `${this.getAppUrl()}/bookings`,
      }
    );
  }

  async sendBookingCancellation(
    email: string,
    firstName: string,
    bookingDetails: BookingDetails,
  ): Promise<void> {
    await this.sendMail(
      email,
      `${this.getAppName()} - Booking Cancelled`,
      'booking-cancellation',
      {
        firstName,
        booking: bookingDetails,
        myBookingsUrl: `${this.getAppUrl()}/bookings`,
      }
    );
  }
}