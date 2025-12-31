import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './form.entity';
import { FormService } from './form.service';
import { FormController } from './form.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  providers: [FormService],
  controllers: [FormController],
  exports: [TypeOrmModule],
})
export class FormModule {}
