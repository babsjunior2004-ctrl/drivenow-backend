import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  @ApiOperation({ summary: 'Récupérer la météo d\'une ville' })
  @ApiParam({ name: 'city', description: 'Nom de la ville', example: 'Dakar' })
  @ApiResponse({
    status: 200,
    description: 'Données météo retournées',
    schema: {
      example: {
        city: 'Dakar',
        country: 'SN',
        temperature: 28,
        feelsLike: 31,
        humidity: 75,
        description: 'partiellement nuageux',
        icon: 'https://openweathermap.org/img/wn/02d@2x.png',
        windSpeed: 5.2,
        timestamp: '2025-07-01T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Ville introuvable' })
  getWeather(@Param('city') city: string) {
    return this.weatherService.getWeather(city);
  }
}
