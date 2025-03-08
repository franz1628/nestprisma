import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { ResponseDto } from 'src/common/dtos/responseDto';

@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  create(@Body() createGeneroDto: CreateGeneroDto) {
    return this.generoService.create(createGeneroDto);
  }

  @Get()
  findAll() {
    return this.generoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGeneroDto: UpdateGeneroDto) {
    
    const updatedGenero = await this.generoService.update(+id, updateGeneroDto);

    return {
      state:1,
      data: updatedGenero,
      message: 'Género actualizado correctamente',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generoService.remove(+id);
  }
}
