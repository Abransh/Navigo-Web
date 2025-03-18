// src/reviews/reviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { BookingsModule } from '../bookings/bookings.module';
import { CompanionsModule } from '../companions/companions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    BookingsModule,
    CompanionsModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
