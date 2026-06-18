import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, UpdateCarDto } from './dto/car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async findAll(available?: boolean): Promise<Car[]> {
    if (available !== undefined) {
      return this.carRepository.find({ where: { available } });
    }
    return this.carRepository.find();
  }

  async findById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Voiture #${id} introuvable`);
    }
    return car;
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findById(id);
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: number): Promise<{ message: string }> {
    const car = await this.findById(id);
    await this.carRepository.remove(car);
    return { message: `Voiture #${id} supprimée avec succès` };
  }

  async setAvailability(id: number, available: boolean): Promise<Car> {
    const car = await this.findById(id);
    car.available = available;
    return this.carRepository.save(car);
  }
}
