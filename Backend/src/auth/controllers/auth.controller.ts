// src/auth/controllers/auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Req, 
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
  
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody 
} from '@nestjs/swagger';
  
// Change this import to match your actual file structure
// This should point to your AuthService file
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRole } from '../../users/enums/user-role.enum';

// DTOs
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { PasswordResetRequestDto, ResetPasswordDto } from '../dto/password-reset.dto';
  
/**
 * Auth Controller - Handles all authentication-related endpoints
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Add a simple debug endpoint to test if the controller is registered
  @Get('debug')
  debug() {
    this.logger.log('Auth debug endpoint accessed');
    return {
      status: 'ok',
      message: 'Auth controller is working',
      timestamp: new Date().toISOString()
    };
  }

  // Add a user profile endpoint without guards for testing
  @Get('profile')
  testProfile() {
    this.logger.log('Test profile endpoint accessed');
    return {
      status: 'ok',
      message: 'Profile endpoint is accessible',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Login endpoint - Authenticates user with email/password
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);
    return this.authService.login(loginDto);
  }
  
  /**
   * Register endpoint - Creates a new user account
   */
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed or email already exists' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`Registration attempt for email: ${registerDto.email}`);
    return this.authService.register(registerDto);
  }
  
  /**
   * Forgot Password endpoint - Initiates password reset process
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiBody({ type: PasswordResetRequestDto })
  async forgotPassword(@Body() dto: PasswordResetRequestDto) {
    await this.authService.requestPasswordReset(dto.email);
    return { 
      message: 'If your email exists in our system, you will receive a password reset link.' 
    };
  }
  
  /**
   * Verify Token endpoint - Validates a password reset token
   */
  @Get('reset-password/verify/:token')
  @ApiOperation({ summary: 'Verify password reset token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async verifyResetToken(@Param('token') token: string) {
    await this.authService.verifyResetToken(token);
    return { valid: true };
  }
  
  /**
   * Reset Password endpoint - Changes user password using a valid token
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.password);
    return { message: 'Password reset successful' };
  }
  
  /**
   * Get Current User endpoint - Returns the authenticated user's profile
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@Req() req) {
    this.logger.debug('getCurrentUser called with user:', req.user);
    
    // The JWT strategy sets 'id' in the user object (not 'userId')
    const userId = req.user?.id || req.user?.sub;
    
    this.logger.debug(`Finding user with ID: ${userId}`);
    
    if (!userId) {
      this.logger.error('User ID not found in request. Request user object:', req.user);
      throw new Error('User ID not found in request');
    }
    
    return this.usersService.findById(userId);
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alternative endpoint to get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUserAlt(@Req() req) {
    this.logger.debug('getCurrentUserAlt called with user:', req.user);
    
    // The JWT strategy sets 'id' in the user object (not 'userId')
    const userId = req.user?.id || req.user?.sub;
    
    if (!userId) {
      this.logger.error('User ID not found in request', req.user);
      throw new Error('User ID not found in request');
    }
    
    this.logger.debug(`Finding user with ID: ${userId}`);
    return this.usersService.findById(userId);
  }
  @Get('test-login')
  @ApiOperation({ summary: 'Test login endpoint' })
  async testLogin() {
    // Create a test admin user for debugging
    try {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      
      // First check if user exists
      let user;
      try {
        user = await this.usersService.findByEmail('admin@navigo.com');
      } catch (error) {
        // Create the user if not found
        user = await this.usersService.create({
          firstName: 'Admin',
          lastName: 'Test',
          email: 'admin@navigo.com',
          password: hashedPassword,
          role: 'admin' as UserRole
        });
      }
      
      return { 
        message: 'Test admin user created/verified', 
        loginWith: { email: 'admin@navigo.com', password: 'Admin123!' } 
      };
    } catch (error) {
      return { error: error.message };
    }
  }

}