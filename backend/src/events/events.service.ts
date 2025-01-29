import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,ILike} from 'typeorm';
import { Event } from '../entities/event.entity';
import { Category } from '../entities/category.entity';
import { EventCategory } from '../entities/eventCategory.entity';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<any> {
    const events = await this.eventRepository.find({ relations: ['eventCategories', 'eventCategories.category'] });

    // Map events to include min price of their categories
    return events.map((event) => {
      const prices = event.eventCategories.map((eventCategory) => eventCategory.category.price);
      const minPrice = Math.min(...prices);

      return {
        ...event,
        categories: event.eventCategories.map((eventCategory) => eventCategory.category.title),  // Category titles
        minPrice, // Adding the min price to the event
      };
    });
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
