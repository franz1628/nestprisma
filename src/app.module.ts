import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TipoDocumentoModule } from './dashboard/tipo-documento/tipo-documento.module';
import { AlumnoModule } from './dashboard/alumno/alumno.module';
import { GeneroModule } from './dashboard/genero/genero.module';

@Module({
  imports: [TipoDocumentoModule, AlumnoModule, GeneroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
