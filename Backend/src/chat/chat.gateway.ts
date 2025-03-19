import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { UseGuards } from '@nestjs/common';
  import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
  import { ChatService } from './chat.service';
  import { SendMessageDto } from './dto/send-message.dto';

  
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private chatService: ChatService) {}
  
    @UseGuards(WsJwtGuard)
    async handleConnection(client: Socket) {
      const userId = client.handshake.headers.authorization;
      if (userId) {
        client.join(userId);
        console.log(`Client connected: ${userId}`);
      }
    }
  
    handleDisconnect(client: Socket) {
      console.log('Client disconnected');
    }
  
    @UseGuards(WsJwtGuard)
    @SubscribeMessage('sendMessage')
async handleMessage(client: Socket, payload: SendMessageDto) {
  const senderId = client.handshake.headers.authorization || '';
  
  if (!senderId) {
    throw new UnauthorizedException('No sender ID provided');
  }
  
  const savedMessage = await this.chatService.saveMessage({
    senderId,
    recipientId: payload.recipientId,
    content: payload.content,
  });

  this.server.to(payload.recipientId).emit('newMessage', savedMessage);
  
  return savedMessage;
}
  }