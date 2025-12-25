import { Organisation } from 'src/organisation/organisation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum Role {
  admin_rh = 'admin_rh',
  rh = 'rh',
  manager = 'manager',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organisation, { nullable: false })
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
