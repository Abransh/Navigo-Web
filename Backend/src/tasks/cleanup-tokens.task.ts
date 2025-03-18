// Backend/src/tasks/cleanup-tokens.task.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PasswordResetRepository } from '../auth/repositories/password-reset.repository';

@Injectable()
export class CleanupTokensTask {
  private readonly logger = new Logger(CleanupTokensTask.name);

  constructor(private readonly passwordResetRepository: PasswordResetRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Running cleanup for expired password reset tokens');
    
    try {
      await this.passwordResetRepository.deleteExpired();
      this.logger.log('Expired password reset tokens cleaned up successfully');
    } catch (error) {
      this.logger.error('Error cleaning up expired password reset tokens', error);
    }
  }
}