// src/bookings/bookings.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private usersService: UsersService,
    private companionsService: CompanionsService,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    touristId: string,
  ): Promise<Booking> {
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

    // Create booking
    const booking = this.bookingsRepository.create({
      tourist,
      companion,
      startDate,
      endDate,
      location: createBookingDto.location,
      notes: createBookingDto.notes,
      totalAmount,
      status: BookingStatus.PENDING,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Send confirmation email to tourist
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
      console.error('Failed to send booking confirmation email:', error);
      // Don't fail booking creation if email fails
    }

    // Send notification to companion
    try {
      await this.notificationsService.sendNotification(
        companion.user.id,
        'New Booking',
        `You have a new booking request from ${tourist.firstName} ${tourist.lastName}`,
        'NEW_BOOKING'
      );
    } catch (error) {
      console.error('Failed to send booking notification:', error);
      // Don't fail booking creation if notification fails
    }

    return savedBooking;
  }

  async findAll(userId: string, role: string): Promise<Booking[]> {
    if (role === UserRole.TOURIST) {
      return this.bookingsRepository.find({
        where: { tourist: { id: userId } },
        relations: ['companion', 'companion.user'],
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
      });
    } else if (role === UserRole.ADMIN) {
      // Admins can see all bookings
      return this.bookingsRepository.find({
        relations: ['tourist', 'companion', 'companion.user'],
      });
    }
    
    throw new BadRequestException('Invalid role for booking retrieval');
  }

  async findOne(id: string, userId?: string, role?: string): Promise<Booking> {
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
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
    userId?: string,
    role?: string,
  ): Promise<Booking> {
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
    
    // Handle status change
    if (updateBookingDto.status && updateBookingDto.status !== booking.status) {
      const oldStatus = booking.status;
      booking.status = updateBookingDto.status;
      
      // Send notifications based on status change
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
        console.error('Failed to send status update notification:', error);
      }
    }

    return this.bookingsRepository.save(booking);
  }

  // Edit the bookings.service.ts file to complete the calculatePrice method
async calculatePrice(
  companionId: string,
  startDate: string,
  endDate: string,
): Promise<{ totalAmount: number }> {
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
  
  return { totalAmount };
}

// Add this method to the BookingsService
async cancel(id: string, userId: string, reason?: string): Promise<Booking> {
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
  
  const cancelledBooking = await this.bookingsRepository.save(booking);
  
  // Notify companion about cancellation
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
    console.error('Failed to send cancellation notification:', error);
  }
  
  return cancelledBooking;
}
// Add these methods to the existing BookingsService class in src/bookings/bookings.service.ts

/**
 * Get total count of bookings
 */
async getTotalBookingCount(): Promise<number> {
  return this.bookingsRepository.count();
}

/**
 * Get paginated bookings with optional filtering
 */
async getPaginatedBookings(page = 1, limit = 10, filter = '') {
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
}
}