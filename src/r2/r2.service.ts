import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class R2Service {
  private readonly s3Client: S3Client;
  private readonly publicUrl: string;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>('r2.endpoint');
    const accessKey = this.configService.get<string>('r2.accessKey');
    const secretKey = this.configService.get<string>('r2.secretKey');
    this.bucketName = this.configService.get<string>('r2.bucket');
    this.publicUrl = this.configService.get<string>('r2.publicUrl');

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  async uploadFile({
    folder,
    body,
    mimeType,
    fileName,
  }: {
    folder?: string;
    body: Buffer;
    mimeType: string;
    fileName: string;
  }): Promise<string> {
    const key = `${folder ? folder + '/' : ''}${fileName}`;

    // 먼저 해당 key가 존재하는지 확인
    const headCommand = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      // 파일이 이미 존재하면 에러 발생
      await this.s3Client.send(headCommand);
      throw new Error('File already exists');
    } catch (error) {
      // HeadObjectCommand가 실패하면, 파일이 존재하지 않음
      if (error.name !== 'NotFound') {
        console.error('Error checking file existence:', error);
        throw error;
      }
    }

    // 파일이 존재하지 않으면 업로드 진행
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: mimeType,
    });

    try {
      await this.s3Client.send(command);
      const publicUrl = `${this.publicUrl}/${key}`;
      console.log(`File uploaded successfully: ${key}`);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async downloadFile(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      const chunks: Buffer[] = [];
      const stream = response.Body as Readable;

      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }

      return Buffer.concat(chunks);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
}
