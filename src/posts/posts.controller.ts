import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogIdQuery } from 'src/posts/dto/common.dto';
import { GetPostParam } from 'src/posts/dto/get-post.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}

  @Get()
  async getPosts(@Query() { blogId }: BlogIdQuery) {
    return await this.PostsService.getPosts({ blogId });
  }

  @Get('/:postId')
  async getPost(
    @Query() { blogId }: BlogIdQuery,
    @Param() { postId }: GetPostParam,
  ) {
    return await this.PostsService.getPost({ postId, blogId });
  }
}
