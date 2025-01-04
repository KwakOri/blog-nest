import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogBody implements Prisma.bokdeokbang_blogsCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subdomain: string;
}

export class CreateBlogRequest extends CreateBlogBody {}
