import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY', '');
  }

  async getWeather(city: string) {
    if (!this.apiKey) {
      throw new BadRequestException('Clé API OpenWeather non configurée');
    }

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'fr',
        },
      });

      const data = response.data;
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        windSpeed: data.wind.speed,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new BadRequestException(`Ville "${city}" introuvable`);
      }
      throw new BadRequestException('Erreur lors de la récupération de la météo');
    }
  }
}
