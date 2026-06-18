import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Junior', description: 'Prénom' })
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  firstName: string;

  @ApiProperty({ example: 'Diallo', description: 'Nom de famille' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  lastName: string;

  @ApiProperty({ example: 'junior@example.com', description: 'Adresse email' })
  @IsEmail({}, { message: 'Adresse email invalide' })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email: string;

  @ApiProperty({ example: 'MotDePasse123!', description: 'Mot de passe (min 6 caractères)' })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;

  @ApiPropertyOptional({ example: '+221771234567', description: 'Numéro de téléphone' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'junior@example.com' })
  @IsEmail({}, { message: 'Adresse email invalide' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'MotDePasse123!' })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  password: string;
}
