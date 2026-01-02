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
import { Role } from 'src/users/users.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly repo: Repository<Candidate>,
  ) {}

  async create(dto: CreateCandidateDto, organisationId: string) {
    const candidateData = {
      fullName: `${dto.firstname} ${dto.lastname}`,
      email: dto.email,
      phone: dto.phone,
      organisation: { id: organisationId } as any,
      status: CandidateStatus.NEW,
    };
    
    return this.repo.save(candidateData);
  }

  async findAll(organisationId: string) {
    return this.repo.find({
      where: { organisation: { id: organisationId } },
      order: { createdAt: 'DESC' },
    });
  }

  async changeStatus(
    candidateId: string,
    status: CandidateStatus,
    userRole: Role,
  ) {
    const candidate = await this.repo.findOne({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new NotFoundException('Candidat introuvable');
    }

    if (
      userRole === Role.manager &&
      ![CandidateStatus.ACCEPTED, CandidateStatus.REJECTED].includes(status)
    ) {
      throw new ForbiddenException('Manager peut فقط accepter ou refuser');
    }

    candidate.status = status;
    return this.repo.save(candidate);
  }
}
