import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrapSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
      .setTitle('NXA NFT API')
      .setDescription('NXA NFT API - The NXA blockchain access layer')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
}

async function bootstrap() {
  // Application
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });

  // Global Prefix
  app.setGlobalPrefix('/api');
  
  // CORS
  app.enableCors();

  // Swagger
  await bootstrapSwagger(app);

  // Body Parser Limits
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // Fix for: API's TicketCtrl POST & application/x-www-form-urlencoded
  // See: https://stackoverflow.com/questions/18710225/node-js-get-raw-request-body-using-express
  app.use(bodyParser.raw({ inflate: true, limit: '50mb', type: 'multipart/form-data' }));

  // Logger
  const logger = new Logger(AppModule.name);

  // Config Service
  const configService = app.get<ConfigService>(ConfigService);

  // HTTP Service
  const httpPortString = configService.get('API_HTTP_PORT');
  await app.listen(httpPortString);

  const appUrl = await app.getUrl();
  logger.verbose(`Application is running at: ${appUrl}, http port: ${httpPortString}`);
}

bootstrap();
