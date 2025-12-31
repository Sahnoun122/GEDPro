import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from './field.entity';
import { FormEntity } from '../form.entity';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FieldEntity, FormEntity])],
  providers: [FieldService],
  controllers: [FieldController],
})
export class FieldModule {}
