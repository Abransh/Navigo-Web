// src/companions/companions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companion } from './entities/companion.entity';
import { SearchCompanionsDto } from './dto/search-companions.dto';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanionsService {
  constructor(
    @InjectRepository(Companion)
    private companionsRepository: Repository<Companion>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Companion[]> {
    return this.companionsRepository.find({ 
      where: { isVerified: true, isAvailable: true },
      relations: ['user']
    });
  }

  async findOne(id: string): Promise<Companion | null> {
    return this.companionsRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
  }

  async findByUserId(userId: string): Promise<Companion | null> {
    return this.companionsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  async search(searchDto: SearchCompanionsDto): Promise<Companion[]> {
    const query = this.companionsRepository.createQueryBuilder('companion')
      .leftJoinAndSelect('companion.user', 'user')
      .where('companion.isVerified = :isVerified', { isVerified: true })
      .andWhere('companion.isAvailable = :isAvailable', { isAvailable: true });

    if (searchDto.languages && searchDto.languages.length > 0) {
      query.andWhere('companion.languages && :languages', { 
        languages: searchDto.languages 
      });
    }

    if (searchDto.specialties && searchDto.specialties.length > 0) {
      query.andWhere('companion.specialties && :specialties', { 
        specialties: searchDto.specialties 
      });
    }

    if (searchDto.minRating) {
      query.andWhere('companion.averageRating >= :minRating', { 
        minRating: searchDto.minRating 
      });
    }

    if (searchDto.maxHourlyRate) {
      query.andWhere('companion.hourlyRate <= :maxHourlyRate', {
        maxHourlyRate: searchDto.maxHourlyRate
      });
    }

    if (searchDto.location) {
      query.andWhere('LOWER(user.location) LIKE LOWER(:location)', {
        location: `%${searchDto.location}%`
      });
    }

    return query.getMany();
  }

  async create(createCompanionDto: CreateCompanionDto): Promise<Companion> {
    const user = await this.usersService.findById(createCompanionDto.userId);
    
    const companion = this.companionsRepository.create({
      user,
      bio: createCompanionDto.bio,
      languages: createCompanionDto.languages,
      specialties: createCompanionDto.specialties,
      hourlyRate: createCompanionDto.hourlyRate,
      isVerified: false, // New companions need verification
      isAvailable: true,
      averageRating: 0,
      totalReviews: 0,
    });
    
    return this.companionsRepository.save(companion);
  }

  async update(id: string, updateCompanionDto: UpdateCompanionDto): Promise<Companion | null> {
    const companion = await this.findOne(id);
    if (!companion) {
      return null;
    }
    
    if (updateCompanionDto.bio !== undefined) {
      companion.bio = updateCompanionDto.bio;
    }
    
    if (updateCompanionDto.languages !== undefined) {
      companion.languages = updateCompanionDto.languages;
    }
    
    if (updateCompanionDto.specialties !== undefined) {
      companion.specialties = updateCompanionDto.specialties;
    }
    
    if (updateCompanionDto.hourlyRate !== undefined) {
      companion.hourlyRate = updateCompanionDto.hourlyRate;
    }
    
    if (updateCompanionDto.isAvailable !== undefined) {
      companion.isAvailable = updateCompanionDto.isAvailable;
    }
    
    if (updateCompanionDto.averageRating !== undefined) {
      companion.averageRating = updateCompanionDto.averageRating;
    }
    
    if (updateCompanionDto.totalReviews !== undefined) {
      companion.totalReviews = updateCompanionDto.totalReviews;
    }
    
    return this.companionsRepository.save(companion);
  }
}