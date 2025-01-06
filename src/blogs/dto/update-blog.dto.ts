import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { BlogIdParam } from 'src/dto/blog.dto';

export class UpdateBlogBody implements Prisma.bokdeokbang_blogsUpdateInput {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subdomain: string;
}

export class UpdateBlogRequest extends IntersectionType(
  UpdateBlogBody,
  BlogIdParam,
) {}
