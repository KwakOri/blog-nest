import { IntersectionType } from '@nestjs/mapped-types';
import { BlogIdQuery } from 'src/dto/blog.dto';

export class CreatePostBody {
  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsString()
  // @IsNotEmpty()
  content: string;

  // @Type(() => Number)
  // @Transform(({ value }) => Number(value))
  // @IsNumber()
  categoryId?: number;
}

export class CreatePostRequest extends IntersectionType(
  CreatePostBody,
  BlogIdQuery,
) {}
