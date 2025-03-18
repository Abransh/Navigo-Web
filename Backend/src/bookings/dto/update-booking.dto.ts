// src/bookings/dto/update-booking.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto';
import { BookingStatus } from '../enums/booking-status.enum';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    description: 'Status of the booking',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
    required: false,
  })
  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;
}
