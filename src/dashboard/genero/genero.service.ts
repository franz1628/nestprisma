import { Injectable } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GeneroDto } from './dto/genero.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GeneroService {
  constructor(private prisma: PrismaService) {}

  async create(create: CreateGeneroDto) {
    
    return this.prisma.genero.create({
      data: create,
    });
  }

  async findAll() {
    const models = await this.prisma.genero.findMany();
    return models;
  }

  async findOne(id: number) {
    const model = await this.prisma.genero.findUnique({
      where: {
        id: id,
      },
    });

    if(!model){
      throw new Error('Genero no encontrado');
    }

    return model;
  }

  async update(id: number, update: UpdateGeneroDto) {
    const model = await this.prisma.genero.update({
      where: {
        id: id,
      },
      data: update,
    });

    return plainToInstance(GeneroDto, model, { excludeExtraneousValues: true });
  }

  async remove(id: number) {
    const model =  await this.prisma.genero.update(
      {
        where: {
          id: id,
        },
        data: { estado: 0 }
      }
    )

    return plainToInstance(GeneroDto, model);
  }

}
