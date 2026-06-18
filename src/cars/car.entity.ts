import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

export enum FuelType {
  ESSENCE = 'ESSENCE',
  DIESEL = 'DIESEL',
  ELECTRIQUE = 'ELECTRIQUE',
  HYBRIDE = 'HYBRIDE',
}

export enum Transmission {
  MANUELLE = 'MANUELLE',
  AUTOMATIQUE = 'AUTOMATIQUE',
}

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ type: 'enum', enum: Transmission, default: Transmission.AUTOMATIQUE })
  transmission: Transmission;

  @Column({ type: 'enum', enum: FuelType, default: FuelType.ESSENCE })
  fuelType: FuelType;

  @Column({ default: 5 })
  seats: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Booking, (booking) => booking.car)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
