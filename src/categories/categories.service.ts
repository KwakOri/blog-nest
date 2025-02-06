import { Injectable } from '@nestjs/common';
import { CreateCategoryRequest } from 'src/categories/dto/create-category.dto';
import { DeleteCategoryRequest } from 'src/categories/dto/delete-category.dto';
import { UpdateCategoryRequest } from 'src/categories/dto/update-category.dto';
import { CategoryQueryBuilder } from 'src/categories/query/categoryQueryBuilder';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.bokdeokbang_categories.findMany();
    const blogs = await this.prisma.bokdeokbang_blogs.findMany();
    return blogs.map((blog) => {
      return {
        blogId: blog.id,
        blogName: blog.name,
        categories: categories.filter(
          (category) => category.blogId === blog.id,
        ),
      };
    });
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
