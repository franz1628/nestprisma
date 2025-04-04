import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('The  API description')
  .setVersion('1.0') 
  .addTag('api')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // poner cors
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  console.log('Archivos estáticos servidos desde:', join(process.cwd(), 'uploads'));


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se envían campos no permitidos
      transform: true, // Convierte los datos a los tipos definidos en el DTO
    }),
  );

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
