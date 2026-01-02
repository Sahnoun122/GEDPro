import { Module, Global } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { AuthModule } from 'src/auth/auth.module'; 

@Global()
@Module({
  imports: [AuthModule],
  controllers: [MinioController],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}
