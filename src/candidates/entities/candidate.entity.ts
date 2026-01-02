import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organisation } from 'src/organisation/organisation.entity';
import { CandidateStatus } from './candidate-status.enum';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organisation, { nullable: false })
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.NEW,
  })
  status: CandidateStatus;

  @Column({ type: 'text', nullable: true })
  resume_text: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @CreateDateColumn()
  createdAt: Date;
}
