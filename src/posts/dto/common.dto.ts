import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BlogIdQuery {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  blogId: number;
}
