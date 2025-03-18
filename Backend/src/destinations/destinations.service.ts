// Backend/src/destinations/destinations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const destination = await this.destinationsRepository.findOne({ where: { slug } });
    
    if (!destination) {
      throw new NotFoundException(`Destination with slug ${slug} not found`);
    }
    
    return destination;
  }
}