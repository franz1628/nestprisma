import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GeneroService } from '../genero/genero.service';
import { TipoDocumentoService } from '../tipo-documento/tipo-documento.service';

@Injectable()
export class AlumnoService {
   constructor(
    private readonly prisma: PrismaService,
    private readonly generoService : GeneroService,
    private readonly tipoDocumentoService: TipoDocumentoService
  ) {}
   async create(create: CreateAlumnoDto) {
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
      throw new ConflictException("Ya existe un alumno con el mismo tipo de documento");
      
    }

    return await this.prisma.alumno.create({
    data : create
    })
   }
 
   async findAll(){
     return this.prisma.alumno.findMany({include : {Genero:true,TipoDocumento:true}});
   }
 
   async findOne(id: number) {
     const model = await this.prisma.alumno.findUnique(
       {
         where : {
           id:id
         },
         include : {Genero:true,TipoDocumento:true}
       }
     )
 
     if(!model){
       throw new NotFoundException("No existe alumno con ese id");
       
     }
     return model;
   }
 
   async update(id: number, update: UpdateAlumnoDto) {
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
      throw new ConflictException("Ya existe el alumno");
      
    }

    const newModel = await this.prisma.alumno.update({
      where: { id: id },
      data : update
    })
 
     return newModel;
   }
 
   async remove(id: number) {
     const model = await this.findOne(id);
 
     const newModel = await this.prisma.alumno.update({
       where: { id: 1 },
       data : {estado:0}
     })
 
     return newModel;
   }
}
