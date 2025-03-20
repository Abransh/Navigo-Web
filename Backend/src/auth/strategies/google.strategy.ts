// src/auth/strategies/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');
    
    // Log configuration (without secrets)
    this.logger.log(`Google Strategy Configuration: Client ID exists: ${!!clientID}, Callback URL: ${callbackURL}`);
    
    // Validate required configurations
    const missingConfigs: string[] = [];
    if (!clientID) missingConfigs.push('GOOGLE_CLIENT_ID');
    if (!clientSecret) missingConfigs.push('GOOGLE_CLIENT_SECRET');
    if (!callbackURL) missingConfigs.push('GOOGLE_CALLBACK_URL');
    
    if (missingConfigs.length > 0) {
      const errorMsg = `Missing required Google OAuth configuration: ${missingConfigs.join(', ')}`;
      this.logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Initialize the strategy with the configuration
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });

    this.logger.log(`Google Strategy initialized with callback URL: ${callbackURL}`);
  }

  /**
   * Validate the Google profile and create/retrieve the user
   * This method is called by Passport after successful Google authentication
   */
  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      displayName: string;
      name: {
        familyName: string;
        givenName: string;
      };
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: Function,
  ): Promise<any> {
    try {
      this.logger.log(`Validating Google profile for user: ${profile.emails?.[0]?.value || 'unknown'}`);
      
      const { name, emails, photos } = profile;
      
      // Ensure we have an email (required for authentication)
      if (!emails || emails.length === 0) {
        this.logger.error('No email provided in Google profile');
        throw new Error('Email is required for authentication. Please ensure your Google account has a verified email.');
      }

      // Map Google profile to a user object for our system
      const user = {
        email: emails[0].value,
        firstName: name?.givenName || 'Google',
        lastName: name?.familyName || 'User',
        picture: photos?.[0]?.value,
        accessToken,
        provider: 'google' as 'google' | 'facebook' | 'apple',
      };
      
      // Call the auth service to validate/create the user
      const result = await this.authService.validateSocialLogin(user);
      this.logger.log(`Successfully authenticated user: ${user.email}`);
      
      return result;
    } catch (error) {
      this.logger.error(`Google authentication error: ${error.message}`, error.stack);
      throw error;
    }
  }
}