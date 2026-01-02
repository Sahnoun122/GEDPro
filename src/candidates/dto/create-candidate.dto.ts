import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;
}
