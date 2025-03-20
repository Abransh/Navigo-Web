// src/auth/controllers/routes-debug.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('debug')
@Controller('debug')
export class RoutesDebugController {
  constructor(private configService: ConfigService) {}

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
      ],
      config: {
        googleCallbackUrl: this.configService.get('GOOGLE_CALLBACK_URL'),
        apiPrefix: this.configService.get('API_PREFIX'),
        frontendUrl: this.configService.get('FRONTEND_URL')
      }
    };
  }
}

// Then add this controller to your auth.module.ts:
// controllers: [AuthController, SocialAuthController, RoutesDebugController],