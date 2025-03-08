import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from "bcrypt";
import { plainToInstance } from 'class-transformer';
import { AlumnoDto } from './dto/alumno.dto';

@Injectable()
export class AlumnoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    createAlumnoDto.password = await bcrypt.hash(createAlumnoDto.password, 10);
    
    return await this.prisma.alumno.create({
      data: createAlumnoDto,
    });
    
  }

  async findAll() {
    const models = await this.prisma.alumno.findMany({include: {genero : true, tipo_documento: true}});
    return models;
  }

  async findOne(id: number) {
    return await this.prisma.alumno.findUnique({
      where: {
        id: id,
      },
    })
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno =  await this.prisma.alumno.update(
      {
        where: {
          id: id,
        },
        data: updateAlumnoDto
      }
    )

    return plainToInstance(AlumnoDto, alumno);
  }

  async remove(id: number) {
    const alumno =  await this.prisma.alumno.update(
      {
        where: {
          id: id,
        },
        data: { estado: 0 }
      }
    )

    return plainToInstance(AlumnoDto, alumno);
  }
}
