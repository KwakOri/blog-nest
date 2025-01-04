import { Injectable } from '@nestjs/common';
import { CreateBlogRequest } from 'src/blogs/dto/create-blog.dto';
import { BlogQueryBuilder } from 'src/blogs/query/blogQueryBuilder';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async getBlogs() {}

  async getBlog() {}

  async createBlog(req: CreateBlogRequest) {
    return await this.prisma.bokdeokbang_blogs.create(
      BlogQueryBuilder.createBlog(req),
    );
  }

  async updateBlog() {}

  async deleteBlog() {}
}
