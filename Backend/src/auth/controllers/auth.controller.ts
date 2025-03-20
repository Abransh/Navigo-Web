// Backend/src/auth/controllers/auth.controller.ts
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
  

import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody 
} from '@nestjs/swagger';

  
import { AuthService } from '../services/auth.services';
import { UsersService } from '../../users/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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
    const userId = req.user.id || req.user.sub;
    
    if (!userId) {
      this.logger.error('User ID not found in request', req.user);
      throw new Error('User ID not found in request');
    }
    
    this.logger.debug(`Finding user with ID: ${userId}`);
    return this.usersService.findById(userId);
  }
}
  