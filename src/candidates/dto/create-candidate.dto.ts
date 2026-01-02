import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;
}
