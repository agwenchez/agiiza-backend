import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

import * as express from 'express';
import * as path from 'path';

async function configureStaticFiles(app) {
  app.use('/static', express.static(path.join(__dirname, '../..', 'public/uploads')));
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Use morgan middleware
  app.use(morgan('dev'));
  app.enableCors();
  // Serve static files from the "public" folder
  await configureStaticFiles(app);
  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
