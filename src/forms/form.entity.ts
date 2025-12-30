import { Organisation } from 'src/organisation/organisation.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Type {
  text = 'text',
  email = 'email',
  number = 'number',
  file = 'file',
  select = 'select',
  date = 'date',
}

@Entity('forms')
export class Forms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  form_id: string;

  @Column({ default: false })
  required: boolean;

  @Column('simple-array')
  options: string[];

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column()
  label: string;

  @Column()
  order: Number;

  @Column()
  created_at: Date;
}
