import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from '../../entities/eventCategory.entity';
import { Event } from '../../entities/event.entity'; // Import Event entity
import { Category } from '../../entities/category.entity'; // Import Category entity
import { CreateEventCategoryDto } from './create_event_category.dto';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
    
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,  // Now it will be recognized
  ) {}

  async create(createEventCategoryDto: CreateEventCategoryDto): Promise<EventCategory> {
    // Corrected `findOne` method calls
    const event = await this.eventRepository.findOne({ where: { id: createEventCategoryDto.eventId } });
    const category = await this.categoryRepository.findOne({ where: { id: createEventCategoryDto.categoryId } });
  
    if (!event || !category) {
      throw new Error('Event or Category not found');
    }
  
    const eventCategory = new EventCategory();
    eventCategory.event = event;
    eventCategory.category = category;
  
    return this.eventCategoryRepository.save(eventCategory);
  }
  
}
