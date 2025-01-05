import { Injectable } from '@nestjs/common';
import { GetCategoriesRequest } from 'src/categories/dto/get-categories.dto';
import { CategoryQueryBuilder } from 'src/categories/query/categoryQueryBuilder';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async getCategories(req: GetCategoriesRequest) {
    await this.prisma.bokdeokbang_categories.findMany(
      CategoryQueryBuilder.getCategories(req),
    );
  }

  async createCategory(req) {}

  async updateCategory(req) {}

  async deleteCategory(req) {}
}
