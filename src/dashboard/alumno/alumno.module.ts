import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { PrismaService } from 'prisma/prisma.service';
import { GeneroService } from '../genero/genero.service';
import { TipoDocumentoService } from '../tipo_documento/tipo_documento.service';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService, PrismaService, GeneroService, TipoDocumentoService],
})
export class AlumnoModule {}
