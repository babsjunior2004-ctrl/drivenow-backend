import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Sécurité
  app.use(helmet());

  // CORS pour le frontend React/Vite (dev + preview)
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "https://car-rental-25vl.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtre d'exception global
  app.useGlobalFilters(new HttpExceptionFilter());

  // Préfixe global de l'API
  app.setGlobalPrefix("api");

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle("DriveNow API")
    .setDescription(
      "API REST pour la plateforme de location de voitures DriveNow",
    )
    .setVersion("1.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .addTag("Auth", "Authentification et gestion des sessions")
    .addTag("Users", "Gestion des utilisateurs")
    .addTag("Cars", "Gestion du parc automobile")
    .addTag("Bookings", "Gestion des réservations")
    .addTag("Payments", "Gestion des paiements")
    .addTag("Weather", "Météo via OpenWeather API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>("PORT", 3000);
  await app.listen(port);

  console.log(`🚀 DriveNow Backend démarré sur : http://localhost:${port}`);
  console.log(`📚 Documentation Swagger : http://localhost:${port}/api/docs`);
}

bootstrap();
