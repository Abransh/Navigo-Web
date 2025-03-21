// src/auth/strategies/jwt.strategy.ts
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get('JWT_SECRET');
    // Validate that a proper secret is provided
    if (!secret || secret.length < 32) {
      Logger.warn('JWT_SECRET is missing or too short. This is a serious security risk!');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Ensure we're returning consistent user ID property names
    return { 
      userId: payload.sub, 
      id: payload.sub, // Add this for compatibility
      email: payload.email, 
      role: payload.role 
    };
  }
}