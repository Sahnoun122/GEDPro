import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormEntity } from '../form.entity';

export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  FILE = 'file',
}

@Entity('fields')
export class FieldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ type: 'enum', enum: FieldType })
  type: FieldType;

  @Column({ default: false })
  required: boolean;

  @Column({ type: 'json', nullable: true })
  options: string[];

  @Column()
  order: number;

  @ManyToOne(() => FormEntity, (form) => form.fields, {
    onDelete: 'CASCADE',
  })
  form: FormEntity;
}
