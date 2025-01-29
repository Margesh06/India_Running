import { Controller, Get, Param,Query, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // GET request to fetch all events
  @Get()
  async findAll(): Promise<any> {
    const result = await this.eventsService.findAll();
    return {
      data: result,
      error: null,
    };
  }

  // GET request to fetch a specific event by its ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const result = await this.eventsService.findById(id);
      return {
        data: result,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error.message,
      };
    }
  }
}
