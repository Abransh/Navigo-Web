// src/bookings/dto/calculate-price.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CalculatePriceDto {
  @ApiProperty({
    description: 'ID of the companion',
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
}