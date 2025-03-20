// src/schedule/schedule.module.ts
import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { BookingsModule } from '../bookings/bookings.module';
import { EmailModule } from '../email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    BookingsModule,
    EmailModule,
    NotificationsModule,
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
