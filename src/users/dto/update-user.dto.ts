import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Junior' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Diallo' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'junior@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;

  @ApiPropertyOptional({ example: 'NouveauMotDePasse123!' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password?: string;

  @ApiPropertyOptional({ example: '+221771234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}
