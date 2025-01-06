import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCategoryParam {
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

export class DeleteCategoryRequest extends DeleteCategoryParam {}
