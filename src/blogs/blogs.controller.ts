import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';
import { CreateBlogBody } from 'src/blogs/dto/create-blog.dto';
import { getBlogParam } from 'src/blogs/dto/get-blog.dto';
import { UpdateBlogBody } from 'src/blogs/dto/update-blog.dto';
import { BlogIdParam } from 'src/dto/common.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private BlogsService: BlogsService) {}

  @Get()
  getBlogs() {
    return this.BlogsService.getBlogs();
  }

  @Get('/:blogId')
  getBlog(@Param() param: getBlogParam) {
    return this.BlogsService.getBlog(param);
  }

  @Post()
  createBlog(@Body() body: CreateBlogBody) {
    return this.BlogsService.createBlog(body);
  }

  @Put('/:blogId')
  updateBlog(@Param() param: BlogIdParam, @Body() body: UpdateBlogBody) {
    return this.BlogsService.updateBlog({ ...param, ...body });
  }
}