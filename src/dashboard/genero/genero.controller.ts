import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { GeneroDto } from './dto/genero.dto';

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  create(@Body() create: CreateGeneroDto) : Promise<GeneroDto> {
    return this.generoService.create(create);
  }

  @Get()
  findAll():Promise<GeneroDto[]> {
    return this.generoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<GeneroDto> {
    return this.generoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: UpdateGeneroDto):Promise<GeneroDto>  {
    return this.generoService.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<GeneroDto>  {
    return this.generoService.remove(+id);
  }
}
