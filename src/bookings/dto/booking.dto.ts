import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookingStatus } from '../booking.entity';

export class CreateBookingDto {
  @ApiProperty({ example: '2025-07-01', description: 'Date de début (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Date de début invalide (format: YYYY-MM-DD)' })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2025-07-05', description: 'Date de fin (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Date de fin invalide (format: YYYY-MM-DD)' })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: 3, description: 'ID de la voiture à réserver' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: "L'ID de la voiture est obligatoire" })
  carId: number;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ enum: BookingStatus })
  @IsOptional()
  @IsEnum(BookingStatus, { message: 'Statut invalide (PENDING, CONFIRMED, CANCELLED)' })
  status?: BookingStatus;

  @ApiPropertyOptional({ example: '2025-07-02' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-07-06' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
