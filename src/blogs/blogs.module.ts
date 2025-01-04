import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
