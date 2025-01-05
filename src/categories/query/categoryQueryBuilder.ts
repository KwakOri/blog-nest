import { Prisma } from '@prisma/client';
import { GetCategoriesRequest } from 'src/categories/dto/get-categories.dto';

export class CategoryQueryBuilder {
  static getCategories({
    blogId,
  }: GetCategoriesRequest): Prisma.bokdeokbang_categoriesFindManyArgs {
    return {
      where: {
        blogs: {
          id: blogId,
        },
      },
    };
  }
}
