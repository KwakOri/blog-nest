import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { R2Controller } from './r2.controller';
import { R2Service } from './r2.service';

@Module({
  imports: [ConfigModule], // ConfigModule로 환경 변수 사용 가능
  providers: [R2Service], // R2Service 주입
  exports: [R2Service],
  controllers: [R2Controller], // 다른 모듈에서 R2Service 사용 가능
})
export class R2Module {}
