import { Body, Controller, Post } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';
import { CreateBlogBody } from 'src/blogs/dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private BlogsService: BlogsService) {}

  @Post()
  createBlog(@Body() body: CreateBlogBody) {
    return this.BlogsService.createBlog(body);
  }
}
