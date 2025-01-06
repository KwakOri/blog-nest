import { IntersectionType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { BlogIdQuery } from 'src/dto/blog.dto';

export class CreateCategoryQuery extends BlogIdQuery {}

export class CreateCategoryBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateCategoryRequest extends IntersectionType(
  CreateCategoryQuery,
  CreateCategoryBody,
) {}
