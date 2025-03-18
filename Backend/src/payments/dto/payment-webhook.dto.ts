// src/payments/dto/payment-webhook.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentWebhookDto {
  @ApiProperty({
    description: 'Webhook type (event name)',
    example: 'payment_intent.succeeded',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Webhook data containing payment information',
    example: '{ "object": { "id": "pi_123456789", "status": "succeeded" } }',
  })
  @IsNotEmpty()
  data: any;
}
