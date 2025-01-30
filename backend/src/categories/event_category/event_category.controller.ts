// src/event-categories/event-category.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EventCategoryService } from './event_category.service';
import { CreateEventCategoryDto } from './create_event_category.dto';

@Controller('event-categories')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Post()
  async create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return await this.eventCategoryService.create(createEventCategoryDto);
  }
}
