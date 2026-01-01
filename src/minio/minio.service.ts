import { Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private client: Minio.Client;
  private readonly logger = new Logger(MinioService.name);

  constructor() {
    this.client = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });

    this.client
      .listBuckets()
      .then((buckets) => {
        this.logger.log(
          'Connected to MinIO. Buckets: ' +
            (buckets.map((b) => b.name).join(', ') || 'None'),
        );
      })
      .catch((err) => {
        this.logger.error('MinIO connection error', err);
      });
  }

  async upload(
    bucket: string,
    fileName: string,
    buffer: Buffer,
    metaData?: { [key: string]: string },
  ): Promise<{ fileName: string; etag?: string }> {
    const exists = await this.client.bucketExists(bucket);
    if (!exists) {
      await this.client.makeBucket(bucket, '');
    }

  
    const info = await this.client.putObject(
      bucket,
      fileName,
      buffer,
      buffer.length,
      metaData,
    );

    return { fileName, etag: info.etag };
  }

  async download(bucket: string, fileName: string): Promise<Buffer> {
    const stream: Readable = await this.client.getObject(bucket, fileName);

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });
  }

  async listFiles(bucket: string): Promise<Minio.BucketItem[]> {
    return new Promise((resolve, reject) => {
      const objects: Minio.BucketItem[] = [];
      const stream = this.client.listObjectsV2(bucket, '', true);

      stream.on('data', (obj: Minio.BucketItem) => objects.push(obj));
      stream.on('end', () => resolve(objects));
      stream.on('error', (err) => reject(err));
    });
  }

  async remove(bucket: string, fileName: string): Promise<void> {
    await this.client.removeObject(bucket, fileName);
  }
}
