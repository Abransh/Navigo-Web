// Backend/src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User\'s first name' })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName: string;

  @ApiProperty({ description: 'User\'s last name' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName: string;

  @ApiProperty({ description: 'User\'s email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email: string;

  @ApiProperty({ description: 'User\'s password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiPropertyOptional({ description: 'User\'s phone number', example: '+1234567890' })
  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid' })
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.TOURIST })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be valid' })
  role?: UserRole;
}

// Backend/src/users/dto/update-user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'User\'s first name' })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'User\'s last name' })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'User\'s email address' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email?: string;

  @ApiPropertyOptional({ description: 'User\'s phone number', example: '+1234567890' })
  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'URL to user\'s profile picture' })
  @IsOptional()
  @IsUrl({}, { message: 'Profile picture URL must be valid' })
  profilePicture?: string;

  @ApiPropertyOptional({ description: 'User\'s bio or about me text' })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  @MaxLength(500, { message: 'Bio cannot exceed 500 characters' })
  bio?: string;
}

// Backend/src/auth/dto/register.dto.ts
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UserRole } from '../../users/enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto extends CreateUserDto {
  @ApiPropertyOptional({ enum: UserRole, default: UserRole.TOURIST })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be a valid user role' })
  role?: UserRole = UserRole.TOURIST;
}

// Backend/src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

// Backend/src/auth/dto/password-reset.dto.ts
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Token is required' })
  @IsString({ message: 'Token must be a string' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;
}