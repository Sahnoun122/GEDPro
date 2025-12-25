import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './organisation.entity';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
  ) {}

  async create(data: Partial<Organisation>): Promise<Organisation> {
    const organisation = this.organisationRepository.create(data);
    return this.organisationRepository.save(organisation);
  }

  async findById(id: string): Promise<Organisation | null> {
    return this.organisationRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Organisation[]> {
    return this.organisationRepository.find();
  }
}
