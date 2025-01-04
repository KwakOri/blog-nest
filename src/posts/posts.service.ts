import { Injectable } from '@nestjs/common';
import { CreatePostRequest } from 'src/posts/dto/create-post.dto';
import { GetPostRequest } from 'src/posts/dto/get-post.dto';
import { GetPostsRequest } from 'src/posts/dto/get-posts.dto';
import { UpdatePostRequest } from 'src/posts/dto/update-post.dto';
import { PostQueryBuilder } from 'src/posts/utils/postQueryBuilder';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(req: GetPostsRequest) {
    return await this.prisma.bokdeokbang_posts.findMany(
      PostQueryBuilder.getPosts(req),
    );
  }

  async getPost(req: GetPostRequest) {
    return await this.prisma.bokdeokbang_posts.findUnique(
      PostQueryBuilder.getPost(req),
    );
  }

  async createPost(req: CreatePostRequest) {
    return await this.prisma.bokdeokbang_posts.create(
      PostQueryBuilder.createPost(req),
    );
  }

  async updatePost(req: UpdatePostRequest) {
    return await this.prisma.bokdeokbang_posts.update(
      PostQueryBuilder.updatePost(req),
    );
  }
}
