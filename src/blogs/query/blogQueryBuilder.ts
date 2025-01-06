import { Prisma } from '@prisma/client';
import { CreateBlogRequest } from 'src/blogs/dto/create-blog.dto';
import { DeleteBlogRequest } from 'src/blogs/dto/delete-blog.dto';
import { GetBlogRequest } from 'src/blogs/dto/get-blog.dto';
import { UpdateBlogRequest } from 'src/blogs/dto/update-blog.dto';

export class BlogQueryBuilder {
  static createBlog(
    req: CreateBlogRequest,
  ): Prisma.bokdeokbang_blogsCreateArgs {
    return {
      data: {
        ...req,
      },
    };
  }

  static getBlog({
    blogId,
  }: GetBlogRequest): Prisma.bokdeokbang_blogsFindUniqueArgs {
    return {
      where: {
        id: blogId,
      },
    };
  }

  static updateBlog({
    blogId,
    ...data
  }: UpdateBlogRequest): Prisma.bokdeokbang_blogsUpdateArgs {
    return {
      where: {
        id: blogId,
      },
      data,
    };
  }

  static deleteBlog({
    blogId,
  }: DeleteBlogRequest): Prisma.bokdeokbang_blogsDeleteArgs {
    return {
      where: {
        id: blogId,
      },
    };
  }
}
