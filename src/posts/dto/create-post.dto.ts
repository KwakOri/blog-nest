import { IntersectionType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BlogIdQuery } from 'src/dto/blog.dto';

export class CreatePostBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  categoryId?: number;

  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;

  @IsString()
  @IsNotEmpty()
  imageIds: string;
}

export class CreatePostRequest extends IntersectionType(
  CreatePostBody,
  BlogIdQuery,
) {}
