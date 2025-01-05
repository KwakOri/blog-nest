import { Injectable } from '@nestjs/common';
import { CreateBlogRequest } from 'src/blogs/dto/create-blog.dto';
import { getBlogRequest } from 'src/blogs/dto/get-blog.dto';
import { UpdateBlogRequest } from 'src/blogs/dto/update-blog.dto';
import { BlogQueryBuilder } from 'src/blogs/query/blogQueryBuilder';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async getBlogs() {
    return await this.prisma.bokdeokbang_blogs.findMany();
  }

  async getBlog(req: getBlogRequest) {
    return await this.prisma.bokdeokbang_blogs.findUnique(
      BlogQueryBuilder.getBlog(req),
    );
  }

  async createBlog(req: CreateBlogRequest) {
    return await this.prisma.bokdeokbang_blogs.create(
      BlogQueryBuilder.createBlog(req),
    );
  }

  async updateBlog(req: UpdateBlogRequest) {
    return await this.prisma.bokdeokbang_blogs.update(
      BlogQueryBuilder.updateBlog(req),
    );
  }

  async deleteBlog() {}
}