// src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service'; // Updated path
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

interface SocialUser {
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken: string;
  provider: 'google' | 'facebook' | 'apple';
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private passwordResetRepository: PasswordResetRepository,
    private configService: ConfigService,
  ) {}

  // src/auth/auth.service.ts
async validateUser(email: string, password: string): Promise<any> {
  try {
    const user = await this.usersService.findByEmail(email);
    // Add null check for password
    if (user && user.password && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  } catch (error) {
    if (error instanceof NotFoundException) {
      return null; // User not found, return null for auth flow
    }
    throw error; // Rethrow unexpected errors
  }
}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // In auth.service.ts (login method)
    const payload = { 
    email: user.email, 
    sub: user.id,  // Keep the JWT standard of using 'sub' for the subject
    role: user.role 
};
  }

  async register(registerDto: RegisterDto) {
    try {
      // Check if email already exists
      try {
        await this.usersService.findByEmail(registerDto.email);
        throw new BadRequestException('User with this email already exists');
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
        // Continue if user not found (expected case)
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      // Create the user
      const newUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
        role: registerDto.role || UserRole.TOURIST,
      });

      // Send welcome email
      try {
        await this.emailService.sendWelcomeEmail(newUser.email, newUser.firstName);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Don't fail registration if email fails
      }
      
      // Generate JWT token
      const payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
      
      // Remove password from user object
      const { password, ...userWithoutPassword } = newUser;
      
      return {
        access_token: this.jwtService.sign(payload),
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async validateSocialLogin(socialUser: SocialUser) {
    try {
      // Check if user exists by email
      let user;
      try {
        user = await this.usersService.findByEmail(socialUser.email);
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
        // User doesn't exist, create a new one
        user = await this.usersService.create({
          email: socialUser.email,
          firstName: socialUser.firstName,
          lastName: socialUser.lastName,
          profilePicture: socialUser.picture,
          password: await bcrypt.hash(uuidv4(), 10), // Random secure password
          role: UserRole.TOURIST, // Default role
        });
      }

      // Update profile pic if not set and is provided
      if (!user.profilePicture && socialUser.picture) {
        await this.usersService.update(user.id, {
          profilePicture: socialUser.picture,
        });
      }
      
      // Generate JWT token
      const payload = { 
        sub: user.id, 
        email: user.email,
        role: user.role,
      };
      
      // Return token and user data (without password)
      const { password, ...userWithoutPassword } = user;
      
      return {
        access_token: this.jwtService.sign(payload),
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error('Social login error:', error);
      throw new InternalServerErrorException('Social login failed');
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    // Check if user exists
    let user;
    try {
      user = await this.usersService.findByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Don't reveal if user exists for security
        return;
      }
      throw error;
    }

    // Generate unique token
    const token = uuidv4();
    
    // Hash token for security
    const hashedToken = await bcrypt.hash(token, 10);
    
    // Set expiration to 1 hour from now
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    
    // Save token to database
    await this.passwordResetRepository.save({
      email: user.email,
      token: hashedToken,
      expires,
    });
    
    // Generate reset link with token
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const resetLink = `${frontendUrl}/reset-password/${token}`;
    
    // Send email with reset link
    try {
      await this.emailService.sendPasswordResetEmail(
        user.email,
        user.firstName,
        resetLink,
      );
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new InternalServerErrorException('Failed to send password reset email');
    }
  }

  async verifyResetToken(token: string): Promise<boolean> {
    // Find all reset records that haven't expired
    const now = new Date();
    const resetRecords = await this.passwordResetRepository.find({
      where: { expires: { $gt: now } },
    });
    
    // No need to continue if no records found
    if (!resetRecords || resetRecords.length === 0) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    // Check if token matches any of the hashed tokens
    for (const record of resetRecords) {
      const isMatch = await bcrypt.compare(token, record.token);
      if (isMatch) {
        return true; // Token is valid
      }
    }
    
    // No match found
    throw new BadRequestException('Invalid or expired token');
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find all reset records that haven't expired
    const now = new Date();
    const resetRecords = await this.passwordResetRepository.find({
      where: { expires: { $gt: now } },
    });
    
    // No need to continue if no records found
    if (!resetRecords || resetRecords.length === 0) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    // Find matching record
    let matchedRecord: { email: string; token: string; expires: Date } | null = null;
    
    // Compare token with each record
    for (const record of resetRecords) {
      const isMatch = await bcrypt.compare(token, record.token);
      if (isMatch) {
        matchedRecord = record;
        break;
      }
    }
    
    // If no match found, token is invalid
    if (!matchedRecord) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    // Get user by email
    let user;
    try {
      user = await this.usersService.findByEmail(matchedRecord!.email);
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password
    await this.usersService.update(user.id, { password: hashedPassword });
    
    // Delete all reset records for this user (for security)
    await this.passwordResetRepository.delete({ email: user.email });
    
    // Send confirmation email
    try {
      await this.emailService.sendPasswordResetConfirmationEmail(
        user.email,
        user.firstName,
      );
    } catch (error) {
      console.error('Failed to send password reset confirmation email:', error);
      // Don't fail the password reset if email sending fails
    }
  }
}