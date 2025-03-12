import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CursoDto } from './dto/curso.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  async create(create: CreateCursoDto) {
    
    return this.prisma.curso.create({
      data: create,
    });
  }

  async findAll() {
    const models = await this.prisma.curso.findMany();
    return models;
  }

  async findOne(id: number) {
    const model = await this.prisma.curso.findUnique({
      where: {
        id: id,
      },
    });

    if(!model){
      throw new Error('Curso no encontrado');
    }

    return model;
  }

  async update(id: number, update: UpdateCursoDto) {
    const model = await this.prisma.curso.update({
      where: {
        id: id,
      },
      data: update,
    });

    return plainToInstance(CursoDto, model, { excludeExtraneousValues: true });
  }

   async remove(id: number) {
      const model =  await this.prisma.curso.update(
        {
          where: {
            id: id,
          },
          data: { estado: 0 }
        }
      )
  
      return plainToInstance(CursoDto, model);
    }
}
