import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrganiserService } from './organisers.service';
import { CreateOrganiserDto } from './create-organisers.dto';

@Controller('organisers')
export class OrganiserController {
  constructor(private readonly organiserService: OrganiserService) {}

  @Post('register')
  async register(@Body() createOrganiserDto: CreateOrganiserDto) {
    return this.organiserService.registerOrganiser(createOrganiserDto);
  }

  @Get()
  async findAll() {
    return this.organiserService.getOrganisers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.organiserService.getOrganiserById(id);
  }
}
