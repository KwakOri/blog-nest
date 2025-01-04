import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePostParam {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class DeletePostRequest extends DeletePostParam {}
