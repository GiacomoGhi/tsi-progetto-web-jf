//import { Logger } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);

  app.useLogger(logger);

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({ allowedHeaders: '*', origin: '*', methods: '*' });

  const documentBuilder = new DocumentBuilder()
    .setTitle('Tsi Progetto ing. sistemi web')
    .setDescription('Tsi Progetto ing. sistemi web')
    .setVersion('0.1.0')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      in: 'Header',
    })
    .addBasicAuth(
      {
        type: 'apiKey',
        description: 'x-api-key',
        name: 'x-api-key',
        in: 'header',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');

  let protocol = 'http';
  if (process.env.SSL == 'true') {
    protocol = 'https';
  }

  logger.log(
    `🚀 Application is running on: ${protocol}://localhost:${port}/${globalPrefix}`,
  );

  logger.log(
    `🚀 OpenApi Swagger Docs on: ${protocol}://localhost:${port}/docs`,
  );
}

bootstrap();
