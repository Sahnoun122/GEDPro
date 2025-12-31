import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormEntity } from "./form.entity";
import { FieldEntity } from "./fields/field.entity";
import { CreateFormDto } from "./fields/dto/create-form.dto";
import { CreateFieldDto } from "./fields/dto/create-field.dto";
@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FormEntity)
    private formRepo: Repository<FormEntity>,

    @InjectRepository(FieldEntity)
    private fieldRepo: Repository<FieldEntity>,
  ) {}

  createForm(dto: CreateFormDto) {
    const form = this.formRepo.create(dto);
    return this.formRepo.save(form);
  }

  async addField(formId: string, dto: CreateFieldDto) {
    const form = await this.formRepo.findOne({
      where: { id: formId },
    });

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
