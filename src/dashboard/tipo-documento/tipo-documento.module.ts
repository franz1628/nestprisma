import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService, PrismaService],
  exports : [TipoDocumentoService]
})
export class TipoDocumentoModule {}
