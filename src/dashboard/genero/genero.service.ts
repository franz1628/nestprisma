import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GeneroService {
   constructor(private readonly prisma: PrismaService) {}
   async create(create: CreateGeneroDto) {
     const busca = await this.prisma.genero.findFirst(
       {
         where : {
           descripcion : create.descripcion,
           estado:1
         }
       }
     )
 
     if(busca){
       throw new ConflictException("Ya existe un genero con el mismo tipo de documento");
       
     }
 
     return await this.prisma.genero.create({
      data : create
     })
   }
 
   async findAll(){
     return this.prisma.genero.findMany();
   }
 
   async findOne(id: number) {
     const model = await this.prisma.genero.findUnique(
       {
         where : {
           id:id
         }
       }
     )
 
     if(!model){
       throw new NotFoundException("No existe genero con ese id");
       
     }
     return model;
   }
 
   async update(id: number, update: UpdateGeneroDto) {
     const model = await this.findOne(id);
 
     const busca = await this.prisma.genero.findFirst(
       {
         where : {
           descripcion : update.descripcion,
           id: {
             not:id
           }
         }
       }
     )
 
     if(busca){
       throw new ConflictException("Ya existe el genero");
       
     }
 
     const newModel = await this.prisma.genero.update({
       where: { id: id },
       data : update
     })
 
     return newModel;
   }
 
   async remove(id: number) {
     const model = await this.findOne(id);
 
     const newModel = await this.prisma.genero.update({
       where: { id: 1 },
       data : {estado:0}
     })
 
     return newModel;
   }
}
