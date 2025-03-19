// src/auth/controllers/routes-debug.controller.ts
// Add this file to your Backend/src/auth/controllers folder

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('debug')
@Controller('debug')
export class RoutesDebugController {
  @Get('auth-routes')
  @ApiOperation({ summary: 'Check if auth routes are available' })
  checkAuthRoutes() {
    return {
      status: 'success',
      message: 'Auth routes debug endpoint is accessible',
      routes: [
        '/api/auth/google',
        '/api/auth/facebook',
        '/api/auth/apple',
        '/api/auth/login',
        '/api/auth/register'
      ]
    };
  }
}

// Then add this controller to your auth.module.ts:
// controllers: [AuthController, SocialAuthController, RoutesDebugController],