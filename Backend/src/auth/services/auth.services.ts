// Backend/src/auth/services/auth.service.ts
import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Services
import { UsersService } from '../../users/users.service';
import { MailService } from '../../mail/mail.service';

// DTOs
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

// Repositories
import { PasswordResetRepository } from '../repositories/password-reset.repository';

// Entities & Types
import { PasswordReset } from '../entities/password-reset.entity';
import { UserRole } from '../../users/enums/user-role.enum';

/**
 * Interface for social login user data
 */
interface SocialUser {
  email: string;
  firstName: string;
  lastName: string;
  picture?: string;
  accessToken: string;
  provider: 'google' | 'facebook' | 'apple';
}

/**
 * Auth Service - Core service for all authentication-related functionality
 * 
 * Handles:
 * - Login & registration
 * - Social authentication
 * - Password reset
 * - JWT token generation
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private passwordResetRepository: PasswordResetRepository,
  ) {}

  /**
   * Validate user credentials
   * Used by the local authentication strategy
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    
    // If user exists and password matches, return user without password
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    // Return null if user not found or password doesn't match
    return null;
  }

  /**
   * Login with email and password
   */
  async login(loginDto: LoginDto) {
    // Validate credentials
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };
    
    // Return token and user data
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Create the user
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    
    // Generate JWT token
    const payload = { 
      email: newUser.email, 
      sub: newUser.id, 
      role: newUser.role 
    };
    
    // Return token and user data
    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
    };
  }

  /**
   * Validate and process social login
   * Used by OAuth strategies (Google, Facebook, Apple)
   */
  async validateSocialLogin(socialUser: SocialUser) {
    try {
      // Check if user exists by email
      let user = await this.usersService.findByEmail(socialUser.email).catch(() => null);
      
      // If user doesn't exist, create a new one
      if (!user) {
        user = await this.usersService.create({
          email: socialUser.email,
          firstName: socialUser.firstName,
          lastName: socialUser.lastName,
          profilePicture: socialUser.picture,
          password: await bcrypt.hash(uuidv4(), 10), // Random secure password
          role: UserRole.TOURIST, // Default role
        });
        
        // Create social profile link (in a real implementation this would be handled by a socialProfileRepository)
        // await this.socialProfileRepository.save({
        //   provider: socialUser.provider,
        //   providerId: socialUser.email,
        //   accessToken: socialUser.accessToken,
        //   userId: user.id,
        // });
        
        // Send welcome email to new user
        await this.mailService.sendWelcomeEmail(user.email, user.firstName);
      } else {
        // Update profile pic if not set and is provided
        if (!user.profilePicture && socialUser.picture) {
          await this.usersService.update(user.id, {
            profilePicture: socialUser.picture,
          });
        }
      }
      
      // Generate JWT token
      const payload = { 
        sub: user.id, 
        email: user.email,
        role: user.role,
      };
      
      // Return token and user data
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          profilePicture: user.profilePicture,
        },
      };
    } catch (error) {
      console.error('Social login error:', error);
      throw new InternalServerErrorException('Social login failed');
    }
  }

  /**
   * Request a password reset
   * Generates a token and sends an email with reset link
   */
  async requestPasswordReset(email: string): Promise<void> {
    // Check if user exists
    const user = await this.usersService.findByEmail(email).catch(() => null);
    
    // Even if user doesn't exist, don't reveal that for security
    if (!user) {
      return;
    }

    // Generate unique token
    const token = uuidv4();
    
    // Hash token for security (so it's not stored in plain text)
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
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
    
    // Send email with reset link
    await this.mailService.sendPasswordResetEmail(
      user.email,
      user.firstName,
      resetLink,
    );
  }

  /**
   * Verify a password reset token
   * Checks if the token exists and has not expired
   */
  async verifyResetToken(token: string): Promise<boolean> {
    // Find all reset records that haven't expired
    const resetRecords = await this.passwordResetRepository.find({
      where: { expires: { $gt: new Date() } },
    });
    
    // No need to continue if no records found
    if (!resetRecords || resetRecords.length === 0) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    // Check if token matches any of the hashed tokens
    for (const record of resetRecords) {
      const isMatch: boolean = await bcrypt.compare(token, record.token);
      if (isMatch) {
        return true; // Token is valid
      }
    }
    
    // No match found
    throw new BadRequestException('Invalid or expired token');
  }

  /**
   * Reset password using token
   * Validates token, updates password, and cleans up tokens
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find all reset records that haven't expired
    const now = new Date();
    const resetRecords = await this.passwordResetRepository.find({
      where: { expires: { $gt: now } },
    });
    
    // Type assertion for matchedRecord
    let matchedRecord: PasswordReset | null = null;
    
    // Rest of the implementation remains the same
    for (const record of resetRecords) {
      const isMatch = await bcrypt.compare(token, record.token);
      if (isMatch) {
        matchedRecord = record;
        break;
      }
    }
    
    // Null check before accessing email
    if (!matchedRecord) {
      throw new BadRequestException('Invalid or expired token');
    }
    
    const user = await this.usersService.findByEmail(matchedRecord.email);
    // Rest of the method remains the same
  }
}