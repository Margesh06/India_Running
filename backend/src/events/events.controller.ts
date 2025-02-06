import { Controller, Get, Param,Post, ParseIntPipe,Body  } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './create-event.dto';


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get('trending')
  async getTrendingEvents(): Promise<any> {
    try {
      const result = await this.eventsService.getTrendingEvents();
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
  // GET request to fetch events by organiser ID
  @Get('organiser/:organiserId')
  async findByOrganiser(@Param('organiserId', ParseIntPipe) organiserId: number): Promise<any> {
    try {
      const result = await this.eventsService.getEventByOrganiser(organiserId);
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
