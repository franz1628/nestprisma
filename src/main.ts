import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('The  API description')
  .setVersion('1.0')
  .addTag('api')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se envían campos no permitidos
      transform: true, // Convierte los datos a los tipos definidos en el DTO
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
