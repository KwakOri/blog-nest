import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BlogIdQuery {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  blogId: number;
}
