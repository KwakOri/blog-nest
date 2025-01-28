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
import {
  UpdateCategoryBody,
  UpdateCategoryParam,
  UpdateCategoryQuery,
} from 'src/categories/dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.CategoriesService.getAllCategories();
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
