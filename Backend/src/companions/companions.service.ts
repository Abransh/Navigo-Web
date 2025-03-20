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

  // Add these methods to the existing CompanionsService class in src/companions/companions.service.ts

/**
 * Get total count of companions
 */
async getTotalCompanionCount(): Promise<number> {
  return this.companionsRepository.count();
}

/**
 * Get count of companions pending verification
 */
async getPendingVerificationsCount(): Promise<number> {
  return this.companionsRepository.count({
    where: { isVerified: false }
  });
}

/**
 * Get count of pending companion applications
 */
async getPendingApplicationsCount(): Promise<number> {
  // If there's a separate table for applications, use that repository
  // For this example, we're treating unverified companions as pending applications
  return this.getPendingVerificationsCount();
}

/**
 * Get paginated list of pending companion applications
 */
async getPendingApplications(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const [applications, total] = await this.companionsRepository.findAndCount({
    where: { isVerified: false },
    relations: ['user'],
    skip,
    take: limit,
    order: { createdAt: 'DESC' },
  });
  
  return {
    applications,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Process a companion application (approve or reject)
 */
async processApplication(applicationId: string, status: 'approved' | 'rejected'): Promise<any> {
  const companion = await this.findOne(applicationId);
  
  if (!companion) {
    throw new Error('Companion application not found');
  }
  
  if (status === 'approved') {
    companion.isVerified = true;
    await this.companionsRepository.save(companion);
    
    // Could also send a notification to the user here
    
    return { status: 'success', message: 'Application approved', companion };
  } else {
    // For rejected applications, you can either:
    // 1. Delete the companion record
    //await this.companionsRepository.remove(companion);
    
    // 2. Or mark it as rejected (you'd need to add a 'status' field to the Companion entity)
    // companion.status = 'rejected';
    // await this.companionsRepository.save(companion);
    
    // For this example, we'll just delete it
    await this.companionsRepository.remove(companion);
    
    return { status: 'success', message: 'Application rejected' };
  }
}
}