// src/reviews/reviews.controller.ts
import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    UseGuards,
    Request,
    ParseUUIDPipe,
    Query,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
  import { ReviewsService } from './reviews.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../users/enums/user-role.enum';
  import { CreateReviewDto } from './dto/create-review.dto';
  import { UpdateReviewDto } from './dto/update-review.dto';
  
  @ApiTags('reviews')
  @Controller('reviews')
  export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a review for a booking' })
    @ApiResponse({ status: 201, description: 'Review created successfully' })
    async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
      return this.reviewsService.create(createReviewDto, req.user.userId);
    }
  
    @Get('companion/:companionId')
    @ApiOperation({ summary: 'Get reviews for a companion' })
    @ApiResponse({ status: 200, description: 'Returns reviews for the companion' })
    @ApiParam({ name: 'companionId', description: 'ID of the companion' })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of reviews to return' })
    @ApiQuery({ name: 'offset', required: false, description: 'Number of reviews to skip' })
    async getCompanionReviews(
      @Param('companionId', ParseUUIDPipe) companionId: string,
      @Query('limit') limit?: number,
      @Query('offset') offset?: number,
    ) {
      return this.reviewsService.getCompanionReviews(companionId, { limit, offset });
    }
  
    @Get('booking/:bookingId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get review for a booking' })
    @ApiResponse({ status: 200, description: 'Returns review for the booking' })
    async getBookingReview(
      @Param('bookingId', ParseUUIDPipe) bookingId: string,
      @Request() req,
    ) {
      return this.reviewsService.getBookingReview(bookingId, req.user.userId, req.user.role);
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a review' })
    @ApiResponse({ status: 200, description: 'Review updated successfully' })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateReviewDto: UpdateReviewDto,
      @Request() req,
    ) {
      return this.reviewsService.update(id, updateReviewDto, req.user.userId);
    }
  }
  