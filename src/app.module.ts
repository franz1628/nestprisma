import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filters';
import { AlumnoModule } from './dashboard/alumno/alumno.module';
import { AuthModule } from './login/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GeneroModule } from './dashboard/genero/genero.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AlumnoModule, 
    AuthModule, GeneroModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    },
    {
      provide:APP_FILTER,
      useClass:AllExceptionsFilter
    }
  ],
})
export class AppModule {}
