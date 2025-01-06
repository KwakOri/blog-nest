import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogIdQuery } from 'src/dto/blog.dto';

export class UpdateCategoryQuery extends BlogIdQuery {}

export class UpdateCategoryParam {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

export class UpdateCategoryBody
  implements Prisma.bokdeokbang_categoriesUpdateInput
{
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryRequest extends IntersectionType(
  UpdateCategoryQuery,
  UpdateCategoryParam,
  UpdateCategoryBody,
) {}
