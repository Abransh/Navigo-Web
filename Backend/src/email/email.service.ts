// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: configService.get('MAIL_SECURE', false),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"Navigo" <${this.configService.get('MAIL_FROM')}>`,
      to,
      subject,
      html,
    });
  }

  async sendWelcomeEmail(user: any) {
    const subject = 'Welcome to Navigo!';
    const html = `
      <h1>Welcome to Navigo, ${user.firstName}!</h1>
      <p>Thank you for joining our community. We're excited to help you explore India with local companions.</p>
      <p>Get started by:</p>
      <ul>
        <li>Completing your profile</li>
        <li>Browsing available companions</li>
        <li>Making your first booking</li>
      </ul>
      <p>Safe travels!</p>
      <p>The Navigo Team</p>
    `;
    
    return this.sendMail(user.email, subject, html);
  }

  async sendBookingConfirmation(booking: any, userEmail: string) {
    const subject = 'Booking Confirmation';
    const html = `
      <h1>Your Booking is Confirmed!</h1>
      <p>Your booking with ${booking.companion.user.firstName} has been confirmed.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Date: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</li>
        <li>Location: ${booking.location}</li>
        <li>Total Amount: ₹${booking.totalAmount}</li>
      </ul>
      <p>You can contact your companion through the chat in our app.</p>
      <p>Enjoy your experience!</p>
      <p>The Navigo Team</p>
    `;
    
    return this.sendMail(userEmail, subject, html);
  }

  // Add more email templates as needed
}

// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}