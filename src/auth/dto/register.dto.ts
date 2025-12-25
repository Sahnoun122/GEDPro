import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class RegisterDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  organisation_name: string;
}