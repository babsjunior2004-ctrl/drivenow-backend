import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { BookingsService } from '../bookings/bookings.service';
import { BookingStatus } from '../bookings/booking.entity';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private bookingsService: BookingsService,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.find({ where: { id } });
    if (!payment.length) {
      throw new NotFoundException(`Paiement #${id} introuvable`);
    }
    return payment[0];
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const booking = await this.bookingsService.findById(createPaymentDto.bookingId);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Impossible de payer une réservation annulée');
    }

    const payment = this.paymentRepository.create({
      amount: booking.totalPrice,
      paymentMethod: createPaymentDto.paymentMethod,
      paymentStatus: PaymentStatus.COMPLETED,
      booking,
    });

    const saved = await this.paymentRepository.save(payment);

    // Confirmer la réservation après paiement
    await this.bookingsService.update(
      booking.id,
      { status: BookingStatus.CONFIRMED },
      { role: 'ADMIN', id: 0 }, // bypass RBAC check
    );

    return saved;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findById(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }
}
