import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from "bcrypt";

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
    const models = await this.prisma.alumno.findMany();
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
    return await this.prisma.alumno.update(
      {
        where: {
          id: id,
        },
        data: updateAlumnoDto
      }
    )
  }

  async remove(id: number) {
    return await this.prisma.alumno.delete({
      where: {
        id: id,
      }
    })
  }
}
