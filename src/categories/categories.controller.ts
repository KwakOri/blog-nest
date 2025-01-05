import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { GetCategoriesQuery } from 'src/categories/dto/get-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesService: CategoriesService) {}

  @Get()
  getGetCategories(@Query() query: GetCategoriesQuery) {
    return this.CategoriesService.getCategories(query);
  }
}
