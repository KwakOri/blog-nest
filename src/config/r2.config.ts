import { registerAs } from '@nestjs/config';

export default registerAs('r2', () => ({
  namespace: process.env.CF_R2_NAMESPACE,
  endpoint: process.env.CF_R2_ENDPOINT,
  accessKey: process.env.CF_R2_ACCESS_KEY,
  secretKey: process.env.CF_R2_SECRET_KEY,
  bucket: process.env.CF_R2_BUCKET,
  publicUrl: process.env.CF_R2_PUBLIC_URL,
}));
