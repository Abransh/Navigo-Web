// src/auth/strategies/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_APP_ID') || '',
      clientSecret: configService.get<string>('FACEBOOK_APP_SECRET') || '',
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL') || '',
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: { name?: { givenName: string; familyName: string }; emails: { value: string }[]; photos?: { value: string }[] },
    done: any,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    
    if (!emails || emails.length === 0) {
      throw new Error('Email not provided from Facebook');
    }
    
    const user = {
      email: emails[0].value,
      firstName: name ? name.givenName : 'Facebook',
      lastName: name ? name.familyName : 'User',
      picture: photos?.[0]?.value,
      accessToken,
      provider: 'facebook' as 'google' | 'facebook' | 'apple',
    };
    
    return this.authService.validateSocialLogin(user);
  }
}
