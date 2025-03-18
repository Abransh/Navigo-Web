// src/companions/companions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanionsController } from './companions.controller';
import { CompanionsService } from './companions.service';
import { Companion } from './entities/companion.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Companion]),
    UsersModule
  ],
  controllers: [CompanionsController],
  providers: [CompanionsService],
  exports: [CompanionsService],
})
export class CompanionsModule {}
