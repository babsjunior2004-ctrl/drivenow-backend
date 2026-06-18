import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CARTE = 'CARTE',
  VIREMENT = 'VIREMENT',
  ESPECES = 'ESPECES',
  MOBILE_MONEY = 'MOBILE_MONEY',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CARTE })
  paymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @OneToOne(() => Booking, (booking) => booking.payment, { eager: true })
  @JoinColumn()
  booking: Booking;

  @CreateDateColumn()
  createdAt: Date;
}
