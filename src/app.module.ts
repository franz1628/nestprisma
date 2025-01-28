import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TipoDocumentoModule } from './dashboard/tipo-documento/tipo-documento.module';
import { AlumnoModule } from './dashboard/alumno/alumno.module';
import { GeneroModule } from './dashboard/genero/genero.module';
import { PeriodoModule } from './dashboard/periodo/periodo.module';
import { CursoModule } from './dashboard/curso/curso.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filters';

@Module({
  imports: [TipoDocumentoModule, AlumnoModule, GeneroModule, PeriodoModule, CursoModule],
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
