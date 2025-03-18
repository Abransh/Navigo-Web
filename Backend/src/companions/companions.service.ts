import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companion } from './entities/compantion.entity';
import { SearchCompanionsDto } from './dto/search-companions.dto';

@Injectable()
export class CompanionsService {
  constructor(
    @InjectRepository(Companion)
    private companionsRepository: Repository<Companion>,
  ) {}

  async findAll(): Promise<Companion[]> {
    return this.companionsRepository.find({ 
      where: { isVerified: true, isAvailable: true },
      relations: ['user']
    });
  }

  async findOne(id: string): Promise<Companion> {
    return this.companionsRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
  }

  async search(searchDto: SearchCompanionsDto): Promise<Companion[]> {
    const query = this.companionsRepository.createQueryBuilder('companion')
      .leftJoinAndSelect('companion.user', 'user')
      .where('companion.isVerified = :isVerified', { isVerified: true })
      .andWhere('companion.isAvailable = :isAvailable', { isAvailable: true });

    if (searchDto.languages) {
      query.andWhere('companion.languages && :languages', { 
        languages: searchDto.languages 
      });
    }

    if (searchDto.specialties) {
      query.andWhere('companion.specialties && :specialties', { 
        specialties: searchDto.specialties 
      });
    }

    if (searchDto.minRating) {
      query.andWhere('companion.averageRating >= :minRating', { 
        minRating: searchDto.minRating 
      });
    }

    return query.getMany();
  }
}