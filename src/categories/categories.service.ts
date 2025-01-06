import { Injectable } from '@nestjs/common';
import { CreateCategoryRequest } from 'src/categories/dto/create-category.dto';
import { DeleteCategoryRequest } from 'src/categories/dto/delete-category.dto';
import { GetCategoriesRequest } from 'src/categories/dto/get-categories.dto';
import { UpdateCategoryRequest } from 'src/categories/dto/update-category.dto';
import { CategoryQueryBuilder } from 'src/categories/query/categoryQueryBuilder';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(req: GetCategoriesRequest) {
    return await this.prisma.bokdeokbang_categories.findMany(
      CategoryQueryBuilder.getCategories(req),
    );
  }

  async createCategory(req: CreateCategoryRequest) {
    return await this.prisma.bokdeokbang_categories.create(
      CategoryQueryBuilder.createCategory(req),
    );
  }

  async updateCategory(req: UpdateCategoryRequest) {
    return await this.prisma.bokdeokbang_categories.update(
      CategoryQueryBuilder.updateCategory(req),
    );
  }

  async deleteCategory(req: DeleteCategoryRequest) {
    return await this.prisma.bokdeokbang_categories.delete(
      CategoryQueryBuilder.deleteCategory(req),
    );
  }
}
