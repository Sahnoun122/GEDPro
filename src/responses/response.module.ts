import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { ResponseEntity } from './response.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]) , AuthModule],
  controllers: [ResponseController],
  providers: [ResponseService],
  exports: [ResponseService], 
})
export class ResponseModule {}
