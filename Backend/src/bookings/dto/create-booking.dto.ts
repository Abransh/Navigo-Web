// src/bookings/dto/create-booking.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID of the companion to book',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  companionId: string;

  @ApiProperty({
    description: 'Start date and time of the booking',
    example: '2023-12-15T09:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'End date and time of the booking',
    example: '2023-12-15T17:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Location of the meeting or tour',
    example: 'Taj Mahal, Agra',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Additional notes or requirements for the booking',
    example: 'I would like to focus on historical sites and local cuisine.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
