import {
  BadRequestException,
  Body,
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

interface UploadRequestBody {
  image: Express.Multer.File;
  id: string;
}

@Controller('r2')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post('upload')
  // @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('image')) // 'image'는 클라이언트에서 보낸 폼 필드 이름
  async uploadFile(
    @UploadedFile() file: Express.Multer.File, // 단일 이미지 파일 받기
    @Body() body: UploadRequestBody, // ID 받기
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    console.log('body => ', body);
    console.log('file => ', file);

    try {
      const { id } = body;
      const { buffer } = file;
      const mimeType = file.mimetype;
      const publicUrl = await this.r2Service.uploadFile({
        folder: '',
        body: buffer,
        mimeType,
        fileName: id,
      });
      return { message: 'File uploaded successfully', publicUrl };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('download/:fileId')
  @UseGuards(AccessTokenGuard)
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.r2Service.downloadFile(fileId);
    res.setHeader('Content-Disposition', `attachment; filename="${fileId}"`);
    res.send(file);
  }
}
