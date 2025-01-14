import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { TipoDocumentoDto } from './dto/tipo-documento.dto';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Post()
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto) : Promise<TipoDocumentoDto> {
    return this.tipoDocumentoService.create(createTipoDocumentoDto);
  }

  @Get()
  findAll():Promise<TipoDocumentoDto[]> {
    return this.tipoDocumentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<TipoDocumentoDto> {
    return this.tipoDocumentoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto):Promise<TipoDocumentoDto>  {
    return this.tipoDocumentoService.update(+id, updateTipoDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<TipoDocumentoDto>  {
    return this.tipoDocumentoService.remove(+id);
  }
}
