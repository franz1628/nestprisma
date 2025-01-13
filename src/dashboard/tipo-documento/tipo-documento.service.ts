import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { PrismaService } from 'prisma/prisma.service';
import { notEqual } from 'assert';


@Injectable()
export class TipoDocumentoService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    const busca = await this.prisma.tipoDocumento.findFirst(
      {
        where : {
          descripcion : createTipoDocumentoDto.descripcion,
          estado:1
        }
      }
    )

    if(busca){
      throw new ConflictException("Ya existe el tipo de documento");
      
    }

    return await this.prisma.tipoDocumento.create({
      data:createTipoDocumentoDto
    })
  }

  async findAll(){
    return this.prisma.tipoDocumento.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.tipoDocumento.findUnique(
      {
        where : {
          id:id
        }
      }
    )

    if(!model){
      throw new NotFoundException("No existe el tipo de documento con ese id");
      
    }
    return model;
  }

  async update(id: number, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    const model = await this.findOne(id);

    const busca = await this.prisma.tipoDocumento.findFirst(
      {
        where : {
          descripcion : updateTipoDocumentoDto.descripcion,
          id: {
            not:id
          }
        }
      }
    )

    if(busca){
      throw new ConflictException("Ya existe el tipo de documento");
      
    }

    const newModel = await this.prisma.tipoDocumento.update({
      where: { id: id },
      data : updateTipoDocumentoDto
    })

    return newModel;
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    const newModel = await this.prisma.tipoDocumento.update({
      where: { id: 1 },
      data : {estado:0}
    })

    return newModel;
  }
}
