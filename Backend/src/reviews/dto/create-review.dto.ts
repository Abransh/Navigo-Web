// src/reviews/dto/create-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the booking being reviewed',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({
    description: 'Rating from 1 to 5',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Review comment',
    example: 'Excellent service! The companion was knowledgeable and friendly.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comment: string;
}
