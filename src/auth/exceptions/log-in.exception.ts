import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: '등록되지 않은 이메일입니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class PasswordNotMatchedException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: '비밀번호가 일치하지 않습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
