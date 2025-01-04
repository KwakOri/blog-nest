import { Prisma } from '@prisma/client';
import { CreateBlogRequest } from 'src/blogs/dto/create-blog.dto';

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
}
