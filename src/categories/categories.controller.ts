import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/jwt.guard';
import { CategoriesService } from 'src/categories/categories.service';
import {
  CreateCategoryBody,
  CreateCategoryQuery,
} from 'src/categories/dto/create-category.dto';
import { DeleteCategoryParam } from 'src/categories/dto/delete-category.dto';
import { GetCategoriesQuery } from 'src/categories/dto/get-categories.dto';
import {
  UpdateCategoryBody,
  UpdateCategoryParam,
  UpdateCategoryQuery,
} from 'src/categories/dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query() query: GetCategoriesQuery) {
    return this.CategoriesService.getCategories(query);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  createCategory(
    @Query() query: CreateCategoryQuery,
    @Body() body: CreateCategoryBody,
  ) {
    return this.CategoriesService.createCategory({ ...query, ...body });
  }

  @Put('/:categoryId')
  @UseGuards(AccessTokenGuard)
  updateCategory(
    @Query() query: UpdateCategoryQuery,
    @Param() param: UpdateCategoryParam,
    @Body() body: UpdateCategoryBody,
  ) {
    return this.CategoriesService.updateCategory({
      ...query,
      ...param,
      ...body,
    });
  }

  @Delete('/:categoryId')
  @UseGuards(AccessTokenGuard)
  deleteCategory(@Param() param: DeleteCategoryParam) {
    return this.CategoriesService.deleteCategory(param);
  }
}
