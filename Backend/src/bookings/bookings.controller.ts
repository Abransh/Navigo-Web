// src/bookings/bookings.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CalculatePriceDto } from './dto/cancel-booking.dto';
import { BookingStatus } from './enums/booking-status.enum';
import { UserRole } from '../users/enums/user-role.enum';
  
  @ApiTags('bookings')
  @Controller('bookings')
  export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiResponse({ status: 201, description: 'Booking created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 404, description: 'Companion not found' })
    @ApiBody({ type: CreateBookingDto })
    async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
      return this.bookingsService.create(createBookingDto, req.user.userId);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all bookings for the current user' })
    @ApiResponse({ status: 200, description: 'Returns all bookings' })
    @ApiQuery({ name: 'status', enum: BookingStatus, required: false })
    async findAll(@Request() req, @Query('status') status?: BookingStatus) {
      return this.bookingsService.findAll(req.user.userId, req.user.role);
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a booking by ID' })
    @ApiResponse({ status: 200, description: 'Returns the booking' })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    async findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
      return this.bookingsService.findOne(id, req.user.userId, req.user.role);
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a booking' })
    @ApiResponse({ status: 200, description: 'Booking updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input or booking cannot be updated' })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiBody({ type: UpdateBookingDto })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateBookingDto: UpdateBookingDto,
      @Request() req,
    ) {
      return this.bookingsService.update(id, updateBookingDto, req.user.userId, req.user.role);
    }
  
    @Post(':id/cancel')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cancel a booking' })
    @ApiResponse({ status: 200, description: 'Booking cancelled successfully' })
    @ApiResponse({ status: 400, description: 'Booking cannot be cancelled' })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
    @ApiBody({ type: CancelBookingDto })
    async cancel(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() cancelBookingDto: CancelBookingDto,
      @Request() req,
    ) {
      return this.bookingsService.cancel(id, req.user.userId, cancelBookingDto.reason);
    }
  
    @Post('calculate-price')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Calculate booking price without creating a booking' })
    @ApiResponse({ status: 200, description: 'Returns calculated price' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @ApiResponse({ status: 404, description: 'Companion not found' })
    @ApiBody({ type: CalculatePriceDto })
    async calculatePrice(@Body() calculatePriceDto: CalculatePriceDto) {
      return this.bookingsService.calculatePrice(
        calculatePriceDto.companionId,
        calculatePriceDto.startDate,
        calculatePriceDto.endDate,
      );
    }
  }