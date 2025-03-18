// Backend/src/destinations/destinations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
  ) {}

  async findAll(): Promise<Destination[]> {
    return this.destinationsRepository.find();
  }

  async findBySlug(slug: string): Promise<Destination> {
    return this.destinationsRepository.findOne({ where: { slug } });
  }
}