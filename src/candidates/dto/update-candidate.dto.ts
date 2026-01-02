import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CandidateStatus } from '../entities/candidate-status.enum';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Nouveau statut du candidat',
    enum: CandidateStatus,
    example: CandidateStatus.ACCEPTED,
  })
  @IsEnum(CandidateStatus)
  status: CandidateStatus;
}
