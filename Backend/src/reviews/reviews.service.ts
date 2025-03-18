// src/reviews/reviews.service.ts
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BookingsService } from '../bookings/bookings.service';
import { CompanionsService } from '../companions/companions.service';
import { BookingStatus } from '../bookings/enums/booking-status.enum';
import { UserRole } from '../users/enums/user-role.enum';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private bookingsService: BookingsService,
    private companionsService: CompanionsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: string): Promise<Review> {
    // Get the booking
    const booking = await this.bookingsService.findOne(createReviewDto.bookingId);
    
    // Verify the user is the tourist who made the booking
    if (booking.tourist.id !== userId) {
      throw new ForbiddenException('You can only review bookings you have made');
    }
    
    // Verify booking is completed
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException('You can only review completed bookings');
    }
    
    // Check if a review already exists for this booking
    const existingReview = await this.reviewRepository.findOne({
      where: { booking: { id: booking.id } },
    });
    
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this booking');
    }
    
    // Create the review
    const review = this.reviewRepository.create({
      booking,
      reviewer: booking.tourist,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });
    
    const savedReview = await this.reviewRepository.save(review);
    
    // Update companion's average rating
    await this.updateCompanionRating(booking.companion.id);
    
    return savedReview;
  }

  async getCompanionReviews(companionId: string, options?: { limit?: number; offset?: number }) {
    // Verify companion exists
    const companion = await this.companionsService.findOne(companionId);
    if (!companion) {
      throw new NotFoundException('Companion not found');
    }
    
    // Set default pagination values
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;
    
    // Query reviews
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.booking', 'booking')
      .innerJoin('booking.companion', 'companion')
      .leftJoin('review.reviewer', 'reviewer')
      .select([
        'review.id',
        'review.rating',
        'review.comment',
        'review.createdAt',
        'reviewer.id',
        'reviewer.firstName',
        'reviewer.lastName',
        'reviewer.profilePicture',
      ])
      .where('companion.id = :companionId', { companionId })
      .andWhere('review.isVisible = :isVisible', { isVisible: true })
      .orderBy('review.createdAt', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
    
    // Get total count for pagination
    const totalCount = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.booking', 'booking')
      .innerJoin('booking.companion', 'companion')
      .where('companion.id = :companionId', { companionId })
      .andWhere('review.isVisible = :isVisible', { isVisible: true })
      .getCount();
    
    return {
      reviews,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    };
  }

  async getBookingReview(bookingId: string, userId: string, role: string) {
    // Get the booking
    const booking = await this.bookingsService.findOne(bookingId);
    
    // Check authorization
    if (
      role !== UserRole.ADMIN &&
      booking.tourist.id !== userId &&
      booking.companion.user.id !== userId
    ) {
      throw new ForbiddenException('You are not authorized to view this review');
    }
    
    // Get the review
    const review = await this.reviewRepository.findOne({
      where: { booking: { id: bookingId } },
      relations: ['reviewer'],
    });
    
    if (!review) {
      throw new NotFoundException('No review found for this booking');
    }
    
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string): Promise<Review> {
    // Get the review
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['reviewer', 'booking', 'booking.companion'],
    });
    
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    
    // Verify the user is the reviewer
    if (review.reviewer.id !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }
    
    // Update review fields
    if (updateReviewDto.rating !== undefined) {
      review.rating = updateReviewDto.rating;
    }
    
    if (updateReviewDto.comment !== undefined) {
      review.comment = updateReviewDto.comment;
    }
    
    const updatedReview = await this.reviewRepository.save(review);
    
    // Update companion's average rating
    await this.updateCompanionRating(review.booking.companion.id);
    
    return updatedReview;
  }

  private async updateCompanionRating(companionId: string): Promise<void> {
    // Get all visible reviews for this companion
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.booking', 'booking')
      .innerJoin('booking.companion', 'companion')
      .where('companion.id = :companionId', { companionId })
      .andWhere('review.isVisible = :isVisible', { isVisible: true })
      .getMany();
    
    // Calculate average rating
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      
      // Update companion's rating
      await this.companionsService.update(companionId, {
        averageRating,
        totalReviews: reviews.length,
      });
    }
  }
}
