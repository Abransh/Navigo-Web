// src/companions/dto/create-companion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCompanionDto {
  @ApiProperty({
    description: 'User ID of the companion',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Bio describing the companion',
    example: 'Experienced guide with knowledge of local history and culture.',
  })
  @IsString()
  @MinLength(50)
  bio: string;

  @ApiProperty({
    description: 'Languages spoken by the companion',
    example: ['English', 'Hindi', 'French'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({
    description: 'Specialties of the companion',
    example: ['History', 'Food', 'Architecture'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  specialties: string[];

  @ApiProperty({
    description: 'Hourly rate in USD',
    example: 25.5,
  })
  @IsNumber()
  @Min(1)
  hourlyRate: number;
}
