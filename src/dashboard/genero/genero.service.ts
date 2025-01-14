import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GeneroDto } from './dto/genero.dto';
import { Genero } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GeneroService {
  private readonly EXISTE = "El genero ya existe";
  private readonly NOEXISTE = "No se encuentra el genero";

  constructor(private readonly prisma:PrismaService){}

  async create(create: CreateGeneroDto): Promise<GeneroDto> {
    const repetido = await this.prisma.genero.findFirst(
      {
        where : {
          descripcion : create.descripcion
        }
      }
    ) 

    if(repetido){
      throw new ConflictException(this.EXISTE);
    }
    const model = await this.prisma.genero.create({data:create});
    return this.toDto(model);
  }

  async findAll():Promise<GeneroDto[]> {
    const models = await this.prisma.genero.findMany();

    return models.map(x=>this.toDto(x));
  }

  async findOne(id: number) : Promise<GeneroDto>{
    const model = await this.prisma.genero.findFirst({where:{id}});
    
    if(!model){
      throw new NotFoundException(this.NOEXISTE);      
    }

    return this.toDto(model);
  }

  async update(id: number, update: UpdateGeneroDto) : Promise<GeneroDto>{
    await this.findOne(id);

    const repetido = await this.prisma.genero.findFirst(
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

    const newModel = await this.prisma.genero.update({
      where : {id},
      data : update
    })

    return this.toDto(newModel);
  }

  async remove(id: number):Promise<GeneroDto> {
    await this.findOne(id);

    const newModel = await this.prisma.genero.update({
      where : {id},
      data : {estado:0}
    })

    return this.toDto(newModel);
  }

  toDto(model:Genero){
    return plainToInstance(GeneroDto,model,{

    });
  }
}
