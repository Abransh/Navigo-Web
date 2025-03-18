import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from './enums/booking-status.enum';
import { UsersService } from '../users/users.service';
import { CompanionsService } from '../companions/companions.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private usersService: UsersService,
    private companionsService: CompanionsService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    touristId: string,
  ): Promise<Booking> {
    const tourist = await this.usersService.findOne(touristId);
    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }

    const companion = await this.companionsService.findOne(
      createBookingDto.companionId
    );
    if (!companion) {
      throw new NotFoundException('Companion not found');
    }

    if (!companion.isAvailable) {
      throw new BadRequestException('Companion is not available for booking');
    }

    // Calculate total amount
    const startDate = new Date(createBookingDto.startDate);
    const endDate = new Date(createBookingDto.endDate);
    const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5; // hours
    const totalAmount = hours * companion.hourlyRate;

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

    return this.bookingsRepository.save(booking);
  }

  async findAll(userId: string, role: string): Promise<Booking[]> {
    if (role === 'tourist') {
      return this.bookingsRepository.find({
        where: { tourist: { id: userId } },
        relations: ['companion', 'companion.user'],
      });
    } else if (role === 'companion') {
      // Get companion profile by user ID first
      // Then find bookings for that companion
      // This requires an additional query to find the companion profile
      // Implementation depends on your specific relationship structure
    }
    
    throw new BadRequestException('Invalid role for booking retrieval');
  }

  async findOne(id: string): Promise<Booking> {
    return this.bookingsRepository.findOne({
      where: { id },
      relations: [
        'tourist',
        'companion',
        'companion.user',
        'payments',
        'reviews',
      ],
    });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Don't allow updating completed bookings
    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot update completed bookings');
    }

    Object.assign(booking, updateBookingDto);
    return this.bookingsRepository.save(booking);
  }
}