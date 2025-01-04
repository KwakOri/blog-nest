import { IntersectionType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BlogIdQuery } from 'src/posts/dto/common.dto';

export class GetPostsParam {}

export class GetPostsQuery extends BlogIdQuery {
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  cursor: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  categoryId: number;
}

export class GetPostsRequest extends IntersectionType(
  GetPostsParam,
  GetPostsQuery,
) {}
