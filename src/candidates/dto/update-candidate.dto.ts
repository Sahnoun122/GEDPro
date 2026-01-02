import { IsEnum } from 'class-validator';
import { CandidateStatus } from '../entities/candidate-status.enum';

export class UpdateStatusDto {
  @IsEnum(CandidateStatus)
  status: CandidateStatus;
}
