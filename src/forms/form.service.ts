import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormEntity } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private formRepo: Repository<FormEntity>,
  ) {}

  create(dto: CreateFormDto) {
    const form = this.formRepo.create(dto);
    return this.formRepo.save(form);
  }

  findAll() {
    return this.formRepo.find();
  }

  findOne(id: string) {
    return this.formRepo.findOne({
      where: { id },
      relations: ['fields'],
    });
  }

  update(id: string, dto: UpdateFormDto) {
    return this.formRepo.update(id, dto);
  }

  delete(id: string) {
    return this.formRepo.delete(id);
  }
}
