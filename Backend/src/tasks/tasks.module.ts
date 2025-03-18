// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth/auth.module';
import { PasswordResetRepository } from '../auth/repositories/password-reset.repository';
import { CleanupTokensTask } from './cleanup-tokens.task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  providers: [CleanupTokensTask],
})
export class TasksModule {}
