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
  
  

  // Set global prefix

  const frontendUrl = configService.get('FRONTEND_URL', 'http://localhost:3000');

  const corsOriginsStr = configService.get('CORS_ORIGINS', frontendUrl);
  const corsOrigins = corsOriginsStr.split(',').map(origin => origin.trim());
  
  logger.log(`Configuring CORS for origins: ${corsOrigins.join(', ')}`);

  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/auth/google', '/auth/facebook', '/auth/apple', '/auth/google/callback', '/auth/facebook/callback', '/auth/apple/callback'],
  });

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
  
  // Log important information for OAuth debugging
  logger.log(`API URL with prefix: http://localhost:${port}/${apiPrefix}`);
  logger.log(`Google Auth URL: http://localhost:${port}/${apiPrefix}/auth/google`);
  logger.log(`Google Callback URL: ${configService.get('GOOGLE_CALLBACK_URL')}`);
}
bootstrap();