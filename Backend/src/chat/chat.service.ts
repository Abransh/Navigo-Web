// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveMessage(messageData: { senderId: string; recipientId: string; content: string }): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: messageData.senderId } });
    const recipient = await this.userRepository.findOne({ where: { id: messageData.recipientId } });
    
    if (!sender || !recipient) {
      throw new Error('Sender or recipient not found');
    }
    
    const message = this.messageRepository.create({
      sender,
      recipient,
      content: messageData.content,
      isRead: false,
    });
    
    return this.messageRepository.save(message);
  }

  async getConversation(user1Id: string, user2Id: string): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.recipient', 'recipient')
      .where(
        '(message.sender.id = :user1Id AND message.recipient.id = :user2Id) OR ' +
        '(message.sender.id = :user2Id AND message.recipient.id = :user1Id)',
        { user1Id, user2Id }
      )
      .orderBy('message.sentAt', 'ASC')
      .getMany();
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.messageRepository.update(messageId, { isRead: true });
  }
}