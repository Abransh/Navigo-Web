// src/app.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard, ThrottlerModuleOptions } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';

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
import { AppSchedulerModule } from './schedule/schedule.module';

@Module({
  imports: [
    // Core module with globally available Reflector
    CoreModule,
    
    // Config first for initialization
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
    
    // Scheduler module - ensure it's loaded after CoreModule
    ScheduleModule.forRoot(),

    AdminModule,
    
    // Rate limiting
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
    
    // Our custom scheduler module
    AppSchedulerModule,
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