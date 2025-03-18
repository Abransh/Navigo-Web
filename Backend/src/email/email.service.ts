import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendRegistrationConfirmation(to: string, verificationLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Navigo" <no-reply@navigo.com>',
      to,
      subject: 'Welcome to Navigo - Please Verify Your Email',
      text: `Welcome to Navigo! Please verify your email by clicking the following link: ${verificationLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Navigo!</h2>
          <p>Thank you for joining our platform. To complete your registration, please verify your email address by clicking the button below:</p>
          <p>
            <a href="${verificationLink}" style="display: inline-block; background-color: #F3A522; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">
              Verify Email
            </a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${verificationLink}</p>
          <p>If you didn't create an account with us, please ignore this email.</p>
          <p>Best regards,<br>The Navigo Team</p>
        </div>
      `,
    });
  }

  async sendBookingConfirmation(
    to: string,
    bookingDetails: {
      id: string;
      companionName: string;
      startDate: Date;
      endDate: Date;
      location: string;
      totalAmount: number;
    },
  ): Promise<void> {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    await this.transporter.sendMail({
      from: '"Navigo" <no-reply@navigo.com>',
      to,
      subject: `Booking Confirmation - Navigo (ID: ${bookingDetails.id})`,
      text: `Your booking with ${bookingDetails.companionName} has been confirmed! Details: From ${formatDate(bookingDetails.startDate)} to ${formatDate(bookingDetails.endDate)} at ${bookingDetails.location}. Total amount: $${bookingDetails.totalAmount.toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Booking Confirmation</h2>
          <p>Your booking with <strong>${bookingDetails.companionName}</strong> has been confirmed!</p>
          
          <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Booking ID:</strong> ${bookingDetails.id}</p>
            <p><strong>Start:</strong> ${formatDate(bookingDetails.startDate)}</p>
            <p><strong>End:</strong> ${formatDate(bookingDetails.endDate)}</p>
            <p><strong>Location:</strong> ${bookingDetails.location}</p>
            <p><strong>Total Amount:</strong> $${bookingDetails.totalAmount.toFixed(2)}</p>
          </div>
          
          <p>We hope you have a great experience with your local companion!</p>
          <p>Best regards,<br>The Navigo Team</p>
        </div>
      `,
    });
  }
}