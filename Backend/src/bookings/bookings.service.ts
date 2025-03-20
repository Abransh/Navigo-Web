// src/bookings/bookings.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, Between, In, LessThan } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from './enums/booking-status.enum';
import { UsersService } from '../users/users.service';
import { CompanionsService } from '../companions/companions.service';
import { EmailService } from '../email/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UserRole } from '../users/enums/user-role.enum';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private usersService: UsersService,
    private companionsService: CompanionsService,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
    private connection: Connection, // Inject connection for transaction support
  ) {}

  /**
   * Create a new booking
   */
  async create(
    createBookingDto: CreateBookingDto,
    touristId: string,
  ): Promise<Booking> {
    // Start a transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      this.logger.log(`Creating booking for tourist ${touristId} with companion ${createBookingDto.companionId}`);
      
      // Get tourist user
      const tourist = await this.usersService.findById(touristId);
      
      // Get companion
      const companion = await this.companionsService.findOne(
        createBookingDto.companionId
      );
      if (!companion) {
        throw new NotFoundException('Companion not found');
      }

      if (!companion.isAvailable) {
        throw new BadRequestException('Companion is not available for booking');
      }

      const companionUser = await this.usersService.findById(companion.user.id);

      // Calculate total amount
      const startDate = new Date(createBookingDto.startDate);
      const endDate = new Date(createBookingDto.endDate);
      
      if (startDate >= endDate) {
        throw new BadRequestException('End date must be after start date');
      }
      
      const hours = Math.max(0.5, Math.abs(endDate.getTime() - startDate.getTime()) / 36e5); // hours, minimum 0.5
      const totalAmount = parseFloat((hours * companion.hourlyRate).toFixed(2));

      // Create booking within transaction
      const booking = queryRunner.manager.create(Booking, {
        tourist,
        companion,
        startDate,
        endDate,
        location: createBookingDto.location,
        notes: createBookingDto.notes,
        totalAmount,
        status: BookingStatus.PENDING,
      });

      const savedBooking = await queryRunner.manager.save(booking);
      
      // Commit the transaction
      await queryRunner.commitTransaction();
      
      this.logger.log(`Successfully created booking with ID ${savedBooking.id}`);

      // Send confirmation email to tourist (non-critical operation)
      try {
        await this.emailService.sendBookingConfirmation(
          tourist.email,
          tourist.firstName,
          {
            id: savedBooking.id,
            companion: {
              name: `${companionUser.firstName} ${companionUser.lastName}`,
              profilePicture: companionUser.profilePicture,
            },
            startDate: savedBooking.startDate,
            endDate: savedBooking.endDate,
            location: savedBooking.location,
            totalAmount: savedBooking.totalAmount,
          }
        );
      } catch (error) {
        this.logger.error(`Failed to send booking confirmation email: ${error.message}`);
        // Don't fail booking creation if email fails
      }

      // Send notification to companion (non-critical operation)
      try {
        await this.notificationsService.sendNotification(
          companion.user.id,
          'New Booking',
          `You have a new booking request from ${tourist.firstName} ${tourist.lastName}`,
          'NEW_BOOKING'
        );
      } catch (error) {
        this.logger.error(`Failed to send booking notification: ${error.message}`);
        // Don't fail booking creation if notification fails
      }

      return savedBooking;
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      
      // Rethrow specific exceptions
      if (error instanceof BadRequestException || 
          error instanceof NotFoundException) {
        throw error;
      }
      
      // Log and throw internal server error for unexpected errors
      this.logger.error(`Error creating booking: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create booking');
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Find all bookings for a user
   */
  async findAll(userId: string, role: string): Promise<Booking[]> {
    try {
      if (role === UserRole.TOURIST) {
        return this.bookingsRepository.find({
          where: { tourist: { id: userId } },
          relations: ['companion', 'companion.user'],
          order: { createdAt: 'DESC' },
        });
      } else if (role === UserRole.COMPANION) {
        // Find companion profile by user ID
        const companion = await this.companionsService.findByUserId(userId);
        if (!companion) {
          return [];
        }
        
        return this.bookingsRepository.find({
          where: { companion: { id: companion.id } },
          relations: ['tourist'],
          order: { createdAt: 'DESC' },
        });
      } else if (role === UserRole.ADMIN) {
        // Admins can see all bookings with pagination
        return this.bookingsRepository.find({
          relations: ['tourist', 'companion', 'companion.user'],
          order: { createdAt: 'DESC' },
          take: 100, // Limit to prevent huge result sets
        });
      }
      
      throw new BadRequestException('Invalid role for booking retrieval');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      this.logger.error(`Error finding bookings for user ${userId}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve bookings');
    }
  }

  /**
   * Find a booking by ID
   */
  async findOne(id: string, userId?: string, role?: string): Promise<Booking> {
    try {
      const booking = await this.bookingsRepository.findOne({
        where: { id },
        relations: [
          'tourist',
          'companion',
          'companion.user',
          'payments',
          'reviews',
        ],
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      // If userId and role are provided, verify access permissions
      if (userId && role) {
        if (role === UserRole.TOURIST && booking.tourist.id !== userId) {
          throw new ForbiddenException('You do not have access to this booking');
        }
        
        if (role === UserRole.COMPANION) {
          const companion = await this.companionsService.findByUserId(userId);
          if (!companion || booking.companion.id !== companion.id) {
            throw new ForbiddenException('You do not have access to this booking');
          }
        }
        
        // Admins can access any booking
      }

      return booking;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      
      this.logger.error(`Error finding booking ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve booking details');
    }
  }

  /**
   * Update a booking
   */
  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
    userId?: string,
    role?: string,
  ): Promise<Booking> {
    // Start a transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const booking = await this.findOne(id);
      
      // Check access permissions if userId and role are provided
      if (userId && role) {
        if (role === UserRole.TOURIST && booking.tourist.id !== userId) {
          throw new ForbiddenException('You do not have access to this booking');
        }
        
        if (role === UserRole.COMPANION) {
          const companion = await this.companionsService.findByUserId(userId);
          if (!companion || booking.companion.id !== companion.id) {
            throw new ForbiddenException('You do not have access to this booking');
          }
        }
        
        // Additional rules for specific status updates
        if (updateBookingDto.status) {
          // Only companions can mark as IN_PROGRESS or COMPLETED
          if (
            (updateBookingDto.status === BookingStatus.IN_PROGRESS || 
            updateBookingDto.status === BookingStatus.COMPLETED) && 
            role !== UserRole.COMPANION && 
            role !== UserRole.ADMIN
          ) {
            throw new ForbiddenException('Only companions can update to this status');
          }
          
          // Only tourists can cancel a booking (or admins)
          if (
            updateBookingDto.status === BookingStatus.CANCELLED && 
            role !== UserRole.TOURIST && 
            role !== UserRole.ADMIN
          ) {
            throw new ForbiddenException('Only tourists can cancel a booking');
          }
        }
      }

      // Don't allow updating completed or cancelled bookings
      if (
        booking.status === BookingStatus.COMPLETED || 
        booking.status === BookingStatus.CANCELLED
      ) {
        throw new BadRequestException(`Cannot update ${booking.status.toLowerCase()} bookings`);
      }

      // If updating dates, validate and recalculate total amount
      if (updateBookingDto.startDate || updateBookingDto.endDate) {
        const startDate = new Date(updateBookingDto.startDate || booking.startDate);
        const endDate = new Date(updateBookingDto.endDate || booking.endDate);
        
        if (startDate >= endDate) {
          throw new BadRequestException('End date must be after start date');
        }
        
        const hours = Math.max(0.5, Math.abs(endDate.getTime() - startDate.getTime()) / 36e5);
        booking.totalAmount = parseFloat((hours * booking.companion.hourlyRate).toFixed(2));
        booking.startDate = startDate;
        booking.endDate = endDate;
      }

      // Update fields
      if (updateBookingDto.location !== undefined) {
        booking.location = updateBookingDto.location;
      }
      
      if (updateBookingDto.notes !== undefined) {
        booking.notes = updateBookingDto.notes;
      }
      
      // Fix: Store old status before changing it
      let oldStatus: BookingStatus | null = null;
      
      // Handle status change
      if (updateBookingDto.status && updateBookingDto.status !== booking.status) {
        oldStatus = booking.status;
        booking.status = updateBookingDto.status;
        
        this.logger.log(`Updating booking ${id} status from ${oldStatus} to ${booking.status}`);
      }
      
      // Save booking within transaction
      const updatedBooking = await queryRunner.manager.save(booking);
      
      // Commit transaction
      await queryRunner.commitTransaction();
      
      // Send notifications based on status change (non-critical)
      if (updateBookingDto.status && oldStatus && updateBookingDto.status !== oldStatus) {
        try {
          // Handle status-specific notifications
          if (updateBookingDto.status === BookingStatus.CONFIRMED) {
            await this.notificationsService.sendBookingConfirmation(
              booking.tourist.id,
              booking.id
            );
          } else if (updateBookingDto.status === BookingStatus.CANCELLED) {
            await this.notificationsService.sendBookingCancellation(
              booking.tourist.id,
              booking.id
            );
            
            // Also notify companion
            await this.notificationsService.sendBookingCancellation(
              booking.companion.user.id,
              booking.id
            );
          }
        } catch (error) {
          this.logger.error(`Failed to send status update notification: ${error.message}`);
          // Don't fail the update if notifications fail
        }
      }

      return updatedBooking;
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      
      if (error instanceof BadRequestException || 
          error instanceof ForbiddenException || 
          error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Error updating booking ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to update booking');
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }
  /**
   * Calculate price for a booking
   */
  async calculatePrice(
    companionId: string,
    startDate: string,
    endDate: string,
  ): Promise<{ totalAmount: number; hours: number }> {
    try {
      const companion = await this.companionsService.findOne(companionId);
      if (!companion) {
        throw new NotFoundException('Companion not found');
      }
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        throw new BadRequestException('End date must be after start date');
      }
      
      const hours = Math.max(0.5, Math.abs(end.getTime() - start.getTime()) / 36e5);
      const totalAmount = parseFloat((hours * companion.hourlyRate).toFixed(2));
      
      return { totalAmount, hours: parseFloat(hours.toFixed(1)) };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Error calculating price: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to calculate price');
    }
  }

  /**
   * Cancel a booking
   */
  async cancel(id: string, userId: string, reason?: string): Promise<Booking> {
    // Start a transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const booking = await this.findOne(id);
      
      // Verify the user is the tourist who made the booking
      if (booking.tourist.id !== userId) {
        throw new ForbiddenException('You are not authorized to cancel this booking');
      }
      
      // Verify booking can be cancelled
      if (
        booking.status === BookingStatus.COMPLETED ||
        booking.status === BookingStatus.CANCELLED
      ) {
        throw new BadRequestException(`Cannot cancel a ${booking.status.toLowerCase()} booking`);
      }
      
      // Add reason to notes if provided
      if (reason) {
        booking.notes = booking.notes 
          ? `${booking.notes}\n\nCancellation reason: ${reason}`
          : `Cancellation reason: ${reason}`;
      }
      
      // Update booking status
      booking.status = BookingStatus.CANCELLED;
      
      // Save within transaction
      const cancelledBooking = await queryRunner.manager.save(booking);
      
      // Commit transaction
      await queryRunner.commitTransaction();
      
      this.logger.log(`Booking ${id} cancelled by user ${userId}`);
      
      // Notify companion about cancellation (non-critical)
      try {
        await this.notificationsService.sendBookingCancellation(
          booking.companion.user.id,
          booking.id
        );
        
        // Send cancellation email to companion
        const companionUser = await this.usersService.findById(booking.companion.user.id);
        await this.emailService.sendBookingCancellation(
          companionUser.email,
          companionUser.firstName,
          {
            id: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            location: booking.location,
            reason: reason || 'No reason provided',
          }
        );
      } catch (error) {
        this.logger.error(`Failed to send cancellation notification: ${error.message}`);
        // Don't fail the cancellation if notifications fail
      }
      
      return cancelledBooking;
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      
      if (error instanceof BadRequestException || 
          error instanceof ForbiddenException || 
          error instanceof NotFoundException) {
        throw error;
      }
      
      this.logger.error(`Error cancelling booking ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to cancel booking');
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  /**
   * Get total count of bookings
   */
  async getTotalBookingCount(): Promise<number> {
    try {
      return this.bookingsRepository.count();
    } catch (error) {
      this.logger.error(`Error getting total booking count: ${error.message}`, error.stack);
      return 0; // Return 0 instead of throwing to prevent dashboard failures
    }
  }

  /**
   * Get upcoming bookings for a user in the next N hours
   */
  async findUpcomingBookings(hoursAhead: number = 24): Promise<Booking[]> {
    const now = new Date();
    const future = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
    
    try {
      return this.bookingsRepository.find({
        where: {
          startDate: Between(now, future),
          status: In([BookingStatus.CONFIRMED, BookingStatus.PENDING]),
        },
        relations: ['tourist', 'companion', 'companion.user'],
        order: { startDate: 'ASC' },
      });
    } catch (error) {
      this.logger.error(`Error finding upcoming bookings: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve upcoming bookings');
    }
  }

  /**
   * Update expired booking statuses
   */
  async updateExpiredBookingStatuses(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const now = new Date();
      
      // Find confirmed bookings that have ended
      const expiredBookings = await this.bookingsRepository.find({
        where: {
          endDate: LessThan(now),
          status: BookingStatus.CONFIRMED,
        },
      });
      
      for (const booking of expiredBookings) {
        booking.status = BookingStatus.COMPLETED;
        await queryRunner.manager.save(booking);
        
        this.logger.log(`Auto-completed booking ${booking.id} as end date has passed`);
      }
      
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error updating expired bookings: ${error.message}`, error.stack);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Get paginated bookings with optional filtering
   */
  async getPaginatedBookings(page = 1, limit = 10, filter = '') {
    try {
      const skip = (page - 1) * limit;
      
      const queryBuilder = this.bookingsRepository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.tourist', 'tourist')
        .leftJoinAndSelect('booking.companion', 'companion')
        .leftJoinAndSelect('companion.user', 'companionUser');
      
      if (filter) {
        queryBuilder.where(
          'booking.id LIKE :filter OR tourist.firstName LIKE :filter OR tourist.lastName LIKE :filter OR companionUser.firstName LIKE :filter OR companionUser.lastName LIKE :filter',
          { filter: `%${filter}%` }
        );
      }
      
      const [bookings, total] = await queryBuilder
        .skip(skip)
        .take(limit)
        .orderBy('booking.createdAt', 'DESC')
        .getManyAndCount();
      
      return {
        bookings,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error(`Error getting paginated bookings: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to retrieve bookings');
    }
  }
}