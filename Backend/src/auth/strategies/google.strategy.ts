// src/auth/strategies/google.strategy.ts - Updated version with better error handling
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
    
    const missingConfigs: string[] = [];
    if (!clientID) missingConfigs.push('GOOGLE_CLIENT_ID');
    if (!clientSecret) missingConfigs.push('GOOGLE_CLIENT_SECRET');
    if (!callbackURL) missingConfigs.push('GOOGLE_CALLBACK_URL');
    
    if (missingConfigs.length > 0) {
      const errorMsg = `Missing required Google OAuth configuration: ${missingConfigs.join(', ')}`;
      throw new Error(errorMsg);
    }

    super({
      clientID: clientID as string,
      clientSecret: clientSecret as string,
      callbackURL: callbackURL as string,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });

    if (missingConfigs.length > 0) {
      this.logger.error(`Missing required Google OAuth configuration: ${missingConfigs.join(', ')}`);
    } else {
      this.logger.log(`Initializing Google Strategy with callback URL: ${callbackURL}`);
    }
  }

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
    done: any,
  ): Promise<any> {
    try {
      this.logger.log(`Validating Google profile for user: ${profile.emails[0]?.value}`);
      
      const { name, emails, photos } = profile;
      
      if (!emails || emails.length === 0) {
        this.logger.error('No email provided in Google profile');
        throw new Error('No email provided from Google');
      }

      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos && photos[0] ? photos[0].value : undefined,
        accessToken,
        provider: 'google' as 'google' | 'facebook' | 'apple',
      };
      
      return this.authService.validateSocialLogin(user);
    } catch (error) {
      this.logger.error(`Google authentication error: ${error.message}`, error.stack);
      throw error;
    }
  }
}