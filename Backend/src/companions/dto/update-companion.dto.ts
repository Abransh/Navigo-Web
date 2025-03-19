// src/companions/dto/update-companion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { IsNumber, Max, Min } from 'class-validator';  // Added Max import

export class UpdateCompanionDto {
  @ApiProperty({
    description: 'Bio describing the companion',
    example: 'Experienced guide with knowledge of local history and culture.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(50)
  bio?: string;

  @ApiProperty({
    description: 'Languages spoken by the companion',
    example: ['English', 'Hindi', 'French'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({
    description: 'Specialties of the companion',
    example: ['History', 'Food', 'Architecture'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];

  @ApiProperty({
    description: 'Hourly rate in USD',
    example: 25.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  hourlyRate?: number;

  @ApiProperty({
    description: 'Availability status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  averageRating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalReviews?: number
}
