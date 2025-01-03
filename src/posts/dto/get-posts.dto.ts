import { IntersectionType } from '@nestjs/mapped-types';
import { BlogIdQuery } from 'src/posts/dto/common.dto';

export class GetPostsParam {}

export class GetPostsRequest extends IntersectionType(
  GetPostsParam,
  BlogIdQuery,
) {}
