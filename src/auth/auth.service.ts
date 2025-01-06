import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtPayload, JwtPayloadInput } from 'src/auth/dto/jwt.dto';
import { LogInRequest } from 'src/auth/dto/log-in.dto';
import {
  EmailNotFoundException,
  PasswordNotMatchedException,
} from 'src/auth/exceptions/log-in.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtPayloadInput) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.accessToken.secret'),
      expiresIn: this.configService.get<number>('jwt.accessToken.expiresIn'),
    });
  }

  async generateRefreshToken(payload: JwtPayloadInput) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshToken.secret'),
      expiresIn: this.configService.get<number>('jwt.refreshToken.expiresIn'),
    });
  }

  async generateTokens(payload: JwtPayloadInput) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async logIn({ email, password }: LogInRequest, res: Response) {
    const user = await this.prisma.bokdeokbang_users.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new EmailNotFoundException();

    if (user.password !== password) throw new PasswordNotMatchedException();

    const payload = {
      id: user.id,
      email,
    };

    // TODO: JWT Access Token 발급
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 48 * 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  async logOut() {}

  async refresh(user: JwtPayload, res: Response) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const { accessToken, refreshToken } = await this.generateTokens(payload);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
  }
}
