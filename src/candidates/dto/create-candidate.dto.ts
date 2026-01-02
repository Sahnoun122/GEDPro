import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({
    description: 'Prénom du candidat',
    example: 'Ahmed',
    type: String,
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'Nom de famille du candidat',
    example: 'Ben Ali',
    type: String,
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'Adresse email du candidat',
    example: 'ahmed.benali@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Numéro de téléphone du candidat (optionnel)',
    example: '0600000000',
    type: String,
    required: false,
  })
  @IsOptional()
  phone?: string;
}
