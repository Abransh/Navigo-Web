// src/auth/repositories/password-reset.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetRepository {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly repository: Repository<PasswordReset>,
  ) {}

  async save(passwordReset: Partial<PasswordReset>): Promise<PasswordReset> {
    return this.repository.save(passwordReset);
  }

  async findByEmail(email: string): Promise<PasswordReset[]> {
    return this.repository.find({
      where: { email },
      order: { createdAt: 'DESC' },
    });
  }

  async findByToken(token: string): Promise<PasswordReset | null> {
    return this.repository.findOne({
      where: { token },
    });
  }

  async find(options?: any): Promise<PasswordReset[]> {
    if (options?.where?.expires?.$gt) {
      // Convert MongoDB-style query to TypeORM
      const date = options.where.expires.$gt;
      return this.repository.find({
        where: { expires: MoreThan(date) },
      });
    }
    return this.repository.find(options);
  }

  async delete(criteria: any): Promise<void> {
    await this.repository.delete(criteria);
  }

  async deleteExpired(): Promise<void> {
    const now = new Date();
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('expires < :now', { now })
      .execute();
  }
}