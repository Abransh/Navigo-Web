import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Companion } from '../../companions/entities/companion.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { SocialProfile } from '../../auth/entities/social-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TOURIST
  })
  role: UserRole;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, booking => booking.tourist)
  bookings: Booking[];

  @OneToMany(() => Companion, companion => companion.user)
  companionProfiles: Companion[];

  @OneToMany(() => SocialProfile, socialProfile => socialProfile.user)
socialProfiles: SocialProfile[];


}
