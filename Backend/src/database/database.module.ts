// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class DatabaseModule {}