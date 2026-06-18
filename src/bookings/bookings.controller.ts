import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Bookings')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lister toutes les réservations (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Liste des réservations' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('my')
  @ApiOperation({ summary: 'Voir mes réservations (CLIENT)' })
  @ApiResponse({ status: 200, description: 'Mes réservations' })
  findMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.findByUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une réservation par ID' })
  @ApiResponse({ status: 200, description: 'Réservation trouvée' })
  @ApiResponse({ status: 404, description: 'Réservation introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiResponse({ status: 201, description: 'Réservation créée' })
  @ApiResponse({ status: 400, description: 'Dates invalides ou voiture indisponible' })
  create(@Body() createBookingDto: CreateBookingDto, @CurrentUser() user: any) {
    return this.bookingsService.create(createBookingDto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier/Annuler une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation modifiée' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
    @CurrentUser() user: any,
  ) {
    return this.bookingsService.update(id, updateBookingDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation supprimée' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.bookingsService.remove(id, user);
  }
}
