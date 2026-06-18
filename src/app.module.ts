import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { WeatherModule } from './weather/weather.module';
import { User } from './users/user.entity';
import { Car } from './cars/car.entity';
import { Booking } from './bookings/booking.entity';
import { Payment } from './payments/payment.entity';

@Module({
  imports: [
    // Configuration des variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Connexion MySQL via TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'car_rental_db'),
        entities: [User, Car, Booking, Payment],
        synchronize: true, // À désactiver en production !
        logging: false,
      }),
      inject: [ConfigService],
    }),

    // Modules fonctionnels
    AuthModule,
    UsersModule,
    CarsModule,
    BookingsModule,
    PaymentsModule,
    WeatherModule,
  ],
})
export class AppModule {}
