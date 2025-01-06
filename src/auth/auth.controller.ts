import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt.dto';
import { LogInBody } from './dto/log-in.dto';
import { RefreshTokenGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/log-in')
  logIn(@Body() body: LogInBody, @Res() res: Response) {
    return this.AuthService.logIn(body, res);
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@Req() req: Request & { user: JwtPayload }, @Res() res: Response) {
    const { user } = req;
    return this.AuthService.refresh(user, res);
  }
}
