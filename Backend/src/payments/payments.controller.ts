// src/payments/payments.controller.ts
import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    UseGuards,
    Request,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { PaymentsService } from './payments.services';  // Note the plural
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../users/enums/user-role.enum';
  import { CreatePaymentDto } from './dto/create-payment.dto';
  import { PaymentWebhookDto } from './dto/payment-webhook.dto';
  
  @ApiTags('payments')
  @Controller('payments')
  export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.TOURIST)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a payment intent' })
    @ApiResponse({ status: 201, description: 'Payment intent created' })
    async createPayment(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
      return this.paymentsService.createPayment(createPaymentDto, req.user.userId);
    }
  
    @Get(':bookingId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get payments for a booking' })
    @ApiResponse({ status: 200, description: 'Returns payments for the booking' })
    async getPaymentsByBooking(
      @Param('bookingId', ParseUUIDPipe) bookingId: string,
      @Request() req,
    ) {
      return this.paymentsService.getPaymentsByBooking(bookingId, req.user.userId, req.user.role);
    }
  
    @Post('webhook')
    @ApiOperation({ summary: 'Handle payment webhook from Stripe' })
    @ApiResponse({ status: 200, description: 'Webhook processed' })
    async handleWebhook(@Body() webhookDto: PaymentWebhookDto) {
      return this.paymentsService.handleWebhook(webhookDto);
    }
  }