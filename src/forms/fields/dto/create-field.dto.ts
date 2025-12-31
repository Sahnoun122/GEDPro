import { FieldType } from "../field.entity";

export class CreateFieldDto {
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}
