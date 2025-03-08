import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo_documento.service';
import { TipoDocumentoController } from './tipo_documento.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService, PrismaService],
})
export class TipoDocumentoModule {}
