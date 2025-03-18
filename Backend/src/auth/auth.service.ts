import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { PasswordReset } from './entities/password-reset.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private passwordResetRepository: PasswordResetRepository,
  ) {}

  interface SocialUser {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    accessToken: string;
    provider: 'google' | 'facebook' | 'apple';
  }
  
  interface SocialProfile {
    provider: string;
    providerId: string;
    accessToken: string;
    userId: string;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Create the user
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    async requestPasswordReset(email: string): Promise<void> {
      // Check if user exists
      const user = await this.usersService.findByEmail(email).catch(() => null);
      
      // Even if user doesn't exist, don't reveal that for security
      if (!user) {
        return;
      }
  
      // Generate unique token
      const token = uuidv4();
      
      // Hash token for storage
      const hashedToken = await bcrypt.hash(token, 10);
      
      // Set expiration to 1 hour from now
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);
      
      // Save token
      await this.passwordResetRepository.save({
        email: user.email,
        token: hashedToken,
        expires,
      });
      
      // Send email with reset link
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
      
      await this.mailService.sendPasswordResetEmail(
        user.email,
        user.firstName,
        resetLink,
      );
    }
  
    async verifyResetToken(token: string): Promise<boolean> {
      // Find all reset records for comparison
      const resetRecords = await this.passwordResetRepository.find({
        where: { expires: { $gt: new Date() } },
      });
      
      // No need to continue if no records found
      if (!resetRecords || resetRecords.length === 0) {
        throw new BadRequestException('Invalid or expired token');
      }
      
      // Check if token matches any of the hashed tokens
      for (const record of resetRecords) {
        const isMatch = await bcrypt.compare(token, record.token);
        if (isMatch) {
          return true;
        }
      }
      
      throw new BadRequestException('Invalid or expired token');
    }
  
    async resetPassword(token: string, newPassword: string): Promise<void> {
      // Find all reset records for comparison
      const resetRecords = await this.passwordResetRepository.find({
        where: { expires: { $gt: new Date() } },
      });
      
      // No need to continue if no records found
      if (!resetRecords || resetRecords.length === 0) {
        throw new BadRequestException('Invalid or expired token');
      }
      
      // Find matching record
      let matchedRecord: PasswordReset = null;
      
      for (const record of resetRecords) {
        const isMatch = await bcrypt.compare(token, record.token);
        if (isMatch) {
          matchedRecord = record;
          break;
        }
      }
      
      if (!matchedRecord) {
        throw new BadRequestException('Invalid or expired token');
      }
      
      // Get user by email
      const user = await this.usersService.findByEmail(matchedRecord.email);
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update user password
      await this.usersService.update(user.id, { password: hashedPassword });
      
      // Delete all reset records for this user
      await this.passwordResetRepository.delete({ email: user.email });
      
      // Send confirmation email
      await this.mailService.sendPasswordResetConfirmationEmail(
        user.email,
        user.firstName,
      );
    }
  }
  
    
    // Generate JWT token
    const payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
    };

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
            password: await bcrypt.hash(uuidv4(), 10), // Random password
            role: UserRole.TOURIST,
          });
          
          // Create social profile link
          await this.socialProfileRepository.save({
            provider: socialUser.provider,
            providerId: socialUser.email, // Using email as providerId for simplicity
            accessToken: socialUser.accessToken,
            userId: user.id,
          });
          
          // Send welcome email to new user
          await this.mailService.sendWelcomeEmail(user.email, user.firstName);
        } else {
          // Check if social profile exists
          const socialProfile = await this.socialProfileRepository.findOne({
            where: {
              provider: socialUser.provider,
              userId: user.id,
            },
          }).catch(() => null);
          
          // If not, create it
          if (!socialProfile) {
            await this.socialProfileRepository.save({
              provider: socialUser.provider,
              providerId: socialUser.email,
              accessToken: socialUser.accessToken,
              userId: user.id,
            });
          } else {
            // Update access token
            await this.socialProfileRepository.update(
              { id: socialProfile.id },
              { accessToken: socialUser.accessToken },
            );
          }
          
          // Update profile pic if not set
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
    }; 
  }
}