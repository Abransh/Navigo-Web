import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsUUID()
  recipientId: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}