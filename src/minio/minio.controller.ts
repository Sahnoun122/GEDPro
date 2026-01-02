import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  Delete,
  UseGuards,
  Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/users.entity';
import type { Response } from 'express';

@Controller('minio')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MinioController {
  constructor(private readonly minio: MinioService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin_rh, Role.rh)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucket') bucket: string,
  ) {
    const result = await this.minio.upload(
      bucket,
      file.originalname,
      file.buffer,
    );
    return { message: 'Uploaded successfully', ...result };
  }

  @Get('download/:bucket/:fileName')
  @Roles(Role.admin_rh, Role.rh, Role.manager)
  async download(
    @Param('bucket') bucket: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const data = await this.minio.download(bucket, fileName);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(data);
  }

  @Get('list/:bucket')
  @Roles(Role.admin_rh, Role.rh)
  async list(@Param('bucket') bucket: string) {
    return await this.minio.listFiles(bucket);
  }

  @Delete('remove/:bucket/:fileName')
  @Roles(Role.admin_rh)
  async remove(
    @Param('bucket') bucket: string,
    @Param('fileName') fileName: string,
  ) {
    await this.minio.remove(bucket, fileName);
    return { message: 'Removed successfully' };
  }
}
