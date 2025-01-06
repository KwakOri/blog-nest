import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from 'src/auth/strategies/jwt.strategy';
import jwtConfig from 'src/config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역으로 설정
      load: [jwtConfig], // jwt 설정 파일 등록
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessToken.secret'),
        signOptions: {
          expiresIn: configService.get<number>('jwt.accessToken.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AccessTokenStrategy, PassportModule],
})
export class AuthModule {}
