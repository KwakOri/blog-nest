import { IntersectionType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BlogIdQuery } from 'src/posts/dto/common.dto';

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
}

export class CreatePostRequest extends IntersectionType(
  CreatePostBody,
  BlogIdQuery,
) {}
