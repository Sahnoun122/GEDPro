import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('responses')
export class ResponseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  formId: string;

  @Column({ type: 'json' })
  answers: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
