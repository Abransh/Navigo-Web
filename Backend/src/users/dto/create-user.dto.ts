// src/users/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.TOURIST })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be valid' })
  role?: UserRole;

  @ApiPropertyOptional({ example: 'India' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profilePicture?: string;
}
