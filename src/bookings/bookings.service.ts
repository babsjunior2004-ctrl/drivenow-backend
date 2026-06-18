import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { CarsService } from '../cars/cars.service';
import { UsersService } from '../users/users.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { UserRole } from '../users/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private carsService: CarsService,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Réservation #${id} introuvable`);
    }
    return booking;
  }

  async create(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const { startDate, endDate, carId } = createBookingDto;

    // Valider les dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      throw new BadRequestException('La date de début ne peut pas être dans le passé');
    }
    if (end <= start) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    // Vérifier la voiture
    const car = await this.carsService.findById(carId);
    if (!car.available) {
      throw new BadRequestException('Cette voiture est déjà réservée');
    }

    // Calculer le prix total
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * Number(car.pricePerDay);

    const user = await this.usersService.findById(userId);

    const booking = this.bookingRepository.create({
      startDate,
      endDate,
      totalPrice,
      status: BookingStatus.PENDING,
      user,
      car,
    });

    // Marquer la voiture comme indisponible
    await this.carsService.setAvailability(carId, false);

    return this.bookingRepository.save(booking);
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
    currentUser: any,
  ): Promise<Booking> {
    const booking = await this.findById(id);

    // Un CLIENT ne peut que annuler SA réservation
    if (currentUser.role === UserRole.CLIENT) {
      if (booking.user.id !== currentUser.id) {
        throw new ForbiddenException('Vous ne pouvez modifier que vos propres réservations');
      }
      if (updateBookingDto.status && updateBookingDto.status !== BookingStatus.CANCELLED) {
        throw new ForbiddenException('Un client ne peut qu\'annuler une réservation');
      }
    }

    // Si annulation, remettre la voiture disponible
    if (updateBookingDto.status === BookingStatus.CANCELLED) {
      await this.carsService.setAvailability(booking.car.id, true);
    }

    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }

  async remove(id: number, currentUser: any): Promise<{ message: string }> {
    const booking = await this.findById(id);

    if (currentUser.role === UserRole.CLIENT && booking.user.id !== currentUser.id) {
      throw new ForbiddenException('Accès refusé');
    }

    // Remettre la voiture disponible
    if (booking.status !== BookingStatus.CANCELLED) {
      await this.carsService.setAvailability(booking.car.id, true);
    }

    await this.bookingRepository.remove(booking);
    return { message: `Réservation #${id} supprimée` };
  }
}
