import { Prisma } from '@prisma/client';
import { CreateCategoryRequest } from 'src/categories/dto/create-category.dto';
import { DeleteCategoryRequest } from 'src/categories/dto/delete-category.dto';
import { GetCategoriesRequest } from 'src/categories/dto/get-categories.dto';
import { UpdateCategoryRequest } from 'src/categories/dto/update-category.dto';

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

  static createCategory({ blogId, name }: CreateCategoryRequest) {
    return {
      data: {
        blogId,
        name,
      },
    };
  }

  static updateCategory({ categoryId, ...data }: UpdateCategoryRequest) {
    return {
      where: {
        id: categoryId,
      },
      data,
    };
  }

  static deleteCategory({
    categoryId,
  }: DeleteCategoryRequest): Prisma.bokdeokbang_categoriesDeleteArgs {
    return {
      where: {
        id: categoryId,
      },
    };
  }
}
