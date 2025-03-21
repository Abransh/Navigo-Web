// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { BookingsModule } from '../bookings/bookings.module';
import { CompanionsModule } from '../companions/companions.module';
import { PaymentsModule } from '../payments/payments.module'; // Add this import

@Module({
  imports: [
    UsersModule,
    BookingsModule,
    CompanionsModule,
    PaymentsModule, // Add this module to the imports array
  ],
  controllers: [AdminController],
  providers: [], // Add any admin-specific services here if needed
})
export class AdminModule {}