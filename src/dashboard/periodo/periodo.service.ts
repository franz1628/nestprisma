import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PeriodoDto } from './dto/periodo.dto';
import { Periodo } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PeriodoService {
  private readonly EXISTE = "El periodo ya existe";
  private readonly NOEXISTE = "No se encuentra el periodo";

  constructor(private readonly prisma:PrismaService){}

  async create(create: CreatePeriodoDto): Promise<PeriodoDto> {
    const repetido = await this.prisma.periodo.findFirst(
      {
        where : {
          descripcion : create.descripcion
        }
      }
    ) 

    if(repetido){
      throw new ConflictException(this.EXISTE);
    }
    const model = await this.prisma.periodo.create({data:create});
    return this.toDto(model);
  }

  async findAll():Promise<PeriodoDto[]> {
    const models = await this.prisma.periodo.findMany();

    return models.map(x=>this.toDto(x));
  }

  async findOne(id: number) : Promise<PeriodoDto>{
    const model = await this.prisma.periodo.findFirst({where:{id}});
    
    if(!model){
      throw new NotFoundException(this.NOEXISTE);      
    }

    return this.toDto(model);
  }

  async update(id: number, update: UpdatePeriodoDto) : Promise<PeriodoDto>{
    await this.findOne(id);

    const repetido = await this.prisma.periodo.findFirst(
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

    const newModel = await this.prisma.periodo.update({
      where : {id},
      data : update
    })

    return this.toDto(newModel);
  }

  async remove(id: number):Promise<PeriodoDto> {
    await this.findOne(id);

    const newModel = await this.prisma.periodo.update({
      where : {id},
      data : {estado:0}
    })

    return this.toDto(newModel);
  }

  toDto(model:Periodo){
    return plainToInstance(PeriodoDto,model,{

    });
  }
}
