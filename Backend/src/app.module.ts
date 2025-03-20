// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Controllers & Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core Modules
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

// Feature Modules
import { BookingsModule } from './bookings/bookings.module';
import { CompanionsModule } from './companions/companions.module';
import { ChatModule } from './chat/chat.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DestinationsModule } from './destinations/destinations.module';

// Task and Schedule Modules
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule as AppScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    // Config first for initialization
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
    
    // Rate limiting - Fixed useFactory return type
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
    
    // Scheduled tasks - registered once at app level
    ScheduleModule.forRoot(),
    
    // Static file serving (for uploaded content)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    
    // Core modules
    DatabaseModule,
    UsersModule,
    AuthModule,
    EmailModule,
    
    // Feature modules
    BookingsModule,
    CompanionsModule,
    ChatModule,
    PaymentsModule,
    ReviewsModule,
    NotificationsModule,
    DestinationsModule,
   
    // Tasks module
    TasksModule,
    
    // Schedule module (our custom implementation)
    AppScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply rate limiting globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}