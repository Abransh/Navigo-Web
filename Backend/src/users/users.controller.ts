// src/users/users.controller.ts - Fix for duplicate getProfile method
import { 
  Controller, 
  Get, 
  Post, 
  Patch,
  Body, 
  UseGuards, 
  Req,
  Logger,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { 
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req) {
    this.logger.debug('getProfile called with user:', req.user);
    
    // The JWT strategy sets 'id' in the user object
    const userId = req.user.id || req.user.sub || req.user.userId;
    
    if (!userId) {
      this.logger.error('User ID not found in request', req.user);
      throw new Error('User ID not found in request');
    }
    
    this.logger.debug(`Finding user with ID: ${userId}`);
    return this.usersService.findById(userId);
  }

  // Removed duplicate getProfile method

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id || req.user.sub || req.user.userId;
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    
    return this.usersService.update(userId, updateUserDto);
  }

  @Post('profile/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: (req, file, cb) => {
          // Generate unique filename
          const fileExtName = extname(file.originalname);
          const fileName = `${uuidv4()}${fileExtName}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max file size
      },
    }),
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadProfilePicture(@Req() req, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const userId = req.user.id || req.user.sub || req.user.userId;
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }

    // Save profile picture URL to user
    const fileUrl = `${process.env.API_URL || 'http://localhost:3001'}/uploads/profiles/${file.filename}`;
    await this.usersService.update(userId, { profilePicture: fileUrl });

    return { url: fileUrl };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.id || req.user.sub || req.user.userId;
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    
    return this.usersService.changePassword(
      userId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }
}