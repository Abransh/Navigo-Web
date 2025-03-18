// Backend/src/auth/controllers/social-auth.controller.ts
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class SocialAuthController {
  constructor(private configService: ConfigService) {}

  // Google Authentication
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth page' })
  googleAuth() {
    // This route initiates Google OAuth flow
    // The actual logic is handled by the GoogleStrategy
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with token' })
  googleAuthCallback(@Req() req, @Res() res) {
    const token = req.user.access_token;
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    // Redirect to frontend with token
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  // Facebook Authentication
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Facebook OAuth page' })
  facebookAuth() {
    // This route initiates Facebook OAuth flow
    // The actual logic is handled by the FacebookStrategy
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Facebook OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with token' })
  facebookAuthCallback(@Req() req, @Res() res) {
    const token = req.user.access_token;
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    // Redirect to frontend with token
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  // Apple Authentication
  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Initiate Apple OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Apple OAuth page' })
  appleAuth() {
    // This route initiates Apple OAuth flow
    // The actual logic is handled by the AppleStrategy
  }

  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Apple OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with token' })
  appleAuthCallback(@Req() req, @Res() res) {
    const token = req.user.access_token;
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    
    // Redirect to frontend with token
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }
}