import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getBlogParam {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  blogId: number;
}

export class getBlogRequest extends getBlogParam {}
