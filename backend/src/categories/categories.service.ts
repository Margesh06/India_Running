import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './create-category.dto';  // DTO for category validation

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { title, price, additionalInfo, ageLimitMin, ageLimitMax, inclusive } = createCategoryDto;

    // Create and save category entity
    const category = this.categoryRepository.create({
      title,
      price,
      additionalInfo,
      ageLimitMin,
      ageLimitMax,
      inclusive,
    });

    return await this.categoryRepository.save(category);
  }
}
