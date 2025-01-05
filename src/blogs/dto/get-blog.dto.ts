import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetBlogParam {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  blogId: number;
}

export class GetBlogRequest extends GetBlogParam {}
