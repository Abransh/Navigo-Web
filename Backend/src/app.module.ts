// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
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

// Tasks Module
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Config first for initialization
    ConfigModule,
    
    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>('THROTTLE_TTL', 60),
            limit: configService.get<number>('THROTTLE_LIMIT', 10),
          },
        ],
      }),
    }),
    
    // Scheduled tasks
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}