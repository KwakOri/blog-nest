import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInBody implements Prisma.bokdeokbang_usersCreateInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogInRequest extends LogInBody {}
