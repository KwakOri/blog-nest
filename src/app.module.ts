import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import r2Config from './config/r2.config';
import { R2Service } from './r2/r2.service';
import { R2Module } from './r2/r2.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { BlogsModule } from './blogs/blogs.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [r2Config],
    }),
    R2Module,
    PrismaModule,
    PostsModule,
    BlogsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, R2Service],
})
export class AppModule {}
