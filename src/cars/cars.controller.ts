import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/car.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les voitures (public)' })
  @ApiQuery({ name: 'available', required: false, type: Boolean, description: 'Filtrer par disponibilité' })
  @ApiResponse({ status: 200, description: 'Liste des voitures' })
  findAll(@Query('available') available?: string) {
    const availableFilter =
      available === 'true' ? true : available === 'false' ? false : undefined;
    return this.carsService.findAll(availableFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une voiture par ID (public)' })
  @ApiResponse({ status: 200, description: 'Voiture trouvée' })
  @ApiResponse({ status: 404, description: 'Voiture introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Ajouter une voiture (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Voiture créée' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Modifier une voiture (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Voiture modifiée' })
  @ApiResponse({ status: 404, description: 'Voiture introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer une voiture (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Voiture supprimée' })
  @ApiResponse({ status: 404, description: 'Voiture introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
