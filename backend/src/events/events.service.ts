import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,ILike} from 'typeorm';
import { Event } from '../entities/event.entity';
import { Category } from '../entities/category.entity';
import { EventCategory } from '../entities/eventCategory.entity';
import { Organiser } from '../entities/organiser.entity';
import { CreateEventDto } from '../events/create-event.dto'; 
import { CreateCategoryDto } from '../events/create-category.dto';
import { InclusiveItems } from '../entities/category.entity';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Organiser)
    private readonly organiserRepository: Repository<Organiser>,
    
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

  async findById(id: number): Promise<any> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['eventCategories', 'eventCategories.category'], // Include related event categories and their associated category
    });
  
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  

    const prices = event.eventCategories.map((eventCategory) => eventCategory.category.price);
    const minPrice = Math.min(...prices);
  
    return {
      ...event,
      categories: event.eventCategories.map((eventCategory) => eventCategory.category.title),  // Category titles
      minPrice, 
    };
  }
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const {
      name,
      description,
      venue,
      gallery_images,
      organiser_id,
      event_type,
      activity_type,
      start_date,
      end_date,
      reg_close_date,
      country,
      state,
      city,
      pincode,
      area,
      banner_image,
      mobile_banner,
    } = createEventDto;

    // Validate that organiser exists
    const organiser = await this.organiserRepository.findOne({ where: { id: organiser_id } });
    if (!organiser) {
      throw new NotFoundException(`Organiser with ID ${organiser_id} not found`);
    }

    // Create event entity
    const event = this.eventRepository.create({
      name,
      description,
      venue,
      gallery_images,
      organiser,
      event_type,
      activity_type,
      start_date,
      end_date,
      reg_close_date,
      country,
      state,
      city,
      pincode,
      area,
      banner_image,
      mobile_banner,
    });

    // Save to DB
    return await this.eventRepository.save(event);
  }
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title, price, additionalInfo, ageLimitMin, ageLimitMax, inclusive } = createCategoryDto;
  
    // Ensure `inclusive` contains valid enum values
    const validInclusive = inclusive?.map((item) => InclusiveItems[item.toUpperCase() as keyof typeof InclusiveItems]);
  
    const category = this.categoryRepository.create({
      title,
      price,
      additionalInfo,
      ageLimitMin,
      ageLimitMax,
      inclusive: validInclusive || [],
    });
  
    return await this.categoryRepository.save(category);
  }
  async getTrendingEvents(): Promise<any> {
    const currentDate = new Date(); // Current date-time
  
    // Fetch all events
    const events = await this.eventRepository.find({
      relations: ['eventCategories', 'eventCategories.category'],
    });
  
    // Filter events that have a start_date greater than or equal to the current date
    const upcomingEvents = events.filter(event => new Date(event.start_date) >= currentDate);
  
    // Sort events by start_date in descending order (latest first)
    upcomingEvents.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  
    // Take the first 3 events
    const trendingEvents = upcomingEvents.slice(0, 3);
  
    // Map events to include category titles and minimum prices
    return trendingEvents.map((event) => {
      const prices = event.eventCategories.map((eventCategory) => eventCategory.category.price);
      const minPrice = Math.min(...prices);
  
      return {
        ...event,
        categories: event.eventCategories.map((eventCategory) => eventCategory.category.title),
        minPrice,
      };
    });
  }

  async getEventByOrganiser(organiserId: number) {
    try {
      const events = await this.eventRepository.find({
        where: {
          organiser_id: organiserId,
        },
      });
  
      // Return an empty array if no events are found
      return events.length > 0 ? events : [];
    } catch (error) {
      // Handle any errors that may occur during the query
      console.error("Error fetching events:", error);
      return [];
    }
  }
  
  
}
