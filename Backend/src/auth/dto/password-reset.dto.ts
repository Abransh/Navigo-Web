// src/auth/dto/password-reset.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

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
