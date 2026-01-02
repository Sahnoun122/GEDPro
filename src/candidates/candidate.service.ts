import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidateStatus } from './entities/candidate-status.enum';
import { User, Role } from 'src/users/users.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly repo: Repository<Candidate>,
  ) {}

  async create(dto: CreateCandidateDto, organisationId: string) {
    return this.repo.save({
      ...dto,
      organisation: { id: organisationId } as any,
      status: CandidateStatus.NEW,
    });
  }

  async findAll(organisationId: string) {
    return this.repo.find({
      where: { organisation: { id: organisationId } },
      order: { createdAt: 'DESC' },
    });
  }

  async changeStatus(id: string, status: CandidateStatus, user: User) {
    const candidate = await this.repo.findOne({
      where: { id },
      relations: ['organisation'],
    });

    if (!candidate) throw new NotFoundException('Candidat introuvable');

    if (
      user.role === Role.manager &&
      ![CandidateStatus.ACCEPTED, CandidateStatus.REJECTED].includes(status)
    ) {
      throw new ForbiddenException();
    }

    candidate.status = status;
    return this.repo.save(candidate);
  }
}
