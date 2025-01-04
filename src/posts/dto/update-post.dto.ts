import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BlogIdQuery } from 'src/posts/dto/common.dto';
import { CreatePostBody } from 'src/posts/dto/create-post.dto';

export class UpdatePostParam {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class UpdatePostBody extends PartialType(CreatePostBody) {}

export class UpdatePostRequest extends IntersectionType(
  BlogIdQuery,
  UpdatePostParam,
  UpdatePostBody,
) {}
