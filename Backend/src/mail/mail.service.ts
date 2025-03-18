// Backend/src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendPasswordResetEmail(
    email: string,
    firstName: string,
    resetLink: string,
  ): Promise<void> {
    const appName = this.configService.get('APP_NAME', 'Navigo');
    const supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
    
    await this.mailerService.sendMail({
      to: email,
      subject: `${appName} - Password Reset Request`,
      template: 'password-reset',
      context: {
        firstName,
        resetLink,
        appName,
        supportEmail,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendPasswordResetConfirmationEmail(
    email: string,
    firstName: string,
  ): Promise<void> {
    const appName = this.configService.get('APP_NAME', 'Navigo');
    const supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
    const loginLink = this.configService.get('FRONTEND_URL', 'http://localhost:3000') + '/login';
    
    await this.mailerService.sendMail({
      to: email,
      subject: `${appName} - Password Reset Successful`,
      template: 'password-reset-confirmation',
      context: {
        firstName,
        loginLink,
        appName,
        supportEmail,
        year: new Date().getFullYear(),
      },
    });
  }

  async sendWelcomeEmail(
    email: string,
    firstName: string,
  ): Promise<void> {
    const appName = this.configService.get('APP_NAME', 'Navigo');
    const supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
    
    await this.mailerService.sendMail({
      to: email,
      subject: `Welcome to ${appName}!`,
      template: 'welcome',
      context: {
        firstName,
        appName,
        supportEmail,
        year: new Date().getFullYear(),
      },
    });
  }
}