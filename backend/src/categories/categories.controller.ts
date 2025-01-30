import { Controller, Post, Body } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/create-category.dto';  // CreateCategoryDto file to handle validation

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }
}
