import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // GET request to fetch all events
  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  // GET request to fetch a specific event by its ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventsService.findById(id);
  }
}
