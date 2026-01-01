import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from './field.entity';
import { FormEntity } from '../form.entity';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FieldEntity, FormEntity]) , AuthModule],
  providers: [FieldService],
  controllers: [FieldController],
})
export class FieldModule {}
