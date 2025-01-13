import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumno')
export class AlumnoController {
  constructor(private readonly service: AlumnoService) {}

  @Post()
  create(@Body() create: CreateAlumnoDto) {
    return this.service.create(create);
  } 

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: UpdateAlumnoDto) {
    return this.service.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
