// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Security settings
  app.use(
    helmet({
      // Allow OAuth redirects by not blocking iframe loading
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(compression()); // Response compression

  // Configure CORS
  const frontendUrl = configService.get('FRONTEND_URL', 'http://localhost:3000');
  const corsOriginsStr = configService.get('CORS_ORIGINS', 'http://localhost:3000');
const corsOrigins = corsOriginsStr.split(',').map(origin => origin.trim());
  
  logger.log(`Configuring CORS for origins: ${corsOrigins.join(', ')}`);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400, // 24 hours
  });

  // IMPORTANT: We're changing how the API prefix is handled for auth routes
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');

  // Apply global prefix but DO NOT exclude the auth routes
  // This way, all routes will have the /api prefix
  app.setGlobalPrefix('api');

  // Set up global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
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
  
  // Log important information for OAuth debugging
  logger.log(`API URL with prefix: http://localhost:${port}/${apiPrefix}`);
  logger.log(`Google Auth URL: http://localhost:${port}/${apiPrefix}/auth/google`);
  logger.log(`Google Callback URL: ${configService.get('GOOGLE_CALLBACK_URL')}`);
}
bootstrap();