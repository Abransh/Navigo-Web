// src/admin/admin.controller.ts
import { 
    Controller, 
    Get, 
    Patch, 
    Param, 
    Query, 
    UseGuards, 
    Body 
  } from '@nestjs/common';
  import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBearerAuth 
  } from '@nestjs/swagger';
  
  // Guards
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  
  // Services
  import { UsersService } from '../users/users.service';
  import { BookingsService } from '../bookings/bookings.service';
  import { CompanionsService } from '../companions/companions.service';
  import { PaymentsService } from '../payments/payments.service';
  
  // DTOs
  import { UpdateUserDto } from '../users/dto/update-user.dto';
  
  // Enums
  import { UserRole } from '../users/enums/user-role.enum';
  
  @ApiTags('admin')
  @Controller('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  export class AdminController {
    constructor(
      private readonly usersService: UsersService,
      private readonly bookingsService: BookingsService,
      private readonly companionsService: CompanionsService,
      private readonly paymentsService: PaymentsService,
    ) {}
  
    @Get('stats')
    @ApiOperation({ summary: 'Get admin dashboard statistics' })
    @ApiResponse({ status: 200, description: 'Dashboard statistics retrieved successfully' })
    async getDashboardStats() {
      const [
        totalUsers,
        totalCompanions,
        totalBookings,
        totalRevenue,
        pendingVerifications,
        companionApplications
      ] = await Promise.all([
        this.usersService.getTotalUserCount(),
        this.companionsService.getTotalCompanionCount(),
        this.bookingsService.getTotalBookingCount(),
        this.paymentsService.getTotalRevenue(),
        this.companionsService.getPendingVerificationsCount(),
        this.companionsService.getPendingApplicationsCount()
      ]);
  
      return {
        totalUsers,
        totalCompanions,
        totalBookings,
        totalRevenue,
        pendingVerifications,
        companionApplications
      };
    }
  
    @Get('users')
    @ApiOperation({ summary: 'Get paginated list of users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async getUsers(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
      @Query('filter') filter = ''
    ) {
      return this.usersService.getPaginatedUsers(page, limit, filter);
    }
  
    @Patch('users/:id/status')
    @ApiOperation({ summary: 'Update user status' })
    @ApiResponse({ status: 200, description: 'User status updated successfully' })
    async updateUserStatus(
      @Param('id') userId: string,
      @Body() updateUserDto: UpdateUserDto
    ) {
      return this.usersService.update(userId, updateUserDto);
    }
  
    @Get('bookings')
    @ApiOperation({ summary: 'Get paginated list of bookings' })
    @ApiResponse({ status: 200, description: 'Bookings retrieved successfully' })
    async getBookings(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
      @Query('filter') filter = ''
    ) {
      return this.bookingsService.getPaginatedBookings(page, limit, filter);
    }
  
    @Get('payments')
    @ApiOperation({ summary: 'Get paginated list of payments' })
    @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
    async getPayments(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
      @Query('filter') filter = ''
    ) {
      return this.paymentsService.getPaginatedPayments(page, limit, filter);
    }
  
    @Get('companion-applications')
    @ApiOperation({ summary: 'Get paginated list of companion applications' })
    @ApiResponse({ status: 200, description: 'Companion applications retrieved successfully' })
    async getCompanionApplications(
      @Query('page') page = 1,
      @Query('limit') limit = 10
    ) {
      return this.companionsService.getPendingApplications(page, limit);
    }
  
    @Patch('companion-applications/:id')
    @ApiOperation({ summary: 'Process companion application' })
    @ApiResponse({ status: 200, description: 'Companion application processed successfully' })
    async processCompanionApplication(
      @Param('id') applicationId: string,
      @Body('status') status: 'approved' | 'rejected'
    ) {
      return this.companionsService.processApplication(applicationId, status);
    }
  }