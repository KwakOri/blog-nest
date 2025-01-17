import { Prisma } from '@prisma/client';
import { CreatePostRequest } from 'src/posts/dto/create-post.dto';
import { DeletePostRequest } from 'src/posts/dto/delete-post.dto';
import { GetPostRequest } from 'src/posts/dto/get-post.dto';
import { GetPostsQuery } from 'src/posts/dto/get-posts.dto';
import { UpdatePostRequest } from 'src/posts/dto/update-post.dto';

export class PostQueryBuilder {
  static getPost({
    postId,
    blogId,
  }: GetPostRequest): Prisma.bokdeokbang_postsFindUniqueArgs {
    return {
      where: { id: postId, blogId },
    };
  }

  static getPosts({
    blogId,
    cursor,
    limit,
    categoryId,
  }: GetPostsQuery): Prisma.bokdeokbang_postsFindManyArgs {
    return {
      where: {
        blogId,
        ...(categoryId && { categoryId }),
      },
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      ...(limit && { take: limit }),
    };
  }

  static createPost({
    categoryId,
    blogId,
    ...data
  }: CreatePostRequest): Prisma.bokdeokbang_postsCreateArgs {
    return {
      data: {
        ...data,
        blogs: {
          connect: {
            id: blogId,
          },
        },
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    };
  }

  static updatePost({
    postId,
    blogId,
    categoryId,
    ...data
  }: UpdatePostRequest): Prisma.bokdeokbang_postsUpdateArgs {
    return {
      where: { id: postId },
      data: {
        ...data,
        blogs: {
          connect: {
            id: blogId,
          },
        },
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    };
  }

  static deletePost({
    postId,
  }: DeletePostRequest): Prisma.bokdeokbang_postsDeleteArgs {
    return {
      where: { id: postId },
    };
  }
}
