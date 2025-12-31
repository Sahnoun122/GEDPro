import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseEntity } from './response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(ResponseEntity)
    private repo: Repository<ResponseEntity>,
  ) {}

  submit(formId: string, answers: any) {
    const response = this.repo.create({
      formId,
      answers,
    });
    return this.repo.save(response);
  }
}
