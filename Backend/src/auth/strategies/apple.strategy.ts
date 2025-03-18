import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('APPLE_CLIENT_ID'),
      teamID: configService.get<string>('APPLE_TEAM_ID'),
      keyID: configService.get<string>('APPLE_KEY_ID'),
      privateKeyLocation: configService.get<string>('APPLE_PRIVATE_KEY_PATH'),
      callbackURL: configService.get<string>('APPLE_CALLBACK_URL'),
      scope: ['email', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    // Apple profile structure is different from Google/Facebook
    // It might not have name on first login, only on subsequent logins
    const firstName = profile.name?.firstName || 'Apple';
    const lastName = profile.name?.lastName || 'User';
    
    const user = {
      email: profile.email,
      firstName,
      lastName,
      picture: null, // Apple doesn't provide profile picture
      accessToken,
      provider: 'apple',
    };
    
    return this.authService.validateSocialLogin(user);
  }
}