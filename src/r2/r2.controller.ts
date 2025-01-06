import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/jwt.guard';
import { R2Service } from './r2.service';

@Controller('r2')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post('upload')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { buffer } = file;
    const mimeType = file.mimetype;
    const publicUrl = await this.r2Service.uploadFile(
      'default',
      buffer,
      mimeType,
    );
    return { message: 'File uploaded successfully', publicUrl };
    // return { message: 'request success' };
  }

  @Get('download/:fileId')
  @UseGuards(AccessTokenGuard)
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.r2Service.downloadFile(fileId);
    res.setHeader('Content-Disposition', `attachment; filename="${fileId}"`);
    res.send(file);
  }
}
