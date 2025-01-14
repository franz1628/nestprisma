import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CursoDto } from './dto/curso.dto';
import { Curso } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CursoService {
  private readonly EXISTE = "El periodo ya existe";
  private readonly NOEXISTE = "No se encuentra el periodo";

  constructor(private readonly prisma:PrismaService){}

  async create(create: CreateCursoDto): Promise<CursoDto> {
    const repetido = await this.prisma.curso.findFirst(
      {
        where : {
          descripcion : create.descripcion
        }
      }
    ) 

    if(repetido){
      throw new ConflictException(this.EXISTE);
    }
    const model = await this.prisma.curso.create({data:create});
    return this.toDto(model);
  }

  async findAll():Promise<CursoDto[]> {
    const models = await this.prisma.curso.findMany();

    return models.map(x=>this.toDto(x));
  }

  async findOne(id: number) : Promise<CursoDto>{
    const model = await this.prisma.curso.findFirst({where:{id}});
    
    if(!model){
      throw new NotFoundException(this.NOEXISTE);      
    }

    return this.toDto(model);
  }

  async update(id: number, update: UpdateCursoDto) : Promise<CursoDto>{
    await this.findOne(id);

    const repetido = await this.prisma.curso.findFirst(
      {
        where : {
          descripcion : update.descripcion,
          id : {
            not : id
          }
        }
      }
    ) 

    if(repetido){
      throw new ConflictException(this.EXISTE);
    }

    const newModel = await this.prisma.curso.update({
      where : {id},
      data : update
    })

    return this.toDto(newModel);
  }

  async remove(id: number):Promise<CursoDto> {
    await this.findOne(id);

    const newModel = await this.prisma.curso.update({
      where : {id},
      data : {estado:0}
    })

    return this.toDto(newModel);
  }

  toDto(model:Curso){
    return plainToInstance(CursoDto,model,{

    });
  }
}
