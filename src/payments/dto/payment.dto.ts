import { IsNumber, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentMethod, PaymentStatus } from '../payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID de la réservation à payer' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  bookingId: number;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.MOBILE_MONEY })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class UpdatePaymentDto {
  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}
