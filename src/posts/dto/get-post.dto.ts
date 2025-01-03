import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BlogIdQuery } from 'src/posts/dto/common.dto';

export class GetPostParam {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class GetPostRequest extends IntersectionType(
  GetPostParam,
  BlogIdQuery,
) {}
