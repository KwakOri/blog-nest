import { Injectable } from '@nestjs/common';
import { GetPostRequest } from 'src/posts/dto/get-post.dto';
import { GetPostsRequest } from 'src/posts/dto/get-posts.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts({ blogId }: GetPostsRequest) {
    return await this.prisma.bokdeokbang_posts.findMany({
      where: {
        blog_id: blogId,
      },
    });
  }

  async getPost({ blogId, postId }: GetPostRequest) {
    return await this.prisma.bokdeokbang_posts.findUnique({
      where: { id: postId, blog_id: blogId },
    });
  }
}
