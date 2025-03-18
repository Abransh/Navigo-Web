// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security settings
  app.use(helmet()); // Security headers
  app.use(compression()); // Response compression

  // Configure CORS
  const corsOrigins = configService.get<string>('CORS_ORIGINS', '');
  const corsOptions = {
    origin: corsOrigins ? corsOrigins.split(',') : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  logger.log(`CORS configured for origins: ${corsOptions.origin}`);

  // Set global prefix
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);
  logger.log(`API prefix set to: /${apiPrefix}`);

  // Set up global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have any decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
      transform: true, // Transform payloads to be objects typed according to their DTO classes
      transformOptions: {
        enableImplicitConversion: true, // Automatically transform primitive types
      },
    }),
  );

  // Setup Swagger documentation
  if (configService.get<string>('NODE_ENV') !== 'production' || configService.get<boolean>('SWAGGER_ENABLED', false)) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Navigo API')
      .setDescription('The Navigo travel platform API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
    logger.log(`Swagger documentation enabled at /docs`);
  }

  // Start application
  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Environment: ${configService.get<string>('NODE_ENV', 'development')}`);
}
bootstrap();