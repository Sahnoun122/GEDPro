import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldEntity } from './field.entity';
import { FormEntity } from '../form.entity';
import { CreateFieldDto } from './dto/create-field.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(FieldEntity)
    private fieldRepo: Repository<FieldEntity>,

    @InjectRepository(FormEntity)
    private formRepo: Repository<FormEntity>,
  ) {}

  async create(formId: string, dto: CreateFieldDto) {
    const form = await this.formRepo.findOneBy({ id: formId });

    if (!form) {
      throw new Error('Form not found');
    }

    const field = this.fieldRepo.create({
      ...dto,
      form,
    });

    return this.fieldRepo.save(field);
  }
}
