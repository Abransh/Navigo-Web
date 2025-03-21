// src/auth/auth.module.ts - Throttler fix
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt'; 
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

// Controllers
import { AuthController } from './controllers/auth.controller'; // Update this path
import { SocialAuthController } from './controllers/social-auth.controller';
import { RoutesDebugController } from './controllers/routes-debug.controller';

// Services
import { AuthService } from './auth.service';

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { AppleStrategy } from './strategies/apple.strategy';

// Repositories
import { PasswordResetRepository } from './repositories/password-reset.repository';

// Entities
import { PasswordReset } from './entities/password-reset.entity';
import { SocialProfile } from './entities/social-profile.entity';

// Modules
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Explicitly set default strategy
    TypeOrmModule.forFeature([PasswordReset, SocialProfile]),
    
    // Fix ThrottlerModule configuration
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: configService.get<number>('THROTTLE_TTL', 60),
            limit: configService.get<number>('THROTTLE_LIMIT', 10),
          },
        ],
      }),
    }),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN', '1d') 
        },
      }),
    }),
  ],
  controllers: [AuthController, SocialAuthController, RoutesDebugController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    AppleStrategy,
    PasswordResetRepository,
  ],
  exports: [AuthService, 
    PasswordResetRepository,
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}