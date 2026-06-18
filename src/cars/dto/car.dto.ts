import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  Min,
  Max,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FuelType, Transmission } from '../car.entity';

export class CreateCarDto {
  @ApiProperty({ example: 'Mercedes' })
  @IsString()
  @IsNotEmpty({ message: 'La marque est obligatoire' })
  brand: string;

  @ApiProperty({ example: 'CLA 250' })
  @IsString()
  @IsNotEmpty({ message: 'Le modèle est obligatoire' })
  model: string;

  @ApiProperty({ example: 2023 })
  @Type(() => Number)
  @IsNumber()
  @Min(1990, { message: "L'année doit être supérieure à 1990" })
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({ example: 45000, description: 'Prix par jour en FCFA' })
  @Type(() => Number)
  @IsNumber()
  @Min(1000, { message: 'Le prix doit être au minimum 1000 FCFA' })
  pricePerDay: number;

  @ApiProperty({ enum: Transmission, example: Transmission.AUTOMATIQUE })
  @IsEnum(Transmission, { message: 'Transmission invalide (MANUELLE ou AUTOMATIQUE)' })
  transmission: Transmission;

  @ApiProperty({ enum: FuelType, example: FuelType.ESSENCE })
  @IsEnum(FuelType, { message: 'Type de carburant invalide' })
  fuelType: FuelType;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9)
  seats: number;

  @ApiPropertyOptional({ example: 'https://example.com/car.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}

export class UpdateCarDto {
  @ApiPropertyOptional({ example: 'Mercedes' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'GLE 400' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1990)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  pricePerDay?: number;

  @ApiPropertyOptional({ enum: Transmission })
  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @ApiPropertyOptional({ enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @ApiPropertyOptional({ example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(9)
  seats?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
