import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('companions')
export class Companion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.companionProfiles)
  user: User;

  @Column()
  bio: string;

  @Column('simple-array')
  languages: string[];

  @Column('simple-array')
  specialties: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  hourlyRate: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.companion)
  bookings: Booking[];
}
