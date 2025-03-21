// Backend/src/users/users.service.ts
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create new user
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await this.usersRepository.save(user);

    // Remove password from response
    delete savedUser.password;
    
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    // Remove password from each user
    return users.map(user => {
      delete user.password;
      return user;
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Remove password from response
    delete user.password;
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is being changed and if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Update user
    await this.usersRepository.update(id, updateUserDto);
    
    // Get and return updated user
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updatedUser.password) {
      if (updatedUser.password) {
        delete updatedUser.password;
      }
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Verify current password
    if (!user.password) {
      throw new BadRequestException('User password is not set');
    }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.usersRepository.update(id, { password: hashedPassword });
  }

  // Add these methods to the existing UsersService class in src/users/users.service.ts

/**
 * Get total count of users
 */
async getTotalUserCount(): Promise<number> {
  return this.usersRepository.count();
}

/**
 * Get paginated users with optional filtering
 */
async getPaginatedUsers(page = 1, limit = 10, filter = '') {
  const skip = (page - 1) * limit;
  
  const queryBuilder = this.usersRepository.createQueryBuilder('user');
  
  if (filter) {
    queryBuilder.where(
      'user.firstName LIKE :filter OR user.lastName LIKE :filter OR user.email LIKE :filter',
      { filter: `%${filter}%` }
    );
  }
  
  const [users, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .orderBy('user.createdAt', 'DESC')
    .getManyAndCount();
  
  // Remove passwords from the response
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  return {
    users: usersWithoutPasswords,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  
}