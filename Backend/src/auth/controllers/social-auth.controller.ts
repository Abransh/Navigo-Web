// Backend/src/auth/controllers/social-auth.controller.ts
import { Controller, Get, UseGuards, Req, Res, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Social Auth Controller
 * 
 * Handles OAuth authentication flows with social providers like 
 * Google, Facebook, and Apple.
 */
@ApiTags('auth')
@Controller('auth')
export class SocialAuthController {
  private readonly logger = new Logger(SocialAuthController.name);
  
  constructor(private configService: ConfigService) {}

  /**
   * Google Authentication
   * 
   * This endpoint initiates the Google OAuth flow by redirecting to Google's login page.
   * The user is prompted to select their Google account and grant permissions.
   */
   @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth page' })
  googleAuth() {
    this.logger.log('Initiating Google OAuth flow');
    // This route initiates Google OAuth flow
    // The actual logic is handled by the GoogleStrategy
  }

  /**
   * Google Authentication Callback
   * 
   * This endpoint handles the callback from Google after successful authentication.
   * It receives the authorization code, exchanges it for tokens, and redirects to the frontend.
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirect to frontend with auth token', 
  })
  googleAuthCallback(@Req() req, @Res() res) {
    this.logger.log('Received Google OAuth callback');
    
    // Extract the access token from the authenticated user
    const token = req.user.access_token;
    
    // Get the frontend URL from environment variables
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    this.logger.log(`Redirecting to frontend: ${frontendUrl}/auth/callback?token=${token}`);
    
    // Redirect to the frontend with the token as a URL parameter
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }


  /**
   * Facebook Authentication
   * 
   * This endpoint initiates the Facebook OAuth flow by redirecting to Facebook's login page.
   * The user is prompted to login to Facebook and grant permissions.
   */
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Facebook OAuth page' })
  facebookAuth() {
    // This route initiates Facebook OAuth flow
    // The actual logic is handled by the FacebookStrategy
  }

  /**
   * Facebook Authentication Callback
   * 
   * This endpoint handles the callback from Facebook after successful authentication.
   * It receives the authorization code, exchanges it for tokens, and redirects to the frontend.
   */
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Handle Facebook OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with auth token' })
  facebookAuthCallback(@Req() req, @Res() res) {
    const token = req.user.access_token;
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    // Redirect to the frontend with the token as a URL parameter
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  /**
   * Apple Authentication
   * 
   * This endpoint initiates the Apple Sign In flow by redirecting to Apple's sign-in page.
   * The user is prompted to sign in with their Apple ID and grant permissions.
   */
  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Initiate Apple Sign In' })
  @ApiResponse({ status: 302, description: 'Redirect to Apple Sign In page' })
  appleAuth() {
    // This route initiates Apple OAuth flow
    // The actual logic is handled by the AppleStrategy
  }

  /**
   * Apple Authentication Callback
   * 
   * This endpoint handles the callback from Apple after successful authentication.
   * It receives the user data and token, and redirects to the frontend.
   */
  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Handle Apple Sign In callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with auth token' })
  appleAuthCallback(@Req() req, @Res() res) {
    const token = req.user.access_token;
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    // Redirect to the frontend with the token as a URL parameter
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }
}