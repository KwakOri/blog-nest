import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/dto/jwt.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessToken.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    return payload; // payload는 요청 컨텍스트에 추가
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // Extract refresh token from cookies
          return request?.cookies?.refreshToken || null;
        },
      ]),
      secretOrKey: configService.get<string>('jwt.refreshToken.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    return payload; // payload는 요청 컨텍스트에 추가
  }
}
