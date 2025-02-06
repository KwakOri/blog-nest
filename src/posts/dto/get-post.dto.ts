import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetPostParam {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class GetPostRequest extends GetPostParam {}
