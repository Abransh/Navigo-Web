// src/companions/companions.controller.ts
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    UseGuards, 
    Query,
    ParseUUIDPipe,
    NotFoundException
  } from '@nestjs/common';

  import { CompanionsService } from './companions.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { CreateCompanionDto } from './dto/create-companion.dto';
  import { UpdateCompanionDto } from './dto/update-companion.dto';
  import { SearchCompanionsDto } from './dto/search-companions.dto';
  import { UserRole } from '../users/enums/user-role.enum';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  
  @ApiTags('companions')
  @Controller('companions')
  export class CompanionsController {
    constructor(private readonly companionsService: CompanionsService) {}
  
    @Get()
    @ApiOperation({ summary: 'Get all verified and available companions' })
    @ApiResponse({ status: 200, description: 'Returns all available companions' })
    async findAll() {
      return this.companionsService.findAll();
    }
  
    @Get('search')
    @ApiOperation({ summary: 'Search for companions based on criteria' })
    @ApiResponse({ status: 200, description: 'Returns matching companions' })
    async search(@Query() searchDto: SearchCompanionsDto) {
      return this.companionsService.search(searchDto);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a companion by ID' })
    @ApiResponse({ status: 200, description: 'Returns the companion' })
    @ApiResponse({ status: 404, description: 'Companion not found' })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      const companion = await this.companionsService.findOne(id);
      if (!companion) {
        throw new NotFoundException('Companion not found');
      }
      return companion;
    }
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.COMPANION, UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a companion profile' })
    @ApiResponse({ status: 201, description: 'Companion profile created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async create(@Body() createCompanionDto: CreateCompanionDto) {
      return this.companionsService.create(createCompanionDto);
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.COMPANION, UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a companion profile' })
    @ApiResponse({ status: 200, description: 'Companion profile updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Companion not found' })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateCompanionDto: UpdateCompanionDto,
    ) {
      return this.companionsService.update(id, updateCompanionDto);
    }
  }