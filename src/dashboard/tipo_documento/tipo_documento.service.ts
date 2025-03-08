import { Injectable } from '@nestjs/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo_documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo_documento.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import { TipoDocumentoDto } from './dto/tipo_documento.dto';

@Injectable()
export class TipoDocumentoService {
  constructor(private prisma: PrismaService) {}
  
  async create(create: CreateTipoDocumentoDto) {
    
    return this.prisma.tipo_documento.create({
      data: create,
    });
  }

  async findAll() {
    const models = await this.prisma.tipo_documento.findMany();
    return models;
  }

  async findOne(id: number) {
    return await this.prisma.tipo_documento.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, update: UpdateTipoDocumentoDto) {
    const model = await this.prisma.tipo_documento.update({
      where: {
        id: id,
      },
      data: update,
    });

    return plainToInstance(TipoDocumentoDto, model, { excludeExtraneousValues: true });
  }

  async remove(id: number) {
    return await this.prisma.tipo_documento.delete({
      where: {
        id: id,
      }
    });
  }
}
