import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogIdQuery } from 'src/dto/common.dto';

import { CreatePostBody } from 'src/posts/dto/create-post.dto';
import { DeletePostParam } from 'src/posts/dto/delete-post.dto';
import { GetPostParam } from 'src/posts/dto/get-post.dto';
import { GetPostsQuery } from 'src/posts/dto/get-posts.dto';
import { UpdatePostBody, UpdatePostParam } from 'src/posts/dto/update-post.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}

  @Get()
  async getPosts(@Query() query: GetPostsQuery) {
    return await this.PostsService.getPosts(query);
  }

  @Get('/:postId')
  async getPost(@Query() query: BlogIdQuery, @Param() param: GetPostParam) {
    return await this.PostsService.getPost({ ...query, ...param });
  }

  @Post()
  async createPost(@Query() query: BlogIdQuery, @Body() body: CreatePostBody) {
    return await this.PostsService.createPost({ ...body, ...query });
  }

  @Put('/:postId')
  async updatePost(
    @Query() query: BlogIdQuery,
    @Param() param: UpdatePostParam,
    @Body() body: UpdatePostBody,
  ) {
    return await this.PostsService.updatePost({ ...body, ...query, ...param });
  }

  @Delete('/postId')
  async deletePost(@Param() param: DeletePostParam) {
    this.PostsService.deletePost({ ...param });
  }
}
