// src/reviews/dto/update-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Rating from 1 to 5',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({
    description: 'Review comment',
    example: 'After reflecting more, I would say the experience was truly exceptional!',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}