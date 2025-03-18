// Backend/src/destinations/destinations.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DestinationsService } from './destinations.service';

@ApiTags('destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all destinations' })
  @ApiResponse({ status: 200, description: 'Return all destinations' })
  async findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a destination by slug' })
  @ApiResponse({ status: 200, description: 'Return the destination' })
  @ApiResponse({ status: 404, description: 'Destination not found' })
  async findOne(@Param('slug') slug: string) {
    const destination = await this.destinationsService.findBySlug(slug);
    if (!destination) {
      throw new NotFoundException(`Destination with slug ${slug} not found`);
    }
    return destination;
  }
}
