// src/companions/dto/search-companions.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchCompanionsDto {
  @ApiProperty({
    description: 'Languages spoken by the companion',
    example: ['English', 'Hindi'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({
    description: 'Specialties of the companion',
    example: ['History', 'Food'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];

  @ApiProperty({
    description: 'Minimum rating threshold',
    example: 4.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minRating?: number;

  @ApiProperty({
    description: 'Maximum hourly rate',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxHourlyRate?: number;

  @ApiProperty({
    description: 'Location or city',
    example: 'Varanasi',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}
