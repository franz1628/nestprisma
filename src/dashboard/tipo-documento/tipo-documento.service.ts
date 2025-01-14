import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { PrismaService } from 'prisma/prisma.service';
import { notEqual } from 'assert';
import { TipoDocumento } from '@prisma/client';
import { TipoDocumentoDto } from './dto/tipo-documento.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TipoDocumentoService {
  private readonly EXISTE = "El tipo de documento ya existe";
  private readonly NOEXISTE = "No se encuentra el tipo de documento";

  constructor(private readonly prisma:PrismaService){}

  async create(create: CreateTipoDocumentoDto): Promise<TipoDocumentoDto> {
    const repetido = await this.prisma.tipoDocumento.findFirst(
      {
        where : {
          descripcion : create.descripcion
        }
      }
    ) 

    if(repetido){
      throw new ConflictException(this.EXISTE);
    }
    const model = await this.prisma.tipoDocumento.create({data:create});
    return this.toDto(model);
  }

  async findAll():Promise<TipoDocumentoDto[]> {
    const models = await this.prisma.tipoDocumento.findMany();

    return models.map(x=>this.toDto(x));
  }

  async findOne(id: number) : Promise<TipoDocumentoDto>{
    const model = await this.prisma.tipoDocumento.findFirst({where:{id}});
    
    if(!model){
      throw new NotFoundException(this.NOEXISTE);      
    }

    return this.toDto(model);
  }

  async update(id: number, update: UpdateTipoDocumentoDto) : Promise<TipoDocumentoDto>{
    await this.findOne(id);

    const repetido = await this.prisma.tipoDocumento.findFirst(
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

    const newModel = await this.prisma.tipoDocumento.update({
      where : {id},
      data : update
    })

    return this.toDto(newModel);
  }

  async remove(id: number):Promise<TipoDocumentoDto> {
    await this.findOne(id);

    const newModel = await this.prisma.tipoDocumento.update({
      where : {id},
      data : {estado:0}
    })

    return this.toDto(newModel);
  }

  toDto(model:TipoDocumento){
    return plainToInstance(TipoDocumentoDto,model,{

    });
  }
}
