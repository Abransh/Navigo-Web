// Backend/src/auth/entities/social-profile.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('social_profiles')
export class SocialProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.socialProfiles)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}