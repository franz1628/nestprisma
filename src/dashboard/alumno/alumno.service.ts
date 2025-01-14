import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GeneroService } from '../genero/genero.service';
import { TipoDocumentoService } from '../tipo-documento/tipo-documento.service';
import { Alumno } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { AlumnoDto } from './dto/alumno.dto';

@Injectable()
export class AlumnoService {
  private readonly EXISTE = "El genero ya existe";
  private readonly NOEXISTE = "No se encuentra el genero";

  constructor(
    private readonly prisma: PrismaService,
    private readonly generoService : GeneroService,
    private readonly tipoDocumentoService: TipoDocumentoService
  ) {}

  async create(create: CreateAlumnoDto):Promise<AlumnoDto> {
    create.id_genero!=null && await this.generoService.findOne(create.id_genero);
    create.id_tipoDocumento!=null && await this.tipoDocumentoService.findOne(create.id_tipoDocumento);
    
    const busca = await this.prisma.alumno.findFirst(
      {
        where : {
          numero_documento : create.numero_documento,
          estado:1
        }
      }
    )

    if(busca){
      throw new ConflictException(this.EXISTE);
    }

    const model = await this.prisma.alumno.create({
      data : create
    })

    return this.toDto(model);
  }

  async findAll():Promise<AlumnoDto[]>{
    const models = await this.prisma.alumno.findMany({include:{Genero:true,TipoDocumento:true}});
    return models.map(x=>this.toDto(x));
  }

  async findOne(id: number):Promise<AlumnoDto> {
    const model = await this.prisma.alumno.findUnique(
      {
        where : {
          id:id
        },
        include : {Genero:true,TipoDocumento:true}
      }
    )

    if(!model){
      throw new NotFoundException(this.NOEXISTE);
      
    }
    return this.toDto(model);
  }

  async update(id: number, update: UpdateAlumnoDto):Promise<AlumnoDto>  {
    update.id_genero!=null && await this.generoService.findOne(update.id_genero);
    update.id_tipoDocumento!=null && await this.tipoDocumentoService.findOne(update.id_tipoDocumento);
    const model = await this.findOne(id);

    const busca = await this.prisma.alumno.findFirst(
        {
          where : {
            numero_documento : update.numero_documento,
            id: {
              not:id
            }
          }
        }
    )

    if(busca){
      throw new ConflictException(this.EXISTE);
    }

    const newModel = await this.prisma.alumno.update({
      where: { id: id },
      data : update
    })

    return this.toDto(newModel);
  }

  async remove(id: number):Promise<AlumnoDto> {
    const model = await this.findOne(id);

    const newModel = await this.prisma.alumno.update({
      where: { id: 1 },
      data : {estado:0}
    })

    return this.toDto(newModel);
  }

  toDto(model:Alumno){
    return plainToInstance(AlumnoDto,model,{

    });
  }
}
