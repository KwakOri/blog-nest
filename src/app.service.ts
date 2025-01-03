import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'BLOG API SERVICE MAIN PAGE! YOU ARE CONNECTED SUCCESSFULLY!';
  }
}
