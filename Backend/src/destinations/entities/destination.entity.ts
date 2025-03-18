// Backend/src/destinations/entities/destination.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('destinations')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @Column('simple-array', { nullable: true })
  highlights: string[];

  @Column({ type: 'jsonb', nullable: true })
  attractions: {
    name: string;
    description: string;
    image: string;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
