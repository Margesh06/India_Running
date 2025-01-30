// src/event-categories/dto/create-event-category.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEventCategoryDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
